import { createContext, useContext, useState } from "react";

const SnackBarContext = createContext();

export function SnackBarProvider({ children }) {
  const [snackBarParams, setSnackBarParams] = useState({
    message: "",
    open: false,
    color: "success",
  });

  
  return (
    <SnackBarContext.Provider value={{snackBarParams,setSnackBarParams}}>
      {children}
    </SnackBarContext.Provider>
  );
}

export const useSnackBar = () => useContext(SnackBarContext);
