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
import { Box } from '@mui/material';
import PageLoad from '../animations/pageLoad';
import MatchAnimation from '../animations/matchAnimation';
import backgroundImage from '../images/human-resources-concept-with-people.jpeg';


const Connect = () => {
  const [profiles, setProfiles] = useState([]);
  const [industries, setIndustries] = useState([]);
  const [selectedIndustries, setSelectedIndustries] = useState([]);
  const { user, isLoading } = useAuth0();
  const [hasMatch, setHasMatch] = useState(false);

  const connection = useConnection(() => {
    setHasMatch(true);

    const timeout = setTimeout(() => {
      setHasMatch(false);
    }, 3000);
  
    return () => clearTimeout(timeout);
  });

  const [refreshKey, setRefreshKey] = useState(0);
  const [firstSub, setFirstSub] = useState(0)
  const [currentUser, userLoad ] = useGetCurrentUser(refreshKey, firstSub);
  const handleRefresh = () => {
    setFirstSub(currentUser[0].authentication_id)
    setRefreshKey(refreshKey + 1);
  };
  const [currentProfileIndex, setCurrentProfileIndex] = useState(0);
  const [refreshMatches, setRefreshMatches] = useState(0);

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
      fetch(`http://localhost:8080/api/profiles-by-industries/${industryQuery}`, {
        headers: {
          'X-Auth0-Sub': sub
        }
      })
        .then(response => response.json())
        .then(data => setProfiles(data))
    }
  };

  // connect and pass handlers to include refreshing the current user
  const handleConnectWrapper = (profile) => {
    connection.handleConnect(profile, currentUser);
    handleRefresh(); 
    setCurrentProfileIndex(prevIndex => prevIndex + 1);
    setRefreshMatches(oldValue => oldValue + 1); 
  };
  
  const handlePassWrapper = (profile) => {
    connection.handlePass(profile);
    handleRefresh(); 
    setCurrentProfileIndex(prevIndex => prevIndex + 1);
    setRefreshMatches(oldValue => oldValue + 1); 
  };
  
  if (currentUser === null) {
    return (
     <div> 
    <Navbar />      
    <PageLoad />
    </div>
    )
  }

  return (
    <div>
        <Navbar
          showSearch={true}
          industries={industries} 
          selectedIndustries={selectedIndustries} 
          setSelectedIndustries={setSelectedIndustries} 
          filterProfilesByIndustry={filterProfilesByIndustry} 
        />
        <div className="master-body">
          <Sidebar className="profile-sidebar" 
            currentUser={currentUser[0]} 
            connectHistory={currentUser[0].connections} 
            passHistory={currentUser[0].passes} 
            refreshMatches={refreshMatches}
            profiles={profiles} />
          <div className="page-body">
          {profiles.length === 0 ? (
          <div className="carousel-style">
            <backgroundImage />

            <NetworkButton 
              style={{ alignSelf: 'center', maxWidth: '80%', height: '50px', fontSize: '20px' }}
              onClick={filterProfilesByIndustry}
            >
              Start Networking!
            </NetworkButton>
        </div>
            ) : (
              <ProfileCarousel hasMatch={hasMatch} profiles={profiles} currentProfileIndex={currentProfileIndex} connection={{ handleConnect: handleConnectWrapper, handlePass: handlePassWrapper }} currentUser={currentUser[0]} />
            )
          }
            <ProfileGrid profiles={profiles} currentProfileIndex={currentProfileIndex} connection={{ handleConnect: handleConnectWrapper, handlePass: handlePassWrapper }} currentUser={currentUser} />
            </div>
            <div className="search-bar">
            <NetworkButton 
                  style={{ height: '30px' }}
                  onClick={filterProfilesByIndustry} size="small"
              >
                  Industry Search
              </NetworkButton>
              <SearchBar
                  options={industries}
                  value={selectedIndustries}
                  onChange={(newValue) => setSelectedIndustries(newValue)}
              />
            </div>
          </div>
        </div>
  );  
};

export default Connect;