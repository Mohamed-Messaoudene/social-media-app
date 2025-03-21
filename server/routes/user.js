const express = require("express");
const userRoutes = express.Router();
const User = require("../db/users");
const Follow = require("../db/follows");
const { Sequelize, Op } = require("sequelize");
const { upload } = require("../middlwares/multerMiddlware");
const server_url = process.env.SERVER_URL;


userRoutes.post("/follow", async (req, res) => {
  const { followerId, followingId } = req.body;
  // Validate input
  if (!followerId || !followingId) {
    return res
      .status(400)
      .json({ message: "Both followerId and followingId are required." });
  }

  if (followerId === followingId) {
    return res.status(400).json({ message: "You cannot follow yourself." });
  }

  try {
    await Follow.create({ followerId, followingId });
    return res.status(200).json({ message: "Successfully followed the user." });
  } catch (error) {
    console.error("Error handling follow:", error);
    return res
      .status(500)
      .json({
        message: "An error occurred while processing the follow request.",
      });
  }
});

userRoutes.post("/unfollow", async (req, res) => {
  const { followerId, followingId } = req.body;
   console.log('===============================',followerId,followingId)
  // Validate input
  if (!followerId || !followingId) {
    return res
      .status(400)
      .json({ message: "Both followerId and followingId are required." });
  }

  try {
    // Check if the follow relationship exists
    const existingFollow = await Follow.findOne({
      where: { followerId, followingId },
    });

    if (!existingFollow) {
      return res
        .status(404)
        .json({ message: "Follow relationship does not exist." });
    }

    await existingFollow.destroy();
    return res
      .status(200)
      .json({ message: "Successfully unfollowed the user." });
  } catch (error) {
    console.error("Error handling unfollow:", error);
    return res
      .status(500)
      .json({
        message: "An error occurred while processing the unfollow request.",
      });
  }
});

userRoutes.get("/:userId/follow", async (req, res) => {
  try {
    const { userId } = req.params;

    // Get user's followings
    const followings = await Follow.findAll({
      where: { followerId: userId },
      include: [{ model: User, as: "Following", attributes: ["id", "username", "profileImagePath"] }],
    });

    // Get user's followers
    const followers = await Follow.findAll({
      where: { followingId: userId },
      include: [{ model: User, as: "Follower", attributes: ["id", "username", "profileImagePath"] }],
    });

    // Extract only required attributes
    const formattedFollowings = followings.map(f => f.Following);
    const formattedFollowers = followers.map(f => f.Follower);

    // Get user suggestions (users not followed by the user)
    const followingIds = formattedFollowings.map(f => f.id);
    const suggestions = await User.findAll({
      where: {
        id: { [Op.notIn]: [userId, ...followingIds] },
      },
      attributes: ["id", "username", "profileImagePath"],
    });

    res.json({ followings: formattedFollowings, followers: formattedFollowers, suggestions });
  } catch (error) {
    console.error("Error fetching follow data: ", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

userRoutes.post("/update/:userId", upload, async (req, res) => {
  const { userId } = req.params;
  const { username, email, location, phoneNumber } = req.body;

  // Get file paths from Multer's `req.files`
  const profileImagePath = req.files?.profileImage?.[0]?.path || null;
  const covertureImagePath = req.files?.covertureImage?.[0]?.path || null;

  // Normalize the file paths
  const normalizedProfileImagePath = profileImagePath
    ? `${server_url}/${profileImagePath.replace(/\\/g, "/")}`
    : null;
  const normalizedCovertureImagePath = covertureImagePath
    ? `${server_url}/${covertureImagePath.replace(/\\/g, "/")}`
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
    const followersCount = await user.countFollowers();
    const followingCount = await user.countFollowing();
    // Return success response with followers and following counts
    return res.status(200).json({
      message: "User updated successfully!",
      user: {
        ...user.dataValues,
        followersCount,
        followingCount,
      },
    });
  } catch (error) {
    console.error("Error updating user:", error);

    if (error.name === "SequelizeValidationError") {
      return res.status(400).json({ error: "Invalid data provided." });
    }

    return res.status(500).json({ error: "An error occurred while updating the user." });
  }
});

userRoutes.get("/:userId", async (req, res) => {
  const { userId } = req.params;
  const loggedInUserId = req.user?.id;

  if (!userId) {
    return res.status(400).json({ message: "User ID is required" });
  }
  try {
    const user = await User.findOne({
      where: { id: userId },
      attributes: [
        "id",
        "username",
        "email",
        "location",
        "phoneNumber",
        "profileImagePath", // Added profile image path
        "covertureImagePath", // Added coverture image path
        [
          Sequelize.literal(`(
            SELECT COUNT(*) 
            FROM "Follows" 
            WHERE "Follows"."followingId" = "User"."id"
          )`), 
          "followersCount"
        ],
        [
          Sequelize.literal(`(
            SELECT COUNT(*) 
            FROM "Follows" 
            WHERE "Follows"."followerId" = "User"."id"
          )`), 
          "followingCount"
        ],
      ],
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    let followed = false;
    if (loggedInUserId) {
      const follow = await Follow.findOne({
        where: {
          followerId: loggedInUserId,
          followingId: userId,
        },
      });
      followed = !!follow;
    }
    return res.status(200).json({
      user: {
        ...user.dataValues,
        followersCount: parseInt(user.dataValues.followersCount, 10),
        followingCount: parseInt(user.dataValues.followingCount, 10),
        followed,
      },
    });
  } catch (error) {
    console.error("Error while getting user info: ", error);
    return res.status(500).json({ message: "An error occurred while fetching user info" });
  }
});


module.exports = userRoutes;
