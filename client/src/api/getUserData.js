import { makeRequest } from "../axios";

export const fetchUserData = async (userId, isMe, currentUser) => {
  try {
    // Fetch the user's profile data
    const user = isMe ? currentUser : (await makeRequest.get(`/users/${userId}`)).data.user;

    // Fetch the user's posts
    const postsResponse = await makeRequest.get(`/posts/user/${userId}`);
    const posts = postsResponse.data;

    return {
      user,
      posts,
    };
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw new Error("Unable to fetch user data.");
  }
};
