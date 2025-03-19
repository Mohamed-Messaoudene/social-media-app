import  { createContext, useContext, useEffect, useState } from "react";
import { makeRequest } from "../axios";

// Create the AuthContext
const AuthContext = createContext({
  user: null,
  login: () => {},
  logout: () => {},
  loading: true,
  checkAuthStatus: () => Promise.resolve(),
});

// Hook for consuming AuthContext
export const useAuth = () => useContext(AuthContext);

// AuthProvider Component
// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Function to log in the user
  const login = (userData) => {
    setUser(userData);
  };

  // Function to log out the user
  const logout = async () => {
    setUser(null);
  };

  // Function to check authentication status
  const checkAuthStatus = async () => {
    setLoading(true);
    try {
      console.log('first')
      const response = await makeRequest.get("/auth/checkAuth");
      console.log("Response:", response);
  
      // Set default images if profileImagePath or covertureImagePath is null
      const updatedUser = {
        ...response.data.user,
        profileImagePath: response.data.user.profileImagePath || "/emptyProfileImage.png",
        covertureImagePath: response.data.user.covertureImagePath || "/emptyCovertureImage.png",
      };
  
      login(updatedUser);
    } catch (error) {
      console.error("Error checking auth status:", error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };
  
  
  // Run checkAuthStatus on app load
  useEffect(() => {
    checkAuthStatus();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        loading,
        checkAuthStatus,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
