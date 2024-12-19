import React, { useState } from "react";

import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import Profile from "./components/Profile";
import EventsList from "./components/EventsList";
import BookmarksList from "./components/BookmarksList";
import NotificationsList from "./components/NotificationsList";
import Navbar from "./components/Navbar";

const App = () => {
  const [user, setUser] = useState({ id: null, name: "" });
  const [view, setView] = useState("home"); // Default to home view
  const [searchResults, setSearchResults] = useState([]);

  const handleLogin = (id, name) => {
    setUser({ id, name });
    setView("profile");
  };

  const handleRegisterSuccess = () => {
    setView("login");
  };

  const handleLogout = () => {
    setUser({ id: null, name: "" });
    setView("home");
  };

  const handleSearch = (query) => {
    // Implement search functionality here
    console.log(`Searching for: ${query}`);
    // Example: setSearchResults([...]);
  };

  const renderView = () => {
    switch (view) {
      case "home":
        return <Home onLogin={handleLogin} />;
      case "login":
        return <Login onLogin={handleLogin} />;
      case "register":
        return <Register onRegisterSuccess={handleRegisterSuccess} />;
      case "profile":
        return <Profile user={user} onLogout={handleLogout} />;
      case "events":
        return <EventsList userId={user.id} onBookmark={(eventId) => console.log(`Bookmarking event ${eventId}`)} />;
      case "bookmarks":
        return <BookmarksList userId={user.id} onRemoveBookmark={(eventId) => console.log(`Removing bookmark for event ${eventId}`)} />;
      case "notifications":
        return <NotificationsList userId={user.id} />;
      default:
        return <Home onLogin={handleLogin} />;
    }
  };

  return (
    <div className="app-container">
      {user.id && <Navbar onSearch={handleSearch} onNavigate={setView} onLogout={handleLogout} />}
      {renderView()}
    </div>
  );
};

export default App;