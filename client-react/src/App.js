import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Profile from './pages/profile';
import Connect from './pages/connect';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Profile/>} />
        <Route path="/connect" element={<Connect/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
