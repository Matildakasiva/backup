import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Loading from './Loading';

const TicketBookingPage = () => {
  const { eventId, eventName } = useParams();
  const navigate = useNavigate();
  const [items, setItems] = useState(null);
  const [selectedItem, setSelectedItem] = useState({});
  const [phoneNumber, setPhoneNumber] = useState('');
  const [ticketQuantity, setTicketQuantity] = useState(1);
  const [eventPrice, setEventPrice] = useState(0);
  const totalAmount = Number(eventPrice) * Number(ticketQuantity);

  const handlePhoneNumberChange = (e) => setPhoneNumber(e.target.value);
  const handleTicketQuantityChange = (e) => setTicketQuantity(Number(e.target.value));

  useEffect(() => {
    const fetchData = async () => {
      const session = JSON.parse(localStorage.getItem('session'));
      const token = session?.accessToken;

      if (!token) {
        navigate('/');
        return;
      }

      try {
        const response = await axios.get(`http://127.0.0.1:5555/events/${eventId}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        setItems(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
        alert('Failed to fetch event data.');
      }
    };

    fetchData();
  }, [eventId, navigate]);

  const handleChange = (event) => {
    const selectedValue = event.target.value;
    if (selectedValue) {
      try {
        const item = JSON.parse(selectedValue);
        setSelectedItem(item);
        setEventPrice(item.price); // Ensure this is updating correctly
      } catch (error) {
        console.error('Error parsing selected item:', error);
      }
    } else {
      setSelectedItem({});
      setEventPrice(0); // Reset the price if no item is selected
    }
  };

  const handlePayment = async () => {
    const session = JSON.parse(localStorage.getItem('session'));
    const token = session?.accessToken;
    const userId = session?.user?.id

    if (!token) {
      navigate('/');
      return;
    }

    try {
      const response = await axios.post('http://127.0.0.1:5555/eventcheckout', {
        user_id: userId,
        event_id: eventId,
        ticket_id: selectedItem.id,
        ticket_type: selectedItem.type_name, //added
        total_amount: totalAmount,
        quantity: ticketQuantity,
        phone_number: phoneNumber,
      }, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      console.log('Payment response:', response.data);
      alert(`Payment of KES ${totalAmount} initiated for ${ticketQuantity} ticket(s).`);
      navigate('/my-bookings');
    } catch (error) {
      console.error('Error making payment:', error.response?.data || error);
      alert(`Error processing payment: ${error.response?.data.error || 'Unknown error'}`);
    }
  };

  const handleBooking = async (event) => {
    event.preventDefault();

    const session = JSON.parse(localStorage.getItem('session'));
    const token = session?.accessToken;

    if (!token) {
      navigate('/');
      return;
    }

    const formData = {
      event_id: eventId,
      ticket_id: selectedItem.id,
      total_amount: totalAmount,
      quantity: ticketQuantity,
    };

    // try {
    //   const response = await axios.post('http://127.0.0.1:5555/bookings', formData, {
    //     headers: {
    //       'Authorization': `Bearer ${token}`,
    //     },
    //   });

    //   console.log('Booking response:', response.data);
    //   alert('Booking successful!');
    // } catch (error) {
    //   console.error('Error posting data:', error);
    //   alert('Error submitting booking.');
    // }
  };

  if (items === null) {
    return <Loading />;
  }

  return (
    <div className="ticket-booking-page">
      <h1>Book Tickets for {eventName}</h1>
      <form onSubmit={handleBooking}>
        <label>
          Phone Number:
          <input type="tel" value={phoneNumber} onChange={handlePhoneNumberChange} required />
        </label>
        <label>
          Ticket Quantity:
          <input type="number" value={ticketQuantity} onChange={handleTicketQuantityChange} min="1" required />
        </label>
        <div>
          <label htmlFor="dropdown">Select a Ticket:</label>
          <select id="dropdown" value={selectedItem ? JSON.stringify(selectedItem) : ''} onChange={handleChange}>
            <option value="" disabled>Select an option</option>
            {items.tickets.map((item) => (
              <option key={item.id} value={JSON.stringify(item)}>
                {item.type_name} @ KSh.{item.price}
              </option>
            ))}
          </select>
        </div>
        <p><strong>Total Amount:</strong> KES {totalAmount}</p>
        <button type="button" onClick={handlePayment}>Pay with Mpesa</button>
        {/* <button type="submit">Confirm Booking</button> */}
      </form>
      <button className="back-to-events-button" onClick={() => navigate('/events')}>
        Back to Events
      </button>
    </div>
  );
};

export default TicketBookingPage;






