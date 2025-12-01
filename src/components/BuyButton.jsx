// src/components/BuyButton.jsx
import React from "react";
import { supabase } from "../utils/supabaseClient";

export default function BuyButton({ userId, productId, quantity, productTitle }) {

  const handleBuy = async () => {
    if (!navigator.onLine) {
      // Save offline
      const offlineOrders = JSON.parse(localStorage.getItem("offlineOrders") || "[]");
      offlineOrders.push({ productId, orderQty: quantity, productTitle });
      localStorage.setItem("offlineOrders", JSON.stringify(offlineOrders));
      alert("Order saved offline! Will sync when internet is back.");
      return;
    }

    // Buy online
    const { data } = await supabase.rpc("buy_product_with_coins", {
      uid: userId,
      pid: productId,
      order_qty: quantity
    });

    if (data === "ORDER_SUCCESS") alert("Order placed via coins!");
    else if (data === "NOT_ENOUGH_COINS") alert("Not enough coins!");
    else if (data === "NOT_ENOUGH_STOCK") alert("Not enough stock!");
  };

  return (
    <button 
      onClick={handleBuy} 
      className="bg-green-500 text-white px-4 py-2 rounded mt-2"
    >
      {`Buy ${quantity} kg`}
    </button>
  );
}
