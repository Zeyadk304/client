import React, { useState } from "react";
import "./Home.css";

const Home = ({ user, onNavigate }) => {
  const [loading, setLoading] = useState(false);

  const handleNavigate = (destination) => {
    setLoading(true);
    onNavigate(destination);
  };

  // Function to extract username from email
  const getUsername = (email) => {
    if (!email) return "";
    return email.split("@")[0];
  };

  return (
    <div className="home-container">
      <div className="home-content">
        <div className="hero-section">
          <h1>Welcome {user.name ? `back, ${getUsername(user.name)}` : "to Our Website"}!</h1>
          <p>Explore our features and enjoy your stay.</p>
          <button onClick={() => handleNavigate("events")}>Explore Events</button>
        </div>
        <div className="featured-content">
          <h3>Featured Content</h3>
          <p>Check out our latest events and updates.</p>
        </div>
        <div className="quick-links">
          <h3>Quick Links</h3>
          <ul>
            <li>
              <a href="#" onClick={() => handleNavigate("profile")}>
                {loading ? "Loading..." : "Profile"}
              </a>
            </li>
            <li><a href="#" onClick={() => handleNavigate("events")}>Events</a></li>
            <li><a href="#" onClick={() => handleNavigate("bookmarks")}>Bookmarks</a></li>
            <li><a href="#" onClick={() => handleNavigate("notifications")}>Notifications</a></li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Home;