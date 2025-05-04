const express = require("express");
const Room = require("../models/Room");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const rooms = await Room.findAll({ where: { is_available: true } });
    res.json(rooms);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
