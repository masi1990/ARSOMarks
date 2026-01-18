-- Product certification scheme payload
BEGIN;

ALTER TABLE product_certification_applications
ADD COLUMN IF NOT EXISTS scheme_payload JSONB;

COMMIT;
