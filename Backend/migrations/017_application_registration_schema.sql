-- ARSO Marks / Application Registration System
-- PostgreSQL migration to create application registration table and supporting structures.
-- This schema supports application registration with draft and submit functionality
--
-- Features:
-- - Draft saves (no validation required)
-- - Final submission (with validation)
-- - Status tracking (DRAFT, SUBMITTED, UNDER_REVIEW, etc.)

BEGIN;

-- ============================================================================
-- ENUMERATIONS FOR APPLICATION REGISTRATION SYSTEM
-- ============================================================================

-- Application Registration Status
CREATE TYPE application_registration_status AS ENUM (
    'DRAFT',
    'SUBMITTED',
    'UNDER_REVIEW',
    'APPROVED',
    'REJECTED',
    'ACTIVE',
    'SUSPENDED',
    'WITHDRAWN'
);

-- ============================================================================
-- APPLICATION REGISTRATIONS TABLE
-- ============================================================================

CREATE TABLE IF NOT EXISTS application_registrations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    application_number VARCHAR(255) UNIQUE,
    
    -- Basic Information
    applicant_name VARCHAR(200),
    applicant_type VARCHAR(50),
    registration_number VARCHAR(50),
    tax_id VARCHAR(30),
    
    -- Contact Information
    contact_person VARCHAR(100),
    contact_email VARCHAR(150),
    contact_phone VARCHAR(20),
    
    -- Address Information
    physical_address TEXT,
    city VARCHAR(100),
    region_state VARCHAR(100),
    postal_code VARCHAR(20),
    country_id UUID,
    
  -- Additional Information
  business_activity TEXT,
  year_established INTEGER,
  employee_count INTEGER,
  annual_revenue DECIMAL(15, 2),
  
  -- Nested data stored as JSONB for flexibility (supports all operator registration fields)
  company_info JSONB,
  company_size JSONB,
  ownership_info JSONB,
  primary_contact JSONB,
  locations JSONB,
  business_sectors JSONB,
  market_info JSONB,
  production_capacity JSONB,
  preferences JSONB,
  accessibility JSONB,
  consents JSONB,
  
  -- Status and Metadata
    status application_registration_status NOT NULL DEFAULT 'DRAFT',
    submitted_at TIMESTAMP,
    
    -- User relationship
    user_id UUID,
    created_by UUID,
    updated_by UUID,
    
    -- Timestamps
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    
    -- Foreign Keys
    CONSTRAINT fk_application_registration_country 
        FOREIGN KEY (country_id) 
        REFERENCES countries(id) 
        ON DELETE SET NULL,
    
    CONSTRAINT fk_application_registration_user 
        FOREIGN KEY (user_id) 
        REFERENCES system_users(id) 
        ON DELETE SET NULL,
    
    CONSTRAINT fk_application_registration_created_by 
        FOREIGN KEY (created_by) 
        REFERENCES system_users(id) 
        ON DELETE SET NULL,
    
    CONSTRAINT fk_application_registration_updated_by 
        FOREIGN KEY (updated_by) 
        REFERENCES system_users(id) 
        ON DELETE SET NULL
);

-- ============================================================================
-- INDEXES FOR PERFORMANCE
-- ============================================================================

-- Index for user lookups (common query: get my application)
CREATE INDEX IF NOT EXISTS idx_application_registrations_user_id 
    ON application_registrations(user_id);

-- Index for status filtering
CREATE INDEX IF NOT EXISTS idx_application_registrations_status 
    ON application_registrations(status);

-- Index for country filtering
CREATE INDEX IF NOT EXISTS idx_application_registrations_country_id 
    ON application_registrations(country_id);

-- Index for application number lookups
CREATE INDEX IF NOT EXISTS idx_application_registrations_application_number 
    ON application_registrations(application_number) 
    WHERE application_number IS NOT NULL;

-- Index for submitted date queries
CREATE INDEX IF NOT EXISTS idx_application_registrations_submitted_at 
    ON application_registrations(submitted_at) 
    WHERE submitted_at IS NOT NULL;

-- Composite index for common admin queries (status + country)
CREATE INDEX IF NOT EXISTS idx_application_registrations_status_country 
    ON application_registrations(status, country_id);

-- ============================================================================
-- TRIGGERS FOR UPDATED_AT TIMESTAMP
-- ============================================================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_application_registrations_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to automatically update updated_at
DROP TRIGGER IF EXISTS trigger_update_application_registrations_updated_at ON application_registrations;
CREATE TRIGGER trigger_update_application_registrations_updated_at
    BEFORE UPDATE ON application_registrations
    FOR EACH ROW
    EXECUTE FUNCTION update_application_registrations_updated_at();

-- ============================================================================
-- COMMENTS FOR DOCUMENTATION
-- ============================================================================

COMMENT ON TABLE application_registrations IS 'Stores application registration data with support for draft saves and final submission';
COMMENT ON COLUMN application_registrations.status IS 'Current status of the application (DRAFT, SUBMITTED, etc.)';
COMMENT ON COLUMN application_registrations.application_number IS 'Auto-generated unique application number (assigned on submission)';
COMMENT ON COLUMN application_registrations.submitted_at IS 'Timestamp when application was submitted (moved from DRAFT to SUBMITTED)';

COMMIT;

