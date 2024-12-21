import React from "react";
import "./EventsList.css";

const EventsList = ({ onViewDetails, onAddBookmark }) => {
  const events = [
    {
      id: 1,
      title: 'Music Concert',
      description: 'Join us for an evening of live music and entertainment. Enjoy performances by top artists and bands, and experience the thrill of live music in an electrifying atmosphere.',
      date: '2023-10-01',
      location: 'New York, NY',
      imageUrl: 'https://via.placeholder.com/300x200'
    },
    {
      id: 2,
      title: 'Art Exhibition',
      description: 'Explore the latest art pieces from local artists. Discover a diverse range of artworks, from paintings to sculptures, and meet the artists behind the creations.',
      date: '2023-11-15',
      location: 'Los Angeles, CA',
      imageUrl: 'https://via.placeholder.com/300x200'
    },
    {
      id: 3,
      title: 'Tech Conference',
      description: 'Join industry leaders to discuss the latest in technology. Attend keynote sessions, panel discussions, and workshops to stay updated on the newest trends and innovations.',
      date: '2023-12-05',
      location: 'San Francisco, CA',
      imageUrl: 'https://via.placeholder.com/300x200'
    },
    {
      id: 4,
      title: 'Food Festival',
      description: 'Taste dishes from around the world at our annual food festival. Enjoy a variety of cuisines, cooking demonstrations, and food-related activities for all ages.',
      date: '2024-01-20',
      location: 'Chicago, IL',
      imageUrl: 'https://via.placeholder.com/300x200'
    },
    {
      id: 5,
      title: 'Book Fair',
      description: 'Discover new books and meet your favorite authors. Attend book signings, readings, and panel discussions with authors and literary experts.',
      date: '2024-02-10',
      location: 'Boston, MA',
      imageUrl: 'https://via.placeholder.com/300x200'
    },
    {
      id: 6,
      title: 'Film Festival',
      description: 'Watch the latest independent films from around the world. Enjoy screenings, Q&A sessions with filmmakers, and networking opportunities with industry professionals.',
      date: '2024-03-15',
      location: 'Austin, TX',
      imageUrl: 'https://via.placeholder.com/300x200'
    }
  ];

  return (
    <div className="events-container">
      {events.map(event => (
        <div key={event.id} className="event-card">
          <img src={event.imageUrl} alt={event.title} />
          <h3>{event.title}</h3>
          <p>{event.description}</p>
          <p><strong>Date:</strong> {event.date}</p>
          <p><strong>Location:</strong> {event.location}</p>
          <button onClick={() => onViewDetails(event)}>View Details</button>
          <button onClick={() => onAddBookmark(event)}>Bookmark</button>
        </div>
      ))}
    </div>
  );
};

export default EventsList;