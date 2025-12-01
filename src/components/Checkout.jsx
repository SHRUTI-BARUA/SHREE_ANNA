import React from "react";
import { createOrder, verifyPayment } from "../utils/payment";

function Checkout({ product }) {

  async function startPayment() {
    // 1. Create order
    const order = await createOrder(product.price);
    if (!order?.id) {
      alert("Failed to create order");
      return;
    }

    // 2. Open Razorpay Checkout
    const options = {
      key: "rzp_test_Rl7PSe95LBeOno",   // PUBLIC KEY ONLY
      amount: order.amount,
      currency: order.currency,
      name: product.name,
      order_id: order.id,     // VERY IMPORTANT
      handler: async function (response) {
        console.log("PAYMENT SUCCESS:", response);

        // 3. Verify Payment (Edge Function)
        const verifyRes = await verifyPayment({
          razorpay_order_id: response.razorpay_order_id,
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_signature: response.razorpay_signature,
        });

        if (verifyRes.success) {
          alert("Payment Verified Successfully!");
        } else {
          alert("Payment Failed or Tampered");
        }
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  }

  return (
    <button onClick={startPayment}>
      Pay ₹{product.price}
    </button>
  );
}

export default Checkout;
