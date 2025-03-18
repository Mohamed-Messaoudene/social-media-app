const express = require("express");
const userRoutes = express.Router();
const User = require("../db/users");
const Follow = require("../db/follows");
const { Sequelize } = require("sequelize");
const { upload } = require("../middlwares/multerMiddlware");

userRoutes.post("/update/:userId", upload, async (req, res) => {
  const { userId } = req.params;
  const { username, email, location, phoneNumber } = req.body;

  // Get file paths from Multer's `req.files`
  const profileImagePath = req.files?.profileImage?.[0]?.path || null;
  const covertureImagePath = req.files?.covertureImage?.[0]?.path || null;

  // Normalize the file paths
  const normalizedProfileImagePath = profileImagePath
    ? `http://localhost:5000/${profileImagePath.replace(/\\/g, "/")}`
    : null;
  const normalizedCovertureImagePath = covertureImagePath
    ? `http://localhost:5000/${covertureImagePath.replace(/\\/g, "/")}`
    : null;

  try {
    // Fetch the user from the database
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Update user fields conditionally
    user.username = username || user.username;
    user.email = email || user.email;
    user.location = location || user.location;
    user.phoneNumber = phoneNumber || user.phoneNumber;

    // Update images only if new ones are provided
    if (normalizedProfileImagePath) {
      user.profileImagePath = normalizedProfileImagePath;
    }
    if (normalizedCovertureImagePath) {
      user.covertureImagePath = normalizedCovertureImagePath;
    }

    // Save the updated user
    await user.save();

    // Return success response
    return res.status(200).json({
      message: "User updated successfully!",
      user,
    });
  } catch (error) {
    console.error("Error updating user:", error);

    if (error.name === "SequelizeValidationError") {
      // Handle validation errors
      return res.status(400).json({ error: "Invalid data provided." });
    }

    // Generic server error
    return res
      .status(500)
      .json({ error: "An error occurred while updating the user." });
  }
});
userRoutes.get("/:userId", async (req, res) => {
  const { userId } = req.params;
  const loggedInUserId = req.user?.id;
  // Validate userId input (optional, if applicable)
  if (!userId) {
    return res.status(400).json({ message: "User ID is required" });
  }
  try {
    // Query the user by userId along with counts for followers and following
    const user = await User.findOne({
      where: { id: userId },
      attributes: {
        include: [
          [
            Sequelize.fn("COUNT", Sequelize.col("Followers.id")),
            "followersCount",
          ],
          [
            Sequelize.fn("COUNT", Sequelize.col("Following.id")),
            "followingCount",
          ],
        ],
      },
      include: [
        {
          model: User,
          as: "Followers", // This is the alias defined in the model for followers
          attributes: [], // No need to return actual follower data, just the count
          through: { attributes: [] }, // Don't return anything from the join table
        },
        {
          model: User,
          as: "Following", // This is the alias defined in the model for following
          attributes: [], // No need to return actual following data, just the count
          through: { attributes: [] }, // Don't return anything from the join table
        },
      ],
      group: ["User.id"], // Group by user ID to get the count of followers and following
    });
    // If user is not found, return a 404 response
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    // Check if the logged-in user follows this user
    let followed = false;
    if (loggedInUserId) {
      const follow = await Follow.findOne({
        where: {
          followerId: loggedInUserId,
          followingId: userId,
        },
      });
      followed = !!follow; // Convert to boolean
    }

    // If user is found, return the user data along with counts for followers and following
    return res.status(200).json({
      user: {
        ...user.dataValues,
        followersCount: parseInt(user.dataValues.followersCount, 10),
        followingCount: parseInt(user.dataValues.followingCount, 10),
        followed,
      },
    });
  } catch (error) {
    // Log the error details for debugging
    console.error("Error while getting user info: ", error);

    // Respond with a 500 Internal Server Error
    return res
      .status(500)
      .json({ message: "An error occurred while fetching user info" });
  }
});
userRoutes.post("/follow",async(req,res)=>{
  const {followerId,followingId} = req.body;
  try {
     // Check if the follow relationship already exists
    const existingFollow = await Follow.findOne({
      where: {
        followerId: followerId,
        followingId: followingId,
      },
    });

    if (existingFollow) {
      // If follow relationship exists, unfollow by deleting the record
      await existingFollow.destroy();
      return res.status(200).json({ message: "Successfully unfollowed the user." });
    } else {
      // If no follow relationship exists, follow the user by creating a new record
      await Follow.create({
        followerId: followerId,
        followingId: followingId,
      });
      return res.status(200).json({ message: "Successfully followed the user." });
    }
  } catch (error) {
    console.error("Error handling follow/unfollow:", error);
    return res.status(500).json({
      message: "An error occurred while processing the follow request.",
    });
  }
});

module.exports = userRoutes;
