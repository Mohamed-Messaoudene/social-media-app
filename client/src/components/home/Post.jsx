/* eslint-disable react/prop-types */
import {
  Box,
  IconButton,
  Typography,
  useTheme,
  Button,
  Checkbox,
  FormControlLabel,
  Tooltip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { useState } from "react";
import {
  FavoriteBorder,
  SmsOutlined,
  Share,
  Favorite,
  Clear,
  DeleteOutlined,
} from "@mui/icons-material";
import { motion, AnimatePresence } from "framer-motion";
import Comments from "./Comments";
import UserAvatar from "../UserAvatar";
import { useAuth } from "../../context/AuthContext";
import { usePosts } from "../../context/PostsContext";
import { useSnackBar } from "../../context/SnackBarContext";
import { deletePost } from "../../api/deletePost";
import { handlePostLike } from "../../api/handlePostLike";
import { fetchComments } from "../../api/comments";
import { useNavigate } from "react-router";

function Post({ post }) {
  const [hidden, setHidden] = useState(true);
  const [postComments, setPostComments] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const navigate = useNavigate();
  const theme = useTheme();
  const { updatePost, removePost } = usePosts();
  const { user } = useAuth();
  const { setSnackBarParams } = useSnackBar();
  const isMe = user.id === post.User.id;

  // Delete post handler
  const handleDeletePost = async () => {
    if (isMe) {
      setOpenDialog(true); // Show confirmation dialog if the post is mine
    } else {
      await deletePost(post.id, isMe, removePost, setSnackBarParams); // Delete immediately if not mine
    }
  };

  const confirmDelete = async () => {
    setOpenDialog(false); // Close dialog before making request
    await deletePost(post.id, isMe, removePost, setSnackBarParams);
  };

  const handleLikeClick = async () => {
    await handlePostLike(user.id, post.id, updatePost);
  };

  const showCommentSection = async () => {
    if (hidden) {
      await fetchComments(post.id, setPostComments, setSnackBarParams);
    }
    setHidden((prev) => !prev);
  };

  const navigateProfilePage = () => {
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

        <Tooltip title={isMe ? "delete post" : "hide post"} placement="bottom">
          <IconButton aria-label="delete post" onClick={handleDeletePost}>
            {isMe ? <DeleteOutlined /> : <Clear />}
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
      <AnimatePresence>
        {!hidden && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <Comments
              postId={post.id}
              postComments={postComments}
              setPostComments={setPostComments}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        aria-labelledby="delete-dialog-title"
        aria-describedby="delete-dialog-description"
      >
        <DialogTitle id="delete-dialog-title">Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText id="delete-dialog-description">
            Are you sure you want to delete this post?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="primary" sx={{ textTransform: "none" }}>
            Cancel
          </Button>
          <Button onClick={confirmDelete} color="error" sx={{ textTransform: "none" }} autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default Post;
