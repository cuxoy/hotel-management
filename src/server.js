require("dotenv").config();
const { Sequelize, Op } = require("sequelize");
const express = require("express");
const sequelize = require("./db");
const Guest = require("./models/Guest");
const Room = require("./models/Room");
const Booking = require("./models/Booking");

const app = express();
app.use(express.json());

const checkAvailableRooms = async (date) => {
  return await Room.findAll({
    where: {
      is_available: true,
      id: {
        [Op.notIn]: sequelize.literal(
          `(SELECT room_id FROM Bookings WHERE '${date}' BETWEEN start_date AND end_date)`
        ),
      },
    },
  });
};

const addGuest = async (name, email, phone) => {
  return await Guest.create({
    name,
    email,
    phone,
    createdAt: new Date(),
    updatedAt: new Date(),
  });
};

const makeBooking = async (guestId, roomId, startDate, endDate, totalPrice) => {
  return await Booking.create({
    guest_id: guestId,
    room_id: roomId,
    start_date: startDate,
    end_date: endDate,
    total_price: totalPrice,
    createdAt: new Date(),
    updatedAt: new Date(),
  });
};

const getMonthlyRevenue = async (year, month) => {
  return await Booking.sum("total_price", {
    where: {
      createdAt: {
        [Op.between]: [
          new Date(`${year}-${month}-01`),
          new Date(`${year}-${month + 1}-01`),
        ],
      },
    },
  });
};

app.get("/available-rooms/:date", async (req, res) => {
  try {
    const availableRooms = await checkAvailableRooms(req.params.date);
    res.json(availableRooms);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/add-guest", async (req, res) => {
  try {
    const { name, email, phone } = req.body;
    const newGuest = await addGuest(name, email, phone);
    res.json(newGuest);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/make-booking", async (req, res) => {
  try {
    const { guestId, roomId, startDate, endDate, totalPrice } = req.body;
    const newBooking = await makeBooking(
      guestId,
      roomId,
      startDate,
      endDate,
      totalPrice
    );
    res.json(newBooking);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/revenue/:year/:month", async (req, res) => {
  try {
    const revenue = await getMonthlyRevenue(req.params.year, req.params.month);
    res.json({ revenue });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

sequelize.sync({ force: false }).then(() => {
  console.log("Database synced");
  app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
  });
});
