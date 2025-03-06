const express = require("express");
const cors = require("cors");
require("dotenv").config();
const bodyParser = require("body-parser");
const session = require("express-session");

const medlemRoutes = require("./routes/medlemRoutes");
const mcRoutes = require("./routes/mcRoutes");
const loginRoutes = require("./routes/loginRoutes"); // Import the loginRoutes
const { getAllMembers } = require("./models/medlemModel");

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:3000", // Allow requests from this origin
    credentials: true, // Allow credentials (cookies, authorization headers)
  })
);
app.use(express.json());

// Session setup
app.use(
  session({
    secret: "your_secret_key",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false, // Set to true if using HTTPS
      httpOnly: true,
      sameSite: "lax", // Allows cookies to be sent with cross-origin requests
      maxAge: 1000 * 60 * 60 * 24, // 1 day
    },
  })
);
// Routes
app.use("/api/medlem", medlemRoutes);
app.use("/api/mc", mcRoutes);
app.use("/api", loginRoutes); // Use the loginRoutes

const PORT = 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
