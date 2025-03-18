import { Box, Typography, useTheme } from "@mui/material";
import CircleIcon from "@mui/icons-material/Circle";
import { green } from "@mui/material/colors";
import PropTypes from "prop-types";

function UserAvatar({
  username,
  imgUrl,
  handleClick,
  isOnline = false,
  extraInfo,
}) {
  const theme = useTheme();
  
    return (
    <Box
      component={"button"}
      onClick={handleClick}
      sx={{
        all: "unset",
        display:"flex",
        alignItems:"center",
        cursor: "pointer",
        "&:hover": {
          ".avatar": {
            transform: "scale(1.05)",
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
            border: `2px solid ${theme.palette.primary.teal}`,
          },
          ".username": {
            color: theme.palette.primary.teal,
          },
        },
      }}
    >
      <Box
        className="avatar"
        sx={{
          width: "30px",
          height: "30px",
          borderRadius: "50%",
          marginRight: "10px",
          backgroundImage: `url(${imgUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          position: "relative",
          transition: "transform 0.4s linear",
        }}
      >
        {isOnline && (
          <CircleIcon
            sx={{
              position: "absolute",
              top: "-4px",
              right: "-1px",
              color: green[400],
              fontSize: "12px",
            }}
          />
        )}
      </Box>
      <Box display="flex" flexDirection="column" justifyContent="center">
        <Typography
          className="username"
          variant="subtitle1"
          fontSize="13px"
          fontWeight="bold"
          color={theme.palette.primary.text}
          sx={{ transition: "transform 0.4s linear" }}
        >
          {username}
        </Typography>
        {extraInfo && (
          <Typography
            variant="body1"
            fontSize="11px"
            color={theme.palette.primary.text}
          >
            {extraInfo}
          </Typography>
        )}
      </Box>
    </Box>
  );
}
UserAvatar.propTypes = {
  imgUrl: PropTypes.string,
  username: PropTypes.string.isRequired,
  extraInfo: PropTypes.string,
  handleClick: PropTypes.func,
  isOnline: PropTypes.bool,

};

export default UserAvatar;
