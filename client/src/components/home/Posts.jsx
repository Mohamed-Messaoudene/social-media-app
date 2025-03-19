import { Box, Typography } from "@mui/material";
import PropTypes from "prop-types";
import Post from "./Post";
import { SentimentDissatisfied } from "@mui/icons-material";

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
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            gap={2}
            sx={{ marginTop: 4 }}
        >
            <SentimentDissatisfied
                sx={{ fontSize: 60, color: "text.secondary" }}
            />
            <Typography
                variant="h6"
                color="textSecondary"
                align="center"
            >
                No posts available.
            </Typography>
            <Typography
                variant="body2"
                color="textSecondary"
                align="center"
            >
                write your first post !!!
            </Typography>
        </Box>
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