import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Button from '@mui/material/Button';

const ConnectButton = () => {
  return (
    <Button variant="contained" color="success">
      Connect
    </Button>
  )
};

export default ConnectButton;