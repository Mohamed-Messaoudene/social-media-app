import { makeRequest } from "../axios";

export const handlePostLike = async (
  userId,
  postId,
  updatePost
) => {
  try {
    const response = await makeRequest.post("/posts/like", { userId, postId });
    console.log("this is response from like request :",response.data.message);
    const numberOfLikes = response.data.numberOfLikes;
    const liked = response.data.message == "Post liked successfully";
    console.log(liked)
    updatePost(postId, numberOfLikes,liked);
  } catch (error) {
    console.log("error occured when liking the post :", error);
  }
};
