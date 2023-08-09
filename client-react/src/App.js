import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Profile from './pages/profile';
import Connect from './pages/connect';
import Chat from './pages/chat';
import ResumeForm from './components/partials/resumeForm';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Profile/>} />
        <Route path="/connect" element={<Connect/>} />
        <Route path="/chat" element={<Chat/>} />
        <Route path='/resumeform' element={<ResumeForm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
