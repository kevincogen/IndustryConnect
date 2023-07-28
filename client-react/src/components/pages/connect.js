import React, { useState, useEffect } from 'react';
import ProfileCard from '../partials/ProfileCard';
import { useAuth0 } from "@auth0/auth0-react";
import Navbar from "../partials/navbar"

const Connect = () => {
  const [profiles, setProfiles] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/api/profiles')
      .then(response => response.json())
      .then(data => setProfiles(data));
  }, []);

  return (
    <div>
      <Navbar />
      {profiles.map((profile, index) => 
        <ProfileCard key={index} profile={profile} />
      )}
    </div>
  );
};

export default Connect;
