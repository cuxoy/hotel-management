const express = require("express");
const Guest = require("../models/Guest");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const guest = await Guest.create(req.body);
    res.status(201).json(guest);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
