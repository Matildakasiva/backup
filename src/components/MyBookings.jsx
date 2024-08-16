import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import './MyBookings.css'


import "./BackToEventsButton.css"; // Ensure this CSS file exists
import EventsNavbar from "./EventsNavbar"; // Import your navbar component

const MyBookings = () => {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to fetch bookings
  const fetchBookings = async () => {
    const session = JSON.parse(localStorage.getItem("session"));
    const token = session?.accessToken;

    if (!token) {
      navigate("/login"); // Redirect to login if no token is found
      return;
    }

    try {
      const response = await axios.get(
        "http://127.0.0.1:5555/bookings?user_specific=true",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (Array.isArray(response.data)) {
        // Ensure response is an array
        setBookings(response.data);
      } else {
        console.error("Unexpected response format:", response.data);
        setBookings([]);
      }
    } catch (error) {
      setError("Error fetching bookings. Please try again later.");
      console.error("Error fetching bookings:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, [navigate]); // This dependency array is correct for redirecting on token absence

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="my-bookings-list">
      <EventsNavbar />
      <h1>My Bookings</h1>
      {bookings.length === 0 ? (
        <div className="no-bookings-message">
          <p>You have not yet booked any events. Book now!</p>
          <Link to="/events">
            <button className="create-booking-button">Book Event</button>
          </Link>
        </div>
      ) : (
        <div className="bookings-list">
          {bookings.map((booking) => (
            <div key={booking.id} className="booking-item">
              {booking.event ? (
                <>
                  <img
                    src={booking.event.image_url } // Provide a real default image URL if possible
                    alt={booking.event.title || "No title"}
                  />
                  <h4>Event Name: {booking.event.title || "No title"}</h4>
                  <p>
                    Event Location: {booking.event.location || "No location"}
                  </p>
                  <p>
                    Event Start Date: {booking.event.start_date || "No start date"}
                  </p>
                </>
              ) : (
                <p>Event details not available</p>
              )}
            </div>
          ))}
        </div>
      )}
      <button
        className="back-to-events-button"
        onClick={() => navigate("/events")}
      >
        Back to Events
      </button>
    </div>
  );
};

export default MyBookings;
