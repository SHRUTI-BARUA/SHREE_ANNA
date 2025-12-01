-- Create profiles table for storing user profile information
-- This table supports both Farmer/FPO/SHG and Buyer/Consumer profiles

CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  profile_type TEXT NOT NULL CHECK (profile_type IN ('farmer', 'buyer')),
  
  -- Common fields
  contact_person_name TEXT,
  phone_number TEXT,
  state TEXT,
  district TEXT,
  village TEXT,
  pincode TEXT,
  preferred_language TEXT DEFAULT 'English',
  
  -- Farmer/FPO/SHG specific fields
  organization_name TEXT, -- For FPO/SHG
  farm_size_acres NUMERIC(10, 2),
  bank_account_number TEXT,
  ifsc_code TEXT,
  
  -- Buyer/Consumer specific fields
  business_name TEXT, -- For businesses/processors
  business_type TEXT, -- e.g., 'Processor', 'Trader', 'Consumer'
  gst_number TEXT,
  
  -- Metadata
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Policy: Users can view their own profile
CREATE POLICY "Users can view own profile"
  ON public.profiles
  FOR SELECT
  USING (auth.uid() = id);

-- Policy: Users can insert their own profile
CREATE POLICY "Users can insert own profile"
  ON public.profiles
  FOR INSERT
  WITH CHECK (auth.uid() = id);

-- Policy: Users can update their own profile
CREATE POLICY "Users can update own profile"
  ON public.profiles
  FOR UPDATE
  USING (auth.uid() = id);

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_profiles_user_id ON public.profiles(id);
CREATE INDEX IF NOT EXISTS idx_profiles_profile_type ON public.profiles(profile_type);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger to automatically update updated_at
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

