import React from "react";
import ProfileCard from "./ProfileCard";
import Container from '@mui/material/Container';

const ProfileCarousel = (props) => {
  const profile = props.profiles[0];

  return (
    <Container maxWidth="sm">
          <div className="profile-carousel-container">
      <ProfileCard 
        profile={profile}
        connection={props.connection}
        currentUser={props.currentUser}
      />
    </div>
    </Container>
  )
};

export default ProfileCarousel;