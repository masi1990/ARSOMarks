-- Migration: Make NSB Registration Request fields nullable for draft saves
-- This allows saving incomplete forms as drafts
-- Also standardize ISO code from Alpha-3 to Alpha-2

BEGIN;

-- Rename iso_alpha3_code to iso_code and change length from 3 to 2
ALTER TABLE nsb_registration_requests
  RENAME COLUMN iso_alpha3_code TO iso_code;

ALTER TABLE nsb_registration_requests
  ALTER COLUMN iso_code TYPE VARCHAR(2);

-- Make country and contact fields nullable
ALTER TABLE nsb_registration_requests
  ALTER COLUMN country_id DROP NOT NULL,
  ALTER COLUMN country_name DROP NOT NULL,
  ALTER COLUMN nsb_official_name DROP NOT NULL,
  ALTER COLUMN iso_code DROP NOT NULL,
  ALTER COLUMN contact_person_name DROP NOT NULL,
  ALTER COLUMN contact_email DROP NOT NULL;

COMMIT;

