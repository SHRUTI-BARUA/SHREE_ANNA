import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Edit, Trash2, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Product {
  id: string;
  title: string;
  millet_type: string;
  product_form: string;
  price_per_kg: number;
  available_quantity_kg: number;
  minimum_order_kg: number;
  quality_grade: string;
  organic_certified: boolean;
  location_state: string;
  location_district: string;
  is_active: boolean;
  created_at: string;
}

interface ProductsTableProps {
  products: Product[];
  isLoading: boolean;
  onEdit: (product: Product) => void;
  onDelete: (id: string) => void;
}

export default function ProductsTable({
  products,
  isLoading,
  onEdit,
  onDelete,
}: ProductsTableProps) {
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <p className="text-gray-600">Loading products...</p>
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className="flex justify-center items-center py-12">
        <p className="text-gray-600">No products found. Add your first product to get started!</p>
      </div>
    );
  }

  const formatMilletType = (type: string) => {
    return type
      .replace(/_/g, " ")
      .replace(/\b\w/g, (l) => l.toUpperCase());
  };

  const formatProductForm = (form: string) => {
    return form
      .replace(/_/g, " ")
      .replace(/\b\w/g, (l) => l.toUpperCase());
  };

  const formatQualityGrade = (grade: string) => {
    return grade
      .replace(/_/g, " ")
      .replace(/\b\w/g, (l) => l.toUpperCase());
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="bg-white rounded-lg border shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="min-w-[200px]">Product Title</TableHead>
              <TableHead className="min-w-[120px]">Millet Type</TableHead>
              <TableHead className="min-w-[100px]">Form</TableHead>
              <TableHead className="min-w-[100px]">Price/kg (₹)</TableHead>
              <TableHead className="min-w-[100px]">Available (kg)</TableHead>
              <TableHead className="min-w-[100px]">Min Order (kg)</TableHead>
              <TableHead className="min-w-[100px]">Quality</TableHead>
              <TableHead className="min-w-[150px]">Location</TableHead>
              <TableHead className="min-w-[100px]">Status</TableHead>
              <TableHead className="min-w-[100px]">Created</TableHead>
              <TableHead className="min-w-[180px] text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell className="font-medium">{product.title}</TableCell>
                <TableCell>
                  <Badge variant="outline">{formatMilletType(product.millet_type)}</Badge>
                </TableCell>
                <TableCell>{formatProductForm(product.product_form)}</TableCell>
                <TableCell className="font-semibold">
                  ₹{product.price_per_kg.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                </TableCell>
                <TableCell>{product.available_quantity_kg.toLocaleString("en-IN")} kg</TableCell>
                <TableCell>{product.minimum_order_kg.toLocaleString("en-IN")} kg</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      product.quality_grade === "premium"
                        ? "default"
                        : product.quality_grade === "grade_a"
                        ? "secondary"
                        : "outline"
                    }
                  >
                    {formatQualityGrade(product.quality_grade)}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="text-sm">
                    <div>{product.location_district}</div>
                    <div className="text-gray-500">{product.location_state}</div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant={product.is_active ? "default" : "secondary"}>
                    {product.is_active ? "Active" : "Inactive"}
                  </Badge>
                  {product.organic_certified && (
                    <Badge variant="outline" className="ml-1">
                      Organic
                    </Badge>
                  )}
                </TableCell>
                <TableCell className="text-sm text-gray-500">
                  {formatDate(product.created_at)}
                </TableCell>
                <TableCell>
                  <div className="flex justify-end gap-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => navigate(`/product/${product.id}`)}
                      title="View Details"
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => onEdit(product)}
                      className="bg-gradient-to-r from-amber-500 to-green-600 hover:from-amber-600 hover:to-green-700 text-white"
                      title="Edit"
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => onDelete(product.id)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

