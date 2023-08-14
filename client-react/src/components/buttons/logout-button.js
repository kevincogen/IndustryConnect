import { useAuth0 } from "@auth0/auth0-react";
import React from "react";  
import Button from "@mui/material/Button";

const LogoutButton = () => {
  const { logout, user } = useAuth0();

  const handleLogout = (event) => {
    event.stopPropagation();  
    logout({ returnTo: window.location.origin });
    console.log(user?.sub)
  }

  return (
    <Button sx={{ backgroundColor: "#2CDDFF" }} variant="contained" onClick={handleLogout}>
      Log Out
    </Button>
  );
};

export default LogoutButton;
