import {
  Email,
  GitHub,
  Instagram,
  LinkedIn,
  People,
  PersonAdd,
  Place,
} from "@mui/icons-material";
import {
  Avatar,
  Box,
  useTheme,
  Typography,
  IconButton,
  Button,
} from "@mui/material";
import { useEffect, useState } from "react";
import UpdateProfile from "../components/modal/UpdateProfile";
import Posts from "../components/home/Posts";
import { useAuth } from "../context/AuthContext";
import { useParams } from "react-router";
import { fetchUserData } from "../api/getUserData";
import { useSnackBar } from "../context/SnackBarContext";
import { makeRequest } from "../axios";

function Profile() {
  const theme = useTheme();
  const { userId } = useParams(); // Get userId from route
  const { user: loggedin_user } = useAuth(); // Get current logged-in user
  const [profileUser, setProfileUser] = useState({});
  const [followed, setFollowed] = useState();
  const [userPosts, setUserPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { setSnackBarParams } = useSnackBar();

  const isMe = loggedin_user.id == userId;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const { user, posts } = await fetchUserData(
          userId,
          isMe,
          loggedin_user
        );
        setProfileUser(user);
        setUserPosts(posts);
        setFollowed(user.followed)
      } catch (err) {
        console.error(err);
        setSnackBarParams({
          message: err.message,
          open: true,
          color: "error",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleFollowClick = async () => {
    const followerId = loggedin_user.id;
    const followingId = userId;
    try {
      // Attempt to make the follow request
      await makeRequest.post("/users/follow", { followerId, followingId });
      // Toggle the follow state (UI update)
      setFollowed((prev) => !prev);
    } catch (error) {
      // Log the error for debugging
      console.log(error);
      // Show an error message in the Snackbar
      setSnackBarParams({
        open: true,
        message: "An error occurred while trying to follow the user. Please try again.",
        color: 'error', 
      });
    }
  };
  
  console.log("this is profileuser : ", profileUser);

  if (loading) return <div>Loading...</div>;
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      minHeight="calc(100vh - 67px)"
      marginTop="66px"
      sx={{
        backgroundColor: theme.palette.background.bgcolor,
      }}
    >
      <Box width="80%">
        <img
          src={profileUser?.covertureImagePath}
          alt="profile coverture"
          style={{
            width: "100%",
            height: "auto",
            aspectRatio: "3 / 1",
          }}
        />
      </Box>

      <Box width="80%" marginBlock="15px">
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          sx={{
            position: "relative",
            backgroundColor: theme.palette.background.paper,
            border: "1px solid",
            borderRadius: "8px",
            borderColor: "blue",
            boxShadow: "2px 8px 19px -5px rgba(159,162,175,0.5)",
          }}
        >
          <Avatar
            src={profileUser?.profileImagePath}
            sx={{
              width: "20%",
              height: "auto",
              aspectRatio: "1 / 1",
              position: "absolute",
              top: "-35%",
              left: "50%",
              transform: "translateX(-50%)",
              border: "2px solid blue",
            }}
          />
          <Typography
            variant="h5"
            color={theme.palette.primary.text}
            marginBlock="15px"
            marginTop="80px"
          >
            {profileUser.username}
          </Typography>
          <Box
            width={"50%"}
            display="flex"
            alignItems="center"
            justifyContent={"space-between"}
            marginBottom="15px"
          >
            <Box display="flex" alignItems="center">
              <Place
                sx={{ marginRight: "8px", color: theme.palette.primary.text }}
              />
              <Typography
                variant="body1"
                fontSize="12px"
                color={theme.palette.primary.text}
              >
                {profileUser.location}
              </Typography>
            </Box>
            <Box display="flex" alignItems="center">
              <People
                sx={{ marginRight: "8px", color: theme.palette.primary.text }}
              />
              <Typography
                variant="body1"
                fontSize="12px"
                color={theme.palette.primary.text}
              >
                {profileUser.followersCount} followers
              </Typography>
            </Box>
            <Box display="flex" alignItems="center">
              <PersonAdd
                sx={{ marginRight: "8px", color: theme.palette.primary.text }}
              />
              <Typography
                variant="body1"
                fontSize="12px"
                color={theme.palette.primary.text}
              >
                {profileUser.followingCount} following
              </Typography>
            </Box>
          </Box>

          {isMe ? (
            <UpdateProfile />
          ) : (
            <Button
              size="small"
              variant="contained"
              onClick={handleFollowClick}
              sx={{ textTransform: "none" }}
            >
              {followed ? "unfollow" : "Follow"}
            </Button>
          )}
          <Box display="flex" alignItems="center" marginBlock="15px">
            <IconButton component="a" href="#" target="_blank" color="primary">
              <Instagram />
            </IconButton>
            <IconButton component="a" href="#" target="_blank" color="primary">
              <LinkedIn />
            </IconButton>
            <IconButton component="a" href="#" target="_blank" color="primary">
              <GitHub />
            </IconButton>
            <IconButton component="a" href="#" target="_blank" color="primary">
              <Email />
            </IconButton>
          </Box>
        </Box>
        <Posts allPosts={userPosts} />
      </Box>
    </Box>
  );
}

export default Profile;
