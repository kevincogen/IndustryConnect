import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import { io } from "socket.io-client";
import { Grid, Typography } from '@mui/material';
import { OuterChatContainer, ChatHistoryContainer, ChatBubble, Timestamp, FormContainer, InputField, SendButton } from '../pages/chat-styles';
import '../App.css';
import moment from 'moment';
import axios from 'axios';
import useGetCurrentUser from '../hooks/useGetCurrentUser';
import Sidebar from '../components/partials/ConnectSideBar';
import Navbar from '../components/partials/navbar';
import ChatAnimation from '../animations/chatAnimation';
import ProfileCard from '../components/partials/ProfileCard';


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
  console.log(match)

  // get current user from custom hook
  const currentUser = useGetCurrentUser();
  const currentUserId = currentUser?.[0]?.[0]?.id;
  
  
  useEffect(() => {
    if (currentUser === null) {
      return <div>Loading...</div>;
    } 
  
    if (match) {
      const socket = io(process.env.REACT_APP_FRONTEND_URL);
      
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

  const chatBubbles = document.querySelectorAll('.chat-bubble');

  useEffect(() => {
    if (chatBubbles.length > 0) {
      const latestMessage = chatBubbles[chatBubbles.length - 1];
      latestMessage.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatBubbles.length, chatHistory])

  const handleSubmit = (event) => {
    event.preventDefault();

    //organize message data
    const message = event.target.elements.message.value;
    const sender_id = currentUserId;
    const receiver_id = match.id;
    const matchId = match.match_id;
    const msg = { matchId, sender_id, receiver_id, message };
    
    const socket = io(process.env.REACT_APP_FRONTEND_URL);
    socket.emit("chat message", msg);
   
    event.target.reset();
  };

  useEffect(() => {
    const getMatchList = async () => {
      if (!currentUserId) return;
      if (currentUserId) {
        try {
          const response = await axios.get(`${process.env.REACT_APP_API_SERVER_URL}/api/matchList/${currentUserId}`);
          setMatches(response.data);
        } catch (error) {
        }
      }
    };
    getMatchList();
  }, [currentUserId, refreshMatches]);

  if (currentUser[0] === null) {
    return <div>Loading...</div>;
  } 

  return (
    <div>
        <Navbar />
        <div className="master-body">
            <Sidebar className="profile-sidebar" 
                currentUser={currentUser[0][0]} 
                refreshMatches={refreshMatches} 
            />
            <div className="page-body chat-container" >
            {currentUser ? (
                <>
                {match ? (
                    <>
                    <OuterChatContainer>
                        <ChatHistoryContainer className='no-scrollbar chat-history-container'>
                            {chatHistory.slice().reverse().map((message, index) => (
                                <ChatBubble className="chat-bubble" key={index} isCurrentUser={message.sender_id === currentUserId}>
                                    <span>{message.message}</span>
                                    <Timestamp isCurrentUser={message.sender_id === currentUserId}>
                                        {formatTimestamp(message.created_at)}
                                    </Timestamp>
                                </ChatBubble>
                            ))}
                        </ChatHistoryContainer>
                        
                        <FormContainer onSubmit={handleSubmit} style={{ display: 'flex', alignItems: 'center' }}>
                            <InputField
                                id="outlined-multiline-static"
                                label="Message"
                                multiline
                                variant="outlined"
                                name="message"
                                style={{ flex: 1 }}
                            />
                            <SendButton type="submit" variant="contained" color="primary">
                                Send
                            </SendButton>
                        </FormContainer>
                    </OuterChatContainer>
                    </>
                ) : (
                    <>
                    <Typography variant="h5" component="h2" gutterBottom style={{ color: '#7E8C9C' }}>
                        Please select a match to chat with
                    </Typography>
                    <ChatAnimation />
                    </>
                )}
                </>
            ) : (
                <Typography variant="h4" component="h1" gutterBottom>
                    Please select a match to chat with
                </Typography>
            )}
            </div>
            {match && (
                <div className="search-bar2">
                    <ProfileCard
                        style={{
                            width: '100%',
                            alignSelf: 'center',
                        }}
                        profile={match}
                    />
                </div>
            )}
        </div>
    </div>
);
}












  // return (
  //   <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', marginRight: '20px' }}>
  //     <Navbar />
  //     {currentUser ? (
  //       <div style={{ display: 'flex', flex: 1 }}>
  //         <Sidebar 
  //             currentUser={currentUser[0][0]} 
  //             refreshMatches={refreshMatches}
  //             style={{ width: '25%' }} 
  //         />
  //         <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
  //           <Grid container spacing={2}>
  //             <Grid item xs={12}>
  //               <Typography variant="h4" component="h1" gutterBottom>
  //                 Chat
  //               </Typography>
  //             </Grid>
  
  //             <Grid item xs={12}>
  //               {match ? (
  //                 <Typography variant="h5" component="h2" gutterBottom style={{ color: '#7E8C9C' }}>
  //                   Your conversation with {match?.first_name || null} {match?.last_name || null}
  //                 </Typography>
  //               ) : (
  //                 <>
  //                 <Typography variant="h5" component="h2" gutterBottom style={{ color: '#7E8C9C' }}>
  //                   Please select a match to chat with
  //                 </Typography>
  //                 <ChatAnimation />
  //                 </>
  //               )}
  //             </Grid>
  
  //             <Grid item xs={12} style={{ flex: 1 }}>
  //               {match ? (
  //                 <OuterChatContainer>
  //                   <ChatHistoryContainer className='no-scrollbar chat-history-container'>
  //                     {chatHistory.slice().reverse().map((message, index) => (
  //                       <ChatBubble className="chat-bubble" key={index} isCurrentUser={message.sender_id === currentUserId}>
  //                         <span>{message.message}</span>
  //                         <Timestamp isCurrentUser={message.sender_id === currentUserId}>
  //                           {formatTimestamp(message.created_at)}
  //                         </Timestamp>
  //                       </ChatBubble>
  //                     ))}
  //                   </ChatHistoryContainer>
                    
  //                   {match && (
  //                     <FormContainer onSubmit={handleSubmit} style={{ display: 'flex', alignItems: 'center' }}>
  //                       <InputField
  //                         id="outlined-multiline-static"
  //                         label="Message"
  //                         multiline
  //                         variant="outlined"
  //                         name="message"
  //                         style={{ flex: 1 }}
  //                       />
  //                       <SendButton type="submit" variant="contained" color="primary">
  //                         Send
  //                       </SendButton>
  //                     </FormContainer>
  //                   )}
  //                 </OuterChatContainer>
  //               ) : null}
  //             </Grid>
  //             {match && (
  //               <Grid item xs={2.7} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
  //                 <ProfileCard
  //                   style={{
  //                     width: '80%', // Adjust the width as needed
  //                     alignSelf: 'center', // Center align the card
  //                   }}
  //                   profile={match}
  //                 />
  //               </Grid>
  //             )}
  //           </Grid>
  //         </div>
  //       </div>
  //     ) : (
  //       <Typography variant="h4" component="h1" gutterBottom>
  //         Please select a match to chat with
  //       </Typography>
  //     )}
  //   </div>
  // );

