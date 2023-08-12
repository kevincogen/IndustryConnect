import React from "react";
import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { createProfile, updateProfile, getProfile } from "./profie-api";
import LoginButton from "../components/buttons/login-button";
import ProfileCard from "../components/partials/ProfileCard";
import Sidebar from "../components/partials/ConnectSideBar";
import ResumeForm from "../components/partials/resumeForm";
import ResumeAI from "../components/partials/resumeAI";

import {
  TextField,
  Avatar,
  CssBaseline,
  Typography,
  Container,
  Grid,
  Button,
} from "@mui/material";
import Navbar from "../components/partials/navbar"

const Profile = () => {
  const { user, isLoading, logout } = useAuth0();

  const [userProfile, setUserProfile] = useState({
    // Initialize the userProfile with default values
    first_name: "",
    last_name: "",
    email: "",
    authentication_id: "",
    profile_picture: "",
    bio: "",
    education: "",
    experience: "",
    linkedin: "",
    twitter: "",
    github: "",
    facebook: "",
    website: "",
    industry: "",
  });

  // Separate state for form data
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    bio: "",
    education: "",
    experience: "",
    linkedin: "",
    twitter: "",
    github: "",
    facebook: "",
    website: "",
    industry: "",
  });

  useEffect(() => {
    if (!isLoading && user) {
      const fetchUserProfile = async () => {
        try {
          // Fetch user profile from API
          const userProfileData = await getProfile(user.sub);
          // Fetch user info from the endpoint
          const userInfoResponse = await fetch(
            `/api/users/profile?authentication_id=${user.sub}`
          );
          const userInfo = await userInfoResponse.json();

          // Merge user profile and user info data
          const mergedUserProfile = {
            ...userProfileData,
            ...userInfo,
            first_name: user.given_name || "",
            last_name: user.family_name || "",
            email: user.email || "",
            authentication_id: user.sub || "",
            profile_picture: user.picture || "",
          };

          setUserProfile(mergedUserProfile);
          setFormData(mergedUserProfile); // Initialize form data with user profile data
        } catch (error) {
          console.error("Error fetching user profile:", error);
        }
      };

      fetchUserProfile();
    }
  }, [isLoading, user]);

  //Edit Mode/Presentation Mode 

  const [isEditMode, setIsEditMode] = useState(false)
  const toggleEditMode = () => {
    setIsEditMode(!isEditMode);
  }

  const handleUpdateSuccess = (newProfile) => {
    setUserProfile(newProfile);
    setFormData(newProfile); // Update form data with new user profile
    setIsEditMode(false);   // Switch back to presentation mode
  };


  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const values = {
      first_name: formData.first_name,
      last_name: formData.last_name,
      email: formData.email,
      profile_picture: formData.profile_picture,
      bio: formData.bio,
      education: formData.education,
      experience: formData.experience,
      linkedin: formData.linkedin,
      twitter: formData.twitter,
      github: formData.github,
      facebook: formData.facebook,
      website: formData.website,
      industry: formData.industry,
    };

    try {
      if (userProfile.authentication_id && !userProfile.created_at) {
        // New profile is being created
        const newUserProfile = await createProfile({
          ...values,
          authentication_id: userProfile.authentication_id,
        });
        if (newUserProfile) {
          setUserProfile(newUserProfile);
          setFormData(newUserProfile); // Update form data with new user profile
        }
      } else if (userProfile.created_at) {
        // Profile is being updated
        const updatedUserProfile = await updateProfile({
          ...values,
          authentication_id: userProfile.authentication_id,
        });
        if (updatedUserProfile) {
          handleUpdateSuccess(updatedUserProfile);
        }
        
      } 
    } catch (error) {
      console.error("Error updating user profile:", error);
    }
  };

return (
  <>
    <Navbar />
    
    <div className="master-body">
      {/* Sidebar */}

      {/* Main Body */}
          {isEditMode ? (
            <div className="page-body-editprofile">
              <div className="edit-profile">
                <Container component="main" direction="column">
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Avatar value={userProfile.profile_picture}></Avatar>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography component="h1" variant="h5" name={user?.name}>
                      {user?.name}
                    </Typography>
                  </Grid>
                </Grid>
        
                <form onSubmit={handleSubmit} noValidate>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        name="first_name"
                        variant="standard"
                        required
                        id="firstName"
                        helperText="First Name"
                        placeholder={userProfile.first_name || "First Name"}
                        value={formData.first_name}
                        onChange={handleChange}
                      />
                    </Grid>
        
                    <Grid item xs={12} sm={6}>
                      <TextField
                        variant="standard"
                        required
                        id="lastName"
                        helperText="Last Name"
                        name="last_name"
                        placeholder={userProfile.last_name || "Last Name"}
                        value={formData.last_name}
                        onChange={handleChange}
                      />
                    </Grid>
        
                    <Grid item xs={12}>
                      <TextField
                        multiline
                        variant="standard"
                        name="bio"
                        helperText="Please write a short bio describing yourself to potential connections"
                        type="text"
                        id="bio"
                        placeholder={userProfile.bio || "Short Bio"}
                        value={formData.bio}
                        onChange={handleChange}
                      />
                    </Grid>
        
                    <Grid item xs={12}>
                      <TextField
                        variant="standard"
                        required
                        id="email"
                        helperText="Email Address"
                        name="email"
                        placeholder={userProfile.email || "Email Address"}
                        value={formData.email}
                        onChange={handleChange}
                      />
                    </Grid>
        
                    <Grid item xs={12}>
                      <TextField
                        variant="standard"
                        name="industry"
                        helperText="Industry"
                        type="text"
                        id="industry"
                        placeholder={userProfile.industry || "Industry"}
                        value={formData.industry}
                        onChange={handleChange}
                      />
                    </Grid>
        
                    <Grid item xs={12}>
                      <TextField
                        variant="standard"
                        name="experience"
                        helperText="Professional Title"
                        type="text"
                        id="experience"
                        placeholder={userProfile.experience || "Professional Title"}
                        value={formData.experience}
                        onChange={handleChange}
                      />
                    </Grid>
        
                    <Grid item xs={12}>
                      <TextField
                        variant="standard"
                        name="education"
                        helperText="Education"
                        type="text"
                        id="education"
                        placeholder={userProfile.education || "Education"}
                        value={formData.education}
                        onChange={handleChange}
                      />
                    </Grid>
        
                    <Grid item xs={12}>
                      <TextField
                        variant="standard"
                        name="linkedin"
                        helperText="Linkedin URL"
                        type="text"
                        id="Linkedin"
                        placeholder={userProfile.linkedin || "Linkedin URL"}
                        value={formData.linkedin}
                        onChange={handleChange}
                      />
                    </Grid>
                    
                    <Grid item xs={12}>
                      <TextField
                        variant="standard"
                        name="twitter"
                        helperText="Twitter URL"
                        type="text"
                        id="Twitter"
                        placeholder={userProfile.twitter || "Twitter Handle"}
                        value={formData.twitter}
                        onChange={handleChange}
                      />
                    </Grid>
        
                    <Grid item xs={12}>
                      <TextField
                        variant="standard"
                        name="github"
                        helperText="Github URL"
                        type="text"
                        id="Linkedin"
                        placeholder={userProfile.github || "Github URL"}
                        value={formData.github}
                        onChange={handleChange}
                      />
                    </Grid>
        
                    <Grid item xs={12}>
                      <TextField
                        variant="standard"
                        name="facebook"
                        helperText="Facebook URL"
                        type="text"
                        id="Facebook"
                        placeholder={userProfile.facebook || "Facebook URL"}
                        value={formData.facebook}
                        onChange={handleChange}
                      />
                    </Grid>
        
                    <Grid item xs={12}>
                      <TextField
                        variant="standard"
                        name="website"
                        helperText="Website URL"
                        type="text"
                        id="Website"
                        placeholder={userProfile.website || "Website URL"}
                        value={formData.website}
                        onChange={handleChange}
                      />
                    </Grid>
                  </Grid>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <Button 
                        type="submit" 
                        variant="contained" 
                        color="primary"
                      >
                        Update Profile
                      </Button>
                    </Grid>
        
                    <Grid item xs={12} sm={6}>
                      <Button
                        onClick={() =>
                          logout({ logoutParams: { returnTo: window.location.origin } })
                        }
                      >
                        Logout
                      </Button>
                    </Grid>
                  </Grid>
                </form>
            </Container>
        </div>
        <div className="edit-resume">
          <ResumeForm />
        </div>
        </div>
      ) : (
        <div className="page-body-showprofile">
            <Container component="main" maxWidth="lg" direction="column">
              <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                  <Avatar src={userProfile.profile_picture} style={{ width: 200, height: 200 }} />
                  <Typography component="h1" variant="h4" style={{ marginTop: 10 }}>
                    {`${userProfile.first_name} ${userProfile.last_name}`}
                  </Typography>
                  <Typography variant="subtitle1" color="textSecondary">
                    {userProfile.experience}
                  </Typography>
                </Grid>
                <Grid item xs={12} md={8}>
                  <Typography variant="h6">Bio:</Typography>
                  <Typography paragraph>{userProfile.bio}</Typography>
                  <Typography variant="h6">Education:</Typography>
                  <Typography paragraph>{userProfile.education}</Typography>
                  <Typography variant="h6">Industry:</Typography>
                  <Typography paragraph>{userProfile.industry}</Typography>
                  <Typography variant="h6">Links:</Typography>
                  {userProfile.linkedin && <Typography paragraph><a href={userProfile.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a></Typography>}
                  {userProfile.twitter && <Typography paragraph><a href={userProfile.twitter} target="_blank" rel="noopener noreferrer">Twitter</a></Typography>}
                  {userProfile.github && <Typography paragraph><a href={userProfile.github} target="_blank" rel="noopener noreferrer">Github</a></Typography>}
                  {userProfile.facebook && <Typography paragraph><a href={userProfile.facebook} target="_blank" rel="noopener noreferrer">Facebook</a></Typography>}
                  {userProfile.website && <Typography paragraph><a href={userProfile.website} target="_blank" rel="noopener noreferrer">Website</a></Typography>}
                </Grid>
              </Grid>  
              <ResumeForm />
              <Grid container spacing={2}>
            {userProfile.authentication_id && userProfile.created_at && (
              <Grid item xs={12} sm={6}>
                <Button onClick={toggleEditMode}>
                  Update Profile
                </Button>
              </Grid>
            )}
            <Grid item xs={12} sm={6}>
              <Button
                onClick={() =>
                  logout({ logoutParams: { returnTo: window.location.origin } })
                }
              >
                Logout
              </Button>
            </Grid>
          </Grid>
        <LoginButton />
        </Container>
        </div>
      )}
    </div>
  </>
);
};

export default Profile;
