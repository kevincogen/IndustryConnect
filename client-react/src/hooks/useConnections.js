import { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

const useConnection = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] =useState(null);
  const { user } = useAuth0();
  const authenticationId = user?.sub // safegaurd type error

  //PASS
  const handlePass = async (profile) => {
    const userIdToPass = profile.id
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:8080/api/pass', {
        method: 'PUT', // or POST, depending on your API
        headers: {
          'Content-Type': 'application/json',
          'X-Auth0-Sub': authenticationId,
        },
        body: JSON.stringify({ UserID: userIdToPass }),
      });

      if (!response.ok) {
        throw new Error('Failed to pass');
      }

      // Success Logic
      console.log('pass successful');

    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  //MATCH (MUST CONNECT FIRST)
  const handleMatch = async (currentUser, userToConnect) => {
    try {
      const response = await fetch('http://localhost:8080/api/match', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ currentUser: currentUser, userToConnect: userToConnect }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to create match');

      }
  
      const data = await response.json();
      console.log('its a match' + data.message); // we will need this response to set something
    } catch (err) {
      console.error(err);
    }
  };
  
  //CONNECT (AND THEN MATCH)
  const handleConnect = async (profile, currentUser) => {
    const userIdToConnect = profile.id;
    const profileConnections = profile.connections;
    const userId = currentUser[0].id;

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:8080/api/connect', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'X-Auth0-Sub': authenticationId,
        },
        body: JSON.stringify({ UserID: userIdToConnect }),
      });

      if (!response.ok) {
        throw new Error('Failed to connect');
      }

      // Success Logic (MATCH)
      console.log('success');
      if (profileConnections.includes(userId)) {
        handleMatch(userId, userIdToConnect);
      }

    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };
  return { handleConnect, handlePass, isLoading, error };
};

export default useConnection;
