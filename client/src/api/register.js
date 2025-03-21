import makeRequest from "../axios";

const handleRegisterSubmit = async (data, setSnackBarParams, navigate) => {
  try {
    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      if (key === "profileImage" || key === "covertureImage") {
        if (data[key]?.length) {
          formData.append(key, data[key][0]);
        }
      } else {
        formData.append(key, data[key]);
      }
    });

    const response = await makeRequest.post("/auth/register", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    if (response.status === 201) {
      setSnackBarParams({
        message: response.data.message,
        open: true,
        color: "success",
      });
      navigate("/login");
    }
  } catch (error) {
    setSnackBarParams({
      message: error.response?.data?.message || error.message,
      open: true,
      color: "error",
    });
  }
};

export default handleRegisterSubmit;
