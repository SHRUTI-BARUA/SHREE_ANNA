import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppSidebar } from "./components/AppSidebar";
import Dashboard from "./pages/Dashboard";
import Marketplace from "./pages/Marketplace";
import MyProducts from "./pages/MyProducts";
import MyOrders from "./pages/MyOrders";
import Certificates from "./pages/Certificates";
import Insights from "./pages/Insights";
import MilletInfo from "./pages/MilletInfo";
import Traceability from "./pages/Traceability";
import Branding from "./pages/Branding";
import Schemes from "./pages/Schemes";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="flex min-h-screen w-full">
          <AppSidebar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/marketplace" element={<Marketplace />} />
              <Route path="/my-products" element={<MyProducts />} />
              <Route path="/my-orders" element={<MyOrders />} />
              <Route path="/certificates" element={<Certificates />} />
              <Route path="/insights" element={<Insights />} />
              <Route path="/millet-info" element={<MilletInfo />} />
              <Route path="/traceability" element={<Traceability />} />
              <Route path="/branding" element={<Branding />} />
              <Route path="/schemes" element={<Schemes />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
