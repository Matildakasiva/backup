import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './EventsPage.css';
import EventsNavbar from './EventsNavbar';


const EventsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  console.log(events.length);

  
    const fetchEvents = async () => {
      const session = JSON.parse(localStorage.getItem('session'));
      const token=session && session.accessToken
      console.log('Retrieved token:', token);
      

      if (!token) {
        navigate('/');
        return;
      }

      try {
        const response = await fetch('http://127.0.0.1:5555/events', {
          headers: {
            "METHOD": "GET",
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          console.log('Response status:', response.status);
          if (response.status === 401) {
            navigate('/');
          } else {
            throw new Error('Failed to fetch events');
          }
        }

        const data = await response.json();
      
        setEvents(data);
       
      } catch (error) {
        setError(error.message);
        console.error('Error fetching events:', error);
      } finally {
        setLoading(false);
      }
    };
    useEffect(() => {
      fetchEvents();
    }, [navigate]); 

  // const filteredevents = events.filter(event =>
  //   event.name && event.name.toLowerCase().includes(searchQuery.toLowerCase())
  // );

  return (
    <div className="events-page">
      <div>
        <EventsNavbar/>
      </div>
      <div className="header">
        {/* <input
          type="text"
          className="search-bar"
          placeholder="Search events..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        /> */}
        {/* <div className="auth-buttons">
          <Link to="/login" className="auth-button">Login</Link>
          <Link to="/signup" className="auth-button">Sign Up</Link>
        </div> */}
      </div>
      {/* <div className="event-controls">
        <Link to="/create-event" className="create-event-button">Create Event</Link>
        <Link to="/my-events" className="my-events-button">My Events List</Link>
      </div> */}
      <div className="events-list">
        {loading && <p>Loading events...</p>}
        {error && <p>{error}</p>}
        {events.length > 0 ? (
          events.map(event => (
            <div key={event.id} className="event-card">
              <img src={event.image_url} alt={event.name} className="event-image" />
              <div className="event-details">
                <h3 className="event-title">{event.name}</h3>
                <p className="event-description">{event.details}</p>
                <div className="event-actions">
                  <Link to={`/events/${event.id}`} className="details-link">View Details</Link>
                  {/* <button
                    className="booking-button"
                    onClick={() => navigate(`/events/${event.id}/book`)}
                  >
                    Book Now
                  </button> */}
                </div>
              </div>
            </div>
          ))
        ) : (
          !loading && <p>No events found.</p>
        )}
      </div>
    </div>
  );
};

export default EventsPage;




