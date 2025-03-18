import { makeRequest } from "../axios";

export const fetchComments = async (
  postId,
  setPostComments,
  setSnackBarParams
) => {
  try {
    const response = await makeRequest.get(`/comments/${postId}`); // Fetch comments
    console.log(response.data.comments)
    setPostComments(response.data.comments); // Corrected "commnets" typo to "comments"
  } catch (error) {
    console.error("Error fetching comments:", error);
    // Handle specific response errors
    if (error.response) {
        // Handle other server errors
        setSnackBarParams({
          message: error.response.data.message || "Failed to fetch comments.",
          open: true,
          color: "error",
        });
    } else {
      // Handle network errors or other unexpected errors
      setSnackBarParams({
        message: "An error occurred while fetching comments.",
        open: true,
        color: "error",
      });
    }
  }
};

export const addComment = async (newComment,postId,userId,setNewComment,setLoading,setPostComments,setSnackBarParams) => {
  try {
    setLoading(true)
    const commentText = newComment;
    const response = await makeRequest.post(`/comments/${postId}`,{userId,commentText});
    // Handle success response and append the new comment to the state
    if (response.status === 201) {
      const { myComment } = response.data;
      setPostComments((prevComments) => [myComment, ...prevComments]);
      setNewComment('');
    }
  } catch (error) {
    console.log("errror when adding a coment :", error);
    if (error.response) {
      setSnackBarParams({
        message: "adding a comment failed , please try again!",
        open: true,
        color: "error",
      });
    } else {
      setSnackBarParams({
        message: "Network error or server not responding",
        open: true,
        color: "error",
      });
    }
  } finally {
    setLoading(false);
  }
};
