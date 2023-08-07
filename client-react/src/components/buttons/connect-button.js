import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Button from '@mui/material/Button';

const ConnectButton = (props) => {
  return (
    <Button sx={"background-color: #65adb2"} variant="contained" color="success" onClick={props.onClick}>
      Connect
    </Button>
  )
};

export default ConnectButton;