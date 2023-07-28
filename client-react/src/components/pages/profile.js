import { useAuth0 } from "@auth0/auth0-react";
import React, { useState, useEffect } from "react";

const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  // console.log(user);
  const [registrationData, setRegistrationData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    authentication_id: user?.sub || "",
  });

  const [userProfile, setUserProfile] = useState({
    bio: "",
    education: "",
    experience: "",
    linkedin: "",
    twitter: "",
    github: "",
    facebook: "",
    website: "",
  });


  useEffect(() => {
    // Set the initial values when user object changes/loads
    setRegistrationData((prevData) => ({
      ...prevData,
      first_name: user?.given_name|| "",
      email: user?.email|| "",
      last_name: user?.family_name|| "",
      authentication_id: user?.sub || "",
    }));
  }, [user]);

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    try {
      const dataForServer = {
        ...registrationData,
        ...userProfile,
      };
      const response = await fetch("/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataForServer), 
      });
  
      if (response.ok) {
        const newUser = await response.json();
        console.log("User registered successfully:", newUser);
      } else {
        const errorData = await response.json();
        console.error("Error registering user:", errorData.error);
      }
    } catch (error) {
      console.error("Error registering user:", error.message);
    }
  };
  

  return (
    isAuthenticated && user && (
      <div>
        <img src={user.picture} alt={user.name} />
        <h2>{user.name}</h2>
        <p>{user.email}</p>
        <form onSubmit={handleSubmit}>
          {/* <input
              type="hidden"
              value={registrationData.authentication_id}
              // defaultValue={user.sub}
              onChange={(e) =>
                setRegistrationData({
                  ...registrationData,
                  authentication_id: e.target.value,
                })
              }
            /> */}
          <label>
            First Name:
            <input
              type="text"
              value={registrationData.first_name}
              autoComplete="given-name"
              defaultValue={user.first_name}
              onChange={(e) =>
                setRegistrationData({
                  ...registrationData,
                  first_name: e.target.value,
                })
              }
            />
          </label>
          <label>
            Last Name:
            <input
              type="text"
              value={registrationData.last_name}
              onChange={(e) =>
                setRegistrationData({
                  ...registrationData,
                  last_name: e.target.value,
                })
              }
            />
          </label>
          <label>
            Email:
            <input
              type="text"
              value={registrationData.email}
              onChange={(e) =>
                setRegistrationData({
                  ...registrationData,
                  email: e.target.value,
                })
              }
            />
          </label>
          <label>
            Bio:
            <input
              type="text"
              placeholder="Tell us about yourself"
              onChange={(e) => 
                setRegistrationData({
                  ...registrationData, 
                  bio: e.target.value 
                })}
            />
          </label>
          <label>
            Education:
            <input
              type="text"
              placeholder="Where did you go to school?"
              onChange={(e) =>
                setUserProfile({
                  ...userProfile,
                  education: e.target.value,
                })
              }
            />
          </label>
          <label>
            Experience:
            <input
              type="text"
              placeholder="What is your work experience?"
              onChange={(e) =>
                setUserProfile({
                  ...userProfile,
                  experience: e.target.value,
                })
              }
            />
          </label>
          <label>
            LinkedIn:
            <input
              type="text"
              placeholder="LinkedIn URL"
              onChange={(e) =>
                setUserProfile({
                  ...userProfile,
                  linkedin: e.target.value,
                })
              }
            />
          </label>
          <label>
            Twitter:
            <input
              type="text"
              placeholder="Twitter URL"
              onChange={(e) =>
                setUserProfile({
                  ...userProfile,
                  twitter: e.target.value,
                })
              }
            />
          </label>
          <label>
            Github:
            <input
              type="text"
              placeholder="Github URL"
              onChange={(e) =>
                setUserProfile({
                  ...userProfile,
                  github: e.target.value,
                })
              }
            />
          </label>
          <label>
            Facebook:
            <input
              type="text"
              placeholder="Facebook URL"
              onChange={(e) =>
                setUserProfile({
                  ...userProfile,
                  facebook: e.target.value,
                })
              }
            />
          </label>
          <label>
            Website:
            <input
              type="text"
              placeholder="Personal Website URL"
              onChange={(e) =>
                setUserProfile({
                  ...userProfile,
                  website: e.target.value,
                })
              }
            />
          </label>  
          <button type="submit">Register</button>
        </form>
      </div>
    )
  );
};


export default Profile;