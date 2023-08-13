import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Button from '@mui/material/Button';

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <Button 
    size="large"
    sx={{
      backgroundColor: "#1fc1c3",
      "&:hover": {
        backgroundColor: "#13264D",
      },
    }} 
      variant="contained" 
      onClick={() => loginWithRedirect({
        redirectUri: `${window.location.origin}/profile`
      })}
      >
        Log In
      </Button>
  );
};

export default LoginButton;