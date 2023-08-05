import React, { useEffect, useState } from 'react'
import { io } from "socket.io-client";
import { 
  Grid, 
  Typography,
  Button,
  TextField,

} from '@mui/material';


export default function Chat() {
  const [messages, setMessages] = useState([]); // [ {user: "user", message: "message"}, {user: "user", message: "message"}
   
  

  // establish socket connection
  useEffect(() => {
    const socket = io("http://localhost:3000");
    
    socket.on("connect", () => {
      console.log("connection made")
    })

    socket.on("system", (data) => {
      console.log(data)
    })

    // disconnect socket connection
    return () => {
      socket.disconnect();
    }

  }, []);

    return (

      <h1>CHAT</h1>
          
    )
}

