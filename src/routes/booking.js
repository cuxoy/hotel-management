const express = require("express");
const Booking = require("../models/Booking");
const Room = require("../models/Room");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { guest_id, room_id, start_date, end_date, total_price } = req.body;

    const room = await Room.findByPk(room_id);
    if (!room.is_available) {
      return res.status(400).json({ error: "Room is not available" });
    }

    const booking = await Booking.create({
      guest_id,
      room_id,
      start_date,
      end_date,
      total_price,
    });
    await room.update({ is_available: false });
    res.status(201).json(booking);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
