import {
  Box,
  TextField,
  Button,
  Typography,
  Divider,
  Tooltip,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { blueGrey } from "@mui/material/colors";
import {
  Login as LoginIcon,
  Google,
  Facebook,
  GitHub,
} from "@mui/icons-material";
import SignWithButton from "../components/auth/SignWithButton";
import SideImage from "../components/auth/SideImage";
import { Link, useLocation, useNavigate } from "react-router-dom";
import handleLoginSubmit from "../api/login";
import { useForm } from "react-hook-form";
import { useSnackBar } from "../context/SnackBarContext";
import { useAuth } from "../context/AuthContext";

function Login() {
  const theme = useTheme(); // Access the theme
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();
  const { setSnackBarParams } = useSnackBar();

  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const handleGoogleSignIn = () => {
    console.log("i will send the google auth requaest");
    window.open("http://localhost:5000/api/signWithGoogle", "_self");
  };
  const handleFacebookSignIn = () => {
    console.log("i will send the facebook auth requaest");
    window.open("http://localhost:5000/api/signWithFacebook", "_self");
  };
  const handleGithubSignIn = () => {
    console.log("i will send the github auth requaest");
    window.open("http://localhost:5000/api/signWithGithub", "_self");
  };

  return (
      <Box
        sx={{
          pt:'60px',
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
            height: "80%",
            backgroundColor: "white",
            display: "flex",
          }}
        >
          <SideImage url="/login-affiliate.webp" alt="log in image" />
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="space-around"
            alignItems="center"
            color={blueGrey[500]}
            width="50%"
          >
            <Typography variant="h6" color="inherit" mt={2}>
              Members Log In
            </Typography>
            <form
              style={{ width: "100%" }}
              onSubmit={handleSubmit((data) =>
                handleLoginSubmit(
                  data,
                  login,
                  setSnackBarParams,
                  navigate,
                  location
                )
              )}
            >
              <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="space-around"
                width={"100%"}
              >
                <Tooltip
                  title={errors.email ? errors.email.message : ""}
                  placement="bottom-start"
                  open={Boolean(errors.email)}
                  arrow
                >
                  <TextField
                    label="Email"
                    variant="standard"
                    name="email"
                    sx={{
                      mb: "20px",
                      width: "70%",
                      "& .MuiInputBase-input": {
                        fontSize: "15px",
                      },
                    }}
                    {...register("email", {
                      required: "Email is required !",
                      pattern: {
                        value:
                          /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                        message: "Invalid email address !",
                      },
                    })}
                  />
                </Tooltip>
                <Tooltip
                  title={errors.password ? errors.password.message : ""}
                  placement="bottom-start"
                  open={Boolean(errors.password)}
                  arrow
                >
                  <TextField
                    label="Password"
                    type="password"
                    variant="standard"
                    name="password"
                    sx={{
                      mb: "20px",
                      width: "70%",
                      "& .MuiInputBase-input": {
                        fontSize: "15px",
                      },
                    }}
                    {...register("password", {
                      required: "please enter a safe password !",
                      minLength: {
                        value: 6,
                        message:
                          "Password must be at least 6 characters long !",
                      },
                    })}
                  />
                </Tooltip>
                <Button
                  type="submit"
                  variant="outlined"
                  startIcon={<LoginIcon />}
                  sx={{
                    fontWeight: "bold",
                    color: theme.palette.primary.teal,
                    borderColor: theme.palette.primary.teal,
                  }}
                  disabled={isSubmitting}
                >
                  Sign in
                </Button>
              </Box>
            </form>

            <Divider sx={{ width: "70%" }}>Or</Divider>
            <SignWithButton
              Icon={Google}
              content={" Sign in with Google"}
              color={"orange"}
              handleOnClick={handleGoogleSignIn}
            />
            <SignWithButton
              Icon={Facebook}
              content={" Sign in with Facebook"}
              color={"blue"}
              handleOnClick={handleFacebookSignIn}
            />
            <SignWithButton
              Icon={GitHub}
              content={" Sign in with Github"}
              color={"black"}
              handleOnClick={handleGithubSignIn}
            />

            <Typography variant="body1" color="inherit">
              New here?{""}
              <Link to="/register" style={{ color: "orange" }}>
                Sign Up
              </Link>
            </Typography>
          </Box>
        </Box>
      </Box>
  );
}

export default Login;
