import React, { useState } from "react";
import {
  Backdrop,
  Box,
  Modal,
  Fade,
  Button,
  Typography,
  TextField,
  useTheme,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { Send } from "@mui/icons-material";
import CustomButton from "../CustomButton";
import ImageInput from "../ImageInput";
import { useAuth } from "../../context/AuthContext";
import { useForm } from "react-hook-form";
import { useSnackBar } from "../../context/SnackBarContext";
import handleUpdateProfile from "../../api/updateProfile";
import { useNavigate } from "react-router";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "45%",
  height: "70vh",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const UpdateProfile = () => {
  const [open, setOpen] = useState(false);
  const { user, login } = useAuth();
  const { id: userId, email, username, phoneNumber, location, profileImagePath, covertureImagePath } = user || {};
  const navigate = useNavigate();
  const { setSnackBarParams } = useSnackBar();
  const theme = useTheme();

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button
        variant="contained"
        onClick={handleOpen}
        sx={{ textTransform: "none" }}
      >
        Update Profile
      </Button>
      <Modal
        aria-labelledby="update-profile-modal"
        aria-describedby="update-profile-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{ backdrop: { timeout: 500 } }}
      >
        <Fade in={open}>
          <form
            encType="multipart/form-data"
            onSubmit={handleSubmit((data)=>{handleUpdateProfile(userId, data, setSnackBarParams, navigate, handleClose, login)})}
          >
            <Box sx={modalStyle}>
              <Box
                sx={{
                  height: "90%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                {/* Header Section */}
                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <Typography variant="h5" color={theme.palette.primary.text}>
                    Update Your Profile
                  </Typography>
                  <CustomButton content="Close" bgcolor="orange" handleClick={handleClose} />
                </Box>

                {/* Profile and Cover Image Section */}
                <Box display="flex" justifyContent="space-between" mb={2}>
                  <Box display="flex" flexDirection="column" alignItems="center">
                    <Typography variant="body2" color={theme.palette.primary.text} mb={1}>
                      Profile
                    </Typography>
                    <ImageInput name="profileImage" setValue={setValue} initialImagePath={profileImagePath} />
                  </Box>
                  <Box display="flex" flexDirection="column" alignItems="center">
                    <Typography variant="body2" color={theme.palette.primary.text} mb={1}>
                      Cover
                    </Typography>
                    <ImageInput name="covertureImage" setValue={setValue} initialImagePath={covertureImagePath} />
                  </Box>
                </Box>

                {/* Form Fields */}
                <TextField
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[^@]+@[^@]+\.[^@]+$/,
                      message: "Invalid email address",
                    },
                  })}
                  label="Email"
                  defaultValue={email}
                  variant="filled"
                  error={!!errors.email}
                  helperText={errors.email?.message}
                  fullWidth
                  sx={{ mb: 2 }}
                />
                <TextField
                  {...register("username", { required: "Username is required" })}
                  label="Username"
                  defaultValue={username}
                  variant="filled"
                  error={!!errors.username}
                  helperText={errors.username?.message}
                  fullWidth
                  sx={{ mb: 2 }}
                />
                <TextField
                  {...register("phoneNumber", {
                    required: "Phone Number is required",
                    pattern: {
                      value: /^[0-9]+$/,
                      message: "Phone Number must contain only digits",
                    },
                  })}
                  label="Phone Number"
                  defaultValue={phoneNumber}
                  variant="filled"
                  error={!!errors.phoneNumber}
                  helperText={errors.phoneNumber?.message}
                  fullWidth
                  sx={{ mb: 2 }}
                />
                <TextField
                  {...register("location", { required: "Location is required" })}
                  label="Country/City"
                  defaultValue={location}
                  variant="filled"
                  error={!!errors.location}
                  helperText={errors.location?.message}
                  fullWidth
                />
              </Box>

              {/* Submit Button */}
              <LoadingButton
                type="submit"
                size="small"
                endIcon={<Send />}
                loading={isSubmitting}
                loadingPosition="end"
                variant="contained"
                sx={{ textTransform: "none", color: "white", mt: 2 }}
              >
                {isSubmitting ? "Updating..." : "Update"}
              </LoadingButton>
            </Box>
          </form>
        </Fade>
      </Modal>
    </div>
  );
};

export default UpdateProfile;
