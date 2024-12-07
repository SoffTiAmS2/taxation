import React from 'react';
import './EventCard.css';

const EventCard = ({ event }) => (
  <div className="event-card">
    <img src={event.image || 'https://via.placeholder.com/200'} alt={event.title} />
    <h3>{event.title}</h3>
    <p>{event.date}</p>
    <p>{event.location}</p>
  </div>
);

export default EventCard;