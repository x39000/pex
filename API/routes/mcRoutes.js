const express = require("express");
const { getAllMotorcycles, addMotorcycle } = require("../models/mcModel");

const router = express.Router();

// Hent alle motorsykler med eiere
router.get("/", async (req, res) => {
  try {
    const motorcycles = await getAllMotorcycles();
    res.json(motorcycles);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Legg til motorsykkel
router.post("/", async (req, res) => {
  const { registreringsnummer, medlem_id, produsent, mc_type } = req.body;
  try {
    const newMotorcycle = await addMotorcycle(
      registreringsnummer,
      medlem_id,
      produsent,
      mc_type
    );
    res.json(newMotorcycle);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
