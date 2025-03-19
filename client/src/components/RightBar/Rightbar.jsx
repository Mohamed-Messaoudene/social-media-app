import { Box } from "@mui/material";
import Suggesstions from "./Suggesstions";
import Followings from "./Followings";
import Followers from "./Followers";

function Rightbar() {

  return (
    <Box
      position="fixed"
      top="65px"
      width="25%"
      height="100%"
      padding="20px 15px 30px 0px"
    >
      <Suggesstions />
      <Followings/>
      <Followers/>
    </Box>
  );
}

export default Rightbar;
