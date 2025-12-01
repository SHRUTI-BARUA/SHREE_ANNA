import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Plus, Table2, Grid } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useAuthStore } from "@/stores/authStore";
import { supabase } from "@/lib/supabase";
import { toast } from "@/hooks/use-toast";
import type { TablesInsert, TablesUpdate, Tables, Json } from "@/../database.types";

import ProductForm from "@/components/products/ProductForm";
import ProductList from "@/components/products/ProductList";
import ProductsTable from "@/components/products/ProductsTable";

type Product = Tables<"products">;
type ProductInsert = TablesInsert<"products">;
type ProductUpdate = TablesUpdate<"products">;

type ProductFormData = {
  title: string;
  millet_type: string;
  product_form: string;
  description?: string;
  available_quantity_kg: number | string;
  price_per_kg: number | string;
  minimum_order_kg: number | string;
  harvest_date?: string;
  organic_certified?: boolean;
  quality_grade?: string;
  moisture_content?: number | string;
  location_state: string;
  location_district: string;
  certifications?: Json | null;
  images?: Json | null;
  is_active?: boolean;
};

export default function MyProducts() {
  const { user } = useAuthStore();
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");
  const queryClient = useQueryClient();

  // Fetch profile ID (same as auth.users.id)
  const fetchProfileId = async (): Promise<string> => {
    if (!user?.id) throw new Error("User not logged in");

    const { data: profile, error } = await supabase
      .from("profiles")
      .select("id")
      .eq("id", user.id)
      .single();

    if (error || !profile) throw new Error("Profile not found!");
    return profile.id;
  };

  // Fetch products
  const { data: products = [], isLoading } = useQuery({
    queryKey: ["my-products", user?.id],
    queryFn: async () => {
      const profileId = await fetchProfileId();
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("seller_id", profileId)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data || [];
    },
    enabled: !!user,
  });

  // Create product
  const createProductMutation = useMutation({
    mutationFn: async (data: ProductFormData): Promise<Product> => {
      const profileId = await fetchProfileId();

      const productData: ProductInsert = {
        title: data.title,
        millet_type: data.millet_type,
        product_form: data.product_form,
        description: data.description || null,
        available_quantity_kg: parseFloat(String(data.available_quantity_kg)) || 0,
        price_per_kg: parseFloat(String(data.price_per_kg)) || 0,
        minimum_order_kg: parseFloat(String(data.minimum_order_kg)) || 1,
        harvest_date: data.harvest_date?.trim() || null,
        organic_certified: data.organic_certified || false,
        quality_grade: data.quality_grade || "standard",
        moisture_content: data.moisture_content ? parseFloat(String(data.moisture_content)) : null,
        location_state: data.location_state,
        location_district: data.location_district,
        seller_id: profileId,
        certifications: (data.certifications as Json) || null,
        images: (data.images as Json) || null,
        is_active: data.is_active !== undefined ? data.is_active : true,
      };

      const { data: product, error } = await supabase
        .from("products")
        .insert([productData])
        .select()
        .single();

      if (error) throw error;
      return product;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-products", user?.id] });
      setShowForm(false);
      setEditingProduct(null);
      toast({ title: "Success!", description: "Product has been created successfully." });
    },
    onError: (error: Error) => {
      toast({
        title: "Error creating product",
        description: error.message || "Failed to create product.",
        variant: "destructive",
      });
    },
  });

  // Update product
  const updateProductMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: ProductFormData }): Promise<Product> => {
      const profileId = await fetchProfileId();

      const productData: ProductUpdate = {
        title: data.title,
        millet_type: data.millet_type,
        product_form: data.product_form,
        description: data.description || null,
        available_quantity_kg: parseFloat(String(data.available_quantity_kg)) || 0,
        price_per_kg: parseFloat(String(data.price_per_kg)) || 0,
        minimum_order_kg: parseFloat(String(data.minimum_order_kg)) || 1,
        harvest_date: data.harvest_date?.trim() || null,
        organic_certified: data.organic_certified ?? null,
        quality_grade: data.quality_grade || null,
        moisture_content: data.moisture_content ? parseFloat(String(data.moisture_content)) : null,
        location_state: data.location_state,
        location_district: data.location_district,
        seller_id: profileId,
        certifications: data.certifications ?? undefined,
        images: data.images ?? undefined,
        is_active: data.is_active ?? undefined,
      };

      Object.keys(productData).forEach(
        (key) =>
          productData[key as keyof ProductUpdate] === undefined &&
          delete productData[key as keyof ProductUpdate]
      );

      const { data: product, error } = await supabase
        .from("products")
        .update(productData)
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      return product;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-products", user?.id] });
      setShowForm(false);
      setEditingProduct(null);
      toast({ title: "Success!", description: "Product updated successfully." });
    },
    onError: (error: Error) => {
      toast({
        title: "Error updating product",
        description: error.message || "Failed to update product.",
        variant: "destructive",
      });
    },
  });

  // Delete product
  const deleteProductMutation = useMutation({
    mutationFn: async (id: string): Promise<boolean> => {
      const { error } = await supabase.from("products").delete().eq("id", id);
      if (error) throw error;
      return true;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-products", user?.id] });
    },
  });

  // Handlers
  const handleSubmit = (productData: ProductFormData) => {
    if (editingProduct) {
      updateProductMutation.mutate({ id: editingProduct.id, data: productData });
    } else {
      createProductMutation.mutate(productData);
    }
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this product?")) {
      deleteProductMutation.mutate(id);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-green-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">My Products</h1>
            <p className="text-gray-600">Manage your millet products</p>
          </div>
          <div className="flex gap-2">
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
            <Button
              onClick={() => {
                setEditingProduct(null);
                setShowForm(true);
              }}
              className="bg-gradient-to-r from-amber-500 to-green-600 hover:from-amber-600 hover:to-green-700"
            >
              <Plus className="w-4 h-4 mr-2" /> Add Product
            </Button>
          </div>
        </div>

        {viewMode === "grid" ? (
          <ProductList
            products={products}
            isLoading={isLoading}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ) : (
          <ProductsTable
            products={products}
            isLoading={isLoading}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}

        <Dialog open={showForm} onOpenChange={setShowForm}>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingProduct ? "Edit Product" : "Add New Product"}</DialogTitle>
            </DialogHeader>
            <ProductForm
              product={editingProduct}
              onSubmit={handleSubmit}
              onCancel={() => {
                setShowForm(false);
                setEditingProduct(null);
              }}
              isSubmitting={createProductMutation.isPending || updateProductMutation.isPending}
              error={(createProductMutation.error || updateProductMutation.error) as Error | null}
            />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
