const {DataTypes } = require("sequelize");
const sequelize = require("../db/index"); 
const bcrypt = require("bcrypt");

const User = sequelize.define(
  "User",
  {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    profileImagePath: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    covertureImagePath: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    defaultScope: {
      attributes: { exclude: ["password"] }, // Exclude password by default
    },
    scopes: {
      withPassword: {
        attributes: {}, // Include all attributes, including password
      },
    },
  }
);

// Adding the comparePassword method
User.prototype.comparePassword = async function (plainPassword) {
  try {
    return await bcrypt.compare(plainPassword, this.password);
  } catch (error) {
    console.error("Error comparing passwords: ", error);
    throw new Error("Password comparison failed.");
  }
};

// Hash password before saving the user
User.beforeCreate(async (user) => {
  try {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
  } catch (error) {
    console.error("Error hashing password: ", error);
    throw new Error("Password hashing failed.");
  }
});

// Hash password before updating the user
User.beforeUpdate(async (user) => {
  if (user.changed("password")) {
    try {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(user.password, salt);
    } catch (error) {
      console.error("Error hashing password: ", error);
      throw new Error("Password hashing failed.");
    }
  }
});

module.exports = User;
