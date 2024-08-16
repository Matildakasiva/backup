// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import './CartPage.css';

// const CartPage = () => {
//   const [cartItems, setCartItems] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchCartItems = async () => {
//       try {
//         const session = JSON.parse(localStorage.getItem('session'));
//         const token = session?.accessToken;
//         if (!token) throw new Error('No authentication token found');

//         const response = await fetch(`http://127.0.0.1:5555/view_cart/${session.user.id}`, {
//           headers: {
//             'Authorization': `Bearer ${token}`
//           }
//         });

//         if (response.ok) {
//           const data = await response.json();
//           setCartItems(Array.isArray(data.items) ? data.items : []);
//         } else {
//           const errorData = await response.json();
//           console.error('Failed to fetch cart items:', errorData.error);
//         }
//       } catch (error) {
//         console.error('Error fetching cart items:', error);
//       }
//     };

//     fetchCartItems();
//   }, []);

//   const removeItemFromCart = async (artworkId) => {
//     try {
//       const session = JSON.parse(localStorage.getItem('session'));
//       const token = session?.accessToken;
//       if (!token) throw new Error('No authentication token found');

//       const response = await fetch('http://127.0.0.1:5555/remove_from_cart', {
//         method: 'DELETE',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}`
//         },
//         body: JSON.stringify({
//           user_id: session.user.id,
//           artwork_id: artworkId
//         })
//       });

//       if (response.ok) {
//         setCartItems(prevItems => prevItems.filter(item => item.artwork_id !== artworkId));
//       } else {
//         const errorData = await response.json();
//         console.error('Failed to remove item from cart:', errorData.error);
//       }
//     } catch (error) {
//       console.error('Error removing item from cart:', error);
//     }
//   };

//   const updateItemQuantity = async (artworkId, newQuantity) => {
//     if (newQuantity <= 0) return;

//     const updatedItems = cartItems.map(item =>
//       item.artwork_id === artworkId ? { ...item, quantity: newQuantity } : item
//     );
//     setCartItems(updatedItems);

//     try {
//       const session = JSON.parse(localStorage.getItem('session'));
//       const token = session?.accessToken;
//       if (!token) throw new Error('No authentication token found');

//       const response = await fetch('http://127.0.0.1:5555/update_cart_item', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}`
//         },
//         body: JSON.stringify({
//           user_id: session.user.id,
//           artwork_id: artworkId,
//           quantity: newQuantity
//         })
//       });

//       if (!response.ok) {
//         const errorData = await response.json();
//         console.error('Failed to update item quantity:', errorData.error);
//         // Revert the quantity change if the update fails
//         setCartItems(prevItems =>
//           prevItems.map(item =>
//             item.artwork_id === artworkId ? { ...item, quantity: item.quantity } : item
//           )
//         );
//       }
//     } catch (error) {
//       console.error('Error updating item quantity:', error);
//       // Revert the quantity change if there's an error
//       setCartItems(prevItems =>
//         prevItems.map(item =>
//           item.artwork_id === artworkId ? { ...item, quantity: item.quantity } : item
//         )
//       );
//     }
//   };

//   const handleQuantityChange = (id, event) => {
//     const quantity = parseInt(event.target.value, 10);
//     if (!isNaN(quantity) && quantity > 0) {
//       updateItemQuantity(id, quantity);
//     } else {
//       console.warn('Invalid quantity:', quantity);
//     }
//   };

//   const calculateTotalPrice = () => {
//     return cartItems.reduce((total, item) => total + item.quantity * parseFloat(item.price || 0), 0).toFixed(2);
//   };

//   const handleProceedToCheckout = () => {
//     navigate('/checkout', { state: { cartItems, totalAmount: calculateTotalPrice() } });
//   };

//   return (
//     <div className="cart-page">
//       <h1 className="page-title">Shopping Cart</h1>
//       {cartItems.length === 0 ? (
//         <p className="empty-cart-message">Your cart is empty. Please add items to your cart before proceeding to checkout.</p>
//       ) : (
//         <div className="cart-items-container">
//           {cartItems.map(item => (
//             <div key={item.artwork_id} className="cart-item-card">
//               <div className="cart-item-image">
//                 <img src={item.image} alt={item.title} />
//               </div>
//               <div className="cart-item-details">
//                 <h2 className="item-title">{item.title}</h2>
//                 <p className="item-description">{item.description}</p>
//                 <p className="item-price">Price: Ksh {item.price}</p>
//                 <div className="quantity-container">
//                   <label htmlFor={`quantity-${item.artwork_id}`}>Quantity:</label>
//                   <input
//                     id={`quantity-${item.artwork_id}`}
//                     type="number"
//                     value={item.quantity}
//                     onChange={(e) => handleQuantityChange(item.artwork_id, e)}
//                     className="quantity-input"
//                     min="1"
//                   />
//                 </div>
//                 <button onClick={() => removeItemFromCart(item.artwork_id)} className="remove-item-button">Remove</button>
//               </div>
//             </div>
//           ))}
//           <div className="cart-summary">
//             <h2>Total: Ksh {calculateTotalPrice()}</h2>
//             <button onClick={handleProceedToCheckout} className="checkout-button">Proceed to Checkout</button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CartPage;



import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './CartPage.css';

const CartPage = ({ onCartUpdate }) => {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const session = JSON.parse(localStorage.getItem('session'));
        const token = session?.accessToken;
        if (!token) throw new Error('No authentication token found');

        const response = await fetch(`http://127.0.0.1:5555/view_cart/${session.user.id}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.ok) {
          const data = await response.json();
          setCartItems(data.items);
          // Notify parent component about the cart update
          onCartUpdate(data.items.length);
        } else {
          const errorData = await response.json();
          console.error('Failed to fetch cart items:', errorData.error);
        }
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    };

    fetchCartItems();
  }, [onCartUpdate]);

  const removeItemFromCart = async (artworkId) => {
    try {
      const session = JSON.parse(localStorage.getItem('session'));
      const token = session?.accessToken;
      if (!token) throw new Error('No authentication token found');

      const response = await fetch('http://127.0.0.1:5555/remove_from_cart', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          user_id: session.user.id,
          artwork_id: artworkId
        })
      });

      if (response.ok) {
        setCartItems(prevItems => prevItems.filter(item => item.artwork_id !== artworkId));
        // Notify parent component about the cart update
        onCartUpdate(cartItems.length - 1);
      } else {
        const errorData = await response.json();
        console.error('Failed to remove item from cart:', errorData.error);
      }
    } catch (error) {
      console.error('Error removing item from cart:', error);
    }
  };

  const updateItemQuantity = async (artworkId, newQuantity) => {
    if (newQuantity <= 0) return;

    const updatedItems = cartItems.map(item =>
      item.artwork_id === artworkId ? { ...item, quantity: newQuantity } : item
    );
    setCartItems(updatedItems);

    try {
      const session = JSON.parse(localStorage.getItem('session'));
      const token = session?.accessToken;
      if (!token) throw new Error('No authentication token found');

      const response = await fetch('http://127.0.0.1:5555/update_cart_item', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          user_id: session.user.id,
          artwork_id: artworkId,
          quantity: newQuantity
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Failed to update item quantity:', errorData.error);
        setCartItems(prevItems =>
          prevItems.map(item =>
            item.artwork_id === artworkId ? { ...item, quantity: item.quantity } : item
          )
        );
      }
    } catch (error) {
      console.error('Error updating item quantity:', error);
      setCartItems(prevItems =>
        prevItems.map(item =>
          item.artwork_id === artworkId ? { ...item, quantity: item.quantity } : item
        )
      );
    }
  };

  const handleQuantityChange = (id, event) => {
    const quantity = parseInt(event.target.value, 10);
    if (!isNaN(quantity) && quantity > 0) {
      updateItemQuantity(id, quantity);
    } else {
      console.warn('Invalid quantity:', quantity);
    }
  };

  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.quantity * parseFloat(item.price), 0).toFixed(2);
  };

  const handleProceedToCheckout = () => {
    navigate('/checkout', { state: { cartItems, totalAmount: calculateTotalPrice() } });
  };

  return (
    <div className="cart-page">
      <h1 className="page-title">Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <p className="empty-cart-message">Your cart is empty. Please add items to your cart before proceeding to checkout.</p>
      ) : (
        <div className="cart-items-container">
          {cartItems.map(item => (
            <div key={item.artwork_id} className="cart-item-card">
              <div className="cart-item-image">
                <img src={item.image} alt={item.title} />
              </div>
              <div className="cart-item-details">
                <h2 className="item-title">{item.title}</h2>
                <p className="item-description">{item.description}</p>
                <p className="item-price">Price: Ksh {item.price}</p>
                <div className="quantity-container">
                  <label htmlFor={`quantity-${item.artwork_id}`}>Quantity:</label>
                  <input
                    id={`quantity-${item.artwork_id}`}
                    type="number"
                    value={item.quantity}
                    onChange={(e) => handleQuantityChange(item.artwork_id, e)}
                    className="quantity-input"
                    min="1"
                  />
                </div>
                <button onClick={() => removeItemFromCart(item.artwork_id)} className="remove-item-button">Remove</button>
              </div>
            </div>
          ))}
          <div className="cart-summary">
            <h2>Total: Ksh {calculateTotalPrice()}</h2>
            <button onClick={handleProceedToCheckout} className="checkout-button">Proceed to Checkout</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;