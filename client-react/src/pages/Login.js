import { useAuth0 } from "@auth0/auth0-react";
import Navbar from '../components/partials/navbar';
import LoginButton from "../components/buttons/login-button";

const Login = () => {
  return (
    <div className="master-body">
          <Navbar />
      <div className="page-body">
      <LoginButton />
      </div>
    </div>
  )
};

export default Login;