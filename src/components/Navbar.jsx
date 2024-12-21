import React from 'react';
import './Navbar.css';

const Navbar = ({ onNavigate, onLogout }) => {
  return (
    <nav className="navbar">
      <ul>
        <li><button onClick={() => onNavigate('home')}>Home</button></li>
        <li><button onClick={() => onNavigate('events')}>Events</button></li>
        <li><button onClick={() => onNavigate('bookmarks')}>Bookmarks</button></li>
        <li><button onClick={() => onNavigate('notifications')}>Notifications</button></li>
        <li><button onClick={() => onNavigate('profile')}>Profile</button></li>
        <li><button onClick={onLogout}>Logout</button></li>
      </ul>
    </nav>
  );
};

export default Navbar;