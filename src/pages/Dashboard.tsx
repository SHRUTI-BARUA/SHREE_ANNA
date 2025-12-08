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
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();

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

  /* --------- PROFILE SETUP HERO --------- */
  if (!hasProfile && user) {
    return (
      <div className="min-h-screen bg-background">
        {/* HERO */}
        <section className="relative overflow-hidden">
          {/* background image + color wash */}
          <div className="absolute inset-0">
            <img
              src={titleImg}
              alt={t("traceability.heroTitle")}
              className="w-full h-full object-cover filter brightness-90 saturate-110"
            />
            <div
              className="absolute inset-0 bg-gradient-to-r
              from-amber-500/25
              via-amber-300/15
              to-green-500/25"
            />
          </div>

          {/* centered text card */}
          <div className="relative py-16 px-4 flex items-center justify-center">
            <div className="max-w-2xl mx-auto bg-black/55 border border-white/15 rounded-3xl px-8 py-10 text-center shadow-2xl backdrop-blur-sm">
              <h1 className="text-3xl md:text-4xl font-bold text-white drop-shadow-lg">
                {t("dashboard.setup.heroTitle")}
              </h1>
              <p className="text-base md:text-lg text-neutral-100 mt-3 drop-shadow">
                {t("dashboard.setup.heroSubtitle")}
              </p>
            </div>
          </div>
        </section>

        {/* PROFILE TYPE CARDS */}
        <div className="max-w-6xl mx-auto px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Sprout className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-center mb-2">
                  {t("dashboard.setup.cards.0.title")}
                </h3>
                <p className="text-muted-foreground text-center mb-4">
                  {t("dashboard.setup.cards.0.description")}
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Layers className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-center mb-2">
                  {t("dashboard.setup.cards.1.title")}
                </h3>
                <p className="text-muted-foreground text-center mb-4">
                  {t("dashboard.setup.cards.1.description")}
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-6">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <User className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold text-center mb-2">
                  {t("dashboard.setup.cards.2.title")}
                </h3>
                <p className="text-muted-foreground text-center mb-4">
                  {t("dashboard.setup.cards.2.description")}
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="text-center">
            <Button
              onClick={() => navigate("/profile")}
              className="bg-gradient-to-r from-amber-500 to-green-600 text-white px-8 py-6 font-semibold rounded-lg shadow-lg"
            >
              {t("dashboard.setup.continue")}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  /* --------- MAIN DASHBOARD --------- */
  return (
    <div className="min-h-screen bg-background p-6 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Greeting Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            {t("dashboard.main.greeting", { name: profileName })}
          </h1>
          <p className="text-muted-foreground text-lg">{t("dashboard.main.subtitle")}</p>
        </div>

        {/* Key Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Active Products */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">
                    {t("dashboard.main.metrics.activeProductsTitle")}
                  </p>
                  <p className="text-2xl font-bold">0</p>
                  <div className="flex items-center gap-1 mt-2">
                    <ArrowUp className="w-4 h-4 text-brand-green" />
                    <span className="text-sm text-brand-green">
                      {t("dashboard.main.metrics.activeProductsChange")}
                    </span>
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
                  <p className="text-sm text-muted-foreground mb-1">
                    {t("dashboard.main.metrics.totalRevenueTitle")}
                  </p>
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
                  <p className="text-sm text-muted-foreground mb-1">
                    {t("dashboard.main.metrics.pendingOrdersTitle")}
                  </p>
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
                  <p className="text-sm text-muted-foreground mb-1">
                    {t("dashboard.main.metrics.marketTrendTitle")}
                  </p>
                  <div className="flex items-center gap-1">
                    <ArrowUp className="w-4 h-4 text-brand-green" />
                    <p className="text-2xl font-bold text-brand-green">
                      {t("dashboard.main.metrics.marketTrendChange")}
                    </p>
                  </div>
                  <p className="text-sm text-brand-green mt-1">
                    {t("dashboard.main.metrics.marketTrendStatus")}
                  </p>
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
              <CardTitle>{t("dashboard.main.salesTrendTitle")}</CardTitle>
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
              <CardTitle>{t("dashboard.main.milletDistributionTitle")}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                <p>{t("dashboard.main.chartPlaceholder")}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Orders */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>{t("dashboard.main.recentOrdersTitle")}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-12">
              <ShoppingCart className="w-16 h-16 mx-auto text-muted-foreground mb-4 opacity-50" />
              <p className="text-muted-foreground">{t("dashboard.main.recentOrdersEmpty")}</p>
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
            {t("dashboard.main.actions.addProduct")}
          </Button>
          <Button
            onClick={() => navigate("/marketplace")}
            className="bg-brand-green hover:bg-brand-green/90 text-white px-6 py-3 text-base font-semibold rounded-lg shadow-lg transition-opacity"
          >
            <ShoppingCart className="w-5 h-5 mr-2" />
            {t("dashboard.main.actions.browseMarketplace")}
          </Button>
          <Button
            onClick={() => navigate("/market-insights")}
            className="bg-brand-blue hover:bg-brand-blue/90 text-white px-6 py-3 text-base font-semibold rounded-lg shadow-lg transition-opacity"
          >
            <LineChartIcon className="w-5 h-5 mr-2" />
            {t("dashboard.main.actions.marketInsights")}
          </Button>
        </div>
      </div>
    </div>
  );
}
