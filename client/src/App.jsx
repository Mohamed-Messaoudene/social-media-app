import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/HomePage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import { useAuth } from "./context/AuthContext";
import "../index.css";
import { Alert, Snackbar } from "@mui/material";
import { useSnackBar } from "./context/SnackBarContext";
import Layout from "./pages/Layout";

function App() {
  const { user } = useAuth();
  const { snackBarParams, setSnackBarParams } = useSnackBar();

  const handleSnackBarClose = () => {
    setSnackBarParams((prev) => ({ ...prev, open: false }));
  };

  const isAuthenticated = !!user;
  console.log(isAuthenticated)

  return (
    <Router>
      <Layout> {/* Navbar is now inside Layout */}
        <Routes>
          {/* Public Routes */}
          <Route
            path="/login"
            element={isAuthenticated ? <Navigate to="/home" replace /> : <Login />}
          />
          <Route
            path="/register"
            element={isAuthenticated ? <Navigate to="/home" replace /> : <Register />}
          />

          {/* Protected Routes */}
          <Route path="/" element={<ProtectedRoute />}>
            <Route index element={<Home />} />
            <Route path="home" element={<Home />} />
            <Route path="profile/:userId" element={<Profile />} />
          </Route>

          {/* Default Redirect for Unknown Routes */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>

        {/* Snackbar Notifications */}
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={snackBarParams.open}
          onClose={handleSnackBarClose}
          autoHideDuration={5000}
        >
          <Alert
            onClose={handleSnackBarClose}
            severity={snackBarParams.color}
            variant="filled"
            sx={{ width: "100%" }}
          >
            {snackBarParams.message}
          </Alert>
        </Snackbar>
      </Layout>
    </Router>
  );
}

export default App;