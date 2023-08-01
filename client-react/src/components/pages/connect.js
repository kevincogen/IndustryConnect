import React, { useState, useEffect } from 'react';
import ProfileCard from '../partials/ProfileCard';
import { useAuth0 } from "@auth0/auth0-react";
import Navbar from "../partials/navbar"
import SearchBar from '../partials/searchbar';

const Connect = () => {
  const [profiles, setProfiles] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/api/profiles')
      .then(response => response.json())
      .then(data => setProfiles(data));
  }, []);

  return (
    <div>
      <Navbar />
      <SearchBar
        options={industries}
      />
      {profiles.map((profile, index) => 
        <ProfileCard key={index} profile={profile} />
      )}
    </div>
  );
};

export default Connect;

const industries = [
  "Information Technology",
  "Healthcare",
  "Finance",
  "Education",
  "Marketing",
  "Sales",
  "Engineering",
  "Human Resources",
  "Design",
  "Business Development",
  "Customer Service",
  "Project Management",
  "Consulting",
  "Media and Communication",
  "Legal Services",
  "Accounting",
  "Administration",
  "Research and Development",
  "Manufacturing",
  "Retail",
  "Hospitality and Tourism",
  "Real Estate",
  "Nonprofit and Social Services",
  "Government and Public Administration",
  "Art and Entertainment",
  "Science and Technology",
  "Environmental and Sustainability",
  "Transportation and Logistics",
  "Architecture and Construction",
  "Sports and Fitness"
];