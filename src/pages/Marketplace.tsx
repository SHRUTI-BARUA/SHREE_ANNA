// // import { useState, useEffect } from "react";
// // import { Search, Sparkles, MapPin, Package } from "lucide-react";
// // import { Button } from "@/components/ui/button";
// // import { Input } from "@/components/ui/input";
// // import { Card } from "@/components/ui/card";
// // import { Badge } from "@/components/ui/badge";
// // import { supabase } from "@/lib/supabase";
// // import { useQuery } from "@tanstack/react-query";
// // import CoinPaymentModal from "@/components/CoinPaymentModal";

// // // ✅ Updated Product type with seller_id
// // export interface Product {
// //   id: string;
// //   seller_id: string;
// //   title: string;
// //   price_per_kg: number;
// //   millet_type?: string;
// //   description?: string;
// //   location_district?: string;
// //   location_state?: string;
// //   available_quantity_kg?: number;
// //   minimum_order_kg?: number;
// //   images?: string[];
// //   quality_grade?: string;
// //   organic_certified?: boolean;
// // }

// // export default function Marketplace() {
// //   const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
// //   const [isDrawerOpen, setIsDrawerOpen] = useState(false);
// //   const [weight, setWeight] = useState<number>(0);
// //   const [customerName, setCustomerName] = useState("");
// //   const [customerPhone, setCustomerPhone] = useState("");
// //   const [coinBalance, setCoinBalance] = useState<number | null>(null);
// //   const [showCoinModal, setShowCoinModal] = useState(false);
// //   const [userId, setUserId] = useState<string | null>(null);

// //   const resetDrawer = () => {
// //     setIsDrawerOpen(false);
// //     setSelectedProduct(null);
// //     setWeight(0);
// //     setCustomerName("");
// //     setCustomerPhone("");
// //   };

// //   // Get logged-in user id
// //   useEffect(() => {
// //     supabase.auth.getUser().then(({ data }) => {
// //       setUserId(data.user?.id ?? null);
// //     });
// //   }, []);

// //   // Fetch products
// //   const { data: products = [], isLoading } = useQuery({
// //     queryKey: ["market-products"],
// //     queryFn: async () => {
// //       const { data, error } = await supabase
// //         .from("products")
// //         .select("*") // Ensure seller_id included
// //         .eq("is_active", true)
// //         .order("created_at", { ascending: false });
// //       if (error) throw error;
// //       return data;
// //     },
// //   });

// //   // Fetch user coins when drawer opens
// //   useEffect(() => {
// //     if (isDrawerOpen && userId) {
// //       supabase
// //         .from("profiles")
// //         .select("coins")
// //         .eq("id", userId)
// //         .single()
// //         .then(({ data, error }) => {
// //           if (!error && data) setCoinBalance(data.coins);
// //         });
// //     }
// //   }, [isDrawerOpen, userId]);

// //   const orderCost = selectedProduct ? weight * selectedProduct.price_per_kg : 0;

// //   const openRazorpayPayment = async () => {
// //     if (!selectedProduct) return;
// //     if (!weight || weight < selectedProduct.minimum_order_kg)
// //       return alert(`Enter at least ${selectedProduct.minimum_order_kg} kg`);
// //     if (!customerName || !customerPhone) return alert("Enter name & phone!");
// //     if (!(window as any).Razorpay) return alert("Razorpay not loaded!");

// //     try {
// //       const orderRes = await fetch(
// //         "https://dnowicpkpatmkzimeiji.supabase.co/functions/v1/create-order",
// //         {
// //           method: "POST",
// //           headers: { "Content-Type": "application/json" },
// //           body: JSON.stringify({ amount: selectedProduct.price_per_kg * weight * 100 }),
// //         }
// //       );
// //       const order = await orderRes.json();

// //       const options = {
// //         key: "rzp_test_Rl7PSe95LBeOno",
// //         amount: order.amount,
// //         currency: order.currency,
// //         name: "Millet Marketplace",
// //         description: selectedProduct.title,
// //         order_id: order.id,
// //         handler: async (response: any) => {
// //           try {
// //             const verifyRes = await fetch(
// //               "https://dnowicpkpatmkzimeiji.supabase.co/functions/v1/verify-payment",
// //               {
// //                 method: "POST",
// //                 headers: { "Content-Type": "application/json" },
// //                 body: JSON.stringify(response),
// //               }
// //             );
// //             const verify = await verifyRes.json();
// //             if (!verify.success) return alert("Payment verification failed!");
// //             if (!userId) return alert("User not logged in");

// //             await supabase.from("orders").insert([
// //               {
// //                 product_id: selectedProduct.id,
// //                 profile_id: userId,
// //                 weight,
// //                 amount_inr: selectedProduct.price_per_kg * weight,
// //                 payment_method: "razorpay",
// //                 status: "paid",
// //               },
// //             ]);

// //             await supabase
// //               .from("products")
// //               .update({ available_quantity_kg: selectedProduct.available_quantity_kg - weight })
// //               .eq("id", selectedProduct.id);

// //             alert("Payment Successful & Order Saved!");
// //             resetDrawer();
// //           } catch (err) {
// //             console.error(err);
// //             alert("Error processing payment.");
// //           }
// //         },
// //         prefill: { name: customerName, contact: customerPhone },
// //         theme: { color: "#7F3FBF" },
// //       };

// //       const razor = new (window as any).Razorpay(options);
// //       razor.open();
// //     } catch (err) {
// //       console.error(err);
// //       alert("Error creating Razorpay order.");
// //     }
// //   };

// //   return (
// //     <div className="min-h-screen bg-background">
// //       {/* Header */}
// //       <div className="bg-gradient-header py-12 px-8">
// //         <div className="max-w-7xl mx-auto">
// //           <h1 className="text-4xl font-bold text-white mb-3">Millet Marketplace</h1>
// //           <p className="text-white text-lg mb-6">Connect with quality millet suppliers across India</p>
// //           <div className="flex gap-3 max-w-3xl">
// //             <div className="flex-1 relative">
// //               <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
// //               <Input placeholder="Search..." className="pl-10 h-12 bg-white" />
// //             </div>
            
// //           </div>
// //         </div>
// //       </div>

// //       {/* Product Grid */}
// //       <div className="max-w-7xl mx-auto px-8 py-8">
// //         <p className="text-muted-foreground mb-6">
// //           {isLoading ? "Loading..." : `${products.length} products found`}
// //         </p>
// //         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
// //           {products.map((product: Product) => (
// //             <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow">
// //               <div className="relative h-48 bg-muted">
// //                 {product.images?.[0] ? (
// //                   <img
// //                     src={product.images[0]}
// //                     alt={product.title}
// //                     className="w-full h-full object-cover"
// //                   />
// //                 ) : (
// //                   <div className="w-full h-full flex items-center justify-center bg-gray-100">
// //                     <Package className="w-16 h-16 text-gray-300" />
// //                   </div>
// //                 )}
// //                 <div className="absolute top-3 right-3 flex flex-wrap gap-2">
// //                   {product.quality_grade && (
// //                     <Badge className="bg-brand-orange text-white">{product.quality_grade.toUpperCase()}</Badge>
// //                   )}
// //                   {product.organic_certified && <Badge className="bg-brand-green text-white">Organic</Badge>}
// //                 </div>
// //               </div>
// //               <div className="p-4">
// //                 <p className="text-xs text-muted-foreground mb-1">{product.millet_type}</p>
// //                 <h3 className="font-bold text-lg mb-3">{product.title}</h3>
// //                 <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{product.description}</p>
// //                 <div className="space-y-2 mb-4">
// //                   <div className="flex items-center gap-2 text-sm text-muted-foreground">
// //                     <MapPin className="w-4 h-4" /> {product.location_district}, {product.location_state}
// //                   </div>
// //                   <div className="flex items-center gap-2 text-sm text-muted-foreground">
// //                     <Package className="w-4 h-4" /> {product.available_quantity_kg} kg available
// //                   </div>
// //                 </div>
// //                 <div className="mb-4">
// //                   <div className="flex items-baseline gap-1">
// //                     <span className="text-2xl font-bold text-brand-green">₹{product.price_per_kg}</span>
// //                     <span className="text-sm text-muted-foreground">/kg</span>
// //                   </div>
// //                   <p className="text-xs text-muted-foreground">Min order: {product.minimum_order_kg} kg</p>
// //                 </div>
// //                 <Button
// //                   className="w-full bg-gradient-orange-green text-white"
// //                   onClick={() => {
// //                     setSelectedProduct(product);
// //                     setWeight(product.minimum_order_kg);
// //                     setIsDrawerOpen(true);
// //                   }}
// //                 >
// //                   View Details
// //                 </Button>
// //               </div>
// //             </Card>
// //           ))}
// //         </div>
// //       </div>

// //       {/* Drawer */}
// //       {isDrawerOpen && selectedProduct && (
// //         <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40" onClick={resetDrawer}>
// //           <div
// //             className="fixed right-0 top-0 h-full w-[430px] bg-white shadow-2xl p-6 overflow-y-auto z-50"
// //             onClick={(e) => e.stopPropagation()}
// //           >
// //             {/* PRODUCT IMAGE */}
// //             <img
// //               src={selectedProduct.images?.[0]}
// //               alt={selectedProduct.title}
// //               className="w-full h-48 object-cover rounded-lg mb-4"
// //             />

// //             {/* TITLE + BADGES */}
// //             <div className="flex items-center justify-between mb-2">
// //               <h2 className="text-2xl font-bold">{selectedProduct.title}</h2>
// //               {selectedProduct.quality_grade && (
// //                 <Badge className="bg-brand-orange text-white">{selectedProduct.quality_grade.toUpperCase()}</Badge>
// //               )}
// //             </div>

// //             {/* SUBTEXT */}
// //             <p className="text-sm text-muted-foreground mb-3">{selectedProduct.description}</p>

// //             {/* LOCATION + AVAILABLE */}
// //             <div className="space-y-2 mb-4">
// //               <div className="flex items-center gap-2 text-sm text-muted-foreground">
// //                 <MapPin className="w-4 h-4" /> {selectedProduct.location_district}, {selectedProduct.location_state}
// //               </div>
// //               <div className="flex items-center gap-2 text-sm text-muted-foreground">
// //                 <Package className="w-4 h-4" /> {selectedProduct.available_quantity_kg} kg available
// //               </div>
// //             </div>

// //             {/* PRICE */}
// //             <div className="mb-4">
// //               <div className="flex items-baseline gap-1">
// //                 <span className="text-2xl font-bold text-brand-green">₹{selectedProduct.price_per_kg}</span>
// //                 <span className="text-sm text-muted-foreground">/kg</span>
// //               </div>
// //               <p className="text-xs text-muted-foreground">
// //                 Minimum order: {selectedProduct.minimum_order_kg} kg
// //               </p>
// //             </div>

// //             {/* USER INPUTS */}
// //             <div className="mb-4">
// //               <label className="text-sm font-medium">Quantity (kg)</label>
// //               <Input
// //                 type="number"
// //                 value={weight}
// //                 min={selectedProduct.minimum_order_kg}
// //                 onChange={(e) => setWeight(Number(e.target.value))}
// //               />
// //             </div>

// //             <div className="mb-4">
// //               <label className="text-sm font-medium">Name</label>
// //               <Input value={customerName} onChange={(e) => setCustomerName(e.target.value)} />
// //             </div>

// //             <div className="mb-4">
// //               <label className="text-sm font-medium">Phone</label>
// //               <Input value={customerPhone} onChange={(e) => setCustomerPhone(e.target.value)} />
// //             </div>

// //             {/* BUTTONS */}
// //             <div className="flex flex-col gap-2 mt-6">
// //               <Button
// //                 onClick={() => setShowCoinModal(true)}
// //                 className="bg-brand-green text-white w-full"
// //               >
// //                 Pay with Coins ({coinBalance ?? 0} 🪙)
// //               </Button>

// //               <Button
// //                 onClick={openRazorpayPayment}
// //                 className="bg-brand-purple text-white w-full"
// //               >
// //                 Pay with Razorpay
// //               </Button>
// //             </div>
// //           </div>
// //         </div>
// //       )}

// //       {/* Coin Payment Modal */}
// //       {showCoinModal && selectedProduct && userId && (
// //         <CoinPaymentModal
// //           product={selectedProduct}
// //           weight={weight}
// //           customerName={customerName}
// //           customerPhone={customerPhone}
// //           customerId={userId}
// //           onClose={() => setShowCoinModal(false)}
// //           onPurchaseSuccess={(remainingBalance) => setCoinBalance(remainingBalance)}
// //         />
// //       )}
// //     </div>
// //   );
// // }

// import { useState, useEffect } from "react";
// import { Search, MapPin, Package } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Card } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { supabase } from "@/lib/supabase";
// import { useQuery } from "@tanstack/react-query";
// import CoinPaymentModal from "@/components/CoinPaymentModal";

// // ✅ Updated Product type with seller_id
// export interface Product {
//   id: string;
//   seller_id: string;
//   title: string;
//   price_per_kg: number;
//   millet_type?: string;
//   description?: string;
//   location_district?: string;
//   location_state?: string;
//   available_quantity_kg?: number;
//   minimum_order_kg?: number;
//   images?: string[];
//   quality_grade?: string;
//   organic_certified?: boolean;
// }

// export default function Marketplace() {
//   const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
//   const [isDrawerOpen, setIsDrawerOpen] = useState(false);
//   const [weight, setWeight] = useState<number>(0);
//   const [customerName, setCustomerName] = useState("");
//   const [customerPhone, setCustomerPhone] = useState("");
//   const [coinBalance, setCoinBalance] = useState<number | null>(null);
//   const [showCoinModal, setShowCoinModal] = useState(false);
//   const [userId, setUserId] = useState<string | null>(null);
//   const [isOffline, setIsOffline] = useState(!navigator.onLine);

//   const resetDrawer = () => {
//     setIsDrawerOpen(false);
//     setSelectedProduct(null);
//     setWeight(0);
//     setCustomerName("");
//     setCustomerPhone("");
//   };

//   // Detect offline/online
//   useEffect(() => {
//     const handleOffline = () => setIsOffline(true);
//     const handleOnline = () => setIsOffline(false);

//     window.addEventListener("offline", handleOffline);
//     window.addEventListener("online", handleOnline);

//     return () => {
//       window.removeEventListener("offline", handleOffline);
//       window.removeEventListener("online", handleOnline);
//     };
//   }, []);

//   // Get logged-in user id
//   useEffect(() => {
//     supabase.auth.getUser().then(({ data }) => {
//       setUserId(data.user?.id ?? null);
//     });
//   }, []);

//   // Fetch products with offline support
//   const { data: products = [], isLoading } = useQuery({
//     queryKey: ["market-products"],
//     queryFn: async () => {
//       try {
//         const { data, error } = await supabase
//           .from("products")
//           .select("*")
//           .eq("is_active", true)
//           .order("created_at", { ascending: false });

//         if (error) throw error;

//         localStorage.setItem("market-products", JSON.stringify(data));
//         return data;
//       } catch (err) {
//         console.warn("Failed to fetch products, loading cached products.", err);
//         const cached = localStorage.getItem("market-products");
//         if (cached) return JSON.parse(cached);
//         return [];
//       }
//     },
//   });

//   // Fetch user coins with offline support
//   useEffect(() => {
//     if (isDrawerOpen && userId) {
//       supabase
//         .from("profiles")
//         .select("coins")
//         .eq("id", userId)
//         .single()
//         .then(({ data, error }) => {
//           if (!error && data) {
//             setCoinBalance(data.coins);
//             localStorage.setItem(`coins-${userId}`, data.coins.toString());
//           } else {
//             // Load coins from cache if offline
//             const cachedCoins = localStorage.getItem(`coins-${userId}`);
//             if (cachedCoins) setCoinBalance(Number(cachedCoins));
//           }
//         });
//     }
//   }, [isDrawerOpen, userId]);

//   const orderCost = selectedProduct ? weight * selectedProduct.price_per_kg : 0;

//   const openRazorpayPayment = async () => {
//     if (!selectedProduct) return;
//     if (!weight || weight < selectedProduct.minimum_order_kg)
//       return alert(`Enter at least ${selectedProduct.minimum_order_kg} kg`);
//     if (!customerName || !customerPhone) return alert("Enter name & phone!");
//     if (!(window as any).Razorpay) return alert("Razorpay not loaded!");
//     if (isOffline) return alert("Cannot pay offline via Razorpay!");

//     try {
//       const orderRes = await fetch(
//         "https://dnowicpkpatmkzimeiji.supabase.co/functions/v1/create-order",
//         {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ amount: selectedProduct.price_per_kg * weight * 100 }),
//         }
//       );
//       const order = await orderRes.json();

//       const options = {
//         key: "rzp_test_Rl7PSe95LBeOno",
//         amount: order.amount,
//         currency: order.currency,
//         name: "Millet Marketplace",
//         description: selectedProduct.title,
//         order_id: order.id,
//         handler: async (response: any) => {
//           try {
//             const verifyRes = await fetch(
//               "https://dnowicpkpatmkzimeiji.supabase.co/functions/v1/verify-payment",
//               {
//                 method: "POST",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify(response),
//               }
//             );
//             const verify = await verifyRes.json();
//             if (!verify.success) return alert("Payment verification failed!");
//             if (!userId) return alert("User not logged in");

//             await supabase.from("orders").insert([
//               {
//                 product_id: selectedProduct.id,
//                 profile_id: userId,
//                 weight,
//                 amount_inr: selectedProduct.price_per_kg * weight,
//                 payment_method: "razorpay",
//                 status: "paid",
//               },
//             ]);

//             await supabase
//               .from("products")
//               .update({ available_quantity_kg: selectedProduct.available_quantity_kg - weight })
//               .eq("id", selectedProduct.id);

//             alert("Payment Successful & Order Saved!");
//             resetDrawer();
//           } catch (err) {
//             console.error(err);
//             alert("Error processing payment.");
//           }
//         },
//         prefill: { name: customerName, contact: customerPhone },
//         theme: { color: "#7F3FBF" },
//       };

//       const razor = new (window as any).Razorpay(options);
//       razor.open();
//     } catch (err) {
//       console.error(err);
//       alert("Error creating Razorpay order.");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-background">
//       {isOffline && (
//         <div className="bg-yellow-200 text-yellow-800 p-2 text-center mb-4">
//           You are offline. Products are loaded from cache.
//         </div>
//       )}

//       {/* Header */}
//       <div className="bg-gradient-header py-12 px-8">
//         <div className="max-w-7xl mx-auto">
//           <h1 className="text-4xl font-bold text-white mb-3">Millet Marketplace</h1>
//           <p className="text-white text-lg mb-6">Connect with quality millet suppliers across India</p>
//           <div className="flex gap-3 max-w-3xl">
//             <div className="flex-1 relative">
//               <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
//               <Input placeholder="Search..." className="pl-10 h-12 bg-white" />
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Product Grid */}
//       <div className="max-w-7xl mx-auto px-8 py-8">
//         <p className="text-muted-foreground mb-6">
//           {isLoading ? "Loading..." : `${products.length} products found`}
//         </p>
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//           {products.map((product: Product) => (
//             <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow">
//               <div className="relative h-48 bg-muted">
//                 {product.images?.[0] ? (
//                   <img
//                     src={product.images[0]}
//                     alt={product.title}
//                     className="w-full h-full object-cover"
//                   />
//                 ) : (
//                   <div className="w-full h-full flex items-center justify-center bg-gray-100">
//                     <Package className="w-16 h-16 text-gray-300" />
//                   </div>
//                 )}
//                 <div className="absolute top-3 right-3 flex flex-wrap gap-2">
//                   {product.quality_grade && (
//                     <Badge className="bg-brand-orange text-white">{product.quality_grade.toUpperCase()}</Badge>
//                   )}
//                   {product.organic_certified && <Badge className="bg-brand-green text-white">Organic</Badge>}
//                 </div>
//               </div>
//               <div className="p-4">
//                 <p className="text-xs text-muted-foreground mb-1">{product.millet_type}</p>
//                 <h3 className="font-bold text-lg mb-3">{product.title}</h3>
//                 <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{product.description}</p>
//                 <div className="space-y-2 mb-4">
//                   <div className="flex items-center gap-2 text-sm text-muted-foreground">
//                     <MapPin className="w-4 h-4" /> {product.location_district}, {product.location_state}
//                   </div>
//                   <div className="flex items-center gap-2 text-sm text-muted-foreground">
//                     <Package className="w-4 h-4" /> {product.available_quantity_kg} kg available
//                   </div>
//                 </div>
//                 <div className="mb-4">
//                   <div className="flex items-baseline gap-1">
//                     <span className="text-2xl font-bold text-brand-green">₹{product.price_per_kg}</span>
//                     <span className="text-sm text-muted-foreground">/kg</span>
//                   </div>
//                   <p className="text-xs text-muted-foreground">Min order: {product.minimum_order_kg} kg</p>
//                 </div>
//                 <Button
//                   className="w-full bg-gradient-orange-green text-white"
//                   onClick={() => {
//                     setSelectedProduct(product);
//                     setWeight(product.minimum_order_kg);
//                     setIsDrawerOpen(true);
//                   }}
//                 >
//                   View Details
//                 </Button>
//               </div>
//             </Card>
//           ))}
//         </div>
//       </div>

//       {/* Drawer */}
//       {isDrawerOpen && selectedProduct && (
//         <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40" onClick={resetDrawer}>
//           <div
//             className="fixed right-0 top-0 h-full w-[430px] bg-white shadow-2xl p-6 overflow-y-auto z-50"
//             onClick={(e) => e.stopPropagation()}
//           >
//             <img
//               src={selectedProduct.images?.[0]}
//               alt={selectedProduct.title}
//               className="w-full h-48 object-cover rounded-lg mb-4"
//             />
//             <div className="flex items-center justify-between mb-2">
//               <h2 className="text-2xl font-bold">{selectedProduct.title}</h2>
//               {selectedProduct.quality_grade && (
//                 <Badge className="bg-brand-orange text-white">{selectedProduct.quality_grade.toUpperCase()}</Badge>
//               )}
//             </div>
//             <p className="text-sm text-muted-foreground mb-3">{selectedProduct.description}</p>
//             <div className="space-y-2 mb-4">
//               <div className="flex items-center gap-2 text-sm text-muted-foreground">
//                 <MapPin className="w-4 h-4" /> {selectedProduct.location_district}, {selectedProduct.location_state}
//               </div>
//               <div className="flex items-center gap-2 text-sm text-muted-foreground">
//                 <Package className="w-4 h-4" /> {selectedProduct.available_quantity_kg} kg available
//               </div>
//             </div>
//             <div className="mb-4">
//               <div className="flex items-baseline gap-1">
//                 <span className="text-2xl font-bold text-brand-green">₹{selectedProduct.price_per_kg}</span>
//                 <span className="text-sm text-muted-foreground">/kg</span>
//               </div>
//               <p className="text-xs text-muted-foreground">
//                 Minimum order: {selectedProduct.minimum_order_kg} kg
//               </p>
//             </div>
//             <div className="mb-4">
//               <label className="text-sm font-medium">Quantity (kg)</label>
//               <Input
//                 type="number"
//                 value={weight}
//                 min={selectedProduct.minimum_order_kg}
//                 onChange={(e) => setWeight(Number(e.target.value))}
//               />
//             </div>
//             <div className="mb-4">
//               <label className="text-sm font-medium">Name</label>
//               <Input value={customerName} onChange={(e) => setCustomerName(e.target.value)} />
//             </div>
//             <div className="mb-4">
//               <label className="text-sm font-medium">Phone</label>
//               <Input value={customerPhone} onChange={(e) => setCustomerPhone(e.target.value)} />
//             </div>
//             <div className="flex flex-col gap-2 mt-6">
//               <Button
//                 onClick={() => setShowCoinModal(true)}
//                 className="bg-brand-green text-white w-full"
//               >
//                 Pay with Coins ({coinBalance ?? 0} 🪙)
//               </Button>
//               <Button
//                 onClick={openRazorpayPayment}
//                 className="bg-brand-purple text-white w-full"
//               >
//                 Pay with Razorpay
//               </Button>
//             </div>
//           </div>
//         </div>
//       )}

//       {showCoinModal && selectedProduct && userId && (
//         <CoinPaymentModal
//           product={selectedProduct}
//           weight={weight}
//           customerName={customerName}
//           customerPhone={customerPhone}
//           customerId={userId}
//           onClose={() => setShowCoinModal(false)}
//           onPurchaseSuccess={(remainingBalance) => setCoinBalance(remainingBalance)}
//         />
//       )}
//     </div>
//   );
// }

import { useState, useEffect } from "react";
import { Search, MapPin, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/lib/supabase";
import { useQuery } from "@tanstack/react-query";
import CoinPaymentModal from "@/components/CoinPaymentModal";

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
  const [isOffline, setIsOffline] = useState(!navigator.onLine);

  const resetDrawer = () => {
    setIsDrawerOpen(false);
    setSelectedProduct(null);
    setWeight(0);
    setCustomerName("");
    setCustomerPhone("");
  };

  // Detect offline/online
  useEffect(() => {
    const handleOffline = () => setIsOffline(true);
    const handleOnline = () => setIsOffline(false);
    window.addEventListener("offline", handleOffline);
    window.addEventListener("online", handleOnline);
    return () => {
      window.removeEventListener("offline", handleOffline);
      window.removeEventListener("online", handleOnline);
    };
  }, []);

  // Get logged-in user id
  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUserId(data.user?.id ?? null);
    });
  }, []);

  // Load cached products immediately
  const cachedProducts: Product[] = (() => {
    const data = localStorage.getItem("market-products");
    if (data) return JSON.parse(data);
    return [];
  })();

  // Fetch products using react-query
  const { data: products = cachedProducts, isLoading } = useQuery({
    queryKey: ["market-products"],
    queryFn: async () => {
      try {
        const { data, error } = await supabase
          .from("products")
          .select("*")
          .eq("is_active", true)
          .order("created_at", { ascending: false });
        if (error) throw error;
        localStorage.setItem("market-products", JSON.stringify(data));
        return data;
      } catch (err) {
        console.warn("Failed to fetch products, using cache.", err);
        return cachedProducts;
      }
    },
    initialData: cachedProducts,
    staleTime: 1000 * 60 * 60, // 1 hour
  });

  // Load cached coins immediately
  useEffect(() => {
    if (userId) {
      const cachedCoins = localStorage.getItem(`coins-${userId}`);
      if (cachedCoins) setCoinBalance(Number(cachedCoins));

      // Fetch online coins asynchronously
      if (!isOffline) {
        supabase
          .from("profiles")
          .select("coins")
          .eq("id", userId)
          .single()
          .then(({ data, error }) => {
            if (!error && data) {
              setCoinBalance(data.coins);
              localStorage.setItem(`coins-${userId}`, data.coins.toString());
            }
          });
      }
    }
  }, [userId, isOffline]);

  const orderCost = selectedProduct ? weight * selectedProduct.price_per_kg : 0;

  const openRazorpayPayment = async () => {
    if (!selectedProduct) return;
    if (!weight || weight < selectedProduct.minimum_order_kg)
      return alert(`Enter at least ${selectedProduct.minimum_order_kg} kg`);
    if (!customerName || !customerPhone) return alert("Enter name & phone!");
    if (!(window as any).Razorpay) return alert("Razorpay not loaded!");
    if (isOffline) return alert("Cannot pay offline via Razorpay!");

    try {
      const orderRes = await fetch(
        "https://dnowicpkpatmkzimeiji.supabase.co/functions/v1/create-order",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ amount: selectedProduct.price_per_kg * weight * 100 }),
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

            await supabase
              .from("products")
              .update({ available_quantity_kg: selectedProduct.available_quantity_kg - weight })
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
      {isOffline && (
        <div className="bg-yellow-200 text-yellow-800 p-2 text-center mb-4">
          You are offline. Products are loaded from cache.
        </div>
      )}

      {/* Header */}
      <div className="bg-gradient-header py-12 px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold text-white mb-3">Millet Marketplace</h1>
          <p className="text-white text-lg mb-6">Connect with quality millet suppliers across India</p>
          <div className="flex gap-3 max-w-3xl">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input placeholder="Search..." className="pl-10 h-12 bg-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Product Grid */}
      <div className="max-w-7xl mx-auto px-8 py-8">
        <p className="text-muted-foreground mb-6">
          {isLoading ? "Loading..." : `${products.length} products found`}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {products.map((product: Product) => (
            <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-shadow">
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
                    <Badge className="bg-brand-orange text-white">{product.quality_grade.toUpperCase()}</Badge>
                  )}
                  {product.organic_certified && <Badge className="bg-brand-green text-white">Organic</Badge>}
                </div>
              </div>
              <div className="p-4">
                <p className="text-xs text-muted-foreground mb-1">{product.millet_type}</p>
                <h3 className="font-bold text-lg mb-3">{product.title}</h3>
                <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{product.description}</p>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="w-4 h-4" /> {product.location_district}, {product.location_state}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Package className="w-4 h-4" /> {product.available_quantity_kg} kg available
                  </div>
                </div>
                <div className="mb-4">
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-bold text-brand-green">₹{product.price_per_kg}</span>
                    <span className="text-sm text-muted-foreground">/kg</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Min order: {product.minimum_order_kg} kg</p>
                </div>
                <Button
                  className="w-full bg-gradient-orange-green text-white"
                  onClick={() => {
                    setSelectedProduct(product);
                    setWeight(product.minimum_order_kg);
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
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40" onClick={resetDrawer}>
          <div
            className="fixed right-0 top-0 h-full w-[430px] bg-white shadow-2xl p-6 overflow-y-auto z-50"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedProduct.images?.[0]}
              alt={selectedProduct.title}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-2xl font-bold">{selectedProduct.title}</h2>
              {selectedProduct.quality_grade && (
                <Badge className="bg-brand-orange text-white">{selectedProduct.quality_grade.toUpperCase()}</Badge>
              )}
            </div>
            <p className="text-sm text-muted-foreground mb-3">{selectedProduct.description}</p>
            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4" /> {selectedProduct.location_district}, {selectedProduct.location_state}
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Package className="w-4 h-4" /> {selectedProduct.available_quantity_kg} kg available
              </div>
            </div>
            <div className="mb-4">
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-bold text-brand-green">₹{selectedProduct.price_per_kg}</span>
                <span className="text-sm text-muted-foreground">/kg</span>
              </div>
              <p className="text-xs text-muted-foreground">
                Minimum order: {selectedProduct.minimum_order_kg} kg
              </p>
            </div>
            <div className="mb-4">
              <label className="text-sm font-medium">Quantity (kg)</label>
              <Input
                type="number"
                value={weight}
                min={selectedProduct.minimum_order_kg}
                onChange={(e) => setWeight(Number(e.target.value))}
              />
            </div>
            <div className="mb-4">
              <label className="text-sm font-medium">Name</label>
              <Input value={customerName} onChange={(e) => setCustomerName(e.target.value)} />
            </div>
            <div className="mb-4">
              <label className="text-sm font-medium">Phone</label>
              <Input value={customerPhone} onChange={(e) => setCustomerPhone(e.target.value)} />
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

      {showCoinModal && selectedProduct && userId && (
        <CoinPaymentModal
          product={selectedProduct}
          weight={weight}
          customerName={customerName}
          customerPhone={customerPhone}
          customerId={userId}
          onClose={() => setShowCoinModal(false)}
          onPurchaseSuccess={(remainingBalance) => setCoinBalance(remainingBalance)}
        />
      )}
    </div>
  );
}
