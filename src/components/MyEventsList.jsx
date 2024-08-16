import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify'; // Import toastify
import 'react-toastify/dist/ReactToastify.css'; // Import toastify styles
import './MyEventsList.css';
import './BackToEventsButton.css';
import EventsNavbar from './EventsNavbar';
import EventEditModal from './EventListModal';

const MyEventsList = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState(null);

  const getTokenAndUserId = () => {
    const session = JSON.parse(localStorage.getItem('session'));
    return {
      token: session?.accessToken,
      userId: session?.user?.id,
    };
  };

  const fetchEvents = async () => {
  const { token, userId } = getTokenAndUserId();

  if (!token || !userId) {
    navigate('/login');
    return;
  }

  try {
    const response = await axios.get('http://127.0.0.1:5555/events', {
      params: { user_specific: true }, // Add user_specific query parameter
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (Array.isArray(response.data)) {
      setEvents(response.data);
    } else {
      console.error('Unexpected response format:', response.data);
      setEvents([]);
    }
  } catch (error) {
    toast.error('Error fetching events.'); // Show error toast
    console.error('Error fetching events:', error.response ? error.response.data : error);
  } finally {
    setLoading(false);
  }
};


  useEffect(() => {
    fetchEvents();
  }, []);

  const handleEdit = (eventId) => {
    setSelectedEventId(eventId);
    setShowModal(true);
  };

  const handleDelete = async (eventId) => {
    const { token, userId } = getTokenAndUserId();
  
    if (!token || !userId) {
      navigate('/login');
      return;
    }
  
    try {
      await axios.delete(`http://127.0.0.1:5555/events/${eventId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // Optionally update the UI to reflect the deletion
      setEvents(events.filter(event => event.id !== eventId));
      toast.success('Event deleted successfully.'); // Show success toast
    } catch (error) {
      const errorMsg = error.response?.data?.error || 'Error deleting event.';
      toast.error(errorMsg); // Show error toast
      console.error('Error deleting event:', errorMsg);
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
    fetchEvents(); // Refresh the event list after closing the modal
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="my-events-list">
      <EventsNavbar />
      <h1>My Events List</h1>
      {events.length === 0 ? (
        <div className="no-events-message">
          <p>You have no events yet. Create your first event!</p>
          <Link to="/create-event">
            <button className="create-event-button">Create Event</button>
          </Link>
        </div>
      ) : (
        <div className="events-list">
          {events.map((event) => (
            <div key={event.id} className="event-item">
              <img src={event.image_url} alt={event.title} />
              <h4>Name: {event.title}</h4>
              <button onClick={() => handleEdit(event.id)} className="edit-button">
                Edit
              </button>
              <button onClick={() => handleDelete(event.id)} className="remove-button">
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
      <button className="back-to-events-button" onClick={() => navigate("/events")}>
        Back to Events
      </button>

      <EventEditModal
        show={showModal}
        onHide={handleModalClose}
        eventId={selectedEventId}
        onUpdate={fetchEvents} // Fetch events again to refresh the list
      />
      
      {/* Toast Container for Notifications */}
      <ToastContainer />
    </div>
  );
};

export default MyEventsList;
