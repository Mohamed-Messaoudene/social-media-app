import { Send } from "@mui/icons-material";
import LoadingButton from "@mui/lab/LoadingButton";
import {
  Avatar,
  Box,
  InputBase,
  Typography,
  useTheme,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableContainer,
} from "@mui/material";
import { useState } from "react";
import UserAvatar from "../UserAvatar";
import { grey } from "@mui/material/colors";
import PropTypes from "prop-types";
import { useSnackBar } from "../../context/SnackBarContext";
import { useAuth } from "../../context/AuthContext";
import { addComment } from "../../api/comments";
import { useNavigate } from "react-router";

function Comments({ postId, postComments, setPostComments }) {
  const theme = useTheme();
  const { user } = useAuth();
  const userId = user.id;
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(false);
  const { setSnackBarParams } = useSnackBar();
  const navigate = useNavigate();

  const handleCommentPost = async () => {
    await addComment(
      newComment,
      postId,
      userId,
      setNewComment,
      setLoading,
      setPostComments,
      setSnackBarParams
    );
  };
  const navigateProfilePage = (userId) => {
    console.log("Navigating to profile page:", userId); // Debug log
    navigate(`/profile/${userId}`);
  };

  return (
    <>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        marginBlock="15px"
      >
        <Avatar
          src={user.profileImagePath}
          alt="Story Image"
          sx={{
            width: 30,
            height: 30,
          }}
        />
        <InputBase
          sx={{
            width: "80%",
            marginBlock: 1,
            pl: 1,
            border: "1px solid",
            borderColor: grey[300],
            color: theme.palette.primary.text,
            fontSize: "12px",
          }}
          value={newComment}
          onChange={(e) => {
            setNewComment(e.target.value);
          }}
          placeholder="Write a comment ..."
          inputProps={{ "aria-label": "write a comment" }}
        />
        <LoadingButton
          size="small"
          onClick={handleCommentPost}
          endIcon={<Send />}
          loading={loading}
          loadingPosition="end"
          variant="contained"
          sx={{ padding: "2px 3px", textTransform: "none", color: "white" }}
        >
          Send
        </LoadingButton>
      </Box>

      {postComments.length === 0 ? (
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          p={3}
          my={2}
          border="1px dashed"
          borderColor={grey[300]}
          borderRadius="8px"
          sx={{
            backgroundColor:theme.palette.background.bgcolor,
          }}
        >
          <Avatar
            sx={{
              bgcolor: theme.palette.primary.main,
              mb: 1,
              width: 40,
              height: 40,
            }}
          >
            <Send sx={{ color: "white", fontSize: 20 }} />
          </Avatar>
          <Typography
            variant="subtitle1"
            color="textPrimary"
            fontWeight="bold"
            textAlign="center"
          >
            No comments yet
          </Typography>
          <Typography
            variant="body2"
            color="textSecondary"
            textAlign="center"
            mt={0.5}
          >
            Be the first to share your thoughts!
          </Typography>
        </Box>
      ) : (
        <TableContainer>
          <Table>
            <TableBody>
              {postComments.map((comment, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <UserAvatar
                      imgUrl={comment.userInfo.profileImagePath} // Assuming the response includes profileImagePath
                      username={comment.userInfo.username}
                      handleClick={() => {
                        navigateProfilePage(comment.userInfo.userId);
                      }}
                      extraInfo={comment.commentText}
                    />
                  </TableCell>
                  <TableCell align="right">
                    <Typography
                      variant="body2"
                      sx={{
                        color: theme.palette.primary.text,
                        paddingRight: "6px",
                        fontSize: "12px",
                      }}
                    >
                      {comment.timePassed}
                      {/* Assuming timePassed is part of the comment data */}
                    </Typography>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  );
}
// Props validation using PropTypes
Comments.propTypes = {
  postId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  postComments: PropTypes.arrayOf(
    PropTypes.shape({
      userInfo: PropTypes.shape({
        userId: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
          .isRequired,
        username: PropTypes.string.isRequired,
        profileImagePath: PropTypes.string,
      }).isRequired,
      timePassed: PropTypes.string.isRequired,
      commentText: PropTypes.string.isRequired,
    })
  ).isRequired,
  setPostComments: PropTypes.func.isRequired,
};
export default Comments;
