import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import axios from 'axios';
import Rating from '@mui/material/Rating';
// import Typography from '@mui/material/Typography';




export default function MatchList({currentUser, refreshMatches }) {
  const [matches, setMatches] = useState([]);
  const currentUserId = currentUser.id;
  
  // retrieve the match object from the chat button and pass it to the chat page
  const navigate = useNavigate();
  
  const handleChatClick = useCallback((match) => {
    navigate('/chat', { state: { match, currentUserId } }); // Pass the match object and currentUserId as state
  }, [navigate, currentUserId]);


  const updateRating = async (ratedUserId, newValue) => {
    // console.log("ratedUserId: ", ratedUserId);
    // console.log("currentUserId: ", currentUserId);
    // console.log("newValue: ", newValue);
    
    try {
      await axios.put(`http://localhost:8080/api/matchRating/${ratedUserId}`, {
        raterId: currentUserId,
        rating: newValue
      });
    } catch (error) {
      console.error("There was an error updating the rating: ", error);
    }
  };

  useEffect(() => {
    const getMatchList = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/matchList/${currentUserId}`);
        setMatches(response.data);
      } catch (error) {
        console.error("There was an error retrieving the matches: ", error);
      }
    };
    getMatchList();
  }, [currentUserId, refreshMatches]);

  return (
    <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      <nav aria-label="main mailbox folders">
        <List>
          {matches?.map((match, index) => (
            <ListItem disablePadding key={index}>
              <ListItemButton>
                <ListItemText primary={`${match.first_name} ${match.last_name}`} />
              </ListItemButton>
              <ListItemButton onClick={() => handleChatClick(match)}>
                <ListItemText primary={`Chat with ${match.first_name}`} />
              </ListItemButton>
              <Rating
                name={`simple-controlled-${index}`}
                size="small"
                value={match.rating}
                onChange={(event, newValue) => {
                  if (newValue !== null) {
                    updateRating(match.id, newValue);
                  }
                }}
              />
            </ListItem>
          ))}
        </List>
      </nav>
    </Box>
  );
}

