import { FC, useState, useEffect } from "react";
import {
  X,
  Wallet2,
  Coins,
  User,
  HelpCircle,
  ShieldCheck,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";
import { useTranslation } from "react-i18next";

interface CoinPaymentModalProps {
  product: {
    id: string;
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
  const [showFAQ, setShowFAQ] = useState(false);
  const { t } = useTranslation();

  const totalCost = Math.ceil(weight * product.price_per_kg);
  const hasEnoughCoins = currentBalance !== null && currentBalance >= totalCost;

  // Fetch initial coin balance
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

  // Live updates via Realtime
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

  // Handle Coin Payment via RPC
  const handlePayment = async () => {
    try {
      const { data, error } = await supabase.rpc("process_coin_payment", {
        product_id: product.id,
        weight,
      });

      if (error) return alert(t("marketplace.coinModal.payment.rpcFailed"));

      switch (data) {
        case "SUCCESS":
          alert(t("marketplace.coinModal.payment.success", { amount: totalCost }));
          onPurchaseSuccess(totalCost);
          onClose();
          break;
        case "INSUFFICIENT_FUNDS":
          alert(t("marketplace.coinModal.payment.insufficientFunds"));
          break;
        case "BUYER_NOT_FOUND":
          alert(t("marketplace.coinModal.payment.buyerNotFound"));
          break;
        case "PRODUCT_NOT_FOUND":
          alert(t("marketplace.coinModal.payment.productNotFound"));
          break;
        case "INSUFFICIENT_PRODUCT_QUANTITY":
          alert(t("marketplace.coinModal.payment.insufficientProduct"));
          break;
        case "USER_NOT_LOGGED_IN":
          alert(t("marketplace.coinModal.payment.userNotLoggedIn"));
          break;
        default:
          alert(t("marketplace.coinModal.payment.genericFailed", { reason: data }));
      }
    } catch (err) {
      console.error(err);
      alert(t("marketplace.coinModal.payment.errorDuring"));
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 animate-fadeIn">
      <div className="bg-white w-[600px] rounded-2xl shadow-2xl overflow-hidden border border-gray-200">

        {/* HEADER */}
        <div className="bg-gradient-to-r from-purple-600 to-amber-500 p-5 flex items-center justify-between">
          <div className="text-white font-bold text-lg flex gap-2 items-center">
            <Wallet2 className="w-6 h-6" /> {t("marketplace.coinModal.title")}
          </div>
          <X onClick={onClose} className="text-white cursor-pointer hover:scale-110 transition" />
        </div>

        {/* SCROLLABLE CONTENT */}
        <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">

          <h2 className="text-xl font-semibold text-gray-700">{product.title}</h2>

          {/* USER */}
          <div className="bg-gray-50 flex items-center gap-3 p-3 rounded-lg">
            <User className="text-gray-600" />
            <div>
              <p className="font-medium text-gray-700">{customerName}</p>
              <p className="text-sm text-gray-500">{customerPhone}</p>
            </div>
          </div>

          {/* ORDER SUMMARY */}
          <div className="bg-white border p-4 rounded-lg shadow-sm">
            <h3 className="font-semibold text-gray-700 mb-2">{t("marketplace.coinModal.orderSummary")}</h3>
            <div className="flex justify-between text-sm">
              <span>{t("marketplace.coinModal.productWeight")}:</span>
              <span>{weight} KG</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>{t("marketplace.coinModal.costPerKg")}:</span>
              <span>
                {product.price_per_kg} {t("marketplace.coinModal.coinsLabel")}
              </span>
            </div>
            <div className="flex justify-between text-sm font-bold text-purple-600 mt-2 border-t pt-2">
              <span>{t("marketplace.coinModal.totalRequired")}</span>
              <span>
                {totalCost} {t("marketplace.coinModal.coinsLabel")}
              </span>
            </div>
          </div>

          {/* YOUR BALANCE */}
          <div className="bg-green-50 p-4 rounded-lg border border-green-300">
            <p className="text-sm text-gray-600">{t("marketplace.coinModal.walletBalance")}</p>
            <p className="text-lg font-bold text-green-700 flex items-center gap-2">
              <Coins className="w-5 h-5" />{" "}
              {currentBalance ?? t("marketplace.coinModal.loading")} {t("marketplace.coinModal.coinsLabel")}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              {t("marketplace.coinModal.earnMore")}
            </p>
          </div>

          {/* FAQ COLLAPSIBLE */}
          <div
            className="bg-blue-50 border border-blue-200 p-3 rounded-lg cursor-pointer"
            onClick={() => setShowFAQ(!showFAQ)}
          >
              <div className="flex justify-between items-center">
                <div className="flex gap-2 items-center">
                  <HelpCircle className="w-5 h-5" />
                  <p className="font-medium">{t("marketplace.coinModal.faqQuestion")}</p>
                </div>
                <ChevronDown className={`transition ${showFAQ ? "rotate-180" : ""}`} />
              </div>
              {showFAQ && (
                <p className="text-sm text-blue-900 mt-2">
                  {t("marketplace.coinModal.faqAnswer")}
                </p>
              )}
            </div>

            {/* SECURITY */}
            <div className="bg-gray-100 border-l-4 border-gray-500 p-4 rounded-lg text-sm flex gap-2">
              <ShieldCheck className="text-gray-600" />
              <p>{t("marketplace.coinModal.securityNote")}</p>
            </div>
          </div>

        {/* FOOTER / PAY BUTTON */}
        <div className="p-6 bg-gray-50 border-t">
          {hasEnoughCoins ? (
            <Button
              className="w-full text-lg bg-purple-600 hover:bg-purple-700 h-12 flex items-center justify-center gap-2 font-semibold"
              onClick={handlePayment}
            >
              <Coins className="w-6 h-6" /> {t("marketplace.coinModal.payButton", { amount: totalCost })}
            </Button>
          ) : (
            <p className="text-center text-red-600 font-medium">
              {t("marketplace.coinModal.insufficientCoins")}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CoinPaymentModal;
