import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Navbar from '../components/partials/navbar';
import LoginButton from "../components/buttons/login-button";
import backgroundImage from '../images/human-resources-concept-with-people.jpeg';
import logoImage from '../images/logo.png';

const Login = () => {
  return (
    <div
      className="master-body"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Navbar />
      <div className="page-body-logo">
        <div className="login-card">
        <img className="landing-logo"
          src={logoImage}
          alt="Logo"/>  
        <LoginButton />
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          bottom: "10px",
          right: "10px",
          fontSize: "12px",
          color: "white",
          textShadow: "1px 1px 2px rgba(0, 0, 0, 0.5)",
        }}
      >
        Image by{" "}
        <a
          href="https://www.freepik.com/free-photo/human-resources-concept-with-people_42089126.htm#query=networking&position=1&from_view=search&track=sph"
          style={{ color: "white" }}
        >
          Freepik
        </a>{" "}
      </div>
    </div>
  );
};

export default Login;
