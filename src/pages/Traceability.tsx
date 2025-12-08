import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Search,
  Package,
  Truck,
  CheckCircle,
  MapPin,
  Award,
  Shield,
} from "lucide-react";
import { format } from "date-fns";

// ------- Mock Data --------
const orderMock = [
  {
    id: "ORD123",
    stages: [
      { label: "Ordered", date: "2025-12-01", icon: Package, completed: true },
      { label: "Packed", date: "2025-12-02", icon: CheckCircle, completed: true },
      { label: "Shipped", date: "2025-12-03", icon: Truck, completed: true },
      { label: "Out for Delivery", date: "", icon: MapPin, completed: false },
      { label: "Delivered", date: "", icon: Award, completed: false },
    ],
  },
];

export default function Traceability() {
  const [orderId, setOrderId] = useState("");
  const [orderData, setOrderData] = useState<any>(null);

  const { data: orders = orderMock } = useQuery({
    queryKey: ["orders"],
    queryFn: async () => orderMock,
  });

  const handleTrack = () => {
    const found = orders.find((o) => o.id === orderId);

    if (!found) {
      alert("No order found");
      setOrderData(null);
      return;
    }
    setOrderData(found);
  };

  const defaultStages = [
    { label: "Ordered", icon: Package, completed: true, date: "2025-12-01" },
    { label: "Packed", icon: CheckCircle, completed: true, date: "2025-12-02" },
    { label: "Shipped", icon: Truck, completed: true, date: "2025-12-03" },
    { label: "Out for Delivery", icon: MapPin, completed: false, date: "" },
    { label: "Delivered", icon: Award, completed: false, date: "" },
  ];

  const timelineToDisplay = orderData ? orderData.stages : defaultStages;

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
                Product Traceability
              </h1>
              <p className="text-lg text-gray-600">Track your millet product order</p>
            </div>
          </div>
        </div>

        {/* Search Box */}
        <Card className="mb-8 shadow-lg">
          <CardContent className="p-8">
            <div className="text-center mb-6">
              <h3 className="text-xl font-semibold mb-2">Enter Order ID</h3>
              <p className="text-gray-600">Enter your order tracking code below</p>
            </div>

            <div className="flex gap-3 max-w-2xl mx-auto">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <Input
                  value={orderId}
                  onChange={(e) => setOrderId(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleTrack()}
                  placeholder="Enter order ID..."
                  className="pl-10 h-12"
                />
              </div>

              <Button
                onClick={handleTrack}
                className="h-12 bg-gradient-to-r from-blue-500 to-blue-600"
              >
                <Search className="w-4 h-4 mr-2" />
                Track
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Timeline Section */}
        <Card className="shadow-lg p-6 mb-12">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Order Tracking Progress</CardTitle>
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

        {/* Why Traceability Matters Section */}
        <div className="bg-white p-8 rounded-xl shadow-lg mb-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Why Traceability Matters?</h2>

          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h3 className="text-xl font-semibold mb-3 text-green-700">For Consumers</h3>
              <ul className="text-gray-700 space-y-2">
                <li>✔ Know your food's origin</li>
                <li>✔ Verify quality & authenticity</li>
                <li>✔ Support local farmers</li>
                <li>✔ Ensure food safety</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3 text-blue-700">For Farmers</h3>
              <ul className="text-gray-700 space-y-2">
                <li>✔ Build consumer trust</li>
                <li>✔ Premium pricing opportunity</li>
                <li>✔ Brand recognition</li>
                <li>✔ Market differentiation</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3 text-purple-700">For the Platform</h3>
              <ul className="text-gray-700 space-y-2">
                <li>✔ Quality assurance</li>
                <li>✔ Transparency</li>
                <li>✔ Fraud prevention</li>
                <li>✔ Compliance readiness</li>
              </ul>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
