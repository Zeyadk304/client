import React, { useState } from "react";
import Login from "./Login";
import "./styles.css";

const Home = ({ onLogin }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = (userId) => {
    setIsLoggedIn(true);
    onLogin(userId);
  };

  return (
    <div className="home-container">
      {!isLoggedIn ? (
        <Login onLogin={handleLogin} />
      ) : (
        <div className="showcase">
          <h1>Welcome to EventBook!</h1>
          <p>Discover and book the best events around you.</p>
          <ul>
            <li>Explore a wide range of events</li>
            <li>Bookmark your favorite events</li>
            <li>Get notified about upcoming events</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Home;