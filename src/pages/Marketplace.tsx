import { useState, useEffect } from "react";
import { Search, MapPin, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/lib/supabase";
import { useQuery } from "@tanstack/react-query";
import CoinPaymentModal from "@/components/CoinPaymentModal";

import mplaceImg from "@/assets/mplace.jpg";

export interface Product {
  id: string;
  seller_id: string;
  title: string;
  price_per_kg: number;
  millet_type?: string;
  description?: string;
  location_district?: string;
  location_state?: string;
  available_quantity_kg?: number;
  minimum_order_kg?: number;
  images?: string[];
  quality_grade?: string;
  organic_certified?: boolean;
}

export default function Marketplace() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [weight, setWeight] = useState<number>(0);
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [coinBalance, setCoinBalance] = useState<number | null>(null);
  const [showCoinModal, setShowCoinModal] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);

  // Filters
  const [filterOrganic, setFilterOrganic] = useState<string>("all"); // all / organic / inorganic
  const [filterGrade, setFilterGrade] = useState<string>("all"); // all / premium / A / B / C
  const [filterPrice, setFilterPrice] = useState<number | null>(null); // max price
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);

  const resetDrawer = () => {
    setIsDrawerOpen(false);
    setSelectedProduct(null);
    setWeight(0);
    setCustomerName("");
    setCustomerPhone("");
  };

  // Get logged-in user id
  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      // @ts-ignore
      setUserId(data?.user?.id ?? null);
    });
  }, []);

  // Fetch products
  const { data: productsData, isLoading } = useQuery({
    queryKey: ["market-products"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("is_active", true)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const products = (productsData ?? []) as Product[];

  // Filter products
  const filteredProducts = products.filter((p) => {
    if (filterOrganic === "organic" && p.organic_certified !== true) return false;
    if (filterOrganic === "inorganic" && p.organic_certified !== false) return false;

    if (filterGrade !== "all") {
      const grade = (p.quality_grade ?? "").toLowerCase();
      switch (filterGrade.toLowerCase()) {
        case "premium":
          if (grade !== "premium") return false;
          break;
        case "a":
          if (grade !== "a" && grade !== "grade_a") return false;
          break;
        case "b":
          if (grade !== "b" && grade !== "grade_b") return false;
          break;
        case "c":
          if (grade !== "c" && grade !== "grade_c") return false;
          break;
        default:
          return false;
      }
    }

    if (filterPrice !== null && p.price_per_kg > filterPrice) return false;

    return true;
  });

  // Fetch user coins when drawer opens
  useEffect(() => {
    if (isDrawerOpen && userId) {
      supabase
        .from("profiles")
        .select("coins")
        .eq("id", userId)
        .single()
        .then(({ data, error }) => {
          if (!error && data) setCoinBalance(Number(data.coins ?? 0));
        });
    }
  }, [isDrawerOpen, userId]);

  const openRazorpayPayment = async () => {
    if (!selectedProduct) return;
    const minOrder = selectedProduct.minimum_order_kg ?? 1;
    if (!weight || weight < minOrder) return alert(`Enter at least ${minOrder} kg`);
    if (!customerName || !customerPhone) return alert("Enter name & phone!");
    if (!(window as any).Razorpay) return alert("Razorpay not loaded!");

    try {
      const orderRes = await fetch(
        "https://dnowicpkpatmkzimeiji.supabase.co/functions/v1/create-order",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            amount: selectedProduct.price_per_kg * weight * 100,
          }),
        }
      );
      const order = await orderRes.json();

      const options = {
        key: "rzp_test_Rl7PSe95LBeOno",
        amount: order.amount,
        currency: order.currency,
        name: "Millet Marketplace",
        description: selectedProduct.title,
        order_id: order.id,
        handler: async (response: any) => {
          try {
            const verifyRes = await fetch(
              "https://dnowicpkpatmkzimeiji.supabase.co/functions/v1/verify-payment",
              {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(response),
              }
            );
            const verify = await verifyRes.json();
            if (!verify.success) return alert("Payment verification failed!");
            if (!userId) return alert("User not logged in");

            await supabase.from("orders").insert([
              {
                product_id: selectedProduct.id,
                profile_id: userId,
                weight,
                amount_inr: selectedProduct.price_per_kg * weight,
                payment_method: "razorpay",
                status: "paid",
              },
            ]);

            const newQty =
              (selectedProduct.available_quantity_kg ?? 0) - weight >= 0
                ? (selectedProduct.available_quantity_kg ?? 0) - weight
                : 0;

            await supabase
              .from("products")
              .update({ available_quantity_kg: newQty })
              .eq("id", selectedProduct.id);

            alert("Payment Successful & Order Saved!");
            resetDrawer();
          } catch (err) {
            console.error(err);
            alert("Error processing payment.");
          }
        },
        prefill: { name: customerName, contact: customerPhone },
        theme: { color: "#7F3FBF" },
      };

      const razor = new (window as any).Razorpay(options);
      razor.open();
    } catch (err) {
      console.error(err);
      alert("Error creating Razorpay order.");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* HEADER WITH IMAGE + OVERLAYS */}
      <section className="relative overflow-hidden">
        {/* Background image + warm gradient */}
        <div className="absolute inset-0">
          <img
            src={mplaceImg}
            alt="Millet marketplace"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-amber-700/30 via-amber-500/20 to-green-600/30" />
        </div>

        {/* Dark overlay for text readability */}
        <div className="relative py-12 px-8">
          <div className="absolute inset-0 bg-black/45" />
          <div className="relative max-w-7xl mx-auto">
            <h1 className="text-4xl font-bold text-white mb-3">
              Millet Marketplace
            </h1>
            <p className="text-white text-lg mb-6">
              Connect with quality millet suppliers across India
            </p>

            {/* Search + Filters */}
            <div className="flex flex-col sm:flex-row gap-3 max-w-3xl mb-2">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300" />
                <Input
                  placeholder="Search..."
                  className="pl-10 h-12 bg-white/95 border-0 shadow-sm"
                />
              </div>
              <Button
                className="bg-brand-purple text-white h-12 px-6 shrink-0"
                onClick={() => setIsFilterDrawerOpen(true)}
              >
                Filters
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Product Grid */}
      <div className="max-w-7xl mx-auto px-8 py-8">
        <p className="text-muted-foreground mb-6">
          {isLoading ? "Loading..." : `${filteredProducts.length} products found`}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredProducts.map((product: Product) => (
            <Card
              key={product.id}
              className="overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="relative h-48 bg-muted">
                {product.images?.[0] ? (
                  <img
                    src={product.images[0]}
                    alt={product.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-100">
                    <Package className="w-16 h-16 text-gray-300" />
                  </div>
                )}
                <div className="absolute top-3 right-3 flex flex-wrap gap-2">
                  {product.quality_grade && (
                    <Badge className="bg-brand-orange text-white">
                      {product.quality_grade.toUpperCase()}
                    </Badge>
                  )}
                  {product.organic_certified && (
                    <Badge className="bg-brand-green text-white">
                      Organic
                    </Badge>
                  )}
                </div>
              </div>
              <div className="p-4">
                <p className="text-xs text-muted-foreground mb-1">
                  {product.millet_type}
                </p>
                <h3 className="font-bold text-lg mb-3">{product.title}</h3>
                <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                  {product.description}
                </p>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="w-4 h-4" /> {product.location_district},{" "}
                    {product.location_state}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Package className="w-4 h-4" />{" "}
                    {product.available_quantity_kg ?? 0} kg available
                  </div>
                </div>
                <div className="mb-4">
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-bold text-brand-green">
                      ₹{product.price_per_kg}
                    </span>
                    <span className="text-sm text-muted-foreground">/kg</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Min order: {product.minimum_order_kg ?? 1} kg
                  </p>
                </div>
                <Button
                  className="w-full bg-gradient-orange-green text-white"
                  onClick={() => {
                    setSelectedProduct(product);
                    setWeight(product.minimum_order_kg ?? 1);
                    setIsDrawerOpen(true);
                  }}
                >
                  View Details
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Drawer */}
      {isDrawerOpen && selectedProduct && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
          onClick={resetDrawer}
        >
          <div
            className="fixed right-0 top-0 h-full w-[430px] bg-white shadow-2xl p-6 overflow-y-auto z-50"
            onClick={(e) => e.stopPropagation()}
          >
            {selectedProduct.images?.[0] ? (
              <img
                src={selectedProduct.images[0]}
                alt={selectedProduct.title}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
            ) : (
              <div className="w-full h-48 flex items-center justify-center bg-gray-100 rounded-lg mb-4">
                <Package className="w-16 h-16 text-gray-300" />
              </div>
            )}

            <div className="flex items-center justify-between mb-2">
              <h2 className="text-2xl font-bold">{selectedProduct.title}</h2>
              {selectedProduct.quality_grade && (
                <Badge className="bg-brand-orange text-white">
                  {selectedProduct.quality_grade.toUpperCase()}
                </Badge>
              )}
            </div>

            <p className="text-sm text-muted-foreground mb-3">
              {selectedProduct.description}
            </p>

            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4" />{" "}
                {selectedProduct.location_district},{" "}
                {selectedProduct.location_state}
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Package className="w-4 h-4" />{" "}
                {selectedProduct.available_quantity_kg ?? 0} kg available
              </div>
            </div>

            <div className="mb-4">
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-bold text-brand-green">
                  ₹{selectedProduct.price_per_kg}
                </span>
                <span className="text-sm text-muted-foreground">/kg</span>
              </div>
              <p className="text-xs text-muted-foreground">
                Minimum order: {selectedProduct.minimum_order_kg ?? 1} kg
              </p>
            </div>

            <div className="mb-4">
              <label className="text-sm font-medium">Quantity (kg)</label>
              <Input
                type="number"
                value={weight}
                min={selectedProduct.minimum_order_kg ?? 1}
                onChange={(e) => setWeight(Number(e.target.value))}
              />
            </div>

            <div className="mb-4">
              <label className="text-sm font-medium">Name</label>
              <Input
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label className="text-sm font-medium">Phone</label>
              <Input
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
              />
            </div>

            <div className="flex flex-col gap-2 mt-6">
              <Button
                onClick={() => setShowCoinModal(true)}
                className="bg-brand-green text-white w-full"
              >
                Pay with Coins ({coinBalance ?? 0} 🪙)
              </Button>

              <Button
                onClick={openRazorpayPayment}
                className="bg-brand-purple text-white w-full"
              >
                Pay with Razorpay
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Filter Drawer */}
      {isFilterDrawerOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40"
          onClick={() => setIsFilterDrawerOpen(false)}
        >
          <div
            className="fixed left-0 top-0 h-full w-[300px] bg-white shadow-2xl p-6 overflow-y-auto z-50"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-bold mb-4">Filters</h2>

            <div className="mb-4">
              <label className="block mb-1 font-medium">
                Organic / Inorganic
              </label>
              <select
                className="border rounded p-2 w-full"
                value={filterOrganic}
                onChange={(e) => setFilterOrganic(e.target.value)}
              >
                <option value="all">All</option>
                <option value="organic">Organic</option>
                <option value="inorganic">Inorganic</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="block mb-1 font-medium">Grade</label>
              <select
                className="border rounded p-2 w-full"
                value={filterGrade}
                onChange={(e) => setFilterGrade(e.target.value)}
              >
                <option value="all">All Grades</option>
                <option value="premium">Premium</option>
                <option value="A">A</option>
                <option value="B">B</option>
                <option value="C">C</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="block mb-1 font-medium">Max Price ₹</label>
              <input
                type="number"
                placeholder="Max Price ₹"
                className="border rounded p-2 w-full"
                value={filterPrice ?? ""}
                onChange={(e) =>
                  setFilterPrice(e.target.value ? Number(e.target.value) : null)
                }
              />
            </div>

            <Button
              className="bg-brand-green text-white w-full"
              onClick={() => setIsFilterDrawerOpen(false)}
            >
              Apply Filters
            </Button>
          </div>
        </div>
      )}

      {/* Coin Payment Modal */}
      {showCoinModal && selectedProduct && userId && (
        <CoinPaymentModal
          product={selectedProduct}
          weight={weight}
          customerName={customerName}
          customerPhone={customerPhone}
          customerId={userId}
          onClose={() => setShowCoinModal(false)}
          onPurchaseSuccess={(remainingBalance) =>
            setCoinBalance(remainingBalance)
          }
        />
      )}
    </div>
  );
}
