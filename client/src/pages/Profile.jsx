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
import { useFollow } from "../context/FollowContext";

function Profile() {

  const theme = useTheme();
  const { userId } = useParams(); // Get userId from route
  const { user: loggedin_user} = useAuth(); // Get current logged-in user
  const { followUser, unfollowUser } = useFollow();
  const [profileUser, setProfileUser] = useState({});
  const [userPosts, setUserPosts] = useState([]);
  const [followed, setFollowed] = useState();
  const [loading, setLoading] = useState(true);
  const { setSnackBarParams } = useSnackBar();
  const isMe = loggedin_user.id == userId;
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const { user, posts } = await fetchUserData(userId,isMe,loggedin_user);
        setProfileUser(user);
        setUserPosts(posts);
        setFollowed(user.followed)
      } catch (err) {
        console.error(err);
        setSnackBarParams({
          message: err.message,
          open: true,
          color: "warning",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userId,loggedin_user]);

  const handleFollowClick = async () => {
    try {
      if (followed) {
        await unfollowUser(userId);
        setProfileUser((prev) => ({ ...prev, followersCount: prev.followersCount - 1 }));
      } else {
        await followUser(userId);
        setProfileUser((prev) => ({ ...prev, followersCount: prev.followersCount + 1 }));

      }
      setFollowed(prev=>!prev)
    } catch (error) {
      console.error("Error updating follow status:", error);
      setSnackBarParams({
        open: true,
        message: "An error occurred while updating follow status.",
        color: "error",
      });
    }
  };
  console.log(profileUser)

  if (loading) return <div>Loading...</div>;
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      minHeight="calc(100vh - 67px)"
      marginTop="66px"
      sx={{ backgroundColor: theme.palette.background.bgcolor }}
    >
      <Box width="80%">
        <img
          src={profileUser?.covertureImagePath}
          alt="profile coverture"
          style={{ width: "100%", height: "auto", aspectRatio: "3 / 1" }}
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
              <Place sx={{ marginRight: "8px", color: theme.palette.primary.text }} />
              <Typography variant="body1" fontSize="12px" color={theme.palette.primary.text}>
                {profileUser.location}
              </Typography>
            </Box>
            <Box display="flex" alignItems="center">
              <People sx={{ marginRight: "8px", color: theme.palette.primary.text }} />
              <Typography variant="body1" fontSize="12px" color={theme.palette.primary.text}>
                {profileUser.followersCount} followers
              </Typography>
            </Box>
            <Box display="flex" alignItems="center">
              <PersonAdd sx={{ marginRight: "8px", color: theme.palette.primary.text }} />
              <Typography variant="body1" fontSize="12px" color={theme.palette.primary.text}>
                {profileUser.followingCount} following
              </Typography>
            </Box>
          </Box>

          {isMe ? (
            <UpdateProfile setProfileUser={setProfileUser} />
          ) : (
            <Button size="small" variant="contained" onClick={handleFollowClick} sx={{ textTransform: "none" }}>
              {followed ? "Unfollow" : "Follow"}
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
