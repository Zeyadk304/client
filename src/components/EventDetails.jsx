import React from "react";
import "./EventDetails.css";

const EventDetails = ({ event, onBack }) => {
  if (!event) return null;

  return (
    <div className="event-details-container">
      <button className="back-button" onClick={onBack}>Back to Events</button>
      <div className="event-details">
        <img src={event.imageUrl} alt={event.title} />
        <h2>{event.title}</h2>
        <p><strong>Date:</strong> {event.date}</p>
        <p><strong>Location:</strong> {event.location}</p>
        <p><strong>Description:</strong> {event.description}</p>
        {/* Add more event details here */}
      </div>
    </div>
  );
};

export default EventDetails;