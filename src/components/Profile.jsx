import React, { useState, useEffect } from 'react';
import './Profile.css';

const Profile = ({ userId, onUpdateUser }) => {
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/profile/${userId}`);
        if (response.ok) {
          const data = await response.json();
          setUser(data);
          setFormData({ name: data.name, email: data.email });
        } else {
          setMessage('Failed to fetch user data.');
        }
      } catch (error) {
        setMessage(`Error fetching user data: ${error.message}`);
      }
    };

    fetchUserData();
  }, [userId]);

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
        body: JSON.stringify({ user_id: userId, ...formData }),
      });

      if (response.ok) {
        const updatedUser = await response.json();
        setUser(updatedUser);
        setIsEditing(false);
        setMessage('Profile updated successfully.');
        onUpdateUser(updatedUser);
      } else {
        setMessage('Failed to update profile.');
      }
    } catch (error) {
      setMessage(`Error updating profile: ${error.message}`);
    }
  };

  if (!user) {
    return (
      <div className="profile-container">
        <p>{message || 'Failed to load user data.'}</p>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <div className="profile-card">
        <img src="https://via.placeholder.com/150" alt="Profile" className="profile-image" />
        {isEditing ? (
          <form onSubmit={handleSave} className="profile-form">
            <div className="form-group">
              <label>Name:</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>Email:</label>
              <input
                type="email"
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
        {message && <p className="message">{message}</p>}
      </div>
    </div>
  );
};

export default Profile;