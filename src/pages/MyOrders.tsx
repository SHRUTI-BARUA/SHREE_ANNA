// import React, { useState, useEffect } from "react";
// import { ShoppingCart } from "lucide-react";
// import {
//   Tabs,
//   TabsContent,
//   TabsList,
//   TabsTrigger,
// } from "@/components/ui/tabs";
// import { supabase } from "@/lib/supabase";
// import OrderCard from "@/components/ui/OrderCard";
// import { useTranslation } from "react-i18next";

// // ------------------ Types ------------------
// type ProfileType = "farmer" | "buyer";

// interface Order {
//   id: string;
//   productName: string;
//   image?: string | null;
//   quantity: number;
//   status: string;
//   date: Date;
//   amount_inr: number;
// }

// interface OrdersListProps {
//   orders: Order[];
//   profileType: ProfileType;
//   onUpdateStatus: (id: string, status: string) => void;
// }

// // ------------------ MyOrders Component ------------------
// export default function MyOrders() {
//   const { t } = useTranslation();
//   const [profileType, setProfileType] = useState<ProfileType>("farmer");
//   const [orders, setOrders] = useState<Order[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [userId, setUserId] = useState<string | null>(null);

//   // ------------------------ Get Logged-in User ----------------------------
//   useEffect(() => {
//     const getUser = async () => {
//       const { data, error } = await supabase.auth.getUser();
//       if (!error && data?.user) {
//         setUserId(data.user.id);
//       }
//     };
//     getUser();
//   }, []);

//   // ------------------------ Fetch Orders ---------------------------------
//   useEffect(() => {
//     if (!userId) return;

//     const fetchOrders = async () => {
//       setLoading(true);
//       try {
//         const { data: ordersData, error } = await supabase
//           .from("orders")
//           .select(
//             `
//             id,
//             weight,
//             amount_inr,
//             status,
//             created_at,
//             product:product_id (
//               id,
//               title,
//               images,
//               seller_id
//             ),
//             buyer:profile_id (
//               id
//             )
//           `
//           )
//           .order("created_at", { ascending: false });

//         if (error) throw error;

//         const rawOrders = (ordersData ?? []) as any[];

//         // Filter Orders for Farmer/Buyer
//         const filteredOrders = rawOrders.filter((o) =>
//           profileType === "buyer"
//             ? o.buyer?.id === userId
//             : o.product?.seller_id === userId
//         );

//         // Format Orders
//         const formattedOrders: Order[] = filteredOrders.map((o) => ({
//           id: o.id,
//           productName: o.product?.title ?? t("orders.productDeleted"),
//           image: o.product?.images?.[0] ?? null,
//           quantity: o.weight,
//           status: o.status,
//           date: o.created_at ? new Date(o.created_at) : new Date(),
//           amount_inr: o.amount_inr,
//         }));

//         setOrders(formattedOrders);
//       } catch (err) {
//         console.error("Error fetching orders:", err);
//         setOrders([]);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchOrders();
//   }, [userId, profileType]);

//   // -------------------- Categorize Orders ----------------------
//   const pendingOrders = orders.filter((o) =>
//     ["pending", "confirmed"].includes(o.status)
//   );
//   const activeOrders = orders.filter((o) =>
//     ["processing", "shipped"].includes(o.status)
//   );
//   const completedOrders = orders.filter((o) =>
//     ["delivered", "cancelled"].includes(o.status)
//   );

//   // -------------------- Update Order Status ----------------------
//   const handleUpdateStatus = (id: string, status: string) => {
//     setOrders((prev) =>
//       prev.map((order) => (order.id === id ? { ...order, status } : order))
//     );
//   };

//   // -------------------- Loading UI -------------------------
//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <p className="text-gray-600">{t("orders.loading")}</p>
//       </div>
//     );
//   }

//   // -------------------- Main UI -------------------------
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-green-50 p-4 md:p-8">
//       <div className="max-w-7xl mx-auto">
//         {/* Toggle Farmer/Buyer */}
//         <div className="flex gap-4 mb-6">
//           <button
//             onClick={() => setProfileType("farmer")}
//             className={`px-4 py-2 rounded-lg border ${
//               profileType === "farmer"
//                 ? "bg-green-600 text-white"
//                 : "bg-white text-gray-700"
//             }`}
//           >
//             {t("orders.toggleFarmer")}
//           </button>
//           <button
//             onClick={() => setProfileType("buyer")}
//             className={`px-4 py-2 rounded-lg border ${
//               profileType === "buyer"
//                 ? "bg-blue-600 text-white"
//                 : "bg-white text-gray-700"
//             }`}
//           >
//             {t("orders.toggleBuyer")}
//           </button>
//         </div>

//         {/* Header */}
//         <div className="mb-8">
//           <h1 className="text-3xl font-bold text-gray-900 mb-2">
//             {profileType === "farmer"
//               ? t("orders.headerSales")
//               : t("orders.headerPurchases")}
//           </h1>
//           <p className="text-gray-600">{t("orders.subheader")}</p>
//         </div>

//         {/* Tabs */}
//         <Tabs defaultValue="all" className="w-full">
//           <TabsList className="grid w-full grid-cols-4 mb-8">
//             <TabsTrigger value="all">
//               {t("orders.tabs.all", { count: orders.length })}
//             </TabsTrigger>
//             <TabsTrigger value="pending">
//               {t("orders.tabs.pending", { count: pendingOrders.length })}
//             </TabsTrigger>
//             <TabsTrigger value="active">
//               {t("orders.tabs.active", { count: activeOrders.length })}
//             </TabsTrigger>
//             <TabsTrigger value="completed">
//               {t("orders.tabs.completed", { count: completedOrders.length })}
//             </TabsTrigger>
//           </TabsList>

//           <TabsContent value="all">
//             <OrdersList
//               orders={orders}
//               profileType={profileType}
//               onUpdateStatus={handleUpdateStatus}
//             />
//           </TabsContent>
//           <TabsContent value="pending">
//             <OrdersList
//               orders={pendingOrders}
//               profileType={profileType}
//               onUpdateStatus={handleUpdateStatus}
//             />
//           </TabsContent>
//           <TabsContent value="active">
//             <OrdersList
//               orders={activeOrders}
//               profileType={profileType}
//               onUpdateStatus={handleUpdateStatus}
//             />
//           </TabsContent>
//           <TabsContent value="completed">
//             <OrdersList
//               orders={completedOrders}
//               profileType={profileType}
//               onUpdateStatus={handleUpdateStatus}
//             />
//           </TabsContent>
//         </Tabs>
//       </div>
//     </div>
//   );
// }

// // --------------------------- OrdersList Component ---------------------------
// function OrdersList({
//   orders,
//   profileType,
//   onUpdateStatus,
// }: OrdersListProps) {
//   const { t } = useTranslation();
//   if (!orders.length) {
//     return (
//       <div className="text-center py-20">
//         <ShoppingCart className="w-24 h-24 mx-auto text-gray-300 mb-4" />
//         <h3 className="text-2xl font-semibold text-gray-700 mb-2">
//           {t("orders.emptyTitle")}
//         </h3>
//         <p className="text-gray-500">{t("orders.emptySubtitle")}</p>
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-4">
//       {orders.map((order) => (
//         <OrderCard
//           key={order.id}
//           order={order}
//           profileType={profileType}
//           onUpdateStatus={onUpdateStatus}
//         />
//       ))}
//     </div>
//   );
// }
import React, { useState, useEffect } from "react";
import { ShoppingCart } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/lib/supabase";
import OrderCard from "@/components/ui/OrderCard";
import { useTranslation } from "react-i18next";

type ProfileType = "farmer" | "buyer";

// interface Order {
//   id: string;
//   productName: string;
//   image?: string | null;
//   quantity: number;
//   status: string;
//   date: Date;
//   amount_inr: number;
//   batch_id?: string;              
// }
interface Order {
  id: string;
  productName: string;
  image?: string | null;
  quantity: number;
  status: string;
  date: Date;
  amount_inr: number;
  batch_id?: string | null;   
}

interface OrdersListProps {
  orders: Order[];
  profileType: ProfileType;
  onUpdateStatus: (id: string, status: string) => void;
}

export default function MyOrders() {
  const { t } = useTranslation();
  const [profileType, setProfileType] = useState<ProfileType>("farmer");
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (data?.user) setUserId(data.user.id);
    };
    getUser();
  }, []);

  useEffect(() => {
    if (!userId) return;
    const fetchOrders = async () => {
      setLoading(true);
      try {
        // const { data: ordersData, error } = await supabase
        //   .from("orders")
        //   .select(`
        //     id,
        //     weight,
        //     batch_id,          
        //     amount_inr,
        //     status,
        //     created_at,
        //     product:product_id (
        //       id,
        //       title,
        //       images,
        //       seller_id
        //     ),
        //     buyer:profile_id ( id )
        //   `)
        //   .order("created_at", { ascending: false });

        const { data: ordersData, error } = await supabase
  .from("orders")
  .select(`
    id,
    weight,
    amount_inr,
    status,
    created_at,
    product:product_id (
      id,
      title,
      images,
      seller_id,
      batch_id        
    ),
    buyer:profile_id ( id )
  `)
  .order("created_at", { ascending: false });


        if (error) throw error;

        const rawOrders = (ordersData ?? []) as any[];

        const filteredOrders = rawOrders.filter((o) =>
          profileType === "buyer" ? o.buyer?.id === userId : o.product?.seller_id === userId
        );

        // const formattedOrders: Order[] = filteredOrders.map((o) => ({
        //   id: o.id,
        //   productName: o.product?.title ?? t("orders.productDeleted"),
        //   image: o.product?.images?.[0] ?? null,
        //   quantity: o.weight,
        //   status: o.status,
        //   date: new Date(o.created_at),
        //   amount_inr: o.amount_inr,
        //   batch_id: o.batch_id,          // <-- ADDED
        // }));

        // const formattedOrders: Order[] = filteredOrders.map((o) => ({
        //   id: o.id,
        //   productName: o.product?.title ?? t("orders.productDeleted"),
        //   image: o.product?.images?.[0] ?? null,
        //   quantity: o.weight,
        //   status: o.status,
        //   date: o.created_at ? new Date(o.created_at) : new Date(),
        //   amount_inr: o.amount_inr,
        //   batch_id: o.batch_id ?? null,   // <-- ADD THIS
        // }));


        const formattedOrders: Order[] = filteredOrders.map((o) => ({
  id: o.id,
  productName: o.product?.title ?? t("orders.productDeleted"),
  image: o.product?.images?.[0] ?? null,
  quantity: o.weight,
  status: o.status,
  date: o.created_at ? new Date(o.created_at) : new Date(),
  amount_inr: o.amount_inr,
  batch_id: o.product?.batch_id ?? null,  
}));


        setOrders(formattedOrders);
      } catch (err) {
        console.error("Error fetching orders:", err);
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [userId, profileType]);

  const pendingOrders = orders.filter((o) => ["pending", "confirmed"].includes(o.status));
  const activeOrders = orders.filter((o) => ["processing", "shipped"].includes(o.status));
  const completedOrders = orders.filter((o) => ["delivered", "cancelled"].includes(o.status));

  const handleUpdateStatus = (id: string, status: string) => {
    setOrders((prev) =>
      prev.map((order) => (order.id === id ? { ...order, status } : order))
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">{t("orders.loading")}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-green-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex gap-4 mb-6">
          <button onClick={() => setProfileType("farmer")}
            className={`px-4 py-2 rounded-lg border ${profileType === "farmer"
              ? "bg-green-600 text-white" : "bg-white text-gray-700"}`}>
            {t("orders.toggleFarmer")}
          </button>

          <button onClick={() => setProfileType("buyer")}
            className={`px-4 py-2 rounded-lg border ${profileType === "buyer"
              ? "bg-blue-600 text-white" : "bg-white text-gray-700"}`}>
            {t("orders.toggleBuyer")}
          </button>
        </div>

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {profileType === "farmer" ? t("orders.headerSales") : t("orders.headerPurchases")}
          </h1>
          <p className="text-gray-600">{t("orders.subheader")}</p>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="all">{t("orders.tabs.all", { count: orders.length })}</TabsTrigger>
            <TabsTrigger value="pending">{t("orders.tabs.pending", { count: pendingOrders.length })}</TabsTrigger>
            <TabsTrigger value="active">{t("orders.tabs.active", { count: activeOrders.length })}</TabsTrigger>
            <TabsTrigger value="completed">{t("orders.tabs.completed", { count: completedOrders.length })}</TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            <OrdersList orders={orders} profileType={profileType} onUpdateStatus={handleUpdateStatus} />
          </TabsContent>

          <TabsContent value="pending">
            <OrdersList orders={pendingOrders} profileType={profileType} onUpdateStatus={handleUpdateStatus} />
          </TabsContent>

          <TabsContent value="active">
            <OrdersList orders={activeOrders} profileType={profileType} onUpdateStatus={handleUpdateStatus} />
          </TabsContent>

          <TabsContent value="completed">
            <OrdersList orders={completedOrders} profileType={profileType} onUpdateStatus={handleUpdateStatus} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

function OrdersList({ orders, profileType, onUpdateStatus }: OrdersListProps) {
  const { t } = useTranslation();

  if (!orders.length) {
    return (
      <div className="text-center py-20">
        <ShoppingCart className="w-24 h-24 mx-auto text-gray-300 mb-4" />
        <h3 className="text-2xl font-semibold text-gray-700 mb-2">
          {t("orders.emptyTitle")}
        </h3>
        <p className="text-gray-500">{t("orders.emptySubtitle")}</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {orders.map((order) => (
        <OrderCard key={order.id} order={order} profileType={profileType} onUpdateStatus={onUpdateStatus} />
      ))}
    </div>
  );
}
