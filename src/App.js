import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import EventsList from "./components/EventsList";
import BookmarksList from "./components/BookmarksList";
import NotificationsList from "./components/NotificationsList";

import Home from "./components/Home";
import Register from "./components/Register";
import Login from "./components/Login";
import EventDetails from "./components/EventDetails";
import "./components/styles.css";

const App = () => {
  const [view, setView] = useState("register"); // Start with the register page
  const [user, setUser] = useState({ id: null, name: "John Doe", email: "john.doe@example.com", joinedDate: "2023-01-01" });
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    // Fetch the logged-in user's data from the backend
    const fetchUserData = async () => {
      try {
        const response = await fetch('/api/auth/user');
        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const handleLogin = (userId, userName) => {
    setUser({ id: userId, name: userName });
    setView("home");
  };

  const handleLogout = () => {
    setUser(null);
    setView("login");
  };

  const handleRegisterSuccess = () => {
    setView("login");
  };

  const handleViewDetails = (event) => {
    setSelectedEvent(event);
    setView("eventDetails");
  };

  const handleBackToEvents = () => {
    setSelectedEvent(null);
    setView("events");
  };

  const handleUpdateUser = (updatedUser) => {
    setUser(updatedUser);
  };

  const renderView = () => {
    switch (view) {
      case "home":
        return <Home user={user} onNavigate={setView} />;
      case "login":
        return <Login onLogin={handleLogin} />;
      case "register":
        return <Register onRegisterSuccess={handleRegisterSuccess} onNavigateToLogin={() => setView("login")} />;
      case "events":
        return <EventsList onViewDetails={handleViewDetails} />;
      case "eventDetails":
        return <EventDetails event={selectedEvent} onBack={handleBackToEvents} />;
      case "bookmarks":
        return <BookmarksList />;
      case "notifications":
        return <NotificationsList />;
    
      default:
        return <Register onRegisterSuccess={handleRegisterSuccess} onNavigateToLogin={() => setView("login")} />;
    }
  };

  return (
    <div>
      {user.id && <Navbar onNavigate={setView} onLogout={handleLogout} />}
      {renderView()}
    </div>
  );
};

export default App;