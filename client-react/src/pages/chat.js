import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import { io } from "socket.io-client";
import { Grid, Typography } from '@mui/material';
import moment from 'moment';
import { ChatHistoryContainer, ChatBubble, Timestamp, FormContainer, InputField, SendButton } from '../pages/chat-styles';

const formatTimestamp = (timestamp) => {
  return moment(timestamp).fromNow();
};


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
            <ChatHistoryContainer>
            {chatHistory.map((message, index) => (
              <ChatBubble key={index} isCurrentUser={message.sender_id === currentUserId}>
                <span>{message.message}</span>
                <Timestamp isCurrentUser={message.sender_id === currentUserId}>
                  {formatTimestamp(message.created_at)}
                </Timestamp>
              </ChatBubble>
            ))}
            </ChatHistoryContainer>
        </Grid>
        <FormContainer onSubmit={handleSubmit}>
          <InputField
            id="outlined-multiline-static"
            label="Message"
            multiline
            variant="outlined"
            name="message"
          />
          <SendButton type="submit" variant="contained" color="primary">
            Send
          </SendButton>
        </FormContainer>
       </Grid>
      </>
    )
}

