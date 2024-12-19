import React, { useState } from "react";
import "./styles.css";

const EventsList = ({ userId, onBookmark }) => {
  const [selectedEvent, setSelectedEvent] = useState(null);

  // Dummy data for events
  const events = [
    { id: 1, name: "Event 1", image: "/images/image.png", description: "Description for Event 1" },
    { id: 2, name: "Event 2", image: "/images/image.png", description: "Description for Event 2" },
    { id: 3, name: "Event 3", image: "/images/image.png", description: "Description for Event 3" },
    { id: 4, name: "Event 4", image: "/images/image.png", description: "Description for Event 4" },
    { id: 5, name: "Event 5", image: "/images/image.png", description: "Description for Event 5" },
    // Add more events as needed
  ];

  const handleEventClick = (event) => {
    setSelectedEvent(event);
  };

  const handleCloseModal = () => {
    setSelectedEvent(null);
  };

  return (
    <div className="events-container">
      <h2>Events</h2>
      <ul className="events-list">
        {events.map((event) => (
          <li key={event.id} className="event-item">
            <img src={event.image} alt={event.name} className="event-image" />
            <h3>{event.name}</h3>
            <button onClick={() => onBookmark(event.id)}>Bookmark</button>
            <button onClick={() => handleEventClick(event)}>View Details</button>
          </li>
        ))}
      </ul>

      {selectedEvent && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={handleCloseModal}>&times;</span>
            <h2>{selectedEvent.name}</h2>
            <img src={selectedEvent.image} alt={selectedEvent.name} className="modal-image" />
            <p>{selectedEvent.description}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventsList;