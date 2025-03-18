const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const User = require("../db/users");

passport.use(
  new LocalStrategy({ usernameField: "email" }, async function (
    email,
    password,
    done
  ) {
    console.log("rani flocal passport");
    try {
      // Explicitly include password in query to compare
      const user = await User.scope("withPassword").findOne({ where: { email } });
      if (!user) {
        return done(null, false, { message: "User not found" });
      }

      // Compare password
      const isMatch = await user.comparePassword(password);
      if (!isMatch) {
        return done(null, false, { message: "Invalid password" });
      }

      // Remove password before returning the user
      const userWithoutPassword = { ...user.toJSON() };
      delete userWithoutPassword.password;
      return done(null, userWithoutPassword);
    } catch (error) {
      console.log("this error is from passport local login", error);
      return done(error);
    }
  })
);

// Serialize user (only store the user ID in the session)
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserialize user (fetch user from the database and exclude the password)
passport.deserializeUser(async (userId, done) => {
  try {
    // Fetch the user without the password field
    const myUser = await User.findOne({
      where: { id: userId },
      attributes: { exclude: ["password"] }, // Exclude password explicitly
    });

    if (!myUser) {
      return done(new Error("User not found"));
    }

    done(null, myUser);
  } catch (error) {
    done(error);
  }
});

module.exports = passport;
