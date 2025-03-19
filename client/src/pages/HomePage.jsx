import { useEffect } from "react";
import { Box, useTheme } from "@mui/material";
import Stories from "../components/home/Stories";
import Share from "../components/home/Share";
import Posts from "../components/home/Posts";
import { fetchAllPosts } from "../api/getAllPosts";
import { useSnackBar } from "../context/SnackBarContext";
import {usePosts } from "../context/PostsContext";

function HomePage() {

  const theme = useTheme();
  const { setSnackBarParams } = useSnackBar();
  const { state,setPosts} = usePosts();
  const allPosts = state.allPosts;

  useEffect(() => {
    console.log("Fetching posts...");
    fetchAllPosts(setSnackBarParams,allPosts, setPosts);
  }, []);

  

  return (
    <Box
      minHeight="calc(100vh - 70px)"
      marginTop="65px"
      sx={{ p: "20px 40px", backgroundColor: theme.palette.background.bgcolor }}
    >
      <Stories />
      <Share />
      <Posts allPosts={allPosts}/>
    </Box>
  );
}

export default HomePage;
