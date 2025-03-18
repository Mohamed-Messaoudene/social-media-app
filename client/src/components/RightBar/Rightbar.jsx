import { Box } from "@mui/material";
import Suggesstions from "./Suggesstions";
import LatestActs from "./LatestActs";
import OnlineFriends from "./OnlineFriends";

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
      <LatestActs />
      <OnlineFriends />
    </Box>
  );
}

export default Rightbar;
