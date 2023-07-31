import { useAuth0 } from "@auth0/auth0-react";
import ProfileForm from "./ProfileForm";

const CreateProfile = ({ setUserProfile }) => {
  const { user } = useAuth0();

  const initialValues = {
    first_name: user?.given_name || "",
    last_name: user?.family_name || "",
    email: user?.email || "",
    authentication_id: user?.sub || "",
    bio: "",
    education: "",
    experience: "",
    linkedin: "",
    twitter: "",
    github: "",
    facebook: "",
    website: "",
  };

  const handleCreateSubmit = async (values) => {
    
  
    try {
      const response = await fetch("/api/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values), 
      });

      if (response.ok) {
        const newUser = await response.json();
        console.log("User registered successfully:", newUser);
        setUserProfile(newUser);
      } else {
        const errorData = await response.json();
        console.error("Error registering user:", errorData.error);
      }
    } catch (error) {
      console.error("Error registering user - catch block:", error.message);
    }

  };


  return <ProfileForm initialValues={initialValues} onSubmit={handleCreateSubmit} />;
};

export default CreateProfile;
