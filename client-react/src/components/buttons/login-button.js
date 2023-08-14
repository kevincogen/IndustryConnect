import { React, useEffect } from "react";
import { useAuth0, isAuthenticated, user } from "@auth0/auth0-react";
import Button from '@mui/material/Button';
import { getProfile } from "../../pages/profie-api";



const LoginButton = () => {
  const { loginWithRedirect, isAuthenticated, user } = useAuth0();

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!user || !user.sub) {
        return; // Exit if user is not available
      }
      try {
        const userProfileData = await getProfile(user.sub);
        if (!userProfileData) {
          // New user; navigate to /profile to fill out profile
          window.location.href = "/profile";
        } else {
          // Existing user; navigate to /connect
          window.location.href = "/connect";
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
        // Handle the error, possibly redirect to an error page or show a message
      }
    };

    if (isAuthenticated) {
      fetchUserProfile();
    }
  }, [isAuthenticated, user]);

  return (
    <Button 
      size="large"
      sx={{
        backgroundColor: "#1fc1c3",
        "&:hover": {
          backgroundColor: "#13264D",
        },
      }} 
      variant="contained" 
      onClick={() => loginWithRedirect()}
    >
      Log In
    </Button>
  );
};


export default LoginButton;

