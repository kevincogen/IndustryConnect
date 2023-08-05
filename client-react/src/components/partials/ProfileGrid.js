import React from "react";
import ProfileCard from "./ProfileCard";
import Container from '@mui/material/Container';

const ProfileGrid = ({ profiles, connection, currentUser }) => {
  return (
    <Container maxWidth="sm">
      <div className="profile-grid">
        {profiles.map((profile, index) => 
          <ProfileCard key={index} profile={profile} connection={connection} currentUser={currentUser} />
        )}
      </div>  
    </Container>
  )
};

export default ProfileGrid;