import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
// import Box from '@mui/material/Box';
import List from '@mui/material/List';
// import ListItem from '@mui/material/ListItem';
// import ListItemButton from '@mui/material/ListItemButton';
// import ListItemText from '@mui/material/ListItemText';
// import ListItemAvatar from '@mui/material/ListItemAvatar';
// import Avatar from '@mui/material/Avatar';
import Rating from '@mui/material/Rating';
// import { styled } from '@mui/material/styles';
import {
  StyledListItem,
  StyledAvatar,
  AvatarContainer,
  AvatarAndNameContainer,
  StyledListItemText,
  StyledListItemButton,
  RatingAndChatContainer,
  StyledBox,
} from '../partials/MatchTable-styles';
import axios from 'axios';




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
      console.log("Rating updated successfully");
      setMatches((prevMatches) =>
      prevMatches.map((match) =>
        match.id === ratedUserId
          ? {
              ...match,
              average_rating: newValue,
            }
          : match
      )
    );

    } catch (error) {
      console.error("There was an error updating the rating: ", error);
    }
  };

  useEffect(() => {
    const getMatchList = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/matchList/${currentUserId}`);
        console.log("response.data: ", response.data);
        setMatches(response.data);
      } catch (error) {
        console.error("There was an error retrieving the matches: ", error);
      }
    };
    getMatchList();
  }, [currentUserId, refreshMatches]);




return (
  <StyledBox sx={{ width: '100%', bgcolor: 'background.paper' }}>
    <nav aria-label="main mailbox folders">
      <List>
        {matches?.map((match, index) => (
          <StyledListItem disablePadding key={index}>
            <AvatarAndNameContainer>
              <AvatarContainer>
                <StyledAvatar alt={match.first_name} src={match.profile_picture} />
              </AvatarContainer>
            <RatingAndChatContainer>
              <StyledListItemButton onClick={() => handleChatClick(match)}>
                <StyledListItemText primary={`Chat with ${match.first_name}`} />
              </StyledListItemButton>
                <Rating
                  style={{ marginTop: '-10px', marginLeft: '14px' }}
                  name={`rating-${index}`}
                  size="small"
                  value={match.average_rating}
                  onChange={(event, newValue) => {
                    if (newValue !== null) {
                      updateRating(match.id, newValue);
                    }
                  }}
                />
            </RatingAndChatContainer>
            </AvatarAndNameContainer>
          </StyledListItem>
        ))}
      </List>
    </nav>
  </StyledBox>
);
}

