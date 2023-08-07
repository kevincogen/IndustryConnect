import React from "react";
import ProfileCard from "./ProfileCard";
import Container from '@mui/material/Container';

const ProfileCarousel = (props) => {
  const profile = props.profiles[props.currentProfileIndex];

  return (
    <div className="profile-carousel">
      <ProfileCard 
        carousel={true}
        className="carousel-card"
        profile={profile}
        connection={props.connection}
        currentUser={props.currentUser}
      />
    </div>
  )
};

export default ProfileCarousel;