// const { DataTypes } = require("sequelize");
// const sequelize = require("../db");

// const Booking = sequelize.define("Booking", {
//   guest_id: { type: DataTypes.INTEGER, allowNull: false },
//   room_id: { type: DataTypes.INTEGER, allowNull: false },
//   start_date: { type: DataTypes.DATE, allowNull: false },
//   end_date: { type: DataTypes.DATE, allowNull: false },
//   total_price: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
// });

// module.exports = Booking;
const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../db");

const Booking = sequelize.define("Booking", {
  start_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  end_date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  total_price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
});

module.exports = Booking;
