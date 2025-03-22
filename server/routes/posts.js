const express = require("express");
const postRoutes = express.Router();
const Post = require("../db/posts");
const Like = require("../db/likes");
const User = require("../db/users");
const sequelize = require("../db/index");
const { Op, Sequelize } = require("sequelize");
const moment = require("moment");
const { upload } = require("../middlwares/multerMiddlware");
const server_url = process.env.SERVER_URL;

// Get all posts
postRoutes.get("/", async (req, res) => {
  const userId = req.user.id;

  try {
    const posts = await Post.findAll({
      order: [["createdAt", "DESC"]],
      attributes: {
        include: [
          [
            Sequelize.literal(`(
              SELECT COUNT(*)
              FROM "Likes"
              WHERE "Likes"."postId" = "Post"."id"
            )`),
            "numberOfLikes",
          ],
          "createdAt",
        ],
      },
      include: [
        {
          model: Like,
          attributes: ["userId"],
        },
        {
          model: User,
          attributes: ["id", "username", "profileImagePath"],
        },
      ],
    });

    const formattedPosts = posts.map((post) => {
      const { createdAt, Likes, dataValues } = post;
      const timePassed = moment(createdAt).fromNow();
      const liked =
        Array.isArray(Likes) && Likes.some((like) => like.userId === userId);

      return {
        ...dataValues,
        numberOfLikes: parseInt(dataValues.numberOfLikes, 10) || 0,
        timePassed,
        liked,
      };
    });
    res.status(200).json(formattedPosts);
  } catch (error) {
    console.error("Error fetching posts:", error.message, error.stack);
    res.status(500).json({ message: error.message });
  }
});

postRoutes.get("/user/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    // Fetch posts of the specific user
    const userPosts = await Post.findAll({
      where: { userId },
      order: [["createdAt", "DESC"]], // Order posts by latest
      attributes: {
        include: [
          [
            Sequelize.fn(
              "COALESCE",
              Sequelize.literal(`(
                SELECT COUNT(*) 
                FROM "Likes" 
                WHERE "Likes"."postId" = "Post"."id"
              )`),
              0
            ),
            "numberOfLikes",
          ],
        ],
      },
      include: [
        {
          model: Like,
          attributes: ["userId"],
        },
        {
          model: User,
          attributes: ["id", "username", "profileImagePath"], // Include user details
        },
      ],
    });

    // Format time passed and include it in the response
    const formattedPosts = userPosts.map((post) => {
      const { createdAt, Likes, dataValues } = post;
      const timePassed = moment(createdAt).fromNow(); // Use moment to get time difference
      const liked =
        Array.isArray(Likes) &&
        Likes.some((like) => like.userId === parseInt(userId, 10));
      return {
        ...post.dataValues,
        numberOfLikes: parseInt(post.dataValues.numberOfLikes, 10), // Ensure it's an integer
        timePassed, // Add the time passed in the response
        liked,
      };
    });

    // Respond with the formatted posts
    res.status(200).json(formattedPosts);
  } catch (error) {
    console.error("Error fetching user posts:", error);
    res.status(500).json({
      message: "Failed to fetch user posts. Please try again later.",
    });
  }
});

// Handle post like
postRoutes.post("/like", async (req, res) => {
  const { userId, postId } = req.body;
  try {
    const existingLike = await Like.findOne({ where: { userId, postId } });
    if (existingLike) {
      await existingLike.destroy();
      const likeCount = await Like.count({ where: { postId } });
      res.status(200).json({
        message: "Post unliked successfully",
        numberOfLikes: likeCount,
      });
    } else {
      await Like.create({ userId, postId });
      const likeCount = await Like.count({ where: { postId } });
      res.status(200).json({
        message: "Post liked successfully",
        numberOfLikes: likeCount,
      });
    }
  } catch (error) {
    console.error("Error toggling like:", error);
    res.status(500).json({
      message: "Failed to toggle like. Please try again later.",
    });
  }
});

// Add a post
postRoutes.post(
  "/:userId",
  upload.fields([{ name: "postImage", maxCount: 1 }]),
  async (req, res) => {
    const { userId } = req.params;
    const { postText } = req.body;
    let postImagePath = null;
    if (req.files?.postImage) {
      postImagePath = req.files.postImage[0].path;
    }
    try {
      // Create the post
      const newPost = await Post.create({
        postText,
        postImagePath,
        userId,
      });

      // Fetch the post with associated user
      const createdPost = await Post.findOne({
        where: { id: newPost.id },
        include: [
          {
            model: User,
            attributes: ["id", "username", "profileImagePath"], // Include user details
          },
        ],
      });

      // Calculate the time passed using moment
      const timePassed = moment(createdPost.createdAt).fromNow();

      // Construct the response
      const responsePost = {
        ...createdPost.toJSON(), // Convert Sequelize instance to plain object
        timePassed, // Add the time passed field
        numberOfLikes: 0, // Add numberOfLikes as 0
      };

      return res.status(201).json({
        message: "Post added successfully!",
        post: responsePost,
      });
    } catch (error) {
      console.error("Error adding post:", error);
      return res.status(500).json({
        message: "An error occurred while adding the post.",
      });
    }
  }
);

// Delete a post by its postId
// Delete a post by its postId
postRoutes.delete("/:postId", async (req, res) => {
  const { postId } = req.params;

  try {
    // ✅ Find the post by ID
    const post = await Post.findOne({ where: { id: postId } });
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // ✅ Delete the post image from Cloudinary if it exists
    if (post.postImagePath) {
      // Extract the public ID from the Cloudinary URL
      const publicId = post.postImagePath.split("/").pop().split(".")[0];

      // Delete the image from Cloudinary
      await cloudinary.uploader.destroy(publicId, (error, result) => {
        if (error) {
          console.error("Error deleting image from Cloudinary:", error);
        } else {
          console.log("Cloudinary image deleted:", result);
        }
      });
    }

    // ✅ Delete related likes first
    await Like.destroy({ where: { postId } });

    // ✅ Now delete the post from the database
    await post.destroy();

    // ✅ Send success response
    return res
      .status(200)
      .json({ message: "Post and image deleted successfully!" });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Failed to delete post", error: error.message });
  }
});

module.exports = postRoutes;
