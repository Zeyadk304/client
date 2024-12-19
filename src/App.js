import React, { useState } from "react";
import Login from "./components/Login";
import Register from "./components/Register";
import Profile from "./components/Profile";
import EventsList from "./components/EventsList";
import BookmarksList from "./components/BookmarksList";
import NotificationsList from "./components/NotificationsList";

const App = () => {
  const [userId, setUserId] = useState(null);
  const [view, setView] = useState("login"); // Tracks current view

  const handleLogin = (id) => {
    setUserId(id);
    setView("profile");
  };

  const handleRegisterSuccess = () => {
    setView("login");
  };

  const renderView = () => {
    switch (view) {
      case "login":
        return <Login onLogin={handleLogin} />;
      case "register":
        return <Register onRegisterSuccess={handleRegisterSuccess} />;
      case "profile":
        return (
          <>
            <Profile userId={userId} />
            <button onClick={() => setView("events")}>View Events</button>
            <button onClick={() => setView("bookmarks")}>View Bookmarks</button>
            <button onClick={() => setView("notifications")}>View Notifications</button>
          </>
        );
      case "events":
        return (
          <>
            <EventsList
              userId={userId}
              onBookmark={(eventId) => {
                console.log(`Bookmarking event ${eventId}`);
              }}
            />
            <button onClick={() => setView("profile")}>Back to Profile</button>
          </>
        );
      case "bookmarks":
        return (
          <>
            <BookmarksList
              userId={userId}
              onRemoveBookmark={(eventId) => {
                console.log(`Removing bookmark for event ${eventId}`);
              }}
            />
            <button onClick={() => setView("profile")}>Back to Profile</button>
          </>
        );
      case "notifications":
        return (
          <>
            <NotificationsList userId={userId} />
            <button onClick={() => setView("profile")}>Back to Profile</button>
          </>
        );
      default:
        return <Login onLogin={handleLogin} />;
    }
  };

  return <div className="app-container">{renderView()}</div>;
};

export default App;