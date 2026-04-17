-- Add product columns used by the admin/editor UI.
-- Run this in Supabase SQL Editor if the live database is missing them.
ALTER TABLE IF EXISTS public.products
  ADD COLUMN IF NOT EXISTS manufacturer TEXT DEFAULT 'YNK',
  ADD COLUMN IF NOT EXISTS image TEXT,
  ADD COLUMN IF NOT EXISTS documents JSONB NOT NULL DEFAULT '[]'::jsonb;
