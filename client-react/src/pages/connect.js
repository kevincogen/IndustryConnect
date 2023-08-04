import React, { useState, useEffect } from 'react';
import ProfileCard from '../components/partials/ProfileCard';
import { useAuth0 } from "@auth0/auth0-react";
import Navbar from "../components/partials/navbar"
import SearchBar from '../components/partials/searchbar';
import NetworkButton from '../components/buttons/network-button';
import useConnection from '../hooks/useConnections';
import useGetCurrentUser from '../hooks/useGetCurrentUser';
import ProfileCarousel from '../components/partials/ProfileCarousel';
import ProfileGrid from '../components/partials/ProfileGrid';
import Sidebar from '../components/partials/ConnectSideBar';


const Connect = () => {
  const [profiles, setProfiles] = useState([]);
  const [industries, setIndustries] = useState([]);
  const [selectedIndustries, setSelectedIndustries] = useState([]);
  const { user, isLoading } = useAuth0();
  const connection = useConnection();
  const [refreshKey, setRefreshKey] = useState(0);
  const [firstSub, setFirstSub] = useState(0)
  const [currentUser, userLoad ] = useGetCurrentUser(refreshKey, firstSub);
  const handleRefresh = () => {
    setFirstSub(currentUser[0].authentication_id)
    setRefreshKey(refreshKey + 1);
  };

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
      fetch('http://localhost:8080/api/profiles', {
        headers: {
          'X-Auth0-Sub': sub
        }
      })
      .then(response => response.json())
      .then(data => setProfiles(data))
    } else {
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

  // Modified connect and pass handlers to include refreshing the current user
  const handleConnectWrapper = (profile) => {
    connection.handleConnect(profile, currentUser);
    handleRefresh(); // Call the handleRefresh function to re-fetch the current user
  };

  const handlePassWrapper = (profile) => {
    connection.handlePass(profile);
    handleRefresh(); // Call the handleRefresh function to re-fetch the current user
  };
  console.log(currentUser)
  if (currentUser === null) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <Navbar />
      <SearchBar
        options={industries}
        value={selectedIndustries}
        onChange={(newValue) => setSelectedIndustries(newValue)}
      />
      <NetworkButton onClick={filterProfilesByIndustry}>Network</NetworkButton>
      <ProfileCarousel profiles={profiles} connection={{ handleConnect: handleConnectWrapper, handlePass: handlePassWrapper }} currentUser={currentUser[0]} />
      <ProfileGrid profiles={profiles} connection={{ handleConnect: handleConnectWrapper, handlePass: handlePassWrapper }} currentUser={currentUser} />
      <Sidebar
        currentUser={currentUser[0]}
        connectHistory={currentUser[0].connections}
        passHistory={currentUser[0].passes}
        profiles={profiles}
      />
    </div>
  );
};

export default Connect;