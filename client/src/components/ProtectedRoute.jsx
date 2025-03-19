import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Grid } from "@mui/material";
import Leftbar from "./Leftbar";
import Rightbar from "./RightBar/Rightbar";

function ProtectedRoute() {
  const { user, loading } = useAuth();
  const location = useLocation(); // Get current URL path

  // Wait for auth check to complete before rendering anything
  if (loading) {
    return null; // Or add a loading spinner here
  }

  return user ? (
    <Grid container width="100%">
      <Grid item xs={2}>
        <Leftbar />
      </Grid>
      <Grid item xs={7}>
        <Outlet />
      </Grid>
      <Grid item xs={3}>
        <Rightbar />
      </Grid>
    </Grid>
  ) : (
    <Navigate to="/login" replace state={{ from: location.pathname }} />
  );
}

export default ProtectedRoute;
