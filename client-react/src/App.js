import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Profile from './components/pages/profile';
import Connect from './components/pages/connect';

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
