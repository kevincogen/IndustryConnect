import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginButton from './components/buttons/login-button';
import LogoutButton from './components/buttons/logout-button';
import Profile from './components/pages/profile';

function App() {
  return (
    <BrowserRouter>
    <LoginButton />
      <Routes>
        <Route path="/" element={<Profile/>} />
        {/* <Route path="/connect" element={<Connect/>} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;