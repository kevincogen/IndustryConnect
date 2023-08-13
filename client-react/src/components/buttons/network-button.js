import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Button from '@mui/material/Button';

const NetworkButton = ({ onClick, children }) => {
  return (
    <Button sx={"background-color: #1fc1c3"} variant="contained" onClick={onClick} size="small"> 
      {children}
    </Button>
  );
};

export default NetworkButton;
