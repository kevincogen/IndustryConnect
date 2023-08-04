import { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";

const useGetCurrentUser = (refreshKey, firstSub) => {
  const [currentUser, setCurrentUser] = useState(null);
  const { user, isLoading } = useAuth0();
  const userLoad = isLoading
  const sub = user?.sub || firstSub


  useEffect(() => {
    if (isLoading || !sub) {
      return;
    }

    fetch('http://localhost:8080/api/profiles/user', {
      headers: {
        'X-Auth0-Sub': sub
      }
    })
    .then(response => response.json())
    .then(data => setCurrentUser(data))
    // .then(console.log)
  }, [sub, userLoad, refreshKey]);

  return [currentUser, userLoad];
};

export default useGetCurrentUser;

