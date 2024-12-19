import React, { useState } from "react";
import axios from "axios";
import "./styles.css";

const Login = ({ onLogin }) => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/login", formData);
      if (response.status === 200) {
        setMessage("Login successful!");
        onLogin(response.data.user_id, response.data.user_name);
      } else {
        setMessage(response.data.message || "An error occurred.");
      }
    } catch (error) {
      setMessage("An unexpected error occurred.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Welcome Back!</h2>
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
      <button type="submit">Login</button>
      <p>{message}</p>
    </form>
  );
};

export default Login;