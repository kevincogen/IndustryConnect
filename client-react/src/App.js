import './App.css';
import LoginButton from './components/buttons/login-button';
import LogoutButton from './components/buttons/logout-button';
import Profile from './components/pages/profile';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        IndustryConnect Skeleton
        <LoginButton />
        <LogoutButton />
        <Profile />
      </header>
    </div>
  );
}

export default App;