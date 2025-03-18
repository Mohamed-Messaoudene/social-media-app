const express = require("express");
const commentRoutes = express.Router();
const Comment = require("../db/comments");
const User = require("../db/users");
const Post = require("../db/posts");
const moment = require("moment");

// Get all comments of a specific post
commentRoutes.get("/:postId", async (req, res) => {
  const { postId } = req.params;

  try {
    // Check if the post exists
    const postExists = await Post.findByPk(postId);
    if (!postExists) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Find all comments for the given postId and include user info
    const comments = await Comment.findAll({
      where: { postId },
      include: {
        model: User,
        attributes: ["id","username", "profileImagePath"], // Include specific user info
      },
    });

    // If no comments exist, return an empty array
    if (comments.length === 0) {
      return res
        .status(200)
        .json({ comments: [], message: "No comments yet for this post." });
    }

    // Add time passed for each comment
    const commentsWithTime = comments.map((comment) => {
      const timePassed = moment(comment.createdAt).fromNow(); // Time passed (e.g., "2 hours ago")
      return {
        id: comment.id,
        commentText: comment.content,
        timePassed,
        userInfo: {
          userId: comment.User?.id || null,
          username: comment.User?.username || "Unknown User", // Handle missing user edge case
          profileImagePath: comment.User?.profileImagePath || null,
        },
      };
    });

    // Return the comments with time passed and user info
    return res.status(200).json({ comments: commentsWithTime });
  } catch (error) {
    console.error("Error fetching comments:", error);
    return res
      .status(500)
      .json({ message: "An error occurred while fetching comments." });
  }
});

// add a coment for a specific post
commentRoutes.post("/:postId", async (req, res) => {
  const { postId } = req.params;
  const { userId,commentText } = req.body;
  try {
    // Validate required fields
    if (!commentText || !userId) {
      return res
        .status(400)
        .json({ message: "Comment text and user ID are required." });
    }
    // Check if the post exists
    const postExists = await Post.findByPk(postId);
    if (!postExists) {
      return res.status(404).json({ message: "Post not found" });
    }
    // Check if the user exists
    const userExists = await User.findByPk(userId);
    if (!userExists) {
      return res.status(404).json({ message: "User not found" });
    }
    // Create a new comment
    const newComment = await Comment.create({
      postId,
      userId,
      content:commentText,
      createdAt: new Date(),
    });

    // Prepare the response with user info and time passed
    const timePassed = moment(newComment.createdAt).fromNow();
    const responseComment = {
      id: newComment.id,
      commentText: newComment.content,
      timePassed,
      userInfo: {
        userId: userExists.id ,
        username: userExists.username,
        profileImagePath: userExists.profileImagePath || null,
      },
    };
    
    // Return the newly created comment
    return res.status(201).json({
      message: "Comment added successfully.",
      myComment: responseComment,
    });

  } catch (error) {
    console.log(error)
    return res
      .status(500)
      .json({ message: "An error occurred while adding a comment." });
  }
});

// commentRoutes.put("/:commentId", (req, res) => {
//   const { commentId } = req.params;
// });
// commentRoutes.delete("/:commentId", (req, res) => {
//   const { commentId } = req.params;
// });

module.exports = commentRoutes;
