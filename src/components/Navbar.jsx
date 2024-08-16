import React from 'react';
import { Link } from 'react-router-dom';
import { Badge } from 'react-bootstrap';
import { FaShoppingCart, FaUserCircle, FaUserAlt, FaMale, FaFemale } from 'react-icons/fa'; // Import the icons
import './Navbar.css';

const Navbar = ({ cartItemsCount, isArtist, userGender }) => {
  // Function to get the appropriate profile icon based on gender
  const getProfileIcon = () => {
    if (userGender === 'male') return <FaMale size={20} />;
    if (userGender === 'female') return <FaFemale size={20} />;
    return <FaUserAlt size={20} />;
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link className="navbar-brand" to="/">The Met Gallery</Link>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/home">Home</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/artworks">Artworks</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/events">Events</Link>
          </li>
          {isArtist && (
            <li className="nav-item">
              <Link className="nav-link" to="/add-art">Add Art</Link>
            </li>
          )}
          <li className="nav-item">
            <Link className="nav-link" to="/cart">
              <FaShoppingCart className="cart-icon" />
              {cartItemsCount > 0 && <Badge pill variant="info" className="cart-badge">{cartItemsCount}</Badge>}
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/dashboard">Dashboard</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/profile">
              {getProfileIcon()}
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/messages">Messages</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
