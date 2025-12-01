export interface Product {
  id: string;
  title: string;
  price_per_kg: number;
  seller_id: string; // ✅ add this
  millet_type?: string;
  description?: string;
  location_district?: string;
  location_state?: string;
  available_quantity_kg?: number;
  minimum_order_kg?: number;
  images?: string[];
  quality_grade?: string;
  organic_certified?: boolean;
}
