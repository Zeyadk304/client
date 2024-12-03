import React, { useState } from "react";
import "./styles.css";

const App = () => {
  const [isLoginPage, setIsLoginPage] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
  });
  const [message, setMessage] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [userId, setUserId] = useState(null);
  const [successMessage, setSuccessMessage] = useState(""); // New state for success message

  const categories = [
    { id: 1, name: "Music" },
    { id: 2, name: "Technology" },
    { id: 3, name: "Sports" },
    { id: 4, name: "Art" },
    { id: 5, name: "Business" },
    { id: 6, name: "Education" },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

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
        setMessage(data.message);
        if (!isLoginPage) {
          setTimeout(() => setIsLoginPage(true), 2000);
        } else {
          setUserId(data.user_id);
        }
      } else {
        setMessage(data.message || "An error occurred.");
      }
    } catch (error) {
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
          preferences: selectedCategories,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        setSuccessMessage("Preferences saved successfully!"); // Show success message
        setTimeout(() => setSuccessMessage(""), 3000); // Hide after 3 seconds
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
      <h1>EventSphere</h1>
      <div className="form-container">
        {userId ? (
          <>
            <h2>Select Your Interests</h2>
            <div className="preferences-container">
              {categories.map((category) => (
                <div
                  key={category.id}
                  className={`preference-item ${
                    selectedCategories.includes(category.name) ? "selected" : ""
                  }`}
                  onClick={() => handleCategorySelect(category.name)}
                >
                  {category.name}
                </div>
              ))}
            </div>
            <button onClick={handleSavePreferences}>Save Preferences</button>
            {successMessage && (
              <div className="success-message">{successMessage}</div>
            )}
          </>
        ) : (
          <form onSubmit={handleSubmit}>
            <h2>{isLoginPage ? "Welcome Back!" : "Join Us Today!"}</h2>
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
            {!isLoginPage && (
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter Full Name"
                required
              />
            )}
            <button type="submit">
              {isLoginPage ? "Login" : "Register"}
            </button>
            <p>{message}</p>
            <a
              className="switch-link"
              onClick={() => setIsLoginPage(!isLoginPage)}
            >
              {isLoginPage
                ? "Don't have an account? Register"
                : "Already have an account? Login"}
            </a>
          </form>
        )}
      </div>
    </div>
  );
};

export default App;
