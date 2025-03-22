const session = require("express-session");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const sequelize = require("../db/index");

const sessionStore = new SequelizeStore({
  db: sequelize,
  tableName: "Sessions",
});

// Ensure the session table is created
sessionStore.sync();

const sessionMiddleware = session({
  secret: process.env.SESSION_SECRET_KEY || "fallback_secret", // Ensure a secret is always set
  resave: false, // Avoid resaving session if nothing is changed
  saveUninitialized: false, // Don't save uninitialized sessions
  store: sessionStore,
  cookie: {
    secure: process.env.NODE_ENV == "production", // Secure in production only
    httpOnly: true,
    sameSite: "none", 
    maxAge: 1000 * 60 * 60 * 24, // 1 day
  },
});

module.exports = sessionMiddleware;
