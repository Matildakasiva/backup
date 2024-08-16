import React, { useEffect, useState } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import ArtworkPage from './components/ArtworkPage';
import ArtworkDetailsPage from './components/ArtworkDetailsPage';
import CartPage from './components/CartPage';
import AddArtPage from './components/AddArtPage';
import Footer from './components/Footer';
import EventsPage from './components/EventsPage';
import EventDetailPage from './components/EventDetailPage';
import CreateEventPage from './components/CreateEventPage';
import TicketBookingPage from './components/TicketBookingPage';
import MyEventsList from './components/MyEventsList';
import Dashboard from './components/Dashboard';
import HomePage from './components/HomePage';
import Login from './components/Login';
import Registration from './components/Registration';
import UserProfile from './components/UserProfile';
import Messaging from './components/Messaging';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import CheckoutPage from './components/CheckoutPage';
import PaymentCallback from './components/PaymentCallback';
import MyBookings from './components/MyBookings';


const App = () => {
  const [events, setEvents] = useState([
    {  
      id: 1,
      name: 'Art Expo',
      details: 'An amazing art expo showcasing contemporary artworks from renowned artists.',
      image: 'https://i.pinimg.com/564x/4d/7c/46/4d7c4673fdc622d124962b5ee7a146b5.jpg',
      location: 'City Ground',
      eventWebsite: 'https://www.eventbrite.com/',
      startTime: '2024-08-01T10:00',
      endTime: '2024-08-01T18:00',
      ticketPrice: 500 
    },
    // Add other event objects as needed
  ]);

  const [cartItems, setCartItems] = useState([]);
  const [isArtist, setIsArtist] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('session'));

  useEffect(() =>{
    setIsLoggedIn(!!localStorage.getItem('session'));
    console.log(!!localStorage.getItem('session'));
  },[])


  const addEvent = (newEvent) => {
    setEvents([...events, { ...newEvent, id: events.length + 1 }]);
  };

  const addItemToCart = (item) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((cartItem) => cartItem.id === item.id);
      if (existingItem) {
        return prevItems.map((cartItem) =>
          cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
        );
      }
      return [...prevItems, { ...item, quantity: 1 }];
    });
  };

  const removeItemFromCart = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const updateItemQuantity = (id, quantity) => {
    if (quantity <= 0) return;
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const cartItemsCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const ProtectedRoute = ({ element }) => {
    return isLoggedIn ? element : <Navigate to="/login" />;
  };

  return (
     <div className="app">
        <main>
          <Navbar cartItemsCount={cartItemsCount} isArtist={isArtist} />
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route path="/signup" element={<Registration />} />

            {/* Protected Routes */}
            <Route path="/home" element={<ProtectedRoute element={<HomePage />} />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/messages" element={<ProtectedRoute element={<Messaging />} />} />
            <Route path="/profile" element={<ProtectedRoute element={<UserProfile />} />} />
            <Route path="/dashboard" element={<ProtectedRoute element={<Dashboard />} />} />
            <Route path="/artworks" element={<ProtectedRoute element={<ArtworkPage addItemToCart={addItemToCart} />} />} />
            <Route path="/artworks/:id" element={<ProtectedRoute element={<ArtworkDetailsPage addItemToCart={addItemToCart} />} />} />
            <Route path="/cart" element={<ProtectedRoute element={<CartPage cartItems={cartItems} removeItemFromCart={removeItemFromCart} updateItemQuantity={updateItemQuantity} />} />} />
            <Route path="/add-art" element={<ProtectedRoute element={isArtist ? <AddArtPage /> : <Navigate to="/login" />} />} />
            <Route path="/events" element={<ProtectedRoute element={<EventsPage events={events} />} />} />
            <Route path="/events/:eventId" element={<ProtectedRoute element={<EventDetailPage events={events} />} />} />
            <Route path="/create-event" element={<ProtectedRoute element={<CreateEventPage addEvent={addEvent} />} />} />
            <Route path="/events/:eventName/:eventId/book" element={<ProtectedRoute element={<TicketBookingPage events={events} />} />} />
            <Route path="/my-events" element={<ProtectedRoute element={<MyEventsList events={events} />} />} />
            <Route path="/my-bookings" element={<ProtectedRoute element={<MyBookings  />} />} />


            {/* Fallback Route */}
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        </main>
        <Footer />
      </div>
  );
};

export default App;
