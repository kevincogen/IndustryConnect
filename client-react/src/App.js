import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Profile from './pages/profile';
import Connect from './pages/connect';
import Chat from './pages/chat';
import ResumeForm from './components/partials/resumeForm';
import { useState } from 'react';
import Login from './pages/Login';

function App() {
  const [result, setResult] = useState({});
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/profile" element={<Profile/>} />
        <Route path="/connect" element={<Connect/>} />
        <Route path="/chat" element={<Chat/>} />
        <Route path='/resumeform' element={<ResumeForm result={result} setResult={setResult} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
