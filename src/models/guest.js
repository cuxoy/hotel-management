// const { DataTypes } = require("sequelize");
// const sequelize = require("../db");

// const Guest = sequelize.define("Guest", {
//   name: { type: DataTypes.STRING, allowNull: false },
//   email: { type: DataTypes.STRING, unique: true, allowNull: false },
//   phone: { type: DataTypes.STRING },
// });

// module.exports = Guest;
const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../db");

const Guest = sequelize.define("Guest", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

module.exports = Guest;
