// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import './CheckoutPage.css';

// const CheckoutPage = () => {
//   const [shippingDetails, setShippingDetails] = useState({
//     country: '',
//     city: '',
//     address: '',
//     phoneNumber: ''
//   });
//   const navigate = useNavigate();

//   const handleInputChange = (event) => {
//     const { name, value } = event.target;
//     setShippingDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
//   };

//   const handlePayment = () => {
    
//     // Handle payment logic here
//     alert('Payment processing...');
//     // Navigate or redirect after successful payment
//     // navigate('/confirmation'); // Example navigation
//   };

//   return (
//     <div className="checkout-container">
//       <h1>Checkout</h1>

//       <div className="order-summary">
//         <h2>Order Summary</h2>
//         {/* Replace with actual order items */}
//         <div className="order-item">
//           <div className="order-item-image">
//             <img src="https://via.placeholder.com/100" alt="Artwork" />
//           </div>
//           <div className="order-item-info">
//             <h3>Artwork Title</h3>
//             <p>Description of the artwork</p>
//             <p>Price: Ksh 2000</p>
//             <p>Quantity: 1</p>
//           </div>
//         </div>
//         {/* Add more order items here */}
//       </div>

//       <div className="shipping-details">
//         <h3>Shipping Details</h3>
//         <label>
//           Country:
//           <input
//             type="text"
//             name="country"
//             value={shippingDetails.country}
//             onChange={handleInputChange}
//             placeholder="Enter your country"
//           />
//         </label>
//         <label>
//           City:
//           <input
//             type="text"
//             name="city"
//             value={shippingDetails.city}
//             onChange={handleInputChange}
//             placeholder="Enter your city"
//           />
//         </label>
//         <label>
//           Address:
//           <textarea
//             name="address"
//             value={shippingDetails.address}
//             onChange={handleInputChange}
//             rows="4"
//             placeholder="Enter your address"
//           />
//         </label>
//         <label>
//           Phone Number:
//           <input
//             type="tel"
//             name="phoneNumber"
//             value={shippingDetails.phoneNumber}
//             onChange={handleInputChange}
//             placeholder="Enter your phone number"
//           />
//         </label>
//       </div>

//       <button className="payment-button" onClick={handlePayment}>
//         Pay With Mpesa
//       </button>
//     </div>
//   );
// };

// export default CheckoutPage;

// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import './CheckoutPage.css';

// const CheckoutPage = () => {
//   const [shippingDetails, setShippingDetails] = useState({
//     country: '',
//     city: '',
//     address: '',
//     fullName: '',
//     email: '',
//     phoneNumber: ''
//   });
//   const [orderSummary, setOrderSummary] = useState([]);
//   const [totalAmount, setTotalAmount] = useState(0);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const session = JSON.parse(localStorage.getItem('session'));
//     const token = session?.accessToken;
//     const userId = session?.user?.id
    

//     if (!token || !userId) {
//       navigate('/login');
//       return;
//     }



//     fetch(`http://127.0.0.1:5555/view_cart/${userId}`, {
//       headers: {
//         'Authorization': `Bearer ${token}`
//       }
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         if (data.items) {
//           setOrderSummary(data.items);
//           setTotalAmount(data.items.reduce((sum, item) => sum + item.price * item.quantity, 0));
//         } else {
//           setOrderSummary([]);
//           setTotalAmount(0);
//         }
//       })
//       .catch((error) => {
//         console.error('Error fetching cart:', error);
//         // navigate('/login');
//       });
//   }, [navigate]);

//   const handleInputChange = (event) => {
//     const { name, value } = event.target;
//     setShippingDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
//   };

//   const handlePayment = () => {
//     if (
//       !shippingDetails.country ||
//       !shippingDetails.city ||
//       !shippingDetails.address ||
//       !shippingDetails.fullName ||
//       !shippingDetails.email ||
//       !shippingDetails.phoneNumber
//     ) {
//       alert('Please fill in all fields');
//       return;
//     }

//     const session = JSON.parse(localStorage.getItem('session'));
//     const token = session?.accessToken;
//     const userId = session?.user?.id

//     if (!token || !userId) {
//       navigate('/login');
//       return;
//     }

//     fetch('http://127.0.0.1:5555/artworkcheckout', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${token}`
//       },
//       body: JSON.stringify({
//         userId,
//         shippingDetails,
//         phone_number:shippingDetails.phoneNumber,
//         orderSummary,
//         totalAmount
//       })
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         if (data.success) {
//           alert('Order placed successfully');
//           navigate('/');
//         } else {
//           alert('Failed to place order');
//         }
//       })
//       .catch((error) => {
//         console.error('Error placing order:', error);
//         navigate('/login');
//       });
//   };

//   return (
//     <div className="checkout-page">
//       <h1 className="page-title">Checkout</h1>
//       <div className="order-summary">
//         <h2>Order Summary</h2>
//         <ul>
//           {orderSummary.map((item) => (
//             <li key={item.artwork_id}>
//               {item.title} - Ksh {item.price} x {item.quantity}
//             </li>
//           ))}
//         </ul>
//         <h2>Total Amount: Ksh {totalAmount}</h2>
//       </div>
//       <div className="shipping-details">
//         <h2>Shipping Details</h2>
//         <form>
//           <label>
//             Full Name:
//             <input
//               type="text"
//               name="fullName"
//               value={shippingDetails.fullName}
//               onChange={handleInputChange}
//             />
//           </label>
//           <label>
//             Email:
//             <input
//               type="email"
//               name="email"
//               value={shippingDetails.email}
//               onChange={handleInputChange}
//             />
//           </label>
//           <label>
//             Phone Number:
//             <input
//               type="text"
//               name="phoneNumber"
//               value={shippingDetails.phoneNumber}
//               onChange={handleInputChange}
//             />
//           </label>
//           <label>
//             Address:
//             <input
//               type="text"
//               name="address"
//               value={shippingDetails.address}
//               onChange={handleInputChange}
//             />
//           </label>
//           <label>
//             City:
//             <input
//               type="text"
//               name="city"
//               value={shippingDetails.city}
//               onChange={handleInputChange}
//             />
//           </label>
//           <label>
//             Country:
//             <input
//               type="text"
//               name="country"
//               value={shippingDetails.country}
//               onChange={handleInputChange}
//             />
//           </label>
//           <button type="button" onClick={handlePayment}>Confirm Payment</button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default CheckoutPage;



import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CheckoutPage.css';

const CheckoutPage = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [orderSummary, setOrderSummary] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const session = JSON.parse(localStorage.getItem('session'));
    const token = session?.accessToken;
    const userId = session?.user?.id;

    if (!token || !userId) {
      navigate('/checkout');
      return;
    }

    fetch(`http://127.0.0.1:5555/view_cart/${userId}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.items) {
          setOrderSummary(data.items);
          setTotalAmount(data.items.reduce((sum, item) => sum + item.price * item.quantity, 0));
        } else {
          setOrderSummary([]);
          setTotalAmount(0);
        }
      })
      .catch((error) => {
        console.error('Error fetching cart:', error);
      });
  }, [navigate]);

  const handleInputChange = (event) => {
    setPhoneNumber(event.target.value);
  };

  const handlePayment = () => {
    if (!phoneNumber) {
      alert('Please enter your phone number for M-Pesa payment');
      return;
    }
  
    const session = JSON.parse(localStorage.getItem('session'));
    const token = session?.accessToken;
    const userId = session?.user?.id;
  
    if (!token || !userId) {
      navigate('/checkout');
      return;
    }
  
    if (orderSummary.length === 0) {
      alert('No items in your cart');
      return;
    }
  
    const items = orderSummary.map(item => ({
      artwork_id: item.artwork_id,
      quantity: item.quantity
    }));
  
    fetch('http://127.0.0.1:5555/artworkcheckout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        user_id: userId,
        phone_number: phoneNumber,
        items: items
      })
    })
    .then((response) => response.json())
    .then((data) => {
      if (data.message) {
        alert('Order placed successfully');
        navigate('/artworks');
      } else {
        alert('Failed to place order');
      }
    })
    .catch((error) => {
      console.error('Error placing order:', error);
      navigate('/checkout');
    });
  };

  return (
    <div className="checkout-page">
      <h1 className="page-title">Checkout</h1>
      <div className="order-summary">
        <h2>Order Summary</h2>
        <ul>
          {orderSummary.map((item) => (
            <li key={item.artwork_id}>
              {item.title} - Ksh {item.price} x {item.quantity}
            </li>
          ))}
        </ul>
        <h2>Total Amount: Ksh {totalAmount}</h2>
      </div>
      <div className="mpesa-payment">
        <h2>M-Pesa Payment</h2>
        <label>
          Phone Number:
          <input
            type="text"
            name="phoneNumber"
            value={phoneNumber}
            onChange={handleInputChange}
            placeholder="Enter M-Pesa phone number"
          />
        </label>
        <button type="button" onClick={handlePayment}>Confirm Payment</button>
      </div>
    </div>
  );
};

export default CheckoutPage;

