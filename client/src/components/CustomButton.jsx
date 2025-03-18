import { Box, Button } from "@mui/material";

function CustomButton({content,bgcolor,handleClick}) {
  return (
    <Box
      component="button"
      onClick={handleClick}
      sx={{
        padding: "4px 8px",
        marginRight: "8px",
        backgroundColor: bgcolor,
        color: "white",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
        fontSize: "11px",
        transition: "transform 0.3s ease-in-out",
        "&:hover": {
          transform: "scale(1.1)",
        },
      }}
    >
     {content}
    </Box>
  );
}

export default CustomButton;