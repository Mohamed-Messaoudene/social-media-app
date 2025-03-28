const express = require("express");
const authRoutes = express.Router();
const User = require("../db/users");
const passport = require("passport");
const { UniqueConstraintError } = require("sequelize");
const { upload } = require("../middlwares/multerMiddlware");

// Check authentication status
authRoutes.get("/checkAuth", async (req, res) => {
  if (req.isAuthenticated()) {
    const { password, ...userWithoutPassword } = req.user.toJSON(); // Exclude password
    // Get the follower and following counts
    const followersCount = await req.user.countFollowers();
    const followingCount = await req.user.countFollowing();
    res.status(200).json({
      isAuthenticated: true,
      user: {
        ...userWithoutPassword,
        followersCount,
        followingCount,
      },
    });
  } else {
    res.status(401).json({
      isAuthenticated: false,
      user: null,
    });
  }
});

// Login route
authRoutes.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "An unexpected error occurred. Please try again." });
    }
    if (!user) {
      return res.status(401).json({
        message:
          "Login failed. Please check your username and password and try again.",
      });
    }
    req.logIn(user, async (err) => {
      if (err) {
        console.log("there is error in req.login :", err);
        return res
          .status(500)
          .json({ message: "An unexpected error occurred. Please try again." });
      }
      try {
        // Refetch the user from the database to get the Sequelize instance
        const fullUser = await User.findByPk(user.id);

        if (!fullUser) {
          return res.status(404).json({ message: "User not found" });
        }

        // Check available methods
        console.log("User methods:", Object.keys(fullUser.__proto__));

        const followersCount = await fullUser.countFollowers();
        const followingCount = await fullUser.countFollowing();

        return res.status(200).json({
          user: {
            ...fullUser.toJSON(),
            followersCount,
            followingCount,
          },
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
        return res.status(500).json({ message: "Failed to fetch user data" });
      }
    });
  })(req, res, next);
});

// Register route
authRoutes.post(
  "/register",
  upload.fields([
    { name: "profileImage", maxCount: 1 },
    { name: "covertureImage", maxCount: 1 },
  ]),
  async (req, res) => {
    const { username, email, password, location, phoneNumber } = req.body;

    try {
      let profileImagePath = null;
      let covertureImagePath = null;

      // ✅ Extract Cloudinary image URLs if files exist
      if (req.files?.profileImage) {
        profileImagePath = req.files.profileImage[0].path; // Cloudinary URL
      }
      if (req.files?.covertureImage) {
        covertureImagePath = req.files.covertureImage[0].path; // Cloudinary URL
      }

      // ✅ Create the new user in the database
      const newUser = await User.create({
        username,
        email,
        password, // Sequelize hooks handle password hashing
        profileImagePath,
        covertureImagePath,
        location,
        phoneNumber,
      });

      // ✅ Remove password before sending response
      const { password: _, ...userWithoutPassword } = newUser.get({
        plain: true,
      });

      return res.status(201).json({
        message: "User registered successfully!",
        user: userWithoutPassword,
      });
    } catch (error) {
      if (error instanceof UniqueConstraintError) {
        return res
          .status(409)
          .json({ message: "Error: this email already exists!" });
      } else {
        return res
          .status(500)
          .json({ message: "ERROR: An error occurred during registration!" });
      }
    }
  }
);

module.exports = authRoutes;

// Logout route
authRoutes.post("/logout", (req, res) => {
  req.logout((err) => {
    if (err) return res.status(500).json({ message: "Failed to log out." });
    req.session.destroy((err) => {
      if (err)
        return res.status(500).json({ message: "Failed to destroy session." });
      res.clearCookie("connect.sid"); // Clear the session cookie
      res.status(200).json({ message: "Logout successful." });
    });
  });
});

module.exports = authRoutes;
