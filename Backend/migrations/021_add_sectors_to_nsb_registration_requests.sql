-- Migration: Add sectors column to nsb_registration_requests table
-- This allows registration requests to specify which sectors/domains the NSB covers

BEGIN;

-- Add sectors column (array of text)
ALTER TABLE nsb_registration_requests
ADD COLUMN IF NOT EXISTS sectors TEXT[];

-- Add comment to explain the column
COMMENT ON COLUMN nsb_registration_requests.sectors IS 'Array of sectors/domains covered by this NSB (e.g., Food & Agriculture, Telecommunications, etc.). Helps distinguish multiple NSBs in the same country.';

COMMIT;

