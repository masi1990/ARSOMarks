-- Migration: Add Part B (Product & Certification Details) JSONB columns to application_registrations table
-- Date: 2025-01-XX

ALTER TABLE application_registrations
    ADD COLUMN IF NOT EXISTS product_certification JSONB,
    ADD COLUMN IF NOT EXISTS manufacturer_info JSONB,
    ADD COLUMN IF NOT EXISTS conformity_evidence JSONB,
    ADD COLUMN IF NOT EXISTS post_certification JSONB,
    ADD COLUMN IF NOT EXISTS cb_selection JSONB;

-- Create GIN indexes for JSONB columns to improve query performance
CREATE INDEX IF NOT EXISTS idx_application_registrations_product_certification 
    ON application_registrations USING GIN (product_certification) 
    WHERE product_certification IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_application_registrations_manufacturer_info 
    ON application_registrations USING GIN (manufacturer_info) 
    WHERE manufacturer_info IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_application_registrations_conformity_evidence 
    ON application_registrations USING GIN (conformity_evidence) 
    WHERE conformity_evidence IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_application_registrations_post_certification 
    ON application_registrations USING GIN (post_certification) 
    WHERE post_certification IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_application_registrations_cb_selection 
    ON application_registrations USING GIN (cb_selection) 
    WHERE cb_selection IS NOT NULL;

-- Add comments for documentation
COMMENT ON COLUMN application_registrations.product_certification IS 'Part B Section 2: Product & Certification Details (mark, ACAP scheme, standards, etc.)';
COMMENT ON COLUMN application_registrations.manufacturer_info IS 'Part B Section 3: Production & Manufacturer Information';
COMMENT ON COLUMN application_registrations.conformity_evidence IS 'Part B Section 4: Conformity Evidence & Document Validation (file references)';
COMMENT ON COLUMN application_registrations.post_certification IS 'Part B Section 5: Post-Certification Commitments & Systems';
COMMENT ON COLUMN application_registrations.cb_selection IS 'Part B Section 6: Certification Body Selection & Declaration';

