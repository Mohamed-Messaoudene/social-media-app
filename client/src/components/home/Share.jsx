import {
  Box,
  Divider,
  Button,
  TextField,
  useTheme,
  Avatar,
} from "@mui/material";
import  { useState } from "react";
import {
  AddPhotoAlternate as AddPhoto,
  Diversity3,
  Send,
} from "@mui/icons-material";
import LoadingButton from "@mui/lab/LoadingButton";
import { useAuth } from "../../context/AuthContext";
import { useForm } from "react-hook-form";
import { handleAddPost } from "../../api/addPost";
import { usePosts } from "../../context/PostsContext";

function Share() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(""); // For error handling

  const theme = useTheme();
  const { user } = useAuth();
  const userId = user.id;
  const inputLabel = `Hi ${user.username}, what is on your mind?`;

  const {
    setValue,
    watch,
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm();
  const { addPost } = usePosts();

  const postTextValue = watch("postText", ""); // Default to an empty string

  const handlePostClick = handleSubmit(async (data) => {
    // Validate that either text or an image is provided
    if (!postTextValue.trim() && !selectedImage) {
      setErrorMessage("Please write something or add an image."); // Set error message
      return; // Stop submission if validation fails
    }

    try {
      await handleAddPost(userId, data, null, addPost); // No snackbar, handle errors here
      reset();
      setSelectedImage(null);
      setErrorMessage(""); // Clear error message on successful post
    } catch (error) {
      console.error("Error adding post:", error);
    }
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (selectedImage) URL.revokeObjectURL(selectedImage); // Clean up previous URL
      setSelectedImage(URL.createObjectURL(file)); // Generate preview URL
      setValue("postImage", file); // Set the file in the form state
      setErrorMessage(""); // Clear error message when an image is selected
    }
  };

  return (
    <Box
      width="100%"
      minHeight="150px"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="space-between"
      sx={{
        backgroundColor: theme.palette.background.paper,
        borderRadius: "8px",
        padding: "6px 20px",
        margin: "25px 0px 10px 0px",
        boxShadow: "2px 8px 19px -5px rgba(159,162,175,0.5)",
      }}
    >
      <Box width="100%" display="flex" alignItems="center" marginBottom="15px">
        <Avatar
          src={user.profileImagePath}
          alt="Story Image"
          sx={{
            width: 30,
            height: 30,
            margin: "10px 15px 0 0",
          }}
        />
        <TextField
          fullWidth
          multiline
          maxRows={6}
          label={inputLabel}
          value={postTextValue} // Bind to the `watch` value
          onChange={(e) => {
            setValue("postText", e.target.value); // Update form state on change
            setErrorMessage(""); // Clear error when user types
          }}
          variant="standard"
          error={!!errorMessage} // Display error styling if errorMessage exists
          helperText={errorMessage} // Display error message
          sx={{
            "& .MuiInput-underline:before": { borderBottom: "none" },
            "& .MuiInput-underline:after": { borderBottom: "none" },
            "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
              borderBottom: "none",
            },
          }}
        />
      </Box>
      <Divider sx={{ width: "100%", marginBottom: "10px" }} />
      {selectedImage && (
        <img
          src={selectedImage}
          alt="post photo"
          width="98%"
          style={{ marginBlock: "15px" }}
        />
      )}
      <Box
        width="100%"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Box width="40%" display="flex" alignItems="center">
          <Button
            variant="text"
            component="label"
            startIcon={<AddPhoto sx={{ color: "orange " }} />}
            sx={{
              fontSize: "12px",
              textTransform: "none",
              color: theme.palette.primary.text,
              marginRight: "8px",
            }}
          >
            Add image
            <input
              type="file"
              accept="image/*" // Restrict to image files only
              onChange={handleImageChange}
              hidden // Hide the default file input
            />
          </Button>

          <Button
            variant="text"
            startIcon={<Diversity3 sx={{ color: "blue " }} />}
            sx={{
              fontSize: "12px",
              textTransform: "none",
              color: theme.palette.primary.text,
            }}
          >
            Tag friends
          </Button>
        </Box>

        <LoadingButton
          type="submit"
          size="small"
          onClick={handlePostClick}
          endIcon={<Send />}
          loading={isSubmitting}
          loadingPosition="end"
          variant="contained"
          sx={{ textTransform: "none", color: "white" }}
        >
          Post
        </LoadingButton>
      </Box>
    </Box>
  );
}

export default Share;
