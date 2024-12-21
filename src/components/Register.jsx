import React, { useState } from 'react';
import './Register.css';

const Register = ({ onRegisterSuccess, onNavigateToLogin }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phoneNumber: '',
    address: '',
    profilePictureUrl: 'https://via.placeholder.com/150',
  });
  const [message, setMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setMessage('Registration successful! Redirecting to login...');
        setTimeout(() => {
          onRegisterSuccess();
        }, 2000);
      } else {
        const errorData = await response.json();
        setMessage(`Registration failed: ${errorData.message}`);
      }
    } catch (error) {
      setMessage(`Error registering user: ${error.message}`);
    }
  };

  return (
    <div className="register-container">
      <form onSubmit={handleSubmit} className="register-form">
        <h2>Register</h2>
        {message && <p className="message">{message}</p>}
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            required
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
        <button type="submit" className="register-button">Register</button>
        <button type="button" className="login-button" onClick={onNavigateToLogin}>Already have an account? Login</button>
      </form>
    </div>
  );
};

export default Register;