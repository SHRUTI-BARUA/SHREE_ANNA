import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Package } from "lucide-react";

export default function ProductList({ products, isLoading, onEdit, onDelete }) {
  const navigate = useNavigate();
  const { t } = useTranslation();

  if (isLoading) return <p>{t("products.list.loading")}</p>;
  if (!products.length) return <p>{t("products.list.empty")}</p>;

  const getProductImage = (product) => {
    if (product.images && Array.isArray(product.images) && product.images.length > 0) {
      return product.images[0];
    }
    return null;
  };

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <Card key={product.id} className="shadow-lg hover:shadow-xl transition-shadow cursor-pointer overflow-hidden">
          <div className="relative h-48 bg-muted">
            {getProductImage(product) ? (
              <img
                src={getProductImage(product)}
                alt={product.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-100">
                <Package className="w-16 h-16 text-gray-300" />
              </div>
            )}
          </div>

          <CardContent className="p-4" onClick={() => navigate(`/product/${product.id}`)}>
            <h3 className="font-bold text-lg mb-2">{product.title}</h3>
            <p className="text-gray-700 font-semibold mb-1">
              {t("products.list.pricePerKg", {
                price: product.price_per_kg.toLocaleString("en-IN"),
              })}
            </p>
            <p className="text-gray-500 text-sm mb-3">
              {t("products.list.available", { count: product.available_quantity_kg })}
            </p>

            <div
              className="flex gap-2 mt-2"
              onClick={(e) => e.stopPropagation()}
            >
              <Button
                size="sm"
                className="bg-gradient-to-r from-amber-500 to-green-600 hover:from-amber-600 hover:to-green-700"
                onClick={() => onEdit(product)}
              >
                {t("products.list.edit")}
              </Button>
              <Button
                size="sm"
                variant="destructive"
                onClick={() => onDelete(product.id)}
              >
                {t("products.list.delete")}
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
