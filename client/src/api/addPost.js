import { makeRequest } from "../axios";

export const handleAddPost = async (
  userId,
  data,
  setSnackBarParams,
  addPost
) => {
  const formData = new FormData();
  formData.append("postText", data["postText"]);
  formData.append("postImage", data["postImage"]);

  try {
    const response = await makeRequest.post(`/posts/${userId}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    if (response.status === 201) {
      console.log(response.data);
      const { message, post } = response.data;
      setSnackBarParams({
        message: message || "Post added successfully!",
        open: true,
        color: "success",
      });
      addPost(post);
    }
  } catch (error) {
    if (error.response) {
      const { message } = error.response;
      setSnackBarParams({
        message: message || "",
        open: true,
        color: "warning",
      });
    }
  }
};
