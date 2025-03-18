import { Box, Typography, useTheme } from "@mui/material";
import React from "react";
import UserAvatar from "../UserAvatar";
import ScrollableBox from "../ScrollableBox";

function LatestActs() {
  const theme = useTheme();

  // Array of latest activities
  const activities = [
    { imgUrl: "story6.jpeg", username: "nader aliboucetta", action: "like a comment", time: "6 min ago" },
    { imgUrl: "story5.jpeg", username: "sidali", action: "share a post", time: "8 min ago" },
    { imgUrl: "story2.jpeg", username: "farouk aouiche", action: "write a comment", time: "5 min ago" },
    { imgUrl: "story4.jpeg", username: "toufic bentaher", action: "like a post", time: "15 min ago" },
  ];

  return (
    <Box
      width="100%"
      padding="8px 12px 5px 12px"
      marginBlock="20px"
      borderRadius="8px"
      sx={{
        backgroundColor: theme.palette.background.paper,
        boxShadow: "2px 8px 19px -5px rgba(159,162,175,0.5)",
      }}
    >
      <Typography
        variant="body1"
        sx={{ color: theme.palette.primary.text, marginBottom: "20px" }}
      >
        Latest activities
      </Typography>
      <ScrollableBox maxHeight="180px" scrollAmount={150}>
      {activities.map((activity, index) => (
        <Box
          key={index}
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          marginBottom="15px"
        >
          <Box display="flex" alignItems="center">
            <UserAvatar imgUrl={activity.imgUrl} username={activity.username} />
            <Typography
              variant="body2"
              sx={{
                color: theme.palette.primary.text,
                marginLeft: "5px",
                fontSize: "12px",
              }}
            >
              {activity.action}
            </Typography>
          </Box>
          <Typography
            variant="body2"
            sx={{
              color: theme.palette.primary.text,
              paddingRight: "6px",
              fontSize: "12px",
            }}
          >
            {activity.time}
          </Typography>
        </Box>
      ))}
       </ScrollableBox>
    </Box>
  );
}

export default LatestActs;