-- Operator registration enhancements: legal reg, groups, geo coordinates
BEGIN;

DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'legal_registration_number_type') THEN
        CREATE TYPE legal_registration_number_type AS ENUM (
            'BUSINESS_REGISTRATION',
            'TAX_ID',
            'VAT',
            'OTHER'
        );
    END IF;
END$$;

ALTER TABLE operators
ADD COLUMN IF NOT EXISTS legal_registration_number_type legal_registration_number_type,
ADD COLUMN IF NOT EXISTS legal_registration_number VARCHAR(100),
ADD COLUMN IF NOT EXISTS is_group BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS group_manager_id UUID,
ADD COLUMN IF NOT EXISTS group_members JSONB;

ALTER TABLE operator_locations
ADD COLUMN IF NOT EXISTS geo_lat NUMERIC(10,7),
ADD COLUMN IF NOT EXISTS geo_lng NUMERIC(10,7),
ADD COLUMN IF NOT EXISTS geo_accuracy_m NUMERIC(8,2);

COMMIT;
