import React, { useState } from "react";
import "./styles.css";

const Navbar = ({ onSearch, onNavigate, onLogout }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  const toggleProfileMenu = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo" onClick={() => onNavigate("home")}>
        EventBook
      </div>
      <div className="navbar-links">
        <button onClick={() => onNavigate("events")}>Events</button>
        <button onClick={() => onNavigate("bookmarks")}>Bookmarks</button>
        <button onClick={() => onNavigate("notifications")}>Notifications</button>
        <div className="profile-menu">
          <button onClick={toggleProfileMenu}>Profile</button>
          {isProfileMenuOpen && (
            <div className="dropdown-menu">
              <button onClick={() => onNavigate("profile")}>View Profile</button>
              <button onClick={onLogout}>Logout</button>
            </div>
          )}
        </div>
      </div>
      <form onSubmit={handleSearchSubmit} className="search-form">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search..."
        />
        <button type="submit">Search</button>
      </form>
    </nav>
  );
};

export default Navbar;