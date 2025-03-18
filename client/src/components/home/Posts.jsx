import { Box, Typography } from "@mui/material";
import PropTypes from "prop-types";
import Post from "./Post";

function Posts({allPosts}) {
  return (
    <Box
      width="100%"
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      alignItems="center"
    >
      {allPosts.length > 0 ? (
        allPosts.map((post) => (
           <Post key={post.id} post={post}/>
        ))
      ) : (
        <Typography variant="body1" color="textSecondary">
          No posts available.
        </Typography>
      )}
    </Box>
  );
}
Posts.propTypes = {
  allPosts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      postText: PropTypes.string, // Optional, can be null
      postImagePath: PropTypes.string, // Optional, can be null
      createdAt: PropTypes.string.isRequired, // ISO date string
      updatedAt: PropTypes.string, // Optional ISO date string
      numberOfLikes: PropTypes.number.isRequired, // Defaults to 0
      timePassed: PropTypes.string, // Optional, formatted time string
      userId: PropTypes.number.isRequired,
      User: PropTypes.shape({
        id: PropTypes.number.isRequired,
        username: PropTypes.string.isRequired,
        profileImagePath: PropTypes.string, // Optional, can be null
      }).isRequired,
    })
  ).isRequired,
};
export default Posts;