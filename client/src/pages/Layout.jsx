import { Box, useTheme } from "@mui/material";
import Navbar from "../components/navbar/Navbar";

function Layout({children}) {
  const theme = useTheme();
  return (
    <Box sx={{backgroundColor:theme.palette.background.bgcolor}}>
      <Navbar />
      {children}
    </Box>
  );
}

export default Layout;
