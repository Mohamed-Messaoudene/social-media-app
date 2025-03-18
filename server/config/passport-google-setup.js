var GoogleStrategy = require("passport-google-oauth20").Strategy;
const passport = require("passport");
const User = require("../db/users");
require("dotenv").config();
console.log(process.env.GOOGLE_CLIENT_ID);

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    async function (accessToken, refreshToken, profile, done) {
      console.log("this is the profile object : ", profile);
      try {
        const user = await User.findOne({ where: { email: profile.emails[0].value } });
        if (user) {
          done(null, user);
        } else {
          const newUser = await User.create({
            username: profile.displayName.toLowerCase(),
            email: profile.emails[0].value,
          });
          done(null, newUser);
        }
      } catch (error) {
        done(error);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});
passport.deserializeUser(async (userId, done) => {
  try {
    const user = await User.findOne({ where: { id: userId } });
    done(null, user);
  } catch (error) {
    done(error);
  }
});
