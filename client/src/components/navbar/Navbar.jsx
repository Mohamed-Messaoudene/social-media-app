import { Box, Typography, useTheme, Button } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import SearchBar from "./SearchBar";
import { MailOutline, Bedtime, NotificationsNone, LightMode, Logout, Login, PersonAdd } from "@mui/icons-material";
import UserAvatar from "../UserAvatar";
import { grey } from "@mui/material/colors";
import { useCustomTheme } from "../../context/ThemeContext";
import handleLogout from "../../api/logout.js";
import { useAuth } from "../../context/AuthContext.jsx";
import { Link, useNavigate } from "react-router-dom";
import { useSnackBar } from "../../context/SnackBarContext.jsx";

function Navbar({ children }) {
  const theme = useTheme();
  const { mode, toggleTheme } = useCustomTheme();
  const { user, logout } = useAuth();
  const isAuthenticated = user ? true : false;
  const navigate = useNavigate();
  const { setSnackBarParams } = useSnackBar();

  const navigateProfilePage = () => {
    console.log("i will send show profile");
    navigate(`/profile/${user.id}`);
  };

  return (
    <Box
      position="fixed"
      top="0px"
      left="0px"
      zIndex="10"
      height="65px"
      width="100%"
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      paddingInline="15px"
      borderBottom="1px solid"
      borderColor={grey[300]}
      sx={{ backgroundColor: theme.palette.background.paper }}
    >
      <Box width="45%" display="flex" justifyContent="space-around" alignItems="center">
        <Link to={"/home"} style={{ textDecoration: "none" }}>
          <Typography variant="body1" fontWeight="bold" color={theme.palette.primary.text}>
            Social Media
          </Typography>
        </Link>
        <IconButton aria-label="dark mode" onClick={toggleTheme}>
          {mode == "light" ? <Bedtime /> : <LightMode />}
        </IconButton>
        <SearchBar />
      </Box>
      <Box width="350px" display="flex" justifyContent="space-between" alignItems="center">
        {isAuthenticated ? (
          <>
            <IconButton aria-label="messages">
              <MailOutline />
            </IconButton>
            <IconButton aria-label="notifications">
              <NotificationsNone />
            </IconButton>
            <UserAvatar username={user.username} imgUrl={user.profileImagePath} handleClick={navigateProfilePage} />
            <IconButton aria-label="logout" onClick={() => handleLogout(logout, setSnackBarParams)}>
              <Logout />
            </IconButton>
          </>
        ) : (
          <>
          <Link to={'/login'}>
            <Button
              variant="text"
              color="primary"
              sx={{ textTransform: "none", fontSize: "0.8rem", fontWeight: "bold", padding: "6px 16px" }}
              startIcon={<Login fontSize="small" />}
            >
              Login
            </Button>
            </Link>
            <Link to={'/register'}>
            <Button
              variant="text"
              color="secondary"
              sx={{ textTransform: "none", fontSize: "0.8rem", fontWeight: "bold", padding: "6px 16px", borderWidth: 2 }}
              startIcon={<PersonAdd fontSize="small" />}
            >
              Register
            </Button>
            </Link>
          </>
        )}
      </Box>
    </Box>
  );
}

export default Navbar;
