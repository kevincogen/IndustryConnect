import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Button from '@mui/material/Button';

const PassButton = (props) => {
  return (
    <Button variant="outlined" color="error" onClick={props.onClick}>
      Pass
    </Button>
  )
};

export default PassButton;