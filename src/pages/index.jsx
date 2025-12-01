// src/pages/index.jsx
import React, { useEffect, useState } from "react";
import { supabase } from "../utils/supabaseClient";
import Wallet from "../components/Wallet";
import BuyButton from "../components/BuyButton";

export default function Home() {
  const [userId, setUserId] = useState(null); 
  const [products, setProducts] = useState([]);

  // Get logged-in user
  useEffect(() => {
    const user = supabase.auth.user();
    if (user) setUserId(user.id);
  }, []);

  // Fetch products
  useEffect(() => {
    async function fetchProducts() {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("is_active", true);
      if (!error) setProducts(data);
    }
    fetchProducts();
  }, []);

  // Sync offline orders when back online
  useEffect(() => {
    async function syncOfflineOrders() {
      const offlineOrders = JSON.parse(localStorage.getItem("offlineOrders") || "[]");
      if (!offlineOrders.length || !userId) return;

      for (let order of offlineOrders) {
        await supabase.rpc("buy_product_with_coins", {
          uid: userId,
          pid: order.productId,
          order_qty: order.orderQty
        });
      }
      localStorage.removeItem("offlineOrders");
      if (offlineOrders.length) alert("Offline orders synced!");
    }

    window.addEventListener("online", syncOfflineOrders);
    return () => window.removeEventListener("online", syncOfflineOrders);
  }, [userId]);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Shree Anna Connect</h1>

      {userId && <Wallet userId={userId} />}

      <h2 className="text-2xl mt-6 mb-2">Available Products</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product) => (
          <div key={product.id} className="border p-4 rounded shadow">
            <h3 className="text-xl font-semibold">{product.title}</h3>
            <p>Price per kg: ₹{product.price_per_kg}</p>
            <p>Available: {product.available_quantity_kg} kg</p>
            <BuyButton
              userId={userId}
              productId={product.id}
              quantity={product.minimum_order_kg || 1}
              productTitle={product.title}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
