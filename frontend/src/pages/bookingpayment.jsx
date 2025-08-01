import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const PaymentTest = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { email, bookingId } = location.state || {};

  const handlePayNow = () => {
    alert("✅ Payment Successful in Test Mode!");
    navigate("/thank-you");
  };

  return (
    <div className="text-center mt-5">
      <h2>Test Mode Payment</h2>
      <p><strong>Booking ID:</strong> {bookingId}</p>
      <p><strong>Email:</strong> {email}</p>
      <p>This is a test environment. No real payment will be processed.</p>
      <button className="btn primary__btn mt-4" onClick={handlePayNow}>
        Simulate Payment
      </button>
    </div>
  );
};

export default PaymentTest;
