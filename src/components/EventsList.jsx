import React from "react";

const EventsList = ({ userId, onBookmark }) => {
  // Dummy data for events
  const events = [
    { id: 1, name: "Event 1" },
    { id: 2, name: "Event 2" },
  ];

  return (
    <div>
      <h2>Events</h2>
      <ul>
        {events.map((event) => (
          <li key={event.id}>
            {event.name}
            <button onClick={() => onBookmark(event.id)}>Bookmark</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EventsList;