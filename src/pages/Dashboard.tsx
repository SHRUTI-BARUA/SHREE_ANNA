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
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import titleImg from "@/assets/title.jpg";

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

  const { data: profile } = useQuery({
    queryKey: ["user-profile", user?.id],
    queryFn: async () => {
      if (!user?.id) return null;
      const { data } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();
      return data;
    },
    enabled: !!user?.id,
  });

  useEffect(() => {
    if (profile) {
      setHasProfile(true);
      setProfileName(
        profile.contact_person_name ||
          user?.user_metadata?.full_name ||
          user?.email?.split("@")[0] ||
          "User"
      );
    } else if (user && profile === null) {
      setHasProfile(false);
    }
  }, [profile, user]);

  if (!hasProfile && user) {
    return (
      <div className="min-h-screen bg-background">
        {/* HERO */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0">
            {/* ⬇️ added subtle filter here */}
            <img
              src={titleImg}
              alt=""
              className="w-full h-full object-cover filter brightness-90 saturate-110"
            />

            {/* global light overlay */}
            <div
              className="absolute inset-0 bg-gradient-to-r
              from-amber-500/25
              via-amber-300/15
              to-green-500/25"
            />
          </div>

          {/* text + dark readable overlay */}
          <div className="relative py-16 px-8 text-center">
            {/* dark overlay behind text only */}
            <div className="absolute inset-0 bg-black/45" />

            <div className="relative max-w-4xl mx-auto">
              <h1 className="text-4xl font-bold text-white drop-shadow-lg">
                Welcome to Shree Anna Connect!
              </h1>

              <p className="text-white text-lg mt-3 drop-shadow-lg">
                Complete your profile to get started
              </p>
            </div>
          </div>
        </section>

        {/* ---- rest stays untouched ---- */}
        <div className="max-w-6xl mx-auto px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Sprout className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-center mb-2">
                  Farmer / FPO / SHG
                </h3>
                <p className="text-muted-foreground text-center mb-4">
                  I want to sell my millet products
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Layers className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-center mb-2">
                  Buyer / Processor / Trader
                </h3>
              </CardContent>
            </Card>

            <Card className="shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <User className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold text-center mb-2">
                  Consumer
                </h3>
              </CardContent>
            </Card>
          </div>

          <div className="text-center">
            <Button
              onClick={() => navigate("/profile")}
              className="bg-gradient-to-r from-amber-500 to-green-600 text-white px-8 py-6 font-semibold rounded-lg shadow-lg"
            >
              Continue to Profile Setup →
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // -------- dashboard continues (unchanged) -------
  return (
    <div className="p-8">
      Your main dashboard…
    </div>
  );
}
