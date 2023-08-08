import React from "react";
import ProfileCard from "./ProfileCard";
import Container from '@mui/material/Container';

const ProfileGrid = ({ profiles, connection, currentUser, currentProfileIndex }) => {
  return (
    <Container className="profile-grid-container" maxWidth="lg">
      <div className="profile-grid">
        {profiles.slice(currentProfileIndex + 1).map((profile, index) => 
          <ProfileCard key={index} profile={profile} connection={connection} currentUser={currentUser} />
        )}
      </div>  
    </Container>
  )
};

export default ProfileGrid;