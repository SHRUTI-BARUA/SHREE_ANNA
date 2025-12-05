// import React, { useState } from "react";
// import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// import { Button } from "@/components/ui/button";
// import { Plus, Table2, Grid } from "lucide-react";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";
// import { useAuthStore } from "@/stores/authStore";
// import { supabase } from "@/lib/supabase";
// import { toast } from "@/hooks/use-toast";
// import type { TablesInsert, TablesUpdate, Tables, Json } from "@/../database.types";

// import ProductForm from "@/components/products/ProductForm";
// import ProductList from "@/components/products/ProductList";
// import ProductsTable from "@/components/products/ProductsTable";

// type Product = Tables<"products">;
// type ProductInsert = TablesInsert<"products">;
// type ProductUpdate = TablesUpdate<"products">;

// type ProductFormData = {
//   title: string;
//   millet_type: string;
//   product_form: string;
//   description?: string;
//   available_quantity_kg: number | string;
//   price_per_kg: number | string;
//   minimum_order_kg: number | string;
//   harvest_date?: string;
//   organic_certified?: boolean;
//   quality_grade?: string;
//   moisture_content?: number | string;
//   location_state: string;
//   location_district: string;
//   certifications?: Json | null;
//   images?: Json | null;
//   is_active?: boolean;
// };

// export default function MyProducts() {
//   const { user } = useAuthStore();
//   const [showForm, setShowForm] = useState(false);
//   const [editingProduct, setEditingProduct] = useState<Product | null>(null);
//   const [viewMode, setViewMode] = useState<"grid" | "table">("grid");
//   const queryClient = useQueryClient();

//   // ============= FETCH PRODUCTS ==================
//   const { data: products = [], isLoading } = useQuery({
//     queryKey: ["my-products", user?.id],
//     queryFn: async () => {
//       const { data, error } = await supabase
//         .from("products")
//         .select("*")
//         .eq("seller_id", user!.id)
//         .order("created_at", { ascending: false });

//       if (error) throw error;
//       return data || [];
//     },
//     enabled: !!user,
//   });

//   // ============= CREATE PRODUCT ==================
//   const createProductMutation = useMutation({
//     mutationFn: async (data: ProductFormData): Promise<Product> => {
//       const productData: ProductInsert = {
//         title: data.title,
//         millet_type: data.millet_type,
//         product_form: data.product_form,
//         description: data.description || null,
//         available_quantity_kg: Number(data.available_quantity_kg),
//         price_per_kg: Number(data.price_per_kg),
//         minimum_order_kg: Number(data.minimum_order_kg),
//         harvest_date: data.harvest_date || null,
//         organic_certified: data.organic_certified ?? null,
//         quality_grade: data.quality_grade || null,
//         moisture_content: data.moisture_content
//           ? Number(data.moisture_content)
//           : null,
//         location_state: data.location_state,
//         location_district: data.location_district,
//         certifications: data.certifications || null,
//         images: data.images || null,
//         seller_id: user!.id, // OPTIONAL (trigger handles this also)
//       };

//       const { data: product, error } = await supabase
//         .from("products")
//         .insert(productData)
//         .select()
//         .single();

//       if (error) throw error;
//       return product;
//     },
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["my-products", user?.id] });
//       setShowForm(false);
//       toast({ title: "Success", description: "Product added!" });
//     },
//     onError: (err: any) =>
//       toast({ title: "Error", description: err.message, variant: "destructive" }),
//   });

//   // ============= UPDATE PRODUCT ==================
//   const updateProductMutation = useMutation({
//     mutationFn: async ({
//       id,
//       data,
//     }: {
//       id: string;
//       data: ProductFormData;
//     }): Promise<Product> => {
//       const productData: ProductUpdate = {
//         title: data.title,
//         millet_type: data.millet_type,
//         product_form: data.product_form,
//         description: data.description || null,
//         available_quantity_kg: Number(data.available_quantity_kg),
//         price_per_kg: Number(data.price_per_kg),
//         minimum_order_kg: Number(data.minimum_order_kg),
//         harvest_date: data.harvest_date || null,
//         organic_certified: data.organic_certified ?? null,
//         quality_grade: data.quality_grade || null,
//         moisture_content: data.moisture_content
//           ? Number(data.moisture_content)
//           : null,
//         location_state: data.location_state,
//         location_district: data.location_district,
//         certifications: data.certifications || null,
//         images: data.images || null,
//       };

//       const { data: product, error } = await supabase
//         .from("products")
//         .update(productData)
//         .eq("id", id)
//         .eq("seller_id", user!.id) // RLS fix
//         .select()
//         .single();

//       if (error) throw error;
//       return product;
//     },
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["my-products", user?.id] });
//       setEditingProduct(null);
//       setShowForm(false);
//       toast({ title: "Updated", description: "Product updated successfully" });
//     },
//     onError: (err: any) =>
//       toast({ title: "Error", description: err.message, variant: "destructive" }),
//   });

//   // ============= DELETE PRODUCT ==================
//   const deleteProductMutation = useMutation({
//     mutationFn: async (id: string) => {
//       const { error } = await supabase
//         .from("products")
//         .delete()
//         .eq("id", id)
//         .eq("seller_id", user!.id);

//       if (error) throw error;
//       return true;
//     },
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["my-products", user?.id] });
//       toast({ title: "Deleted", description: "Product removed" });
//     },
//   });

//   // ============= HANDLERS ==================
//   const handleEdit = (product: Product) => {
//     setEditingProduct(product);
//     setShowForm(true);
//   };

//   const handleDelete = (id: string) => {
//     deleteProductMutation.mutate(id);
//   };

//   const handleSubmit = (formData: ProductFormData) => {
//     if (editingProduct) {
//       updateProductMutation.mutate({ id: editingProduct.id, data: formData });
//     } else {
//       createProductMutation.mutate(formData);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-green-50 p-4 md:p-8">
//       <div className="max-w-7xl mx-auto">
//         <div className="flex justify-between items-center mb-8">
//           <div>
//             <h1 className="text-3xl font-bold text-gray-900 mb-2">My Products</h1>
//             <p className="text-gray-600">Manage your millet products</p>
//           </div>

//           <div className="flex gap-2">
//             <div className="flex border rounded-md">
//               <Button
//                 variant={viewMode === "grid" ? "default" : "ghost"}
//                 size="sm"
//                 onClick={() => setViewMode("grid")}
//                 className="rounded-r-none"
//               >
//                 <Grid className="w-4 h-4 mr-2" /> Grid
//               </Button>
//               <Button
//                 variant={viewMode === "table" ? "default" : "ghost"}
//                 size="sm"
//                 onClick={() => setViewMode("table")}
//                 className="rounded-l-none"
//               >
//                 <Table2 className="w-4 h-4 mr-2" /> Table
//               </Button>
//             </div>

//             <Button
//               onClick={() => {
//                 setEditingProduct(null);
//                 setShowForm(true);
//               }}
//               className="bg-gradient-to-r from-amber-500 to-green-600 hover:from-amber-600 hover:to-green-700"
//             >
//               <Plus className="w-4 h-4 mr-2" /> Add Product
//             </Button>
//           </div>
//         </div>

//         {viewMode === "grid" ? (
//           <ProductList
//             products={products}
//             isLoading={isLoading}
//             onEdit={handleEdit}
//             onDelete={handleDelete}
//           />
//         ) : (
//           <ProductsTable
//             products={products}
//             isLoading={isLoading}
//             onEdit={handleEdit}
//             onDelete={handleDelete}
//           />
//         )}

//         <Dialog open={showForm} onOpenChange={setShowForm}>
//           <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
//             <DialogHeader>
//               <DialogTitle>
//                 {editingProduct ? "Edit Product" : "Add New Product"}
//               </DialogTitle>
//             </DialogHeader>

//             <ProductForm
//               product={editingProduct}
//               onSubmit={handleSubmit}
//               onCancel={() => {
//                 setShowForm(false);
//                 setEditingProduct(null);
//               }}
//               isSubmitting={
//                 createProductMutation.isPending || updateProductMutation.isPending
//               }
//               error={
//                 (createProductMutation.error ||
//                   updateProductMutation.error) as Error | null
//               }
//             />
//           </DialogContent>
//         </Dialog>
//       </div>
//     </div>
//   );
// }

import React, { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { useAuthStore } from "@/stores/authStore";
import { toast } from "@/hooks/use-toast";
import { Table2, Grid } from "lucide-react";
import { Button } from "@/components/ui/button";

type Order = {
  id: string;
  product_id: string;
  quantity_kg: number;
  total_price: number;
  status: string;
  created_at: string;
};

export default function MyOrders() {
  const { user } = useAuthStore();
  const queryClient = useQueryClient();
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");
  const [offlineOrders, setOfflineOrders] = useState<Order[]>([]);

  // Fetch orders from Supabase
  const { data: orders = [], isLoading } = useQuery({
    queryKey: ["my-orders", user?.id],
    queryFn: async (): Promise<Order[]> => {
      const { data, error } = await supabase
        .from("orders")
        .select("*")
        .eq("user_id", user!.id)
        .order("created_at", { ascending: false });
      if (error) throw error;

      // Save to localStorage for offline
      localStorage.setItem("my-orders", JSON.stringify(data));
      return data || [];
    },
    enabled: !!user,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  // Load from localStorage if offline
  useEffect(() => {
    if (!navigator.onLine) {
      const stored = localStorage.getItem("my-orders");
      if (stored) {
        setOfflineOrders(JSON.parse(stored));
        toast({
          title: "Offline Mode",
          description: "Showing cached orders",
        });
      }
    }
  }, []);

  const displayOrders = navigator.onLine ? orders : offlineOrders;

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-green-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Orders</h1>

          <div className="flex border rounded-md">
            <Button
              variant={viewMode === "grid" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("grid")}
              className="rounded-r-none"
            >
              <Grid className="w-4 h-4 mr-2" /> Grid
            </Button>
            <Button
              variant={viewMode === "table" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("table")}
              className="rounded-l-none"
            >
              <Table2 className="w-4 h-4 mr-2" /> Table
            </Button>
          </div>
        </div>

        {isLoading ? (
          <p>Loading...</p>
        ) : displayOrders.length === 0 ? (
          <p>No orders found.</p>
        ) : viewMode === "grid" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {displayOrders.map((order) => (
              <div
                key={order.id}
                className="border rounded-lg p-4 shadow-sm bg-white"
              >
                <p>
                  <strong>Product:</strong> {order.product_id}
                </p>
                <p>
                  <strong>Quantity:</strong> {order.quantity_kg} kg
                </p>
                <p>
                  <strong>Total:</strong> ₹{order.total_price}
                </p>
                <p>
                  <strong>Status:</strong> {order.status}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <table className="table-auto w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-2">Product</th>
                <th className="border p-2">Quantity (kg)</th>
                <th className="border p-2">Total Price</th>
                <th className="border p-2">Status</th>
                <th className="border p-2">Date</th>
              </tr>
            </thead>
            <tbody>
              {displayOrders.map((order) => (
                <tr key={order.id}>
                  <td className="border p-2">{order.product_id}</td>
                  <td className="border p-2">{order.quantity_kg}</td>
                  <td className="border p-2">₹{order.total_price}</td>
                  <td className="border p-2">{order.status}</td>
                  <td className="border p-2">
                    {new Date(order.created_at).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
