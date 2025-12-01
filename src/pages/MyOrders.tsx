import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Package, ShoppingCart } from "lucide-react";

import OrderCard from "../components/ui/OrderCard";

// Mock order data
const mockOrders = [
  {
    id: "1",
    productName: "Organic Ragi",
    quantity: 10,
    status: "pending",
    date: new Date(),
  },
  {
    id: "2",
    productName: "Millet Flour",
    quantity: 5,
    status: "processing",
    date: new Date(),
  },
  {
    id: "3",
    productName: "Millet Snack Pack",
    quantity: 20,
    status: "delivered",
    date: new Date(),
  },
];

export default function MyOrders() {
  const [profileType, setProfileType] = useState<"farmer" | "buyer">("farmer");
  const [orders, setOrders] = useState(mockOrders);

  // Categorize orders
  const pendingOrders = orders.filter(o => ["pending", "confirmed"].includes(o.status));
  const activeOrders = orders.filter(o => ["processing", "shipped"].includes(o.status));
  const completedOrders = orders.filter(o => ["delivered", "cancelled"].includes(o.status));

  // Mock function to update order status
  const handleUpdateStatus = (id: string, status: string) => {
    setOrders(prev =>
      prev.map(order => (order.id === id ? { ...order, status } : order))
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-green-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {profileType === "farmer" ? "My Sales Orders" : "My Purchase Orders"}
          </h1>
          <p className="text-gray-600">Track and manage your orders</p>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="all">All ({orders.length})</TabsTrigger>
            <TabsTrigger value="pending">Pending ({pendingOrders.length})</TabsTrigger>
            <TabsTrigger value="active">Active ({activeOrders.length})</TabsTrigger>
            <TabsTrigger value="completed">Completed ({completedOrders.length})</TabsTrigger>
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

function OrdersList({ orders, profileType, onUpdateStatus }) {
  if (orders.length === 0) {
    return (
      <div className="text-center py-20">
        <ShoppingCart className="w-24 h-24 mx-auto text-gray-300 mb-4" />
        <h3 className="text-2xl font-semibold text-gray-700 mb-2">No orders found</h3>
        <p className="text-gray-500">Orders will appear here once placed</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {orders.map(order => (
        <OrderCard key={order.id} order={order} profileType={profileType} onUpdateStatus={onUpdateStatus} />
      ))}
    </div>
  );
}