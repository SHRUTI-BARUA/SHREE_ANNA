-- Create products table for storing millet products
-- This table stores product information for farmers/sellers

CREATE TABLE IF NOT EXISTS public.products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  seller_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  
  -- Basic product information
  title TEXT NOT NULL,
  description TEXT,
  millet_type TEXT NOT NULL CHECK (millet_type IN (
    'foxtail_millet',
    'pearl_millet',
    'finger_millet',
    'little_millet',
    'proso_millet',
    'barnyard_millet',
    'kodo_millet',
    'sorghum',
    'brown_top_millet'
  )),
  product_form TEXT NOT NULL CHECK (product_form IN (
    'raw_grain',
    'flour',
    'flakes',
    'processed',
    'ready_to_cook',
    'value_added'
  )),
  
  -- Pricing and quantity
  price_per_kg NUMERIC(10, 2) NOT NULL CHECK (price_per_kg >= 0),
  available_quantity_kg NUMERIC(10, 2) NOT NULL DEFAULT 0 CHECK (available_quantity_kg >= 0),
  minimum_order_kg NUMERIC(10, 2) NOT NULL DEFAULT 1 CHECK (minimum_order_kg > 0),
  
  -- Quality and certification
  quality_grade TEXT DEFAULT 'standard' CHECK (quality_grade IN ('premium', 'grade_a', 'grade_b', 'standard')),
  organic_certified BOOLEAN DEFAULT false,
  moisture_content NUMERIC(5, 2) DEFAULT 0 CHECK (moisture_content >= 0 AND moisture_content <= 100),
  
  -- Location information
  location_state TEXT NOT NULL,
  location_district TEXT NOT NULL,
  
  -- Harvest information
  harvest_date DATE,
  
  -- Images (stored as JSON array of URLs)
  images JSONB DEFAULT '[]'::jsonb,
  
  -- Certifications (stored as JSON array)
  certifications JSONB DEFAULT '[]'::jsonb,
  
  -- Status
  is_active BOOLEAN DEFAULT true,
  
  -- Metadata
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- Policy: Users can view all active products (for marketplace)
CREATE POLICY "Anyone can view active products"
  ON public.products
  FOR SELECT
  USING (is_active = true);

-- Policy: Users can view their own products (active or inactive)
CREATE POLICY "Users can view own products"
  ON public.products
  FOR SELECT
  USING (auth.uid() = seller_id);

-- Policy: Users can insert their own products
CREATE POLICY "Users can insert own products"
  ON public.products
  FOR INSERT
  WITH CHECK (auth.uid() = seller_id);

-- Policy: Users can update their own products
CREATE POLICY "Users can update own products"
  ON public.products
  FOR UPDATE
  USING (auth.uid() = seller_id)
  WITH CHECK (auth.uid() = seller_id);

-- Policy: Users can delete their own products
CREATE POLICY "Users can delete own products"
  ON public.products
  FOR DELETE
  USING (auth.uid() = seller_id);

-- Create indexes for faster lookups
CREATE INDEX IF NOT EXISTS idx_products_seller_id ON public.products(seller_id);
CREATE INDEX IF NOT EXISTS idx_products_millet_type ON public.products(millet_type);
CREATE INDEX IF NOT EXISTS idx_products_product_form ON public.products(product_form);
CREATE INDEX IF NOT EXISTS idx_products_is_active ON public.products(is_active);
CREATE INDEX IF NOT EXISTS idx_products_location_state ON public.products(location_state);
CREATE INDEX IF NOT EXISTS idx_products_created_at ON public.products(created_at DESC);

-- Trigger to automatically update updated_at
CREATE TRIGGER update_products_updated_at
  BEFORE UPDATE ON public.products
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

