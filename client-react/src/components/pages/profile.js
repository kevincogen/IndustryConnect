import { useEffect, useState, useCallback } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "../buttons/login-button";
import LogoutButton from "../buttons/logout-button";
// import EditProfile from "../forms/EditProfile"; // Import the EditProfile component
import CreateProfile from "../forms/CreateProfile"; // Import the CreateProfile component


const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const [userProfile, setUserProfile] = useState(null);
  const [authenticated, setAuthenticated] = useState(isAuthenticated);

  const fetchUserProfile = useCallback(async () => {
    if (user && user?.authentication_id) {
      try {
        const response = await fetch(`/api/users/profile?authentication_id=${user.authentication_id}`);
        if (response.ok) {
          const userData = await response.json();
          setUserProfile(userData);
        } else {
          console.error("Error fetching user profile:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching user profile:", error.message);
      }
    }
  }, [user]);

  useEffect(() => {
    if (isAuthenticated !== authenticated) {
      setAuthenticated(isAuthenticated);
    }
  }, [isAuthenticated, authenticated]);


  useEffect(() => {
    console.log("isAuthenticated:", isAuthenticated);
    console.log("user:", user);

    if (isAuthenticated && user) {
      console.log("user:", user);
      fetchUserProfile();
    }
  }, [isAuthenticated, user, fetchUserProfile]);

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  const renderUserProfile = () => {
    if (!isAuthenticated) {
      // If the user is not authenticated, show the Login button
      return <LoginButton />;
    } else if (isAuthenticated && !user?.authentication_id) {
      // If the user is authenticated but not registered, show the CreateProfile form
      return <CreateProfile setUserProfile={setUserProfile} />;
    } else if (isAuthenticated && user?.authentication_id && userProfile) {
      // If the user is authenticated, has an authentication_id, and the userProfile is available, display the profile
      return (
        <div>
          <img src={user.picture} alt={user.name} />
          <h2>{user.name}</h2>
          <p>{user.email}</p>
          {/* Render the user profile fields here */}
          <p>Bio: {userProfile.bio}</p>
          <p>Education: {userProfile.education}</p>
          {/* Add other user profile fields as needed */}
          <button>Edit Profile</button>
          <LogoutButton />
        </div>
      );
    } else {
      // If the user is authenticated but userProfile is not available yet, show a loading message
      return <div>Loading user profile...</div>;
    }
  };

  return (
    <div>
      {renderUserProfile()}
    </div>
  );
};

export default Profile;



















// const Profile = () => {
//   const { user, isAuthenticated, isLoading } = useAuth0();
//   const [userProfile, setUserProfile] = useState(null);

//   const fetchUserProfile = useCallback(async () => {
//     if (user && user?.authentication_id) {
//       try {
//         console.log("user:", user);
//         const response = await fetch(`/api/users/profile?authentication_id=${user.authentication_id}`);
//         if (response.ok) {
//           const userData = await response.json();
//           console.log("userData:", userData);
//           setUserProfile(userData);
//         } else {
//           console.error("Error fetching user profile:", response.statusText);
//         }
//       } catch (error) {
//         console.error("Error fetching user profile:", error.message);
//       }
//     }
//   }, [user]);

//   useEffect(() => {
//     if (isAuthenticated && user) {
//       fetchUserProfile();
//     }
//   }, [isAuthenticated, user, fetchUserProfile]);

//   if (isLoading) {
//     return <div>Loading ...</div>;
//   }

//   const renderUserProfile = () => {
//     if (isLoading) {
//       // If the userProfile is not yet fetched, display a loading message
//       return <div>Loading user profile...</div>;
//     } else if (isAuthenticated && user?.authentication_id) {
//       // If the user is authenticated and has an authentication_id, fetch the user profile
//       if (!userProfile) {
//         // If the userProfile is null after loading is complete, show the "Loading user profile" message
//         return <div>Loading user profile...</div>;
//       } else {
//         // If the userProfile is fetched, display the profile
//         return (
//           <div>
//             <img src={user.picture} alt={user.name} />
//             <h2>{user.name}</h2>
//             <p>{user.email}</p>
//             {/* Render the user profile fields here */}
//             <p>Bio: {userProfile.bio}</p>
//             <p>Education: {userProfile.education}</p>
//             {/* Add other user profile fields as needed */}
//             <button>Edit Profile</button>
//             <LogoutButton />
//           </div>
//         );
//       }
//     } else {
//       // If the user is not authenticated or doesn't have an authentication_id, show the CreateProfile form
//       return <CreateProfile setUserProfile={setUserProfile} />;
//     }
//   };
// };

//   // Render the user profile fields if the user is authenticated and has a truthy user.authentication_id
// //   const renderUserProfile = () => {
// //     if (!userProfile) {
// //       // If the userProfile is not yet fetched, display a loading message or return null
// //       return <div>Loading user profile...</div>;
// //     } else if (userProfile.created_at) {
// //       // If the userProfile is fetched, display the profile
// //       return (
// //         <div>
// //           <img src={user.picture} alt={user.name} />
// //           <h2>{user.name}</h2>
// //           <p>{user.email}</p>
// //           {/* Render the user profile fields here */}
// //           <p>Bio: {userProfile.bio}</p>
// //           <p>Education: {userProfile.education}</p>
// //           {/* Add other user profile fields as needed */}
// //           <button>Edit Profile</button>
// //           <LogoutButton />
// //         </div>
// //       );
// //     } else if (isAuthenticated && !user?.authentication_id) {
// //       // If the user is authenticated but not registered, show the CreateProfile form
// //       return <CreateProfile setUserProfile={setUserProfile}/>;
// //     } else {
// //       // If the user is not authenticated, show the Login button
// //       return (
// //         <div className="Register or Login">
// //           <LoginButton />
// //         </div>
// //       );
// //     }
// //   };

// //   return (
// //     <div>
// //       {renderUserProfile()}
// //     </div>
// //   );
// // };

// export default Profile;
