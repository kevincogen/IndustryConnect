import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import { io } from "socket.io-client";
import { Grid, Typography } from '@mui/material';
import { ChatHistoryContainer, ChatBubble, Timestamp, FormContainer, InputField, SendButton } from '../pages/chat-styles';
import moment from 'moment';
import axios from 'axios';
import useGetCurrentUser from '../hooks/useGetCurrentUser';
import Sidebar from '../components/partials/ConnectSideBar';


const formatTimestamp = (timestamp) => {
  return moment(timestamp).fromNow();
};

export default function Chat() {
  const [chatHistory, setChatHistory] = useState([]); 
  const [matches, setMatches] = useState([]);
  const [refreshMatches, setRefreshMatches] = useState(0);

  // get match from location state
  const location = useLocation();
  const match = location?.state?.match;

  // get current user from custom hook
  const currentUser = useGetCurrentUser();
  const currentUserId = currentUser?.[0]?.[0]?.id;
  
  
  useEffect(() => {
    if (currentUser === null) {
      return <div>Loading...</div>;
    } 
  
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

  useEffect(() => {
    const getMatchList = async () => {
      if (!currentUserId) return;
      if (currentUserId) {
        console.log("We have currentUserId: ", currentUserId);
        try {
          const response = await axios.get(`http://localhost:8080/api/matchList/${currentUserId}`);
          setMatches(response.data);
        } catch (error) {
          console.error("There was an error retrieving the matches: ", error);
        }
      }
    };
    getMatchList();
  }, [currentUserId, refreshMatches]);

  if (currentUser[0] === null) {
    console.log("currentUser is null")
    return <div>Loading...</div>;
  } 
  
  return (
    <>
      { currentUser && (
        <div style={{ display: 'flex', height: '100vh' }}>
        <Sidebar currentUser={currentUser[0][0]} refreshMatches={refreshMatches}/>
        <div style={{ flex: 1, padding: '16px', overflowY: 'auto' }}>
       <Grid container spacing={2}>
         <Grid item xs={12}>
           <Typography variant="h4" component="h1" gutterBottom>
             Chat
           </Typography>
         </Grid>

         <Grid item xs={12}>
           <Typography variant="h5" component="h2" gutterBottom>
             {match?.first_name || null} {match?.last_name || null}
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
       </div>
       </div>
    ) 
  }
  </>
  );
}

