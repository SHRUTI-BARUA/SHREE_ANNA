import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "@/stores/authStore";
import { supabase } from "@/lib/supabase";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Package,
  IndianRupee,
  ShoppingCart,
  TrendingUp,
  Plus,
  LineChart as LineChartIcon,
  ArrowUp,
  Sprout,
  Layers,
  User,
  Check,
} from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

// Sales data for the chart
const salesData = [
  { month: "Jan", sales: 4000 },
  { month: "Feb", sales: 3000 },
  { month: "Mar", sales: 5000 },
  { month: "Apr", sales: 6000 },
  { month: "May", sales: 8000 },
  { month: "Jun", sales: 10000 },
];

export default function Dashboard() {
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const [hasProfile, setHasProfile] = useState(false);
  const [profileName, setProfileName] = useState("");

  // Fetch user profile
  const { data: profile } = useQuery({
    queryKey: ["user-profile", user?.id],
    queryFn: async () => {
      if (!user?.id) return null;
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();
      
      if (error && error.code !== "PGRST116") {
        console.error("Error fetching profile:", error);
        return null;
      }
      return data;
    },
    enabled: !!user?.id,
  });

  useEffect(() => {
    if (profile) {
      setHasProfile(true);
      setProfileName(profile.contact_person_name || user?.user_metadata?.full_name || user?.email?.split("@")[0] || "User");
    } else if (user && profile === null) {
      // Profile doesn't exist, show onboarding
      setHasProfile(false);
    }
  }, [profile, user]);

  // If no profile, show onboarding screen
  if (!hasProfile && user) {
    return (
      <div className="min-h-screen bg-background">
        {/* Header with gradient */}
        <div className="bg-gradient-to-r from-amber-500 via-amber-400 to-green-500 py-16 px-8 text-center">
          <div className="max-w-4xl mx-auto">
            <div className="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
              <Package className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-white mb-3">Welcome to Shree Anna Connect!</h1>
            <p className="text-white text-lg mb-6">Complete your profile to get started</p>
          </div>
        </div>

        {/* Role Selection Cards */}
        <div className="max-w-6xl mx-auto px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* Farmer / FPO / SHG Card */}
            <Card className="shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Sprout className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-center mb-2">Farmer / FPO / SHG</h3>
                <p className="text-muted-foreground text-center mb-4">I want to sell my millet products</p>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2 text-sm">
                    <Check className="w-4 h-4 text-green-600 flex-shrink-0" />
                    <span>List your products</span>
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <Check className="w-4 h-4 text-green-600 flex-shrink-0" />
                    <span>Connect with buyers</span>
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <Check className="w-4 h-4 text-green-600 flex-shrink-0" />
                    <span>Get quality certificates</span>
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <Check className="w-4 h-4 text-green-600 flex-shrink-0" />
                    <span>Track market prices</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Buyer / Processor / Trader Card */}
            <Card className="shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Layers className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-center mb-2">Buyer / Processor / Trader</h3>
                <p className="text-muted-foreground text-center mb-4">I want to buy millet products in bulk</p>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2 text-sm">
                    <Check className="w-4 h-4 text-blue-600 flex-shrink-0" />
                    <span>Browse quality products</span>
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <Check className="w-4 h-4 text-blue-600 flex-shrink-0" />
                    <span>Direct farmer connect</span>
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <Check className="w-4 h-4 text-blue-600 flex-shrink-0" />
                    <span>AI-powered matching</span>
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <Check className="w-4 h-4 text-blue-600 flex-shrink-0" />
                    <span>Bulk procurement</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Consumer Card */}
            <Card className="shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <User className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold text-center mb-2">Consumer</h3>
                <p className="text-muted-foreground text-center mb-4">I want to buy millet products for personal use</p>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2 text-sm">
                    <Check className="w-4 h-4 text-purple-600 flex-shrink-0" />
                    <span>Buy quality millets</span>
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <Check className="w-4 h-4 text-purple-600 flex-shrink-0" />
                    <span>Learn about nutrition</span>
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <Check className="w-4 h-4 text-purple-600 flex-shrink-0" />
                    <span>Get recipes</span>
                  </li>
                  <li className="flex items-center gap-2 text-sm">
                    <Check className="w-4 h-4 text-purple-600 flex-shrink-0" />
                    <span>Support farmers</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* CTA Button */}
          <div className="text-center">
            <Button 
              onClick={() => navigate("/profile")}
              className="bg-gradient-to-r from-amber-500 to-green-600 hover:from-amber-600 hover:to-green-700 text-white px-8 py-6 text-base font-semibold rounded-lg shadow-lg transition-opacity"
            >
              Continue to Profile Setup →
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Main Dashboard
  return (
    <div className="min-h-screen bg-background p-6 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Greeting Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            नमस्ते, {profileName}! 👋
          </h1>
          <p className="text-muted-foreground text-lg">Your farming dashboard.</p>
        </div>

        {/* Key Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Active Products */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Active Products</p>
                  <p className="text-2xl font-bold">0</p>
                  <div className="flex items-center gap-1 mt-2">
                    <ArrowUp className="w-4 h-4 text-brand-green" />
                    <span className="text-sm text-brand-green">+12% this month</span>
                  </div>
                </div>
                <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center">
                  <Package className="w-6 h-6 text-amber-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Total Revenue */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Total Revenue</p>
                  <p className="text-2xl font-bold">₹0</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <IndianRupee className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Pending Orders */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Pending Orders</p>
                  <p className="text-2xl font-bold">0</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <ShoppingCart className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Market Trend */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Market Trend</p>
                  <div className="flex items-center gap-1">
                    <ArrowUp className="w-4 h-4 text-brand-green" />
                    <p className="text-2xl font-bold text-brand-green">+8.5%</p>
                  </div>
                  <p className="text-sm text-brand-green mt-1">Prices rising</p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Sales Trend */}
          <Card>
            <CardHeader>
              <CardTitle>Sales Trend</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={salesData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis 
                    dataKey="month" 
                    stroke="#6b7280"
                    style={{ fontSize: "12px" }}
                  />
                  <YAxis 
                    stroke="#6b7280"
                    style={{ fontSize: "12px" }}
                    domain={[0, 12000]}
                  />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: "#fff",
                      border: "1px solid #e5e7eb",
                      borderRadius: "8px",
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="sales" 
                    stroke="hsl(38 92% 50%)" 
                    strokeWidth={2}
                    dot={{ fill: "hsl(38 92% 50%)", r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Millet Types Distribution */}
          <Card>
            <CardHeader>
              <CardTitle>Millet Types Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                <p>Chart placeholder</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Orders */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-12">
              <ShoppingCart className="w-16 h-16 mx-auto text-muted-foreground mb-4 opacity-50" />
              <p className="text-muted-foreground">No recent orders</p>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="flex flex-wrap gap-4">
          <Button
            onClick={() => navigate("/myproducts")}
            className="bg-brand-orange hover:bg-brand-orange/90 text-white px-6 py-3 text-base font-semibold rounded-lg shadow-lg transition-opacity"
          >
            <Plus className="w-5 h-5 mr-2" />
            Add New Product
          </Button>
          <Button
            onClick={() => navigate("/marketplace")}
            className="bg-brand-green hover:bg-brand-green/90 text-white px-6 py-3 text-base font-semibold rounded-lg shadow-lg transition-opacity"
          >
            <ShoppingCart className="w-5 h-5 mr-2" />
            Browse Marketplace
          </Button>
          <Button
            onClick={() => navigate("/market-insights")}
            className="bg-brand-blue hover:bg-brand-blue/90 text-white px-6 py-3 text-base font-semibold rounded-lg shadow-lg transition-opacity"
          >
            <LineChartIcon className="w-5 h-5 mr-2" />
            Market Insights
          </Button>
        </div>
      </div>
    </div>
  );
}
