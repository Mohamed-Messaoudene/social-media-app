import { Box, Typography, useTheme } from "@mui/material";
import React from "react";
import AddCircle from "@mui/icons-material/AddCircle";

function AddNewStory({ imgUrl }) {
  const theme = useTheme();
  return (
    <Box
      sx={{
        display:"flex",
        flexDirection:"column",
        justifyContent:"space-between",
        alignItems:"center",
        aspectRatio: "2 / 3",
        width: "18%",
        borderRadius: "10px",
        backgroundColor:theme.palette.background.paper,
        overflow:"hidden",
        cursor:"pointer",
        transition: "transform 0.3s ease-in-out", 
        "&:hover": {
          transform: "scale(1.05)", 
        },
      }}
    >
      <Box
        position="relative"
        sx={{
          height: "70%",
          width:"100%",
          backgroundImage: `url(${imgUrl})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <AddCircle
        fontSize="large"
          sx={{
            color:"blue",
            position: "absolute",
            bottom: "-18px",
            left: "50%",
            transform: "translateX(-50%)",
            border: "2px solid white",
            borderRadius:"50%",
            backgroundColor:"white",
          }}
        />
      </Box>
     
      <Typography
        variant="body2"
        fontWeight="bold"
        fontSize="12px"
        color={theme.palette.primary.text}
        paddingBottom="8px"
      >
        add a new story
      </Typography>
    </Box>
  );
}

export default AddNewStory;
