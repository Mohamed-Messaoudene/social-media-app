import { Box, Typography, useTheme } from "@mui/material";
import React from "react";
import UserAvatar from "../UserAvatar";
import CustomButton from "../CustomButton";
import ScrollableBox from "../ScrollableBox";

function Suggestions() {
  const theme = useTheme();

  // Array of suggestion data
  const suggestions = [
    { imgUrl: "/story5.jpeg", username: "berkane rachid" },
    { imgUrl: "/story3.jpeg", username: "sidali boss" },
  ];

  return (
    <Box
      width="100%"
      padding="8px 12px 5px 12px"
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
        Suggestions for you
      </Typography>
     <ScrollableBox maxHeight="100px" scrollAmount={150}>
      {suggestions.map((suggestion, index) => (
        <Box
          key={index}
          height="40px"
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          marginBottom="8px"
        >
          <UserAvatar imgUrl={suggestion.imgUrl} username={suggestion.username} />
          <Box>
            <CustomButton content="follow" bgcolor="blue" />
            <CustomButton content="dismiss" bgcolor="red" />
          </Box>
        </Box>
      ))}
      </ScrollableBox>
    </Box>
  );
}

export default Suggestions;