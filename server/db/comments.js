const { DataTypes} = require("sequelize");
const sequelize = require("./index");

const Comment = sequelize.define('Comment', {
    content:{
       type: DataTypes.STRING,
       allowNull: false,
    },
  }, {
    // Other model options
    timestamps: true // Automatically adds `createdAt` and `updatedAt` fields
  });

  module.exports = Comment;
  