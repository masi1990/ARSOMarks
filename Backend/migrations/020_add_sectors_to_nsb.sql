-- Migration: Add sectors column to nsb table and remove unique constraint to support multiple NSBs per country
-- This allows countries to have sector-specific NSBs (e.g., Food & Agriculture, Telecommunications, etc.)

BEGIN;

-- Drop the unique constraint that prevents multiple active NSBs per country
DROP INDEX IF EXISTS idx_nsb_active_country;

-- Add sectors column (array of text)
ALTER TABLE nsb
ADD COLUMN IF NOT EXISTS sectors TEXT[];

-- Add comment to explain the column
COMMENT ON COLUMN nsb.sectors IS 'Array of sectors/domains covered by this NSB (e.g., Food & Agriculture, Telecommunications, etc.). Allows multiple NSBs per country for different quality infrastructure implementations.';

COMMIT;

