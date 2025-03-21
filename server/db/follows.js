const { DataTypes } = require("sequelize");
const sequelize = require("./index");

const Follow = sequelize.define("Follow", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  followerId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  followingId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = Follow;
