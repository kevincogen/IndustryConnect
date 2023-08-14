import React, { useState } from "react";
import ProfileCard from "./ProfileCard";
import TinderCard from 'react-tinder-card';
import ConnectButton from "../buttons/connect-button";
import PassButton from "../buttons/pass-button";
import MatchAnimation from "../../animations/matchAnimation";
import ConnectAnimation from "../../animations/connectAnimation";
import axios from "axios";

const ProfileCarousel = (props) => {
  const profile = props.profiles[props.currentProfileIndex];
  const connection = props.connection;
  const currentUser = props.currentUser;
  
  const [showMatchAnimation, setShowMatchAnimation] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const checkForMatch = async (profileId, userId) => {
    setIsLoading(true);
    
    // Let ConnectAnimation play for 1 second
    setTimeout(async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/checkMatch?profileId=${profileId}&userId=${userId}`);
        if (response.data.isMatch) {
          setShowMatchAnimation(true);
          setTimeout(() => {
            setShowMatchAnimation(false);
            setIsLoading(false);
          }, 2000); // Let MatchAnimation play for 2 seconds
        } else {
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Error checking for match:", error);
        setIsLoading(false); // Ensure loading state is reset even if there's an error
      }
    }, 2000); // 1 second delay
  };

  const handleConnect = () => {
    connection.handleConnect(profile, currentUser);
    checkForMatch(profile.id, currentUser.id);
  };

  const onSwipe = (direction) => {
    console.log(`you swiped: ${direction}`);
    if (direction === 'right') {
      handleConnect();
    } else if (direction === 'left') {
      connection.handlePass(profile);
    }
  };

  const onCardLeftScreen = (myIdentifier) => {
    console.log(`${myIdentifier} left the screen`);
  };

  return (
    <div className="profile-carousel">
      {showMatchAnimation && <MatchAnimation />}
      {isLoading && !showMatchAnimation && <ConnectAnimation />} 
      {!showMatchAnimation && !isLoading && (
        <TinderCard 
          key={props.currentProfileIndex}
          swipeRequirementType="position"
          swipeThreshold={100}
          onSwipe={onSwipe} 
          onCardLeftScreen={() => onCardLeftScreen('fooBar')}
          preventSwipe={['down', 'up']}
        >
          <ProfileCard 
            carousel={true}
            className="carousel-card"
            profile={profile}
            connection={props.connection}
            currentUser={props.currentUser}
          />
        </TinderCard>
      )}
      <div className="connect-pass">
        <PassButton onClick={() => connection.handlePass(profile)} />
        <ConnectButton onClick={handleConnect} />
      </div>
    </div>
  );
};

export default ProfileCarousel;



