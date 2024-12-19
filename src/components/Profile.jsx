import React from "react";
import "./styles.css";

const Profile = ({ user, onLogout }) => {
  return (
    <div>
      <h1>Welcome, {user.name}</h1>
      {/* Add more profile details here */}
      <button onClick={onLogout}>Logout</button>
    </div>
  );
};

export default Profile;