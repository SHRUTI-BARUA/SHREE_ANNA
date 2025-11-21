import { 
  LayoutDashboard, 
  ShoppingBag, 
  Package, 
  ShoppingCart, 
  Award,
  TrendingUp,
  Wheat,
  Target,
  Sparkles,
  BookOpen
} from "lucide-react";
import { NavLink } from "@/components/NavLink";

const navigationItems = [
  { title: "Dashboard", icon: LayoutDashboard, path: "/" },
  { title: "Marketplace", icon: ShoppingBag, path: "/marketplace" },
  { title: "My Products", icon: Package, path: "/my-products" },
  { title: "My Orders", icon: ShoppingCart, path: "/my-orders" },
  { title: "Quality Certificates", icon: Award, path: "/certificates" },
  { title: "Market Insights", icon: TrendingUp, path: "/insights" },
  { title: "Millet Info", icon: Wheat, path: "/millet-info" },
  { title: "Traceability", icon: Target, path: "/traceability" },
  { title: "Branding", icon: Sparkles, path: "/branding" },
  { title: "Govt Schemes", icon: BookOpen, path: "/schemes" },
];

export function AppSidebar() {
  return (
    <div className="w-48 bg-sidebar border-r border-sidebar-border flex flex-col h-screen sticky top-0">
      {/* Logo */}
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

      {/* Navigation */}
      <nav className="flex-1 py-4">
        <p className="px-4 text-xs font-semibold text-muted-foreground mb-2">NAVIGATION</p>
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
      </nav>

      {/* Language Toggle */}
      <div className="p-4 border-t border-sidebar-border">
        <button className="flex items-center gap-2 text-sm text-sidebar-foreground">
          <span>हिंदी</span>
        </button>
      </div>

      {/* User Profile */}
      <div className="p-4 border-t border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-brand-green rounded-full flex items-center justify-center text-white font-semibold">
            U
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">Unaiz</p>
            <p className="text-xs text-muted-foreground truncate">unaisshemin@gmail...</p>
          </div>
        </div>
      </div>
    </div>
  );
}
