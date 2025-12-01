import { Languages, LogOut, Menu, User } from "lucide-react";

import { useState } from "react";
import {
  LayoutDashboard,
  ShoppingBag,
  Package,
  ShoppingCart,
  Award,
  TrendingUp,
  Wheat,
  ShieldCheck,
  Sparkles,
  Landmark,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuthStore } from "@/stores/authStore";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const navigationItems = [
  { title: "Dashboard", icon: LayoutDashboard, path: "/" },
  { title: "Marketplace", icon: ShoppingBag, path: "/marketplace" },
  { title: "My Products", icon: Package, path: "/myproducts" },
  { title: "My Orders", icon: ShoppingCart, path: "/myorders" },
  { title: "Quality Certificates", icon: Award, path: "/quality-certificates" },
  { title: "Market Insights", icon: TrendingUp, path: "/market-insights" },
  { title: "Millet Info", icon: Wheat, path: "/millet-info" },
  { title: "Traceability", icon: ShieldCheck, path: "/traceability" },
  { title: "Branding", icon: Sparkles, path: "/branding" },
  { title: "Govt Schemes", icon: Landmark, path: "/govt-schemes" },
];

export function AppSidebar() {
  const [language, setLanguage] = useState<"en" | "hi">("en");
  const { user, signOut } = useAuthStore();
  const navigate = useNavigate();

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "en" ? "hi" : "en"));
  };

  const handleLogout = async () => {
    await signOut();
    navigate("/login");
  };

  const getUserInitial = () => {
    if (user?.email) {
      return user.email.charAt(0).toUpperCase();
    }
    return "U";
  };

  const getUserDisplayName = () => {
    if (user?.user_metadata?.full_name) {
      return user.user_metadata.full_name;
    }
    if (user?.email) {
      return user.email.split("@")[0];
    }
    return "User";
  };

  const getUserEmail = () => {
    return user?.email || "";
  };

  return (
    <div className="w-64 bg-sidebar border-r border-sidebar-border flex flex-col h-screen sticky top-0">
      {/* Logo Section */}
      <div className="p-4 bg-gradient-orange-green">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
            <Wheat className="w-5 h-5 text-brand-orange" />
          </div>
          <div>
            <h1 className="text-white font-bold text-sm">Shree Anna</h1>
            <h2 className="text-white font-bold text-sm">Connect</h2>
            <p className="text-white text-xs opacity-90">Millet Value Chain</p>
          </div>
        </div>
      </div>

      {/* Navigation Section (Scrollable) */}
      <div className="flex-1 overflow-y-auto py-4">
        <p className="px-4 text-xs font-semibold text-muted-foreground mb-2">
          NAVIGATION
        </p>
        <div className="space-y-1">
          {navigationItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className="flex items-center gap-3 px-4 py-2.5 text-sm text-sidebar-foreground hover:bg-sidebar-accent transition-colors"
              activeClassName="bg-sidebar-accent text-sidebar-accent-foreground border-l-2 border-brand-orange"
            >
              <item.icon className="w-4 h-4" />
              <span>{item.title}</span>
            </NavLink>
          ))}
        </div>
      </div>
      {/* Language Toggle */}
      <div className="p-3 border-t border-sidebar-border flex justify-start pl-4">
        <button
          onClick={toggleLanguage}
          className="flex items-center gap-1 px-2 py-1 border border-sidebar-border text-sidebar-foreground text-xs rounded-md hover:bg-sidebar-accent transition"
        >
          <Languages className="w-3 h-3" />
          {language === "en" ? "हिंदी" : "English"}
        </button>
      </div>

      {/* User Profile Section */}
      <div className="p-4 border-t border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-brand-green rounded-full flex items-center justify-center text-white font-semibold">
            {getUserInitial()}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">
              {getUserDisplayName()}
            </p>
            <p className="text-xs text-muted-foreground truncate">
              {getUserEmail()}
            </p>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 text-sidebar-foreground hover:bg-sidebar-accent"
              >
                <Menu className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem onClick={() => navigate("/profile")}>
                <User className="mr-2 h-4 w-4" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
}
