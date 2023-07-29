import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "../buttons/login-button";
import LogoutButton from "../buttons/logout-button";
import EditProfile from "../forms/EditProfile"; // Import the EditProfile component
import CreateProfile from "../forms/CreateProfile"; // Import the CreateProfile component

const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    isAuthenticated && user ? (
      <div>
        <div>
          <img src={user.picture} alt={user.name} />
          <h2>{user.name}</h2>
          <p>{user.email}</p>
        
          {user.authentication_id ? (
            <>
              {/* Show the EditProfile component for registered users */}
              <EditProfile />
              <LogoutButton />
            </>
          ) : (
            <>
              {/* Show the CreateProfile component for unregistered users */}
              <CreateProfile />
              <LogoutButton />
            </>
          )}
        </div>
          <div className="Register or Login">
            <LoginButton />
          </div>
      </div>
    )
    : (
      <div className="Register or Login">
        <LoginButton />
      </div>
    )
  );
};



export default Profile;