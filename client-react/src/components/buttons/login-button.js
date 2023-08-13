import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Button from '@mui/material/Button';

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <Button 
      sx={"background-color: #65adb2"} 
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