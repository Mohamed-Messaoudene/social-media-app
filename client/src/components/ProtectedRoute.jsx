import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Navbar from "./navbar/Navbar";
import Leftbar from "./Leftbar";
import Rightbar from "./RightBar/Rightbar";
import { Grid2 as Grid } from "@mui/material";

function ProtectedRoute() {
  const { user } = useAuth(); // get the authentication status
  const isAuthenticated = !!user;

  return isAuthenticated ? (
    <Grid container  width="100%"  >
      <Grid item size={2} >
        <Leftbar />
      </Grid>
      <Grid item size={7}>
        <Outlet />
      </Grid>
      <Grid item size={3}>
        <Rightbar />
      </Grid>
    </Grid>
  ) : (
    <Navigate to="/login" replace />
  );
}

export default ProtectedRoute;
