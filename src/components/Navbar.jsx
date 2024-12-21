import React from "react";
import "./styles.css";

const Navbar = ({ onNavigate, onLogout }) => {
  return (
    <div className="navbar">
      <div>
        <a href="#" onClick={() => onNavigate("home")}>Home</a>
        <a href="#" onClick={() => onNavigate("profile")}>Profile</a>
        <a href="#" onClick={() => onNavigate("events")}>Events</a>
        <a href="#" onClick={() => onNavigate("bookmarks")}>Bookmarks</a>
        <a href="#" onClick={() => onNavigate("notifications")}>Notifications</a>
      </div>
      <button onClick={onLogout}>Logout</button>
    </div>
  );
};

export default Navbar;