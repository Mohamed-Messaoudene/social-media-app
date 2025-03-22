const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../db/users");

passport.use(
  new LocalStrategy({ usernameField: "email" }, async (email, password, done) => {
    console.log("🔹 Passport LocalStrategy initialized");

    try {
      // Find user and include password for comparison
      const user = await User.scope("withPassword").findOne({ where: { email } });

      if (!user) {
        return done(null, false, { message: "User not found" });
      }

      // Compare password
      const isMatch = await user.comparePassword(password);
      if (!isMatch) {
        return done(null, false, { message: "Invalid password" });
      }

      // Convert Sequelize instance to plain object and remove password
      const userWithoutPassword = user.get({ plain: true });
      delete userWithoutPassword.password;

      return done(null, userWithoutPassword);
    } catch (error) {
      console.error("❌ Error in Passport LocalStrategy:", error);
      return done(error);
    }
  })
);

// Serialize user (store user ID in session)
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserialize user (fetch user without password)
passport.deserializeUser(async (userId, done) => {
  try {
    const myUser = await User.findByPk(userId, {
      attributes: { exclude: ["password"] },
    });

    if (!myUser) {
      return done(null, false);
    }

    done(null, myUser);
  } catch (error) {
    done(error);
  }
});

module.exports = passport;
