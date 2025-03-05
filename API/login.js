const session = require("express-session");
const pool = require("./config/db");

app.use(
  session({
    secret: "your_secret_key",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false },
  })
);

// Middleware for å sjekke om bruker er innlogget
const isLoggedIn = (req, res, next) => {
  if (req.session.user) {
    return next();
  } else {
    return res.status(401).send("Unauthorized");
  }
};

// Middleware for å sjekke om bruker er admin
const isAdmin = (req, res, next) => {
  if (req.session.user && req.session.user.rolle === "admin") {
    return next();
  } else {
    return res.status(403).send("Forbidden: Only admin can access this route");
  }
};

// 🔹 Innlogging (uten hashing)
app.post("/login", async (req, res) => {
  const { brukernavn, passord } = req.body;
  try {
    const [user] = await pool
      .promise()
      .query("SELECT * FROM bruker WHERE brukernavn = ?", [brukernavn]);
    if (user.length === 0) return res.status(404).send("User not found");

    if (user[0].passord !== passord)
      return res.status(400).send("Invalid password");

    // Sett brukerinfo i session
    req.session.user = {
      medlem_id: user[0].medlem_id,
      navn: user[0].navn,
      rolle: user[0].rolle,
    };

    return res.status(200).send("Login successful");
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal server error");
  }
});

// 🔹 Hent informasjon om innlogget medlem + MC-info
app.get("/me", isLoggedIn, async (req, res) => {
  try {
    const { medlem_id } = req.session.user;
    const [result] = await pool.promise().query(
      `
        SELECT M.medlem_id, M.navn, A.adresse, A.postnummer, 
               Mo.registreringsnummer, Mo.mc_type, Mo.produsent
        FROM Medlem M
        JOIN Adresse A ON M.adresse_id = A.adresse_id
        LEFT JOIN Motorsykkel Mo ON M.medlem_id = Mo.medlem_id
        WHERE M.medlem_id = ?
      `,
      [medlem_id]
    );

    if (result.length === 0) return res.status(404).send("No data found");

    return res.json(result[0]);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal server error");
  }
});

// 🔹 Hent alle medlemmer (kun for admin)
app.get("/members", isAdmin, async (req, res) => {
  try {
    const [result] = await pool.promise().query(`
        SELECT M.medlem_id, M.navn, A.adresse, A.postnummer,
               Mo.registreringsnummer, Mo.mc_type, Mo.produsent
        FROM Medlem M
        JOIN Adresse A ON M.adresse_id = A.adresse_id
        LEFT JOIN Motorsykkel Mo ON M.medlem_id = Mo.medlem_id
      `);

    if (result.length === 0) return res.status(404).send("No members found");

    return res.json(result);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal server error");
  }
});

// 🔹 Opprett nytt medlem eller admin (kun admin kan gjøre dette)
app.post("/create-user", isAdmin, async (req, res) => {
  const { navn, email, passord, rolle, adresse_id } = req.body;

  if (!["medlem", "admin"].includes(rolle)) {
    return res.status(400).send("Invalid role");
  }

  try {
    const [result] = await pool
      .promise()
      .query(
        "INSERT INTO Medlem (navn, passord, rolle, adresse_id) VALUES (?, ?, ?, ?, ?)",
        [navn, passord, rolle, adresse_id]
      );

    return res.status(201).send("User created successfully");
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal server error");
  }
});

// 🔹 Logg ut bruker
app.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).send("Error logging out");
    }
    res.status(200).send("Logged out successfully");
  });
});
