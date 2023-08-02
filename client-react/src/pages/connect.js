import React, { useState, useEffect } from 'react';
import ProfileCard from '../components/partials/ProfileCard';
import { useAuth0 } from "@auth0/auth0-react";
import Navbar from "../components/partials/navbar"
import SearchBar from '../components/partials/searchbar';
import NetworkButton from '../components/buttons/network-button';
import useConnection from '../hooks/useConnections';


const Connect = () => {
  const [profiles, setProfiles] = useState([]);
  const [industries, setIndustries] = useState([]);
  const [selectedIndustries, setSelectedIndustries] = useState([]);
  const { user, isLoading } = useAuth0();
  const connection = useConnection();


  useEffect(() => {   
    fetch('http://localhost:8080/api/industries')
      .then(response => response.json())
      .then(data => setIndustries(data.map(item => item.name)));
  }, []);

  //Get Filtered Profiles
  const filterProfilesByIndustry = () => {
    if (isLoading || !user?.sub) return; // exit early if loading or no user
    const sub = user.sub;

    if (!sub) {
      console.error('User sub is not available');
      return; // exit if no sub
    }

    if (selectedIndustries.length === 0) {
      console.log(sub)
      fetch('http://localhost:8080/api/profiles', {
        headers: {
          'X-Auth0-Sub': sub
        }
      })
      .then(response => response.json())
      .then(data => setProfiles(data))
    } else {
      console.log(sub)
      const industryQuery = selectedIndustries.join('.');
      // Encode the string to make it URL-safe
      fetch(`http://localhost:8080/api/profiles-by-industries/${industryQuery}`, {
        headers: {
          'X-Auth0-Sub': sub
        }
      })
        .then(response => response.json())
        .then(data => setProfiles(data))
    }
  };
  
  return (
    <div>
      <Navbar />
      <SearchBar
        options={industries}
        value={selectedIndustries}
        onChange={(newValue) => setSelectedIndustries(newValue)}
      />
      <NetworkButton onClick={filterProfilesByIndustry}>
        Network
      </NetworkButton>
      <div className="profile-grid">
        {profiles.map((profile, index) => 
          <ProfileCard key={index} profile={profile} connection={connection} />
        )}
      </div>  
    </div>
  );
};

export default Connect;