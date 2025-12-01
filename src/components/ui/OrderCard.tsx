import React from "react";
import { Card, CardContent } from "./card";
import { Button } from "./button";

interface Order {
  id: string;
  productName: string;
  quantity: number;
  status: string;
  date: Date;
}

interface OrderCardProps {
  order: Order;
  profileType: "farmer" | "buyer";
  onUpdateStatus: (id: string, status: string) => void;
}

export default function OrderCard({ order, profileType, onUpdateStatus }: OrderCardProps) {
  return (
    <Card>
      <CardContent>
        <h3 className="font-bold">{order.productName}</h3>
        <p>Quantity: {order.quantity}</p>
        <p>Status: {order.status}</p>
        <p>Date: {order.date.toLocaleDateString()}</p>

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
      </CardContent>
    </Card>
  );
}