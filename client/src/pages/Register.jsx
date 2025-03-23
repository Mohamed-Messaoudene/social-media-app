import {
  Box,
  Button,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { teal } from "@mui/material/colors";

import SideImage from "../components/auth/SideImage";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import handleRegisterSubmit from "../api/register";
import { useSnackBar } from "../context/SnackBarContext";
import ImageInput from "../components/ImageInput";

function Register() {
  const theme = useTheme();
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();
  const { setSnackBarParams } = useSnackBar();
  const navigate = useNavigate();

  return (
      <Box
        sx={{
          pt:"80px",
          width: "100vw",
          height:'100vh',
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor:theme.palette.background.bgcolor1,
        }}
      >
        <Box
          sx={{
            width: "70%",
            height: "100%",
            display: "flex",
            alignItems:'center'
          }}
        >
          <SideImage url="/20602853_6300958.svg" alt="sign up image" />
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="space-around"
            alignItems="center"
            color={theme.palette.primary.text}
            width="50%"
          >
            <Typography variant="h6" color="inherit" mt={2}>
              Create Account
            </Typography>
            <form
              encType="multipart/form-data"
              style={{ width: "100%" }}
              onSubmit={handleSubmit((data) =>
                handleRegisterSubmit(data, setSnackBarParams, navigate)
              )}
            >
              <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="space-around"
                width={"100%"}
              >
                <TextField
                  label="Name"
                  variant="standard"
                  {...register("username", {
                    required: "Username is required",
                  })}
                  sx={{
                    mb: "20px",
                    width: "70%",
                    "& .MuiInputBase-input": {
                      fontSize: "15px",
                    },
                  }}
                  error={!!errors.name}
                  helperText={errors.name?.message}
                />

                <TextField
                  label="Email"
                  variant="standard"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[^@]+@[^@]+\.[^@]+$/,
                      message: "Invalid email address",
                    },
                  })}
                  sx={{
                    mb: "20px",
                    width: "70%",
                    "& .MuiInputBase-input": {
                      fontSize: "15px",
                    },
                  }}
                  error={!!errors.email}
                  helperText={errors.email?.message}
                />

                <TextField
                  label="Password"
                  type="password"
                  variant="standard"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  })}
                  sx={{
                    mb: "20px",
                    width: "70%",
                    "& .MuiInputBase-input": {
                      fontSize: "15px",
                    },
                  }}
                  error={!!errors.password}
                  helperText={errors.password?.message}
                />

                <TextField
                  label="Phone Number"
                  variant="standard"
                  {...register("phoneNumber", {
                    required: "Phone Number is required",
                    pattern: {
                      value: /^[0-9]+$/,
                      message: "Phone Number must contain only digits",
                    },
                  })}
                  sx={{
                    mb: "20px",
                    width: "70%",
                    "& .MuiInputBase-input": {
                      fontSize: "15px",
                    },
                  }}
                  error={!!errors.phoneNumber}
                  helperText={errors.phoneNumber?.message}
                />

                <TextField
                  label="Location"
                  variant="standard"
                  {...register("location", {
                    required: "Location is required",
                  })}
                  sx={{
                    mb: "20px",
                    width: "70%",
                    "& .MuiInputBase-input": {
                      fontSize: "15px",
                    },
                  }}
                  error={!!errors.location}
                  helperText={errors.location?.message}
                />

                <Box
                  width="60%"
                  display="flex"
                  justifyContent="space-between"
                  marginBottom={"20px"}
                >
                  <Box display="flex" flexDirection="column" alignItems="center">
                    <Typography
                      variant="body1"
                      color={theme.palette.primary.text}
                      mb="10px"
                      fontSize="14px"
                    >
                      Profile Image
                    </Typography>
                    <ImageInput
                      name="profileImage"
                      setValue={setValue}
                    />
                  </Box>
                  <Box display="flex" flexDirection="column" alignItems="center">
                    <Typography
                      variant="body1"
                      color={theme.palette.primary.text}
                      mb="10px"
                      fontSize="14px"
                    >
                      Cover Image
                    </Typography>
                    <ImageInput
                      name="covertureImage"
                      setValue={setValue}
                    />
                  </Box>
                </Box>

                <Button
                  type="submit"
                  variant="outlined"
                  sx={{
                    fontWeight: "bold",
                    color: teal[400],
                    borderColor: teal[400],
                  }}
                  disabled={isSubmitting}
                >
                  Sign Up
                </Button>
              </Box>
            </form>

            <Typography variant="body1" color="inherit" marginBlock={"15px"}>
              Already Have Account?
              <Link to="/login" style={{ color: "orange" }}>
                Log In
              </Link>
            </Typography>
          </Box>
        </Box>
      </Box>
  );
}

export default Register;
