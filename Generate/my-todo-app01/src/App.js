import React, { useState } from 'react';
import './App.css';
import Todo from './Todo';
import Login from './Login';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <div className="App">
      {!isLoggedIn ? (
        <Login setIsLoggedIn={setIsLoggedIn} />
      ) : (
        <div className="dashboard">
          <div className="header">
            <h1>Todo Application</h1>
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </div>
          <Todo />
        </div>
      )}
    </div>
  );
}

export default App;
