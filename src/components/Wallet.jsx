// src/components/Wallet.jsx
import React from "react";
import { supabase } from "../utils/supabaseClient";

export default function Wallet({ userId }) {
  const [coins, setCoins] = React.useState(0);

  React.useEffect(() => {
    async function fetchCoins() {
      if (!userId) return;
      const { data, error } = await supabase
        .from("user_wallet")
        .select("coins")
        .eq("user_id", userId)
        .single();
      if (!error) setCoins(data.coins);
    }
    fetchCoins();
  }, [userId]);

  return (
    <div className="p-4 shadow-xl rounded-xl bg-green-100 my-4">
      <h2 className="text-xl font-bold">Wallet Balance</h2>
      <p className="text-4xl font-black">{coins} 🪙</p>
    </div>
  );
}
