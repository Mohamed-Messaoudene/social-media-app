import { makeRequest } from "../axios";

export const deletePost = async (
  postId,
  isMe,
  removePost,
  setSnackBarParams
) => {
  try {
    if (isMe) {
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this post?"
      );
      if (!confirmDelete) return;
      // Delete post from the backend
      await makeRequest.delete(`/posts/${postId}`);

      // Remove the post from the local state (allPosts)
      removePost(postId);

      // Show success message
      setSnackBarParams({
        message: "Post deleted successfully",
        open: true,
        color: "success",
      });
    } else {
      // If the post doesn't belong to the user, only remove it locally
      removePost(postId);
    }
  } catch (error) {
    console.error("Error deleting post:", error);

    setSnackBarParams({
      message: "Failed to delete post!",
      open: true,
      color: "warning",
    });
  }
};
