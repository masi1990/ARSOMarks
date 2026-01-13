-- Migration to add JSONB columns to application_registrations table
-- These columns store nested data structures for comprehensive application registration

BEGIN;

-- Add JSONB columns for nested data structures
ALTER TABLE application_registrations
ADD COLUMN IF NOT EXISTS company_info JSONB,
ADD COLUMN IF NOT EXISTS company_size JSONB,
ADD COLUMN IF NOT EXISTS ownership_info JSONB,
ADD COLUMN IF NOT EXISTS primary_contact JSONB,
ADD COLUMN IF NOT EXISTS locations JSONB,
ADD COLUMN IF NOT EXISTS business_sectors JSONB,
ADD COLUMN IF NOT EXISTS market_info JSONB,
ADD COLUMN IF NOT EXISTS production_capacity JSONB,
ADD COLUMN IF NOT EXISTS preferences JSONB,
ADD COLUMN IF NOT EXISTS accessibility JSONB,
ADD COLUMN IF NOT EXISTS consents JSONB;

-- Add indexes for JSONB columns that might be queried
CREATE INDEX IF NOT EXISTS idx_application_registrations_company_info 
    ON application_registrations USING GIN (company_info) 
    WHERE company_info IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_application_registrations_locations 
    ON application_registrations USING GIN (locations) 
    WHERE locations IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_application_registrations_business_sectors 
    ON application_registrations USING GIN (business_sectors) 
    WHERE business_sectors IS NOT NULL;

-- Comments for documentation
COMMENT ON COLUMN application_registrations.company_info IS 'Stores company information (type, legal name, registration, etc.) as JSON';
COMMENT ON COLUMN application_registrations.company_size IS 'Stores company size and financial information as JSON';
COMMENT ON COLUMN application_registrations.ownership_info IS 'Stores ownership and beneficial ownership information as JSON';
COMMENT ON COLUMN application_registrations.primary_contact IS 'Stores primary contact details as JSON';
COMMENT ON COLUMN application_registrations.locations IS 'Stores array of location objects as JSON';
COMMENT ON COLUMN application_registrations.business_sectors IS 'Stores array of business sector objects as JSON';
COMMENT ON COLUMN application_registrations.market_info IS 'Stores market reach and trade information as JSON';
COMMENT ON COLUMN application_registrations.production_capacity IS 'Stores production capacity and capabilities as JSON';
COMMENT ON COLUMN application_registrations.preferences IS 'Stores user preferences as JSON';
COMMENT ON COLUMN application_registrations.accessibility IS 'Stores accessibility and special needs information as JSON';
COMMENT ON COLUMN application_registrations.consents IS 'Stores data and marketing consent information as JSON';

COMMIT;

