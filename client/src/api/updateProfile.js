import { makeRequest } from "../axios";

const handleUpdateProfile = async (userId,data, setSnackBarParams, handleClose, login,setProfileUser) => {
  try {
    const formData = new FormData();

    // Append all fields from `data` to `formData`
    Object.keys(data).forEach((key) => {
      if (key === "profileImage" || key === "covertureImage") {
        if (data[key]?.length) {
          formData.append(key, data[key][0]); // Append file only if present
        }
      } else {
        formData.append(key, data[key]); // Append other fields
      }
    });

    console.log("Sending update request with this data:", formData.get("username"));

    // Make the POST request to the server
    const response = await makeRequest.post(`/users/update/${userId}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    console.log("update profile response:-------------------------------------", response);

    if (response.status === 200) {
      const { message, user } = response.data;
      // Show success message
      setSnackBarParams({
        message: message || "Profile updated successfully!",
        open: true,
        color: "success",
      });
      // Update user login info
      login(user);
      setProfileUser(user);
      // Close the dialog/modal
      handleClose();
      // Navigate to the user's profile page
    }
  } catch (error) {
    console.error("Error updating profile:", error);

    if (error.response) {
      const { status, data } = error.response;

      // Handle specific HTTP status codes
      if (status === 404) {
        setSnackBarParams({
          message: "User not found. Please check your input.",
          open: true,
          color: "error",
        });
      } else if (status === 400) {
        setSnackBarParams({
          message: data.error || "Invalid data provided.",
          open: true,
          color: "error",
        });
      } else if (status === 500) {
        setSnackBarParams({
          message: "Server error. Please try again later.",
          open: true,
          color: "error",
        });
      } else {
        setSnackBarParams({
          message: "Unexpected error occurred. Please try again.",
          open: true,
          color: "error",
        });
      }
    } else {
      // Handle network or other unknown errors
      setSnackBarParams({
        message: "Network error. Please check your connection and try again.",
        open: true,
        color: "error",
      });
    }
  }
};

export default handleUpdateProfile;
