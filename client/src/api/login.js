import { makeRequest } from "../axios";

const handleLoginSubmit = async (data,login, setSnackBarParams, navigate,location) => {
  try {
    console.log("i will send a request login")
    const response = await makeRequest.post(
      `/auth/login`,
       data
    );
    if (response.status === 200) {
      // Redirect to another page or handle login success
      setSnackBarParams({
        message: "You have login successful",
        open: true,
        color: "success",
      });
      console.log(response.data.user)
     
      login(response.data.user);
      navigate(location.state?.from || "/home", { replace: true });
    }
  } catch (error) {
    console.log(error)
    if (error.response) {
      const { status, data } = error.response;
      if (status === 401) {
        // Invalid credentials
        setSnackBarParams({
          message: data.message || "Invalid credentials. Please try again.",
          open: true,
          color: "warning",
        });
      } else if (status === 500) {
        // Server-side error
        setSnackBarParams({
          message: data.message || "Server error. Please try again later.",
          open: true,
          color: "warning",
        });
      } else {
        // Other errors
        setSnackBarParams({
          message: data.message || "An unknown error occurred.",
          open: true,
          color: "warning",
        });
      }
    }
  }
};
export default handleLoginSubmit;