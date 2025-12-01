import { FC, useState, useEffect } from "react";
import { X, Wallet2, Coins, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";

interface CoinPaymentModalProps {
  product: {
    id: string;
    seller_id: string;
    title: string;
    price_per_kg: number;
  };
  weight: number;
  customerName: string;
  customerPhone: string;
  customerId: string;
  onClose: () => void;
  onPurchaseSuccess: (deducted: number) => void;
}

const CoinPaymentModal: FC<CoinPaymentModalProps> = ({
  product,
  weight,
  customerName,
  customerPhone,
  customerId,
  onClose,
  onPurchaseSuccess,
}) => {
  const [currentBalance, setCurrentBalance] = useState<number | null>(null);
  const totalCost = Math.ceil(weight * product.price_per_kg);
  const hasEnoughCoins = currentBalance !== null && currentBalance >= totalCost;

  // 1️⃣ Fetch initial coin balance
  useEffect(() => {
    const fetchBalance = async () => {
      if (!customerId) return;
      const { data, error } = await supabase
        .from("profiles")
        .select("coins")
        .eq("id", customerId)
        .single();

      if (!error && data) setCurrentBalance(data.coins);
    };
    fetchBalance();
  }, [customerId]);

  // 2️⃣ Live updates using Realtime
  useEffect(() => {
    if (!customerId) return;

    const channel = supabase
      .channel(`coin_changes_${customerId}`)
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "profiles",
          filter: `id=eq.${customerId}`,
        },
        (payload) => {
          setCurrentBalance(payload.new.coins);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [customerId]);

  
  // 3️⃣ Handle Coin Payment — FINAL SIMPLE VERSION
  const handlePayment = async () => {
  try {
    const { data, error } = await supabase.rpc("process_coin_payment", {
      product_id: product.id,
      weight: weight
    });

    if (error) return alert("Payment RPC Failed!");

    switch (data) {
      case "SUCCESS":
        alert(`Payment Successful! ${Math.ceil(weight * product.price_per_kg)} coins deducted.`);
        onPurchaseSuccess(Math.ceil(weight * product.price_per_kg));
        onClose();
        break;
      case "INSUFFICIENT_FUNDS":
        alert("Payment Failed! Not enough coins.");
        break;
      case "BUYER_NOT_FOUND":
        alert("Payment Failed! Buyer profile not found.");
        break;
      case "PRODUCT_NOT_FOUND":
        alert("Payment Failed! Product not found.");
        break;
      case "INSUFFICIENT_PRODUCT_QUANTITY":
        alert("Payment Failed! Not enough product in stock.");
        break;
      case "USER_NOT_LOGGED_IN":
        alert("Payment Failed! Please login first.");
        break;
      default:
        alert(`Payment Failed! Reason: ${data}`);
    }

  } catch (err) {
    console.error(err);
    alert("Error during transaction.");
  }
};




  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 animate-fadeIn">
      <div className="bg-white w-[600px] rounded-2xl shadow-2xl overflow-hidden border border-gray-200">
        {/* HEADER */}
        <div className="bg-gradient-to-r from-purple-600 to-amber-500 p-5 flex items-center justify-between">
          <div className="text-white font-bold text-lg flex gap-2 items-center">
            <Wallet2 className="w-6 h-6" /> Secure Coin Payment
          </div>
          <X
            onClick={onClose}
            className="text-white cursor-pointer hover:scale-110 transition"
          />
        </div>

        {/* MAIN CONTENT */}
        <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
          <h2 className="text-xl font-semibold text-gray-700">{product.title}</h2>

          <div className="bg-gray-50 flex items-center gap-3 p-3 rounded-lg">
            <User className="text-gray-600" />
            <div>
              <p className="font-medium text-gray-700">{customerName}</p>
              <p className="text-sm text-gray-500">{customerPhone}</p>
            </div>
          </div>

          <div className="bg-white border p-4 rounded-lg shadow-sm">
            <h3 className="font-semibold text-gray-700 mb-2">Order Summary</h3>
            <div className="flex justify-between text-sm">
              <span>Product Weight:</span>
              <span>{weight} KG</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Cost per KG:</span>
              <span>{product.price_per_kg} Coins</span>
            </div>
            <div className="flex justify-between text-sm font-bold text-purple-600 mt-2 border-t pt-2">
              <span>Total Required</span>
              <span>{totalCost} Coins</span>
            </div>
          </div>

          <div className="bg-green-50 p-4 rounded-lg border border-green-300">
            <p className="text-sm text-gray-600">Your Wallet Balance</p>
            <p className="text-lg font-bold text-green-700 flex items-center gap-2">
              <Coins className="w-5 h-5" /> {currentBalance ?? "Loading..."} Coins
            </p>
          </div>
        </div>

        {/* FOOTER */}
        <div className="p-6 bg-gray-50 border-t">
          {hasEnoughCoins ? (
            <Button
              className="w-full text-lg bg-purple-600 hover:bg-purple-700 h-12 flex items-center justify-center gap-2 font-semibold"
              onClick={handlePayment}
            >
              <Coins className="w-6 h-6" /> Pay {totalCost} Coins
            </Button>
          ) : (
            <p className="text-center text-red-600 font-medium">
              Not enough coins. Earn more to continue.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CoinPaymentModal;
