// Register.jsx
import React, { useState } from "react";
import axios from "axios";
import "./styles.css";
const Register = ({ onRegisterSuccess }) => {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/register", formData);
      if (response.status === 201) {
        setMessage("Registration successful! Redirecting to login...");
        setTimeout(() => onRegisterSuccess(), 2000);
      } else {
        setMessage(response.data.message || "An error occurred.");
      }
    } catch (error) {
      setMessage("An unexpected error occurred.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Join Us Today!</h2>
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Enter Full Name"
        required
      />
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Enter Email"
        required
      />
      <input
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        placeholder="Enter Password"
        required
      />
      <button type="submit">Register</button>
      <p>{message}</p>
    </form>
  );
};

export default Register;
