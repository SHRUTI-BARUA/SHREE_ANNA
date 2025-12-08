import React, { useState } from "react";
import {
  useQuery,
  useMutation,
  useQueryClient,
  UseMutationResult,
} from "@tanstack/react-query";
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
import type {
  TablesInsert,
  TablesUpdate,
  Tables,
  Json,
} from "@/../database.types";

import ProductForm from "@/components/products/ProductForm";
import ProductList from "@/components/products/ProductList";
import ProductsTable from "@/components/products/ProductsTable";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();

  // ============= FETCH PRODUCTS ==================
  const {
    data: products = [],
    isLoading,
  } = useQuery<Product[]>({
    queryKey: ["my-products", user?.id],
    queryFn: async () => {
      if (!user) return [];
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("seller_id", user.id)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data ?? [];
    },
    enabled: !!user,
  });

  // ============= CREATE PRODUCT ==================
  const createProductMutation: UseMutationResult<
    Product,
    Error,
    ProductFormData
  > = useMutation({
    mutationFn: async (data: ProductFormData): Promise<Product> => {
      if (!user) {
        throw new Error(t("products.toasts.authRequired"));
      }

      const productData: ProductInsert = {
        title: data.title,
        millet_type: data.millet_type,
        product_form: data.product_form,
        description: data.description || null,
        available_quantity_kg: Number(data.available_quantity_kg),
        price_per_kg: Number(data.price_per_kg),
        minimum_order_kg: Number(data.minimum_order_kg),
        harvest_date: data.harvest_date || null,
        organic_certified: data.organic_certified ?? null,
        quality_grade: data.quality_grade || null,
        moisture_content: data.moisture_content
          ? Number(data.moisture_content)
          : null,
        location_state: data.location_state,
        location_district: data.location_district,
        certifications: data.certifications || null,
        images: data.images || null,
        seller_id: user.id, // trigger also sets this, but safe to include
      };

      const { data: product, error } = await supabase
        .from("products")
        .insert(productData)
        .select()
        .single();

      if (error || !product) throw error || new Error("Insert failed");
      return product;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-products", user?.id] });
      setShowForm(false);
      toast({ title: t("products.toasts.addedTitle"), description: t("products.toasts.addedDesc") });
    },
    onError: (err) =>
      toast({
        title: t("products.toasts.errorTitle"),
        description: err.message || t("auth.common.genericError"),
        variant: "destructive",
      }),
  });

  // ============= UPDATE PRODUCT ==================
  const updateProductMutation: UseMutationResult<
    Product,
    Error,
    { id: string; data: ProductFormData }
  > = useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: string;
      data: ProductFormData;
    }): Promise<Product> => {
      if (!user) {
        throw new Error(t("products.toasts.authRequired"));
      }

      const productData: ProductUpdate = {
        title: data.title,
        millet_type: data.millet_type,
        product_form: data.product_form,
        description: data.description || null,
        available_quantity_kg: Number(data.available_quantity_kg),
        price_per_kg: Number(data.price_per_kg),
        minimum_order_kg: Number(data.minimum_order_kg),
        harvest_date: data.harvest_date || null,
        organic_certified: data.organic_certified ?? null,
        quality_grade: data.quality_grade || null,
        moisture_content: data.moisture_content
          ? Number(data.moisture_content)
          : null,
        location_state: data.location_state,
        location_district: data.location_district,
        certifications: data.certifications || null,
        images: data.images || null,
      };

      const { data: product, error } = await supabase
        .from("products")
        .update(productData)
        .eq("id", id)
        .eq("seller_id", user.id)
        .select()
        .single();

      if (error || !product) throw error || new Error("Update failed");
      return product;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-products", user?.id] });
      setEditingProduct(null);
      setShowForm(false);
      toast({
        title: t("products.toasts.updatedTitle"),
        description: t("products.toasts.updatedDesc"),
      });
    },
    onError: (err) =>
      toast({
        title: t("products.toasts.errorTitle"),
        description: err.message || t("auth.common.genericError"),
        variant: "destructive",
      }),
  });

  // ============= DELETE PRODUCT ==================
  const deleteProductMutation: UseMutationResult<boolean, Error, string> =
    useMutation({
      mutationFn: async (id: string) => {
        if (!user) {
          throw new Error(t("products.toasts.authRequired"));
        }

        const { error } = await supabase
          .from("products")
          .delete()
          .eq("id", id)
          .eq("seller_id", user.id);

      if (error) throw error;
      return true;
    },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["my-products", user?.id] });
        toast({
          title: t("products.toasts.deletedTitle"),
          description: t("products.toasts.deletedDesc"),
        });
      },
      onError: (err) =>
        toast({
          title: t("products.toasts.errorTitle"),
          description: err.message || t("auth.common.genericError"),
          variant: "destructive",
        }),
    });

  // ============= HANDLERS ==================
  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    deleteProductMutation.mutate(id);
  };

  const handleSubmit = (formData: ProductFormData) => {
    if (editingProduct) {
      updateProductMutation.mutate({ id: editingProduct.id, data: formData });
    } else {
      createProductMutation.mutate(formData);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-green-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {t("products.page.title")}
            </h1>
            <p className="text-gray-600">{t("products.page.subtitle")}</p>
          </div>

          <div className="flex gap-2">
            <div className="flex border rounded-md overflow-hidden">
              <Button
                variant={viewMode === "grid" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("grid")}
                className="rounded-r-none"
              >
                <Grid className="w-4 h-4 mr-2" />
                {t("products.page.grid")}
              </Button>
              <Button
                variant={viewMode === "table" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("table")}
                className="rounded-l-none"
              >
                <Table2 className="w-4 h-4 mr-2" />
                {t("products.page.table")}
              </Button>
            </div>

            <Button
              onClick={() => {
                setEditingProduct(null);
                setShowForm(true);
              }}
              className="bg-gradient-to-r from-amber-500 to-green-600 hover:from-amber-600 hover:to-green-700"
            >
              <Plus className="w-4 h-4 mr-2" />
              {t("products.page.add")}
            </Button>
          </div>
        </div>

        {/* Content */}
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

        {/* Dialog */}
        <Dialog open={showForm} onOpenChange={setShowForm}>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingProduct ? t("products.page.editDialogTitle") : t("products.page.addDialogTitle")}
              </DialogTitle>
            </DialogHeader>

            <ProductForm
              product={editingProduct}
              onSubmit={handleSubmit}
              onCancel={() => {
                setShowForm(false);
                setEditingProduct(null);
              }}
              isSubmitting={
                createProductMutation.isPending ||
                updateProductMutation.isPending
              }
              error={
                (createProductMutation.error ||
                  updateProductMutation.error) as Error | null
              }
            />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
