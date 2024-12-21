import React, { useState, useEffect } from 'react';
import './Profile.css';

const Profile = ({ userId, onUpdateUser }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    joinedDate: '',
    phoneNumber: '',
    address: '',
    profilePictureUrl: '',
  });

  useEffect(() => {
    // Fetch user data from the backend
    const fetchUserData = async () => {
      try {
        const response = await fetch(`/api/users/${userId}`);
        const data = await response.json();
        setFormData({
          name: data.name,
          email: data.email,
          joinedDate: data.joinedDate,
          phoneNumber: data.phoneNumber || '',
          address: data.address || '',
          profilePictureUrl: data.profilePictureUrl || 'https://via.placeholder.com/150',
        });
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [userId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/users/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const updatedUser = await response.json();
      onUpdateUser(updatedUser);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating user data:', error);
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-card">
        <img src={formData.profilePictureUrl} alt="Profile" className="profile-image" />
        {isEditing ? (
          <form onSubmit={handleSubmit} className="profile-form">
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
            <div className="form-group">
              <label>Joined Date:</label>
              <input
                type="text"
                name="joinedDate"
                value={formData.joinedDate}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>Phone Number:</label>
              <input
                type="text"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>Address:</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>Profile Picture URL:</label>
              <input
                type="text"
                name="profilePictureUrl"
                value={formData.profilePictureUrl}
                onChange={handleInputChange}
              />
            </div>
            <button type="submit" className="save-button">Save</button>
            <button type="button" className="cancel-button" onClick={() => setIsEditing(false)}>Cancel</button>
          </form>
        ) : (
          <>
            <h2>{formData.name}</h2>
            <p>Email: {formData.email}</p>
            <p>Joined: {formData.joinedDate}</p>
            <p>Phone Number: {formData.phoneNumber}</p>
            <p>Address: {formData.address}</p>
            <button className="edit-profile-button" onClick={() => setIsEditing(true)}>Edit Profile</button>
          </>
        )}
      </div>
    </div>
  );
};

export default Profile;