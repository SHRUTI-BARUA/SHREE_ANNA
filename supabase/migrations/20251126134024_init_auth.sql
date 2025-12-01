-- Enable email/password authentication
-- Supabase Auth tables are created automatically
-- This migration ensures auth is properly configured

-- Enable the auth schema if not already enabled
CREATE SCHEMA IF NOT EXISTS auth;

-- Note: Supabase Auth handles user management automatically
-- Users table and related auth tables are managed by Supabase

