import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import LoginButton from "../buttons/login-button";
import LogoutButton from "../buttons/logout-button";
import Navbar from "../partials/navbar"

const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  console.log(user);

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    isAuthenticated ? (
      <div>
        <Navbar />
        <img src={user.picture} alt={user.name} />
        <h2>{user.name}</h2>
        <p>{user.email}</p>
        <LogoutButton />
      </div>
    ) : (
      <div className="Register or Login">
        <Navbar />
        <LoginButton />
      </div>
    )
  );
};

export default Profile;
