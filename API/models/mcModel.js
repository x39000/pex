const pool = require("../config/db");

async function getAllMotorcycles(req, res) {
  try {
    const result = await pool.query(`
      SELECT MC.registreringsnummer, MC.produsent, MC.mc_type, M.navn AS eier
      FROM Motorsykkel MC
      JOIN Medlem M ON MC.medlem_id = M.medlem_id
    `);

    if (!result || result[0].length === 0) return res.sendStatus(404);

    console.log(result[0]);
  } catch (error) {
    console.error(error);
  }
}

async function addMotorcycle(req, res) {
  const { registreringsnummer, medlem_id, produsent, mc_type } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO Motorsykkel (registreringsnummer, medlem_id, produsent, mc_type) VALUES (?, ?, ?, ?)",
      [registreringsnummer, medlem_id, produsent, mc_type]
    );

    if (!result) return res.sendStatus(400);

    console.log({ registreringsnummer, medlem_id, produsent, mc_type });
  } catch (error) {
    console.error(error);
  }
}

module.exports = { getAllMotorcycles, addMotorcycle };
