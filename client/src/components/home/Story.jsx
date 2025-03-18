import { Box, Typography, useTheme } from "@mui/material";
import React from "react";

function Story({ imgUrl, username }) {
  const theme = useTheme();
  return (
    <Box
      sx={{
        aspectRatio: "2 / 3",
        width: "18%",
        borderRadius: "10px",
        backgroundImage: `url(${imgUrl})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        padding: "0px 0px 8px 8px",
        color:theme.palette.primary.contrast,
        cursor:"pointer",
        transition: "transform 0.3s ease-in-out", 
        "&:hover": {
          transform: "scale(1.05)", 
          color:"white"
        },
      }}
    >
      <Typography
        variant="body2"
        fontWeight="bold"
        fontSize="12px"
        color="inherit"
      >
        {username}
      </Typography>
    </Box>
  );
}

export default Story;
