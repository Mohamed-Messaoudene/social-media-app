import {
  Box,
  IconButton,
  Typography,
  useTheme,
  Button,
  Checkbox,
  FormControlLabel,
  Tooltip,
} from "@mui/material";
import  { useState } from "react";
import {
  FavoriteBorder,
  SmsOutlined,
  Share,
  Favorite,
  Clear,
} from "@mui/icons-material";
import Comments from "./Comments";
import UserAvatar from "../UserAvatar";
import { useAuth } from "../../context/AuthContext";
import { usePosts } from "../../context/PostsContext";
import PropTypes from "prop-types";
import { useSnackBar } from "../../context/SnackBarContext";
import { deletePost } from "../../api/deletePost";
import { handlePostLike } from "../../api/handlePostLike";
import { fetchComments } from "../../api/comments";
import { useNavigate } from "react-router";

function Post({ post }) {
  const [hidden, setHidden] = useState(true);
  const [postComments, setPostComments] = useState([]);
  const navigate = useNavigate();
  const theme = useTheme();
  const { updatePost,removePost } = usePosts();
  const { user } = useAuth();
  const { setSnackBarParams } = useSnackBar();
  const isMe = user.id === post.User.id;

  // Delete post handler
  const handleDeletePost = async () => {
    await deletePost(post.id, isMe, removePost, setSnackBarParams);
  };
  const handleLikeClick = async() => {
    await handlePostLike(post.User.id,post.id,updatePost);
  };

  const showCommentSection = async () => {
    await fetchComments(post.id,setPostComments,setSnackBarParams);
    setHidden((prev) => !prev);
  };
  const navigateProfilePage = () => {
    console.log("Navigating to profile page:", post.User.id); // Debug log
    navigate(`/profile/${post.User.id}`);
  };

  return (
    <Box
      width="100%"
      sx={{
        backgroundColor: theme.palette.background.paper,
        borderRadius: "8px",
        padding: "6px 20px",
        margin: "25px 0px",
        boxShadow: "2px 8px 19px -5px rgba(159,162,175,0.5)",
      }}
    >
      <Box
        height="50px"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <UserAvatar
          imgUrl={post.User.profileImagePath}
          username={post.User.username}
          extraInfo={post.timePassed}
          handleClick={navigateProfilePage}
        />
        <Tooltip title="delete" placement="bottom">
          <IconButton aria-label="show more" onClick={handleDeletePost}>
            <Clear />
          </IconButton>
        </Tooltip>
      </Box>
      <Box>
        <Typography
          variant="body1"
          color={theme.palette.primary.text}
          padding="10px 0px 10px 10px"
        >
          {post.postText}
        </Typography>
        {post.postImagePath && (
          <img
            src={post.postImagePath}
            alt="post photo"
            width="98%"
            style={{ marginBlock: "5px" }}
          />
        )}
      </Box>
      <Box display="flex" alignItems="center">
        <FormControlLabel
          sx={{ color: theme.palette.primary.text }}
          control={
            <Checkbox
              icon={<FavoriteBorder />}
              checkedIcon={<Favorite sx={{ color: "red" }} />}
              checked={post.liked}
              onChange={handleLikeClick}
            />
          }
          label={`${post.numberOfLikes} likes`}
        />
        <Button
          variant="text"
          startIcon={<SmsOutlined />}
          sx={{ textTransform: "none", color: theme.palette.primary.text }}
          onClick={showCommentSection}
        >
          comments
        </Button>
        <Button
          variant="text"
          startIcon={<Share />}
          sx={{ textTransform: "none", color: theme.palette.primary.text }}
        >
          share
        </Button>
      </Box>
      <Box display={hidden ? "none" : "block"}>
        <Comments postId={post.id} postComments={postComments}  setPostComments={setPostComments}/>
      </Box>
    </Box>
  );
}

// Prop Types Validation
Post.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.number.isRequired,
    postText: PropTypes.string.isRequired,
    postImagePath: PropTypes.string,
    numberOfLikes: PropTypes.number.isRequired,
    User: PropTypes.shape({
      id: PropTypes.number.isRequired,
      profileImagePath: PropTypes.string.isRequired,
      username: PropTypes.string.isRequired,
    }).isRequired,
    timePassed: PropTypes.string.isRequired,
    liked: PropTypes.bool.isRequired,
  }).isRequired,
};

export default Post;