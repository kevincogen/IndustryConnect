import React from "react";
import ProfileCard from "./ProfileCard";
import Container from '@mui/material/Container';
import TinderCard from 'react-tinder-card'
import ConnectButton from "../buttons/connect-button";
import PassButton from "../buttons/pass-button";

const ProfileCarousel = (props) => {
  const profile = props.profiles[props.currentProfileIndex];
  const connection = props.connection
  const currentUser = props.currentUser


  const onSwipe = (direction) => {
    console.log(`you swiped: ${direction}`)
    if (direction = 'right') {
      connection.handleConnect(profile, currentUser);
    }
    else if (direction = 'left') {
      connection.handlePass(profile);
    }
  };

  const onCardLeftScreen = (myIdentifier) => {
    console.log(`${myIdentifier} left the screen`)

  }

  return (
    <div className="profile-carousel">
      <TinderCard 
          key={props.currentProfileIndex}
          swipeRequirementType="position"
          swipeThreshold={100}
          onSwipe={onSwipe} onCardLeftScreen={() => onCardLeftScreen('fooBar')} 
          preventSwipe={['down', 'up']}>
        <ProfileCard 
          carousel={true}
          className="carousel-card"
          profile={profile}
          connection={props.connection}
          currentUser={props.currentUser}
        />
      </TinderCard>
      <div className="connect-pass">
      <PassButton onClick={() => connection.handlePass(profile)} />
      <ConnectButton onClick={() => connection.handleConnect(profile, currentUser)} />
      </div>
    </div>
  )
};

export default ProfileCarousel;