import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import './Profile.css';

const Profile = ({ user, onUpdateUser, onNavigate, onLogout }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
  });

  useEffect(() => {
    setFormData({
      name: user.name || '',
      email: user.email || '',
    });
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:5000/profile/update`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user_id: user.id, ...formData }),
      });

      if (response.ok) {
        const updatedUser = await response.json();
        onUpdateUser(updatedUser);
        setIsEditing(false);
      } else {
        const errorData = await response.json();
        console.log('Error updating profile:', errorData);
      }
    } catch (error) {
      console.log('Error updating profile:', error);
    }
  };

  return (
    <div className="profile-page">
      <Navbar onNavigate={onNavigate} onLogout={onLogout} />
      <div className="profile-container">
        <div className="profile-card">
          <img src="https://via.placeholder.com/150" alt="Profile" className="profile-image" />
          {isEditing ? (
            <form onSubmit={handleSave} className="profile-form">
              <div className="form-group">
                <label htmlFor="name">Name:</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>
              <button type="submit" className="save-button">Save</button>
              <button type="button" className="cancel-button" onClick={() => setIsEditing(false)}>Cancel</button>
            </form>
          ) : (
            <>
              <p>Name: {user.name}</p>
              <p>Email: {user.email}</p>
              <button onClick={() => setIsEditing(true)} className="edit-button">Edit</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;