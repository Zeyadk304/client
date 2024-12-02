import React, { useState } from "react";
import "./styles.css"; // Link to the CSS file for styling

const App = () => {
  const [isLoginPage, setIsLoginPage] = useState(false); // Toggle between Register and Login
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
  });
  const [message, setMessage] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [userId, setUserId] = useState(null); // Store user ID after successful login

  const categories = [
    { id: 1, name: "Music" },
    { id: 2, name: "Technology" },
    { id: 3, name: "Sports" },
    { id: 4, name: "Art" },
    { id: 5, name: "Business" },
    { id: 6, name: "Education" }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(""); // Clear previous messages

    try {
      const url = isLoginPage
        ? "http://localhost:5000/login"
        : "http://localhost:5000/register";
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage(data.message); // Success message
        if (!isLoginPage) {
          // After successful registration, switch to Login page
          setTimeout(() => setIsLoginPage(true), 2000);
        } else {
          setUserId(1); // Assume user ID is 1 for now after successful login
        }
      } else {
        setMessage(data.message || "An error occurred.");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("An unexpected error occurred.");
    }
  };

  const handleCategorySelect = (categoryName) => {
    setSelectedCategories((prevCategories) =>
      prevCategories.includes(categoryName)
        ? prevCategories.filter((name) => name !== categoryName)
        : [...prevCategories, categoryName]
    );
  };

  const handleSavePreferences = async () => {
    if (!selectedCategories.length) {
      alert("Please select at least one category.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/save_preferences", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: userId,
          preferences: selectedCategories, // Sending category names
        }),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Preferences saved successfully!");
      } else {
        alert(data.message || "Failed to save preferences");
      }
    } catch (error) {
      alert("An error occurred while saving preferences.");
    }
  };

  return (
    <div className="app-container">
      <div className="background-overlay"></div>
      <h1>Welcome to Event Management</h1>
      <div className="form-container">
        {userId ? (
          <div>
            <h2>Choose your event preferences</h2>
            {categories.map((category) => (
              <div key={category.id}>
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(category.name)} // Check for category name
                  onChange={() => handleCategorySelect(category.name)} // Pass category name
                />
                <label>{category.name}</label>
              </div>
            ))}
            <button onClick={handleSavePreferences}>Save Preferences</button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <h2>{isLoginPage ? "Login" : "Register"}</h2>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              required
            />
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              required
            />
            {!isLoginPage && (
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Name"
                required
              />
            )}
            <button type="submit">{isLoginPage ? "Login" : "Register"}</button>
            <p>{message}</p>
            <button onClick={() => setIsLoginPage(!isLoginPage)}>
              {isLoginPage ? "Don't have an account? Register" : "Already have an account? Login"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default App;
