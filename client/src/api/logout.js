import { makeRequest } from "../axios";

const handleLogout = async (logout, setSnackBarParams) => {
  try {
    console.log("i will send logout request");
    const response = await makeRequest.post("/auth/logout", {});
    if (response.status == 200) {
      console.log("logout succeessfully");
      logout();
      setSnackBarParams({ message: "you have logout successfully", open: true, color: "success" });
    } else {
      setSnackBarParams({ message: "logout failed", open: true, color: "warning" });
      console.log("error logout :", response);
    }
  } catch (error) {
    console.error(error);
  }
};
export default handleLogout;
