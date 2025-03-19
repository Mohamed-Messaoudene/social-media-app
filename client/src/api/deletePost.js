import { makeRequest } from "../axios";

export const deletePost = async (postId, isMe, removePost, setSnackBarParams) => {
    if (!postId) return;
    try {
      if (isMe) {
        await makeRequest.delete(`/posts/${postId}`);
        setSnackBarParams({
          message: "Post deleted successfully",
          open: true,
          color: "success",
        });
      }
      removePost(postId);
    } catch (error) {
      console.error("Error deleting post:", error);
      setSnackBarParams({
        message: "Failed to delete post!",
        open: true,
        color: "warning",
      });
    } 
  };

