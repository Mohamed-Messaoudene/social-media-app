import { makeRequest } from "../axios";

export const fetchUserData = async (userId, isMe, loggedin_user) => {
  try {
    // Fetch user data & posts concurrently
    const [userResponse, postsResponse] = await Promise.all([
      isMe ? Promise.resolve({ data: { user: loggedin_user } }) : makeRequest.get(`/users/${userId}`),
      makeRequest.get(`/posts/user/${userId}`)
    ]);

    const user = userResponse.data.user;
    const posts = postsResponse.data;
    console.log(user)
    // Assign default images if missing
    return {
      user: {
        ...user,
        profileImagePath: user.profileImagePath || "/emptyProfileImage.png",
        covertureImagePath: user.covertureImagePath || "/emptyCoverture.png",
      },
      posts,
    };
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw new Error("Unable to fetch user data.");
  }
};
