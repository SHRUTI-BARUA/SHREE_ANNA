import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
// import { Input, Textarea } from "@/components/ui/input";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Package, Shield, ArrowLeft, ShoppingCart } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuthStore } from "@/stores/authStore";

export default function ProductDetails() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { user } = useAuthStore();
  const [quantity, setQuantity] = useState(1);
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [phone, setPhone] = useState("");
  const { id: productId } = useParams();

  // TODO: Replace with Supabase query when ready
  // Fetch product using filter
  const { data: product, isLoading } = useQuery({
    queryKey: ["product", productId],
    queryFn: async () => {
      // Placeholder - to be replaced with Supabase query
      return null;
    },
  });

  // TODO: Replace with Supabase mutation when ready
  const createOrderMutation = useMutation({
    mutationFn: async (orderData) => {
      const orderNumber = `ORD${Date.now()}`;
      // Placeholder - to be replaced with Supabase mutation
      return {
        id: Date.now(),
        ...orderData,
        order_number: orderNumber,
        status: "pending",
        payment_status: "pending",
      };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      alert("Order placed successfully!");
      navigate("/my-orders");
    },
  });

  const handleOrder = () => {
    if (!deliveryAddress || !phone)
      return alert("Please fill in delivery details");
    if (quantity < product.minimum_order_kg)
      return alert(`Minimum order quantity is ${product.minimum_order_kg} kg`);

    createOrderMutation.mutate({
      product_id: product.id,
      product_title: product.title,
      seller_email: product.seller_email || "seller@example.com",
      seller_name: product.seller_name || "Seller",
      buyer_email: user.email,
      buyer_name: user.full_name,
      quantity_kg: quantity,
      price_per_kg: product.price_per_kg,
      total_amount: quantity * product.price_per_kg,
      delivery_address: deliveryAddress,
      phone: phone,
      payment_mode: "bank_transfer",
    });
  };

  if (isLoading || !product)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600" />
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-green-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <Button variant="ghost" onClick={() => navigate("/")} className="mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Marketplace
        </Button>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Product Image */}
          <div>
            <div className="relative rounded-2xl overflow-hidden shadow-2xl mb-4 bg-gray-100">
              <img
                src={
                  product.images[0] ||
                  "https://images.unsplash.com/photo-1536304929831-4f8f785a5e4f?w=800&h=600&fit=crop"
                }
                alt={product.title}
                className="w-full h-96 object-cover"
              />
            </div>

            {/* Quality */}
            <Card className="bg-gradient-to-r from-green-50 to-amber-50">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Shield className="w-5 h-5 text-green-600" />
                  <h3 className="font-semibold">Quality Info</h3>
                </div>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <p className="text-gray-600">Grade</p>
                    <p className="font-semibold">
                      {product.quality_grade?.toUpperCase()}
                    </p>
                  </div>
                  {product.moisture_content && (
                    <div>
                      <p className="text-gray-600">Moisture</p>
                      <p className="font-semibold">
                        {product.moisture_content}%
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Details */}
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {product.title}
            </h1>
            <div className="flex items-center gap-2 text-gray-600 mb-4">
              <MapPin className="w-4 h-4" />
              <span>
                {product.location_district}, {product.location_state}
              </span>
            </div>
            <p className="text-gray-700 mb-6 leading-relaxed">
              {product.description}
            </p>

            <div className="bg-gradient-to-r from-green-600 to-green-700 text-white p-6 rounded-xl mb-6">
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-4xl font-bold">
                  ₹{product.price_per_kg}
                </span>
                <span className="text-xl">/kg</span>
              </div>
              <div className="flex items-center gap-4 text-sm text-green-100">
                <div className="flex items-center gap-1">
                  <Package className="w-4 h-4" />{" "}
                  <span>{product.available_quantity_kg} kg available</span>
                </div>
                <div>Min order: {product.minimum_order_kg} kg</div>
              </div>
            </div>

            {/* Order Form */}
            <Card className="shadow-lg">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <ShoppingCart className="w-5 h-5 text-amber-600" /> Place
                  Order
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Quantity (kg) *
                    </label>
                    <Input
                      type="number"
                      min={product.minimum_order_kg}
                      max={product.available_quantity_kg}
                      value={quantity}
                      onChange={(e) => setQuantity(parseFloat(e.target.value))}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Delivery Address *
                    </label>
                    <Textarea
                      value={deliveryAddress}
                      onChange={(e) => setDeliveryAddress(e.target.value)}
                      rows={3}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Phone Number *
                    </label>
                    <Input
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>

                  <div className="bg-amber-50 p-4 rounded-lg flex justify-between text-lg font-semibold">
                    <span>Total Amount:</span>
                    <span className="text-2xl text-green-600">
                      ₹{(quantity * product.price_per_kg).toLocaleString()}
                    </span>
                  </div>

                  <Button
                    onClick={handleOrder}
                    disabled={createOrderMutation.isLoading}
                    className="w-full h-12 text-lg bg-gradient-to-r from-amber-500 to-green-600 hover:from-amber-600 hover:to-green-700"
                  >
                    {createOrderMutation.isLoading
                      ? "Placing Order..."
                      : "Place Order"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
