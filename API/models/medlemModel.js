const pool = require("../config/db");

async function getAllMembers(req, res) {
  try {
    const [result] = await pool.query(`
      SELECT M.medlem_id, M.navn, A.adresse, A.postnummer
      FROM Medlem M
      JOIN Adresse A ON M.adresse_id = A.adresse_id
    `);

    if (!result || result.length === 0) {
      return res.status(404).send("No members found");
    }

    console.log(result);
  } catch (error) {
    console.error(error);
  }
}

async function getMemberById(req, res) {
  const { id } = req.params;
  try {
    const result = await pool.query(
      `
      SELECT M.medlem_id, M.navn, A.adresse, A.postnummer,
             MC.registreringsnummer, MC.produsent, MC.mc_type
      FROM Medlem M
      JOIN Adresse A ON M.adresse_id = A.adresse_id
      LEFT JOIN Motorsykkel MC ON M.medlem_id = MC.medlem_id
      WHERE M.medlem_id = ?
    `,
      [id]
    );

    if (!result || result[0].length === 0) return res.sendStatus(404);

    console.log(result[0]);
    res.json(result[0]);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
}

async function addMember(req, res) {
  const { navn, email, passord, adresse_id } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO Medlem (navn, adresse_id) VALUES (?, 'medlem', ?)",
      [navn, adresse_id]
    );

    if (!result) return res.sendStatus(400);

    console.log({ medlem_id: result[0].insertId, navn, adresse_id });
    res.json({ medlem_id: result[0].insertId, navn, adresse_id });
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
}

module.exports = { getAllMembers, getMemberById, addMember };
