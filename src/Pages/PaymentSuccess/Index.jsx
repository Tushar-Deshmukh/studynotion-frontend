import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

export default function Success() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const sessionId = queryParams.get("session_id");

  useEffect(() => {
    if (sessionId) {
      // Optionally, you can verify the payment with your backend
      axios
        .get(`/verify-payment?session_id=${sessionId}`)
        .then((response) => {
          console.log("Payment verified:", response.data);
        })
        .catch((error) => {
          console.error("Error verifying payment:", error);
        });
    }
  }, [sessionId]);

  return (
    <div>
      <h1>Payment Successful!</h1>
      <p>
        Thank you for your purchase. Your course has been added to your account.
      </p>
    </div>
  );
}
