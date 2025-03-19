import { makeRequest } from "../axios";

export const fetchAllPosts = async (setSnackBarParams,allPosts,setPosts) => {
  try {
    const response = await makeRequest.get("/posts/");
    setPosts(response.data);
  } catch (error) {
    console.error("Failed to fetch posts:", error);
    setSnackBarParams({
      message: error.response.message || "failed to load posts !",
      open: true,
      color: "warning",
    });
  }
};
