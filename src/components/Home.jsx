import React from "react";
import "./Home.css";

const Home = ({ user, onNavigate }) => {
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
          <button onClick={() => onNavigate("events")}>Explore Events</button>
        </div>
        <div className="featured-content">
          <h3>Featured Content</h3>
          <p>Check out our latest events and updates.</p>
        </div>
        <div className="quick-links">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="#" onClick={() => onNavigate("profile")}>Profile</a></li>
            <li><a href="#" onClick={() => onNavigate("events")}>Events</a></li>
            <li><a href="#" onClick={() => onNavigate("bookmarks")}>Bookmarks</a></li>
            <li><a href="#" onClick={() => onNavigate("notifications")}>Notifications</a></li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Home;