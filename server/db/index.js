const { Sequelize } = require("sequelize");
require("dotenv").config();

// Create a Sequelize instance (connection)
const db_name = process.env.DATABASE_NAME;
const username = process.env.USER_NAME;
const password = process.env.PASSWORD;
const sequelize = new Sequelize(db_name, username, password, {
  host: "localhost", // Your PostgreSQL host
  dialect: "postgres", // The database you're using
});
// Test the connection
sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

// Sync the database
sequelize
  .sync()
  .then(() => {
    console.log("Database & tables created!");
  })
  .catch((err) => console.error("Error syncing database:", err));

module.exports = sequelize;
