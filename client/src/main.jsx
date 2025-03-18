import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import { ThemeProvider } from "./context/ThemeContext";
import { SnackBarProvider } from "./context/SnackBarContext.jsx";
import { PostsProvider } from "./context/PostsContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <ThemeProvider>
        <SnackBarProvider>
        <PostsProvider>
        <App />
        </PostsProvider>
        </SnackBarProvider>
      </ThemeProvider>
    </AuthProvider>
  </StrictMode>
);
