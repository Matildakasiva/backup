import React, { useState, useEffect } from 'react';
import { useParams, Link,useNavigate } from 'react-router-dom';
import './ArtworkDetailsPage.css';

const ArtworkDetailsPage = ({ addItemToCart }) => {
  const { id } = useParams();
  const [artwork, setArtwork] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchArtwork = async () => {
    const session = JSON.parse(localStorage.getItem('session'));
    const token = session && session.accessToken;

    if (!token) {
      navigate('/');
      return;
    }

    try {
      const response = await fetch(`http://127.0.0.1:5555/artworks/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        if (response.status === 401) {
          navigate('/');
        } else {
          throw new Error('Failed to fetch artwork');
        }
      }

      const data = await response.json();
      setArtwork(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArtwork();
  }, [id]);

  const handleAddToCart = async () => {
    try {
      const session = JSON.parse(localStorage.getItem('session'));
      const token = session && session.accessToken;
  
      const response = await fetch('http://127.0.0.1:5555/add_to_cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          user_id: session.user.id,  // Ensure this is defined correctly
          artwork_id: artwork.id,    // Ensure `artwork.id` is correct
          quantity: 1                // Adjust if necessary
        })
      });
  
      if (!response.ok) {
        throw new Error('Failed to add item to cart');
      }
  
      const data = await response.json();
      console.log('Successfully added to cart:', data);
    } catch (error) {
      console.error('Error adding to cart:', error.message);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!artwork) {
    return <p>Artwork not found.</p>;
  }

  return (
    <div className="details-container">
      <div className="cards-container">
        <div className="image-card">
          <img src={artwork.image} alt={artwork.title} className="details-image" />
        </div>
        <div className="info-card">
          <h1>{artwork.title}</h1>
          <p><strong>Description:</strong> {artwork.description}.</p>
          <p><strong>Price:</strong> {artwork.price}</p>
          <button className="add-to-cart" onClick={handleAddToCart}>
          <Link to={`/cart`} >Add to Cart</Link>
            </button>
        </div>
      </div>
    </div>
  );
};

export default ArtworkDetailsPage;









