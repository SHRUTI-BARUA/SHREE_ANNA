// import React from "react";
// import { Card, CardContent } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { useTranslation } from "react-i18next";

// interface Order {
//   id: string;
//   productName: string;
//   image?: string | null;
//   quantity: number;
//   status: string;
//   date: Date | string;
//   amount_inr: number;
// }

// interface OrderCardProps {
//   order: Order;
//   profileType: "farmer" | "buyer";
//   onUpdateStatus: (id: string, status: string) => void;
// }

// export default function OrderCard({ order, profileType, onUpdateStatus }: OrderCardProps) {
//   const { t } = useTranslation();

//   const formattedDate =
//     order.date instanceof Date
//       ? order.date.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })
//       : new Date(order.date).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
//   const statusKey = `orders.status.${order.status}`;
//   const statusText = t(statusKey);
//   const resolvedStatus = statusText === statusKey ? order.status : statusText;

//   return (
//     <Card>
//       <CardContent className="flex flex-col md:flex-row gap-4 items-center">

//         {/* Product image */}
//         <div className="w-24 h-24 flex-shrink-0">
//           <img
//             src={order.image ?? "/placeholder.png"}
//             alt={order.productName}
//             className="w-full h-full object-cover rounded-lg"
//           />
//         </div>

//         {/* Info */}
//         <div className="flex-1">
//           <h3 className="font-bold text-lg">{order.productName}</h3>
//           <p>
//             {t("orders.card.quantityLabel")}: {order.quantity}
//           </p>
//           <p>
//             {t("orders.card.statusLabel")}: {resolvedStatus}
//           </p>
//           <p>
//             {t("orders.card.dateLabel")}: {formattedDate}
//           </p>
//           <p>
//             {t("orders.card.amountLabel")}: ₹{order.amount_inr}
//           </p>

//           <div className="mt-2 flex gap-2">
//             {order.status !== "delivered" && (
//               <Button
//                 size="sm"
//                 onClick={() => onUpdateStatus(order.id, "delivered")}
//               >
//                 {t("orders.card.markDelivered")}
//               </Button>
//             )}
//           </div>
//         </div>

//       </CardContent>
//     </Card>
//   );
// }
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";

interface Order {
  id: string;
  productName: string;
  image?: string | null;
  quantity: number;
  status: string;
  date: Date | string;
  amount_inr: number;
  batch_id?: string;            // <-- ADDED
}

interface OrderCardProps {
  order: Order;
  profileType: "farmer" | "buyer";
  onUpdateStatus: (id: string, status: string) => void;
}

export default function OrderCard({ order, profileType, onUpdateStatus }: OrderCardProps) {
  const { t } = useTranslation();

  const formattedDate =
    order.date instanceof Date
      ? order.date.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })
      : new Date(order.date).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });

  const statusKey = `orders.status.${order.status}`;
  const statusText = t(statusKey);
  const resolvedStatus = statusText === statusKey ? order.status : statusText;

  return (
    <Card>
      <CardContent className="flex flex-col md:flex-row gap-4 items-center">
        <div className="w-24 h-24 flex-shrink-0">
          <img
            src={order.image ?? "/placeholder.png"}
            alt={order.productName}
            className="w-full h-full object-cover rounded-lg"
          />
        </div>

        <div className="flex-1">
          <h3 className="font-bold text-lg">{order.productName}</h3>

          <p>{t("orders.card.quantityLabel")}: {order.quantity}</p>
          <p>{t("orders.card.statusLabel")}: {resolvedStatus}</p>
          <p>{t("orders.card.dateLabel")}: {formattedDate}</p>

          {/* ------- BATCH ID DISPLAY (ADDED) ------- */}
          {order.batch_id && (
            <p className="text-sm font-medium text-gray-700">
              Batch ID: <span className="text-blue-600">{order.batch_id}</span>
            </p>
          )}
          {/* ---------------------------------------- */}

          <p>{t("orders.card.amountLabel")}: ₹{order.amount_inr}</p>
          <p>
             Batch ID: {order.batch_id ?? "Not Assigned"}
          </p>

          <div className="mt-2 flex gap-2">
            {order.status !== "delivered" && (
              <Button size="sm" onClick={() => onUpdateStatus(order.id, "delivered")}>
                {t("orders.card.markDelivered")}
              </Button>
            )}
          </div>
        </div>

      </CardContent>
    </Card>
  );
}
