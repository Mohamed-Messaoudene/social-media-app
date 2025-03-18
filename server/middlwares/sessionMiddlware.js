const session = require("express-session");
const SequelizeStore =  require("connect-session-sequelize")(session.Store);
const sequelize = require("../db/index");

const sessionMiddleware = session({
    secret: process.env.SESSION_SECRET_KEY,
    resave: false, // Avoid resaving session if nothing is changed
    saveUninitialized: false, // Don't save uninitialized sessions
    store: new SequelizeStore({
      db: sequelize,
      tableName: 'Sessions', // Customize table name if needed
    }),
    cookie: {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24, // 1 day, adjust as needed
    },
  });

  module.exports = sessionMiddleware;
