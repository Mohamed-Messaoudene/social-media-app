import { Box, Typography, useTheme } from "@mui/material";
import UserAvatar from "../UserAvatar";
import ScrollableBox from "../ScrollableBox";

function OnlineFriends() {
  const theme = useTheme();

  // Array of online friends for demonstration
  const onlineFriends = [
    { imgUrl: "story1.jpeg", username: "nader alibouctta" },
    { imgUrl: "story2.jpeg", username: "rodoin mess" },
    { imgUrl: "story3.jpeg", username: "abd elnour" },
    { imgUrl: "story4.jpeg", username: "toufik bentaher" },
    { imgUrl: "story5.jpeg", username: "thabti mohamed" },
    { imgUrl: "story6.jpeg", username: "berkane rachid" },
  ];

  return (
    <Box
      width="100%"
      padding="8px 12px 5px 12px"
      marginBlock="15px"
      borderRadius="8px"
      sx={{
        backgroundColor: theme.palette.background.paper,
        boxShadow: "2px 8px 19px -5px rgba(159,162,175,0.5)",
      }}
    >
      <Typography
        variant="body1"
        sx={{ color: theme.palette.primary.text, marginBottom: "6px" }}
      >
        Online friends
      </Typography>
      <ScrollableBox maxHeight="140px" scrollAmount={150} >
        {onlineFriends.map((friend, index) => (
          <Box key={index} sx={{ marginBlock: "15px" }}>
            <UserAvatar
              imgUrl={friend.imgUrl}
              username={friend.username}
              isOnline={true}
            />
          </Box>
        ))}
      </ScrollableBox>
    </Box>
  );
}

export default OnlineFriends;
