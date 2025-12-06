import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Order {
  id: string;
  productName: string;
  image?: string | null;
  quantity: number;
  status: string;
  date: Date | string;
  amount_inr: number;
}

interface OrderCardProps {
  order: Order;
  profileType: "farmer" | "buyer";
  onUpdateStatus: (id: string, status: string) => void;
}

export default function OrderCard({ order, profileType, onUpdateStatus }: OrderCardProps) {

  const formattedDate =
    order.date instanceof Date
      ? order.date.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })
      : new Date(order.date).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });

  return (
    <Card>
      <CardContent className="flex flex-col md:flex-row gap-4 items-center">

        {/* Product image */}
        <div className="w-24 h-24 flex-shrink-0">
          <img
            src={order.image ?? "/placeholder.png"}
            alt={order.productName}
            className="w-full h-full object-cover rounded-lg"
          />
        </div>

        {/* Info */}
        <div className="flex-1">
          <h3 className="font-bold text-lg">{order.productName}</h3>
          <p>Quantity: {order.quantity}</p>
          <p>Status: {order.status}</p>
          <p>Date: {formattedDate}</p>
          <p>Amount: ₹{order.amount_inr}</p>

          <div className="mt-2 flex gap-2">
            {order.status !== "delivered" && (
              <Button
                size="sm"
                onClick={() => onUpdateStatus(order.id, "delivered")}
              >
                Mark Delivered
              </Button>
            )}
          </div>
        </div>

      </CardContent>
    </Card>
  );
}
