
import { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";

const useGetCurrentUser = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const { user, isLoading } = useAuth0();
  const sub = user?.sub;

  useEffect(() => {
    if (isLoading || !sub) return;

    fetch('http://localhost:8080/api/profiles/user', {
      headers: {
        'X-Auth0-Sub': sub
      }
    })
    .then(response => response.json())
    .then(data => setCurrentUser(data));
  }, [sub, isLoading]);

  return currentUser;
};

export default useGetCurrentUser;

