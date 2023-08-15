
export async function createProfile(userProfile) {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_SERVER_URL}/api/users/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userProfile),
    });

    if (response.ok) {
      const newUser = await response.json();
      console.log("User registered successfully:", newUser);
      return newUser;
    } else {
      const errorData = await response.json();
      console.error("Error registering user:", errorData.error);
      return null;
    }
  } catch (error) {
    console.error("Error registering user:", error.message);
    return null;
  }
}


export async function updateProfile(userProfile) {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_SERVER_URL}/api/users/update`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userProfile),
    });

    if (response.ok) {
      const updatedUser = await response.json();
      console.log("User profile updated successfully:", updatedUser);
      return updatedUser;
    } else {
      const errorData = await response.json();
      console.error("Error updating user profile:", errorData.error);
      return null;
    }
  } catch (error) {
    console.error("Error updating user profile:", error.message);
    return null;
  }
}

export async function getProfile(authenticationId) {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_SERVER_URL}/api/users/profile?authentication_id=${authenticationId}`);

    if (response.ok) {
      const userProfile = await response.json();
      console.log("User profile retrieved successfully:", userProfile);
      return userProfile;
    } else {
      const errorData = await response.json();
      console.error("Error retrieving user profile:", errorData.error);
      return null;
    }
  } catch (error) {
    console.error("Error retrieving user profile:", error.message);
    return null;
  }
}