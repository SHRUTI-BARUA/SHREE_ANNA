// Create Razorpay order via Supabase
export async function createOrder(amount) {
  const res = await fetch(
    `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/create-order`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
      },
      body: JSON.stringify({ amount: amount * 100 }), // paise
    }
  );

  const data = await res.json();
  console.log("ORDER RESPONSE:", data);
  return data;
}

// Verify payment after success
export async function verifyPayment(details) {
  const res = await fetch(
    `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/verify-payment`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
      },
      body: JSON.stringify(details),
    }
  );

  return await res.json();
}
