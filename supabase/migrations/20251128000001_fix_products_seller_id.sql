-- Fix products table to properly map foreign key to auth.users
-- This migration ensures seller_id correctly references auth.users(id) in Supabase

-- First, drop the existing foreign key constraint if it exists
ALTER TABLE public.products 
  DROP CONSTRAINT IF EXISTS products_seller_id_fkey;

-- Recreate the foreign key constraint with explicit reference to auth.users
-- Using DEFERRABLE so the constraint is checked after the trigger runs
-- This ensures proper mapping to Supabase's auth schema
ALTER TABLE public.products 
  ADD CONSTRAINT products_seller_id_fkey 
  FOREIGN KEY (seller_id) 
  REFERENCES auth.users(id) 
  ON DELETE CASCADE
  DEFERRABLE INITIALLY DEFERRED;

-- Create a function to automatically set seller_id from auth.uid()
-- This ensures seller_id always matches the authenticated user and references auth.users(id)
CREATE OR REPLACE FUNCTION public.set_seller_id()
RETURNS TRIGGER AS $$
DECLARE
  current_user_id UUID;
BEGIN
  -- Get the current authenticated user ID
  current_user_id := auth.uid();
  
  -- Ensure user is authenticated
  IF current_user_id IS NULL THEN
    RAISE EXCEPTION 'User must be authenticated to create products';
  END IF;
  
  -- Always set seller_id from auth.uid() to ensure it correctly references auth.users(id)
  -- This guarantees the foreign key constraint is satisfied
  -- The trigger runs BEFORE INSERT, so this sets the value before NOT NULL check
  NEW.seller_id := current_user_id;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger to automatically set seller_id before insert
-- This ensures seller_id is always correctly mapped to auth.users
DROP TRIGGER IF EXISTS set_seller_id_trigger ON public.products;
CREATE TRIGGER set_seller_id_trigger
  BEFORE INSERT ON public.products
  FOR EACH ROW
  EXECUTE FUNCTION public.set_seller_id();

-- Update the RLS policy to ensure proper authentication
DROP POLICY IF EXISTS "Users can insert own products" ON public.products;
CREATE POLICY "Users can insert own products"
  ON public.products
  FOR INSERT
  WITH CHECK (auth.uid() = seller_id);

