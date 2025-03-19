/* eslint-disable react/prop-types */
import { Box, Typography, useTheme } from "@mui/material";
import UserAvatar from "../UserAvatar";
import ScrollableBox from "../ScrollableBox";
import { PersonAddAlt1 as PersonAddAlt1Icon } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useFollow } from "../../context/FollowContext";

function Followers() {
  const theme = useTheme();
  const { state } = useFollow();

  return (
    <Box
      width="100%"
      padding="12px"
      marginBlock={"20px"}
      borderRadius="8px"
      sx={{
        backgroundColor: theme.palette.background.paper,
        boxShadow: "2px 8px 19px -5px rgba(159,162,175,0.5)",
      }}
    >
      <Typography
        variant="body1"
        sx={{
          color: theme.palette.primary.text,
          marginBottom: "20px",
          fontWeight: "bold",
        }}
      >
        Followers{" "}
      </Typography>

      {state?.followers?.length > 0 ? (
        <ScrollableBox maxHeight="150px" scrollAmount={150}>
          {state.followers.map((friend, index) => (
            <Box
              key={index}
              height="40px"
              display="flex"
              alignItems="center"
              marginBottom="8px"
            >
              <Link
                to={`/profile/${friend.id}`}
                style={{ textDecoration: "none" }}
              >
                <UserAvatar
                  imgUrl={friend.profileImagePath}
                  username={friend.username}
                />
              </Link>
            </Box>
          ))}
        </ScrollableBox>
      ) : (
        // No followers UI
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          textAlign="center"
          padding="20px"
        >
          <PersonAddAlt1Icon
            sx={{
              fontSize: 50,
              color: theme.palette.primary.main,
              marginBottom: "10px",
            }}
          />
          <Typography
            variant="body2"
            sx={{ color: theme.palette.text.secondary, fontWeight: "bold" }}
          >
            You have no followers yet!
          </Typography>
          <Typography
            variant="caption"
            sx={{ color: theme.palette.text.disabled, marginBottom: "15px" }}
          >
            Start connecting with people now.
          </Typography>
        </Box>
      )}
    </Box>
  );
}

export default Followers;
