import React from 'react';
import { Link } from 'react-router-dom';
import './EventsNavbar.css'; // Import the CSS file for styling

const EventsNavbar = () => {
  return (
    <nav className="event-navbar">
      <ul className="event-navbar-list">
        <li className="event-navbar-item">
          <Link to="/events" className="event-navbar-link">Events</Link>
        </li>
        <li className="event-navbar-item">
          <Link to="/create-event" className="event-navbar-link">Create Event</Link>
        </li>
        <li className="event-navbar-item">
          <Link to="/my-events" className="event-navbar-link">My Events</Link>
        </li>
        <li className="event-navbar-item">
          <Link to="/my-bookings" className="event-navbar-link">My Bookings</Link>
        </li>
      </ul>
    </nav>
  );
};

export default EventsNavbar;
