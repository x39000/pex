const express = require("express");
const cors = require("cors");
require("dotenv").config();
const bodyParser = require("body-parser");

const medlemRoutes = require("./routes/medlemRoutes");
const mcRoutes = require("./routes/mcRoutes");
const { getAllMembers, getMemberById } = require("./models/medlemModel");
const { getAllMotorcycles } = require("./models/mcModel");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/medlem", medlemRoutes);
app.use("/api/mc", mcRoutes);

const PORT = 3000;
app.listen(PORT, () => console.log(`Server kjører på port ${PORT}`));
