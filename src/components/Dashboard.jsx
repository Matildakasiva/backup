import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDetails } from '../redux/dashboard/dashboard';
import './Dashboard.css';
import Loading from './Loading';

const Dashboard = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchDetails());
  }, [dispatch]);

  const { loading, details } = useSelector((state) => state.details);

  if (loading) {
    return <Loading />;
  }

  if (!details) {
    return <div>No details available</div>;
  }

  return (
    <div className="dashboard">
      <h1>User Dashboard</h1>

      <section className="dashboard-section">
        <h2>Bookings</h2>
        {details.bookings && details.bookings.length > 0 ? (
          <ul>
            {details.bookings.map(booking => (
              <li key={booking.id}>
                Booking ID: {booking.id}, Event ID: {booking.event_id}, Date: {new Date(booking.booking_date).toLocaleDateString()}
              </li>
            ))}
          </ul>
        ) : (
          <p>No bookings available.</p>
        )}
      </section>

      {/* <section className="dashboard-section">
        <h2>Notifications</h2>
        {details.notifications && details.notifications.length > 0 ? (
          <ul>
            {details.notifications.map(notification => (
              <li key={notification.id}>
                {notification.message} - {new Date(notification.timestamp).toLocaleString()}
              </li>
            ))}
          </ul>
        ) : (
          <p>No notifications available.</p>
        )}
      </section>

      <section className="dashboard-section">
        <h2>User Activities</h2>
        {details.user_activities && details.user_activities.length > 0 ? (
          <ul>
            {details.user_activities.map(activity => (
              <li key={activity.id}>
                {activity.activity_type} - {new Date(activity.timestamp).toLocaleString()}
              </li>
            ))}
          </ul>
        ) : (
          <p>No user activities available.</p>
        )}
      </section> */}

      <section className="dashboard-section">
        <h2>Events</h2>
        {details.events && details.events.length > 0 ? (
          <ul>
            {details.events.map(event => (
              <li key={event.id}>
                {event.title} - {new Date(event.start_date).toLocaleDateString()} to {new Date(event.end_date).toLocaleDateString()}
                <br />
                {event.description}
              </li>
            ))}
          </ul>
        ) : (
          <p>No events available.</p>
        )}
      </section>
    </div>
  );
};

export default Dashboard;
