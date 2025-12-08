// // import React, { useState } from "react";
// // import { useQuery } from "@tanstack/react-query";
// // import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// // import { Input } from "@/components/ui/input";
// // import { Button } from "@/components/ui/button";
// // import {
// //   Search,
// //   Package,
// //   Truck,
// //   CheckCircle,
// //   MapPin,
// //   Award,
// //   Shield,
// // } from "lucide-react";
// // import { format } from "date-fns";
// // import { useTranslation } from "react-i18next";

// // type StageItem = {
// //   labelKey: string;
// //   date: string;
// //   icon: typeof Package;
// //   completed: boolean;
// // };

// // // ------- Mock Data --------
// // const baseStages: StageItem[] = [
// //   { labelKey: "traceability.stages.ordered", date: "2025-12-01", icon: Package, completed: true },
// //   { labelKey: "traceability.stages.packed", date: "2025-12-02", icon: CheckCircle, completed: true },
// //   { labelKey: "traceability.stages.shipped", date: "2025-12-03", icon: Truck, completed: true },
// //   { labelKey: "traceability.stages.outForDelivery", date: "", icon: MapPin, completed: false },
// //   { labelKey: "traceability.stages.delivered", date: "", icon: Award, completed: false },
// // ];

// // const orderMock = [
// //   {
// //     id: "ORD123",
// //     stages: baseStages,
// //   },
// // ];

// // export default function Traceability() {
// //   const { t } = useTranslation();
// //   const [orderId, setOrderId] = useState("");
// //   const [orderData, setOrderData] = useState<any>(null);

// //   const { data: orders = orderMock } = useQuery({
// //     queryKey: ["orders"],
// //     queryFn: async () => orderMock,
// //   });

// //   const handleTrack = () => {
// //     const found = orders.find((o) => o.id === orderId);

// //     if (!found) {
// //       alert(t("traceability.noOrderFound"));
// //       setOrderData(null);
// //       return;
// //     }
// //     setOrderData(found);
// //   };

// //   const translateStages = (stages: StageItem[]) =>
// //     stages.map((stage) => ({
// //       ...stage,
// //       label: t(stage.labelKey),
// //     }));

// //   const timelineToDisplay = translateStages(orderData ? orderData.stages : baseStages);

// //   return (
// //     <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-green-50 p-4 md:p-8">
// //       <div className="max-w-6xl mx-auto">

// //         {/* Header */}
// //         <div className="mb-8">
// //           <div className="flex items-center gap-3 mb-4">
// //             <div className="p-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl">
// //               <Shield className="w-8 h-8 text-white" />
// //             </div>
// //             <div>
// //               <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
// //                 {t("traceability.heroTitle")}
// //               </h1>
// //               <p className="text-lg text-gray-600">{t("traceability.heroSubtitle")}</p>
// //             </div>
// //           </div>
// //         </div>

// //         {/* Search Box */}
// //         <Card className="mb-8 shadow-lg">
// //           <CardContent className="p-8">
// //             <div className="text-center mb-6">
// //               <h3 className="text-xl font-semibold mb-2">{t("traceability.enterOrderIdTitle")}</h3>
// //               <p className="text-gray-600">{t("traceability.enterOrderIdSubtitle")}</p>
// //             </div>

// //             <div className="flex gap-3 max-w-2xl mx-auto">
// //               <div className="relative flex-1">
// //                 <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
// //                 <Input
// //                   value={orderId}
// //                   onChange={(e) => setOrderId(e.target.value)}
// //                   onKeyDown={(e) => e.key === "Enter" && handleTrack()}
// //                   placeholder={t("traceability.orderIdPlaceholder")}
// //                   className="pl-10 h-12"
// //                 />
// //               </div>

// //               <Button
// //                 onClick={handleTrack}
// //                 className="h-12 bg-gradient-to-r from-blue-500 to-blue-600"
// //               >
// //                 <Search className="w-4 h-4 mr-2" />
// //                 {t("traceability.trackButton")}
// //               </Button>
// //             </div>
// //           </CardContent>
// //         </Card>

// //         {/* Timeline Section */}
// //         <Card className="shadow-lg p-6 mb-12">
// //           <CardHeader>
// //             <CardTitle className="text-lg font-semibold">{t("traceability.timelineTitle")}</CardTitle>
// //           </CardHeader>

// //           <CardContent className="pt-6">
// //             <div className="relative flex justify-between items-center w-full px-4">
// //               <div className="absolute top-6 left-0 right-0 h-1 bg-gray-300" />

// //               {timelineToDisplay.map((stage: any, index: number) => (
// //                 <div key={index} className="flex flex-col items-center z-10">
// //                   <div
// //                     className={`w-14 h-14 rounded-full flex items-center justify-center shadow-md
// //                     ${stage.completed ? "bg-green-600 text-white" : "bg-gray-300 text-gray-700"}`}
// //                   >
// //                     <stage.icon className="w-7 h-7" />
// //                   </div>

// //                   <p className="text-sm font-medium text-center mt-2">{stage.label}</p>

// //                   {stage.date && (
// //                     <p className="text-xs text-gray-500 mt-1">
// //                       {format(new Date(stage.date), "MMM d")}
// //                     </p>
// //                   )}
// //                 </div>
// //               ))}
// //             </div>
// //           </CardContent>
// //         </Card>

// //         {/* Why Traceability Matters Section */}
// //         <div className="bg-white p-8 rounded-xl shadow-lg mb-12">
// //           <h2 className="text-2xl font-bold mb-6 text-gray-800">{t("traceability.whyTitle")}</h2>

// //           <div className="grid md:grid-cols-3 gap-6">
// //             <div>
// //               <h3 className="text-xl font-semibold mb-3 text-green-700">
// //                 {t("traceability.consumersTitle")}
// //               </h3>
// //               <ul className="text-gray-700 space-y-2">
// //                 {(t("traceability.consumersList", { returnObjects: true }) as string[]).map(
// //                   (item, idx) => (
// //                     <li key={idx}>✔ {item}</li>
// //                   )
// //                 )}
// //               </ul>
// //             </div>

// //             <div>
// //               <h3 className="text-xl font-semibold mb-3 text-blue-700">
// //                 {t("traceability.farmersTitle")}
// //               </h3>
// //               <ul className="text-gray-700 space-y-2">
// //                 {(t("traceability.farmersList", { returnObjects: true }) as string[]).map(
// //                   (item, idx) => (
// //                     <li key={idx}>✔ {item}</li>
// //                   )
// //                 )}
// //               </ul>
// //             </div>

// //             <div>
// //               <h3 className="text-xl font-semibold mb-3 text-purple-700">
// //                 {t("traceability.platformTitle")}
// //               </h3>
// //               <ul className="text-gray-700 space-y-2">
// //                 {(t("traceability.platformList", { returnObjects: true }) as string[]).map(
// //                   (item, idx) => (
// //                     <li key={idx}>✔ {item}</li>
// //                   )
// //                 )}
// //               </ul>
// //             </div>
// //           </div>
// //         </div>

// //       </div>
// //     </div>
// //   );
// // }
// import React, { useState } from "react";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Search, Package, Truck, CheckCircle, MapPin, Award, Shield } from "lucide-react";
// import { format } from "date-fns";
// import { useTranslation } from "react-i18next";
// import { supabase } from "@/lib/supabase";

// type StageItem = {
//   labelKey: string;
//   date: string;
//   icon: typeof Package;
//   completed: boolean;
// };

// export default function Traceability() {
//   const { t } = useTranslation();
//   const [batchId, setBatchId] = useState("");
//   const [orderData, setOrderData] = useState<any>(null);
//   const [loading, setLoading] = useState(false);

//   const baseStages: StageItem[] = [
//     { labelKey: "traceability.stages.ordered", date: "", icon: Package, completed: false },
//     { labelKey: "traceability.stages.packed", date: "", icon: CheckCircle, completed: false },
//     { labelKey: "traceability.stages.shipped", date: "", icon: Truck, completed: false },
//     { labelKey: "traceability.stages.outForDelivery", date: "", icon: MapPin, completed: false },
//     { labelKey: "traceability.stages.delivered", date: "", icon: Award, completed: false },
//   ];

//   const fetchOrderByBatchId = async (batch: string) => {
//     setLoading(true);
//     try {
//       const { data, error } = await supabase
//         .from("orders")
//         .select(`
//           id,
//           weight,
//           amount_inr,
//           status,
//           created_at,
//           batch_id,
//           product:product_id (
//             id,
//             title,
//             images,
//             seller_id,
//             batch_id,
//             harvest_date,
//             location_state,
//             location_district
//           ),
//           buyer:profile_id (
//             id,
//             profile_type,
//             contact_person_name,
//             phone_number,
//             state,
//             district,
//             village
//           )
//         `)
//         .eq("batch_id", batch.trim())
//         .maybeSingle();
//       if (error) {
//         console.error("Error fetching order:", error);
//         alert(t("traceability.errorFetchingOrder"));
//         setOrderData(null);
//         return;
//       }

//       if (!data) {
//         alert(t("traceability.noOrderFound"));
//         setOrderData(null);
//       } else {
//         setOrderData(data);
//       }
//     } catch (err) {
//       console.error("Unexpected error fetching order:", err);
//       alert(t("traceability.errorFetchingOrder"));
//       setOrderData(null);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleTrack = () => {
//     if (!batchId.trim()) return;
//     fetchOrderByBatchId(batchId.trim());
//   };

//   const translateStages = (stages: StageItem[]) =>
//     stages.map((stage) => ({
//       ...stage,
//       label: t(stage.labelKey),
//     }));

//   const timelineToDisplay = orderData
//     ? translateStages([
//         { labelKey: "traceability.stages.ordered", date: orderData.created_at, icon: Package, completed: true },
//         { labelKey: "traceability.stages.packed", date: "", icon: CheckCircle, completed: false },
//         { labelKey: "traceability.stages.shipped", date: "", icon: Truck, completed: false },
//         { labelKey: "traceability.stages.outForDelivery", date: "", icon: MapPin, completed: false },
//         { labelKey: "traceability.stages.delivered", date: "", icon: Award, completed: false },
//       ])
//     : translateStages(baseStages);

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-green-50 p-4 md:p-8">
//       <div className="max-w-6xl mx-auto">

//         {/* Header */}
//         <div className="mb-8">
//           <div className="flex items-center gap-3 mb-4">
//             <div className="p-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl">
//               <Shield className="w-8 h-8 text-white" />
//             </div>
//             <div>
//               <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
//                 {t("traceability.heroTitle")}
//               </h1>
//               <p className="text-lg text-gray-600">{t("traceability.heroSubtitle")}</p>
//             </div>
//           </div>
//         </div>

//         {/* Search Box */}
//         <Card className="mb-8 shadow-lg">
//           <CardContent className="p-8">
//             <div className="text-center mb-6">
//               <h3 className="text-xl font-semibold mb-2">{t("traceability.enterOrderIdTitle")}</h3>
//               <p className="text-gray-600">{t("traceability.enterOrderIdSubtitle")}</p>
//             </div>

//             <div className="flex gap-3 max-w-2xl mx-auto">
//               <div className="relative flex-1">
//                 <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
//                 <Input
//                   value={batchId}
//                   onChange={(e) => setBatchId(e.target.value)}
//                   onKeyDown={(e) => e.key === "Enter" && handleTrack()}
//                   placeholder={t("traceability.batchIdPlaceholder")}
//                   className="pl-10 h-12"
//                 />
//               </div>

//               <Button
//                 onClick={handleTrack}
//                 className="h-12 bg-gradient-to-r from-blue-500 to-blue-600"
//                 disabled={loading}
//               >
//                 <Search className="w-4 h-4 mr-2" />
//                 {loading ? t("traceability.loading") : t("traceability.trackButton")}
//               </Button>
//             </div>
//           </CardContent>
//         </Card>

//         {/* Timeline Section */}
//         <Card className="shadow-lg p-6 mb-8">
//           <CardHeader>
//             <CardTitle className="text-lg font-semibold">{t("traceability.timelineTitle")}</CardTitle>
//           </CardHeader>

//           <CardContent className="pt-6">
//             <div className="relative flex justify-between items-center w-full px-4">
//               <div className="absolute top-6 left-0 right-0 h-1 bg-gray-300" />
//               {timelineToDisplay.map((stage: any, index: number) => (
//                 <div key={index} className="flex flex-col items-center z-10">
//                   <div
//                     className={`w-14 h-14 rounded-full flex items-center justify-center shadow-md
//                     ${stage.completed ? "bg-green-600 text-white" : "bg-gray-300 text-gray-700"}`}
//                   >
//                     <stage.icon className="w-7 h-7" />
//                   </div>
//                   <p className="text-sm font-medium text-center mt-2">{stage.label}</p>
//                   {stage.date && (
//                     <p className="text-xs text-gray-500 mt-1">
//                       {format(new Date(stage.date), "MMM d")}
//                     </p>
//                   )}
//                 </div>
//               ))}
//             </div>
//           </CardContent>
//         </Card>

//         {/* Order Details Section */}
//         {orderData && (
//           <Card className="bg-white p-6 rounded-xl shadow-lg mb-12">
//             <h2 className="text-2xl font-bold mb-6 text-gray-800">{t("traceability.orderDetailsTitle")}</h2>

//             <div className="grid md:grid-cols-2 gap-6">
//               <div>
//                 <p><strong>{t("traceability.productName")}:</strong> {orderData.product?.title}</p>
//                 <p><strong>{t("traceability.batchId")}:</strong> {orderData.product?.batch_id || orderData.batch_id}</p>
//                 <p><strong>{t("traceability.harvestDate")}:</strong> {orderData.product?.harvest_date ? format(new Date(orderData.product.harvest_date), "dd MMM yyyy") : "-"}</p>
//                 <p><strong>{t("traceability.location")}:</strong> {orderData.product?.location_district}, {orderData.product?.location_state}</p>
//               </div>
//               <div>
//                 <p><strong>{t("traceability.farmerName")}:</strong> {orderData.buyer?.contact_person_name}</p>
//                 <p><strong>{t("traceability.phone")}:</strong> {orderData.buyer?.phone_number}</p>
//                 <p><strong>{t("traceability.village")}:</strong> {orderData.buyer?.village}</p>
//                 <p><strong>{t("traceability.profileType")}:</strong> {orderData.buyer?.profile_type}</p>
//               </div>
//             </div>
//           </Card>
//         )}

//       </div>
//     </div>
//   );
// }


import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Package, Truck, CheckCircle, MapPin, Award, Shield } from "lucide-react";
import { format } from "date-fns";
import { useTranslation } from "react-i18next";
import { supabase } from "@/lib/supabase";

type StageItem = {
  labelKey: string;
  date: string;
  icon: typeof Package;
  completed: boolean;
};

export default function Traceability() {
  const { t } = useTranslation();
  const [batchId, setBatchId] = useState("");
  const [orderData, setOrderData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const baseStages: StageItem[] = [
    { labelKey: "traceability.stages.ordered", date: "", icon: Package, completed: false },
    { labelKey: "traceability.stages.packed", date: "", icon: CheckCircle, completed: false },
    { labelKey: "traceability.stages.shipped", date: "", icon: Truck, completed: false },
    { labelKey: "traceability.stages.outForDelivery", date: "", icon: MapPin, completed: false },
    { labelKey: "traceability.stages.delivered", date: "", icon: Award, completed: false },
  ];

  // const fetchOrderByBatchId = async (batch: string) => {
  //   setLoading(true);
  //   try {
  //     // ✅ Correct query: filter by product.batch_id, not orders.batch_id
  //     const { data, error } = await supabase
  //       .from("orders")
  //       .select(`
  //         id,
  //         weight,
  //         amount_inr,
  //         status,
  //         created_at,
  //         product:product_id (
  //           id,
  //           title,
  //           images,
  //           seller_id,
  //           batch_id,
  //           harvest_date,
  //           location_state,
  //           location_district
  //         ),
  //         buyer:profile_id (
  //           id,
  //           profile_type,
  //           contact_person_name,
  //           phone_number,
  //           state,
  //           district,
  //           village
  //         )
  //       `)
  //       .eq("product.batch_id", batch.trim())
  //       .maybeSingle();

  //     if (error) {
  //       console.error("Error fetching order:", error);
  //       alert(t("traceability.errorFetchingOrder"));
  //       setOrderData(null);
  //       return;
  //     }

  //     if (!data) {
  //       alert(t("traceability.noOrderFound"));
  //       setOrderData(null);
  //     } else {
  //       setOrderData(data);
  //     }
  //   } catch (err) {
  //     console.error("Unexpected error fetching order:", err);
  //     alert(t("traceability.errorFetchingOrder"));
  //     setOrderData(null);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

const fetchOrderByBatchId = async (batch: string) => {
  setLoading(true);
  try {
    // Fetch all orders with their products
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
          batch_id,
          harvest_date,
          location_state,
          location_district
        ),
        buyer:profile_id (
          id,
          profile_type,
          contact_person_name,
          phone_number,
          state,
          district,
          village
        )
      `)
      .order("created_at", { ascending: false });

    if (error) throw error;

    if (!ordersData || ordersData.length === 0) {
      alert(t("traceability.noOrderFound"));
      setOrderData(null);
      return;
    }

    // Filter in JS by batch ID
    const matchedOrder = ordersData.find(
      (o: any) => o.product?.batch_id?.trim() === batch.trim()
    );

    if (!matchedOrder) {
      alert(t("traceability.noOrderFound"));
      setOrderData(null);
    } else {
      setOrderData(matchedOrder);
    }
  } catch (err) {
    console.error("Error fetching order:", err);
    alert(t("traceability.errorFetchingOrder"));
    setOrderData(null);
  } finally {
    setLoading(false);
  }
};



  const handleTrack = () => {
    if (!batchId.trim()) return;
    fetchOrderByBatchId(batchId.trim());
  };

  const translateStages = (stages: StageItem[]) =>
    stages.map((stage) => ({
      ...stage,
      label: t(stage.labelKey),
    }));

  const timelineToDisplay = orderData
    ? translateStages([
        { labelKey: "traceability.stages.ordered", date: orderData.created_at, icon: Package, completed: true },
        { labelKey: "traceability.stages.packed", date: "", icon: CheckCircle, completed: false },
        { labelKey: "traceability.stages.shipped", date: "", icon: Truck, completed: false },
        { labelKey: "traceability.stages.outForDelivery", date: "", icon: MapPin, completed: false },
        { labelKey: "traceability.stages.delivered", date: "", icon: Award, completed: false },
      ])
    : translateStages(baseStages);

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-green-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                {t("traceability.heroTitle")}
              </h1>
              <p className="text-lg text-gray-600">{t("traceability.heroSubtitle")}</p>
            </div>
          </div>
        </div>

        {/* Search Box */}
        <Card className="mb-8 shadow-lg">
          <CardContent className="p-8">
            <div className="text-center mb-6">
              <h3 className="text-xl font-semibold mb-2">{t("Enter Batch_id ")}</h3>
              <p className="text-gray-600">{t("traceability.enterOrderIdSubtitle")}</p>
            </div>

            <div className="flex gap-3 max-w-2xl mx-auto">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <Input
                  value={batchId}
                  onChange={(e) => setBatchId(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleTrack()}
                  placeholder={t("traceability.batchIdPlaceholder")}
                  className="pl-10 h-12"
                />
              </div>

              <Button
                onClick={handleTrack}
                className="h-12 bg-gradient-to-r from-blue-500 to-blue-600"
                disabled={loading}
              >
                <Search className="w-4 h-4 mr-2" />
                {loading ? t("traceability.loading") : t("traceability.trackButton")}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Timeline Section */}
        <Card className="shadow-lg p-6 mb-8">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">{t("traceability.timelineTitle")}</CardTitle>
          </CardHeader>

          <CardContent className="pt-6">
            <div className="relative flex justify-between items-center w-full px-4">
              <div className="absolute top-6 left-0 right-0 h-1 bg-gray-300" />
              {timelineToDisplay.map((stage: any, index: number) => (
                <div key={index} className="flex flex-col items-center z-10">
                  <div
                    className={`w-14 h-14 rounded-full flex items-center justify-center shadow-md
                    ${stage.completed ? "bg-green-600 text-white" : "bg-gray-300 text-gray-700"}`}
                  >
                    <stage.icon className="w-7 h-7" />
                  </div>
                  <p className="text-sm font-medium text-center mt-2">{stage.label}</p>
                  {stage.date && (
                    <p className="text-xs text-gray-500 mt-1">
                      {format(new Date(stage.date), "MMM d")}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Order Details Section */}
        {orderData && (
          <Card className="bg-white p-6 rounded-xl shadow-lg mb-12">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">{t("TraceabilityDetails")}</h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <p><strong>{t("ProductName")}:</strong> {orderData.product?.title}</p>
                <p><strong>{t("BatchId")}:</strong> {orderData.product?.batch_id}</p>
                <p><strong>{t("Traceability.harvestDate")}:</strong> {orderData.product?.harvest_date ? format(new Date(orderData.product.harvest_date), "dd MMM yyyy") : "-"}</p>
                <p><strong>{t("Location")}:</strong> {orderData.product?.location_district}, {orderData.product?.location_state}</p>
              </div>
              {/* <div>
                <p><strong>{t("traceability.farmerName")}:</strong> {orderData.buyer?.contact_person_name}</p>
                <p><strong>{t("traceability.phone")}:</strong> {orderData.buyer?.phone_number}</p>
                <p><strong>{t("traceability.village")}:</strong> {orderData.buyer?.village}</p>
                <p><strong>{t("traceability.profileType")}:</strong> {orderData.buyer?.profile_type}</p>
              </div> */}
            </div>


          </Card>
          
        )}

      </div>
    </div>
  );
}
