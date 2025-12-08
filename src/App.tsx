import { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { I18nextProvider } from "react-i18next";
import { AppLayout } from "./components/AppLayout";
import { useAuthStore } from "./stores/authStore";
import i18n from "./i18n";

// PAGES
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import MyProducts from "./pages/MyProducts";
import ProductDetails from "./pages/ProductDetails";
import ProfileList from "./components/ProfileList";
import GovernmentSchemes from "./pages/GovernmentSchemes";
import BrandingPage from "./pages/Branding";
import Dashboard from "./pages/Dashboard";
import Marketplace from "./pages/Marketplace";
import NotFound from "./pages/NotFound";
import MyOrders from "./pages/MyOrders";
import Certificates from "./pages/Certificates";
import Traceability from "./pages/Traceability";
import MilletInfo from "./pages/MilletInfo";
import MarketInsights from "./pages/MarketInsights";
import ProfileManagement from "./pages/ProfileManagement";
import Landing from "./pages/Landing";

const queryClient = new QueryClient();

function App() {
  // I’m assuming your auth store exposes `user`.
  // If it’s called `isAuthenticated`, just rename accordingly.
  const { initialize, user } = useAuthStore();

  useEffect(() => {
    initialize();
  }, [initialize]);

  return (
    <I18nextProvider i18n={i18n}>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              {/* Home: Landing when logged OUT, Dashboard when logged IN */}
              <Route
                path="/"
                element={
                  user ? (
                    <AppLayout>
                      <Dashboard />
                    </AppLayout>
                  ) : (
                    <Landing />
                  )
                }
              />

              {/* Public routes - no sidebar */}
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />

              {/* All the old routes exactly like before */}
              <Route
                path="/branding"
                element={
                  <AppLayout>
                    <BrandingPage />
                  </AppLayout>
                }
              />
              <Route
                path="/marketplace"
                element={
                  <AppLayout>
                    <Marketplace />
                  </AppLayout>
                }
              />
              <Route
                path="/myorders"
                element={
                  <AppLayout>
                    <MyOrders />
                  </AppLayout>
                }
              />
              <Route
                path="/myproducts"
                element={
                  <AppLayout>
                    <MyProducts />
                  </AppLayout>
                }
              />
              <Route
                path="/product/:id"
                element={
                  <AppLayout>
                    <ProductDetails />
                  </AppLayout>
                }
              />
              <Route
                path="/govt-schemes"
                element={
                  <AppLayout>
                    <GovernmentSchemes />
                  </AppLayout>
                }
              />
              <Route
                path="/quality-certificates"
                element={
                  <AppLayout>
                    <Certificates />
                  </AppLayout>
                }
              />
              <Route
                path="/traceability"
                element={
                  <AppLayout>
                    <Traceability />
                  </AppLayout>
                }
              />
              <Route
                path="/millet-info"
                element={
                  <AppLayout>
                    <MilletInfo />
                  </AppLayout>
                }
              />
              <Route
                path="/market-insights"
                element={
                  <AppLayout>
                    <MarketInsights />
                  </AppLayout>
                }
              />
              <Route
                path="/profile"
                element={
                  <AppLayout>
                    <ProfileManagement />
                  </AppLayout>
                }
              />
              <Route
                path="/profiles"
                element={
                  <AppLayout>
                    <ProfileList />
                  </AppLayout>
                }
              />

              {/* 404 */}
              <Route
                path="*"
                element={
                  <AppLayout>
                    <NotFound />
                  </AppLayout>
                }
              />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </I18nextProvider>
  );
}

export default App;
