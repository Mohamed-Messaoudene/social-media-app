import {
  Box,
  Divider,
  Button,
  TextField,
  useTheme,
  Avatar,
  IconButton,
} from "@mui/material";
import { useState, useRef, useEffect } from "react";
import {
  AddPhotoAlternate as AddPhoto,
  Diversity3,
  Send,
} from "@mui/icons-material";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import LoadingButton from "@mui/lab/LoadingButton";
import { useAuth } from "../../context/AuthContext";
import { useForm } from "react-hook-form";
import { handleAddPost } from "../../api/addPost";
import { usePosts } from "../../context/PostsContext";
import EmojiPicker from "emoji-picker-react";
import { useSnackBar } from "../../context/SnackBarContext";

function Share() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(""); // For error handling
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const emojiPickerRef = useRef(null); // Reference for emoji picker
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
  const {setSnackBarParams} = useSnackBar();
  const postTextValue = watch("postText", ""); // Default to an empty string

  // Function to handle emoji selection
  const handleEmojiClick = (emojiObject) => {
    setValue("postText", postTextValue + emojiObject.emoji); // Append emoji
  };

  // Close the emoji picker when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        emojiPickerRef.current &&
        !emojiPickerRef.current.contains(event.target)
      ) {
        setShowEmojiPicker(false);
      }
    }

    if (showEmojiPicker) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showEmojiPicker]);

  const handlePostClick = handleSubmit(async (data) => {
    if (!postTextValue.trim() && !selectedImage) {
      setErrorMessage("Please write something or add an image.");
      return;
    }

    try {
      await handleAddPost(userId, data, setSnackBarParams, addPost);
      reset();
      setSelectedImage(null);
      setErrorMessage("");
    } catch (error) {
      console.error("Error adding post:", error);
    }
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (selectedImage) URL.revokeObjectURL(selectedImage);
      setSelectedImage(URL.createObjectURL(file));
      setValue("postImage", file);
      setErrorMessage("");
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
        position: "relative",
      }}
    >
      <Box width="100%" display="flex" alignItems="center" marginBottom="15px">
        <Avatar
          src={user.profileImagePath}
          alt="Story Image"
          sx={{ width: 30, height: 30, margin: "10px 15px 0 0" }}
        />
        <TextField
          fullWidth
          multiline
          maxRows={6}
          label={inputLabel}
          value={postTextValue}
          onChange={(e) => {
            setValue("postText", e.target.value);
            setErrorMessage("");
          }}
          variant="standard"
          error={!!errorMessage}
          helperText={errorMessage}
          sx={{
            "& .MuiInput-underline:before": { borderBottom: "none" },
            "& .MuiInput-underline:after": { borderBottom: "none" },
            "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
              borderBottom: "none",
            },
          }}
        />

        {/* Emoji Picker Button */}
        <IconButton onClick={() => setShowEmojiPicker(!showEmojiPicker)}>
          <InsertEmoticonIcon />
        </IconButton>

        {/* Emoji Picker - Closes when clicking outside */}
        {showEmojiPicker && (
          <Box
            ref={emojiPickerRef}
            position="absolute"
            zIndex={10}
            top="60px"
            left="50%"
            transform="translateX(-50%)"
          >
            <EmojiPicker onEmojiClick={handleEmojiClick} />
          </Box>
        )}
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
              accept="image/*"
              onChange={handleImageChange}
              hidden
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
