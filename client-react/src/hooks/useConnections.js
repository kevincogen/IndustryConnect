import { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

const useConnection = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] =useState(null);
  const { user } = useAuth0();
  const authenticationId = user?.sub // safegaurd type error

  const handleConnect = async (userIdToConnect) => {
    setIsLoading(true);
    setError(null);
    const body = JSON.stringify({ UserID: userIdToConnect });

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

      //Success Logic to go here
      console.log('success')


    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };
  return { handleConnect, isLoading, error };
};

export default useConnection;
