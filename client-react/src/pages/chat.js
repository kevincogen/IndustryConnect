import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import { io } from "socket.io-client";
import { Grid, Typography, Button, TextField} from '@mui/material';

export default function Chat() {
  const [chatHistory, setChatHistory] = useState([]); 
  const location = useLocation();
  const match = location?.state?.match;
  const currentUserId = location?.state?.currentUserId;  



useEffect(() => {
  if (match) {
    const socket = io("http://localhost:3000");
    
    // get chat history from server
    socket.emit("get_chat_history", match.match_id, (response) => {
      setChatHistory(response)
      })
    
    // listen for incoming messages
    socket.on("chat message", (msg) => {
      setChatHistory((chatHistory) => [...chatHistory, msg]);
    });

    // disconnect socket connection
    return () => {
      socket.disconnect();
    }
  };
}, [match]);

  const handleSubmit = (event) => {
    event.preventDefault();
    //organize message data
    const message = event.target.elements.message.value;
    const sender_id = currentUserId;
    const receiver_id = match.id;
    const matchId = match.match_id;
    const msg = { matchId, sender_id, receiver_id, message };
    
    const socket = io("http://localhost:3000");
    socket.emit("chat message", msg);
    event.target.reset();
  };


    return (
      <>
       <Grid container spacing={2}>
         <Grid item xs={12}>
           <Typography variant="h4" component="h1" gutterBottom>
             Chat
           </Typography>
         </Grid>

         <Grid item xs={12}>
           <Typography variant="h5" component="h2" gutterBottom>
             {match.first_name} {match.last_name}
           </Typography>
         </Grid>

         <Grid item xs={12}>
            <Typography variant="h6" component="h3" gutterBottom>
              Chat History
            </Typography>
            {chatHistory.map((message, index) => (
              <Typography key={index} variant="body1" gutterBottom>
                {message.sender}: {message.message}
              </Typography>
            ))}
        </Grid>
        <form onSubmit={handleSubmit}>
         <Grid item xs={12}>
           <TextField
             id="outlined-multiline-static"
             label="Message"
             multiline
             rows={2}
             variant="outlined"
              name="message"

           />
         </Grid>
         <Grid item xs={12}>
           <Button type="submit" variant="contained" color="primary">
             Send
           </Button>
         </Grid>
         </form>
       </Grid>
      </>
    )
}

