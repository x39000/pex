const express = require("express");
const {
  getAllMembers,
  getMemberById,
  addMember,
} = require("../models/medlemModel");

const router = express.Router();

// Hent alle medlemmer
router.get("/", getAllMembers);

// Hent ett medlem med detaljer
router.get("/:id", async (req, res) => {
  try {
    const member = await getMemberById(req.params.id);
    res.json(member);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Legg til nytt medlem
router.post("/", async (req, res) => {
  const { navn, email, passord, adresse_id } = req.body;
  try {
    const newMember = await addMember(navn, email, passord, adresse_id);
    res.json(newMember);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
