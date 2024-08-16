import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function PaymentCallback() {
  const location = useLocation();

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const paymentStatus = query.get('status');
    const transactionId = query.get('transaction_id');
    console.log("Payment status:", paymentStatus);
    console.log("Transaction ID:", transactionId);

    // Handle the payment status, e.g., display a success or failure message
  }, [location]);

  return (
    <div className="container mt-5">
      <h2>Payment Callback</h2>
      <p>Payment processing is complete. Thank you for your purchase.</p>
      {/* Additional details or actions based on payment status */}
    </div>
  );
}

export default PaymentCallback;
