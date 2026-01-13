-- ARSO Marks / Operator Registration & Profile System - OP-001
-- PostgreSQL migration to create operator registration tables, enums, and supporting structures.
-- This schema supports FORM OP-001: Operator Registration & Profile with comprehensive KYC data
--
-- Sections:
-- A: Basic Company Information (KYC Data)
-- B: Contact & Location Information
-- C: Business Activities & Markets
-- D: Preferences, Accessibility & Consent

BEGIN;

-- Extensions (if not already created)
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ============================================================================
-- ENUMERATIONS FOR OPERATOR REGISTRATION SYSTEM
-- ============================================================================

-- Operator Type / Business Type
CREATE TYPE operator_type AS ENUM (
    'MANUFACTURER',
    'IMPORTER',
    'EXPORTER',
    'DISTRIBUTOR',
    'RETAILER',
    'SERVICE_PROVIDER',
    'OTHER'
);

-- Legal Structure / Entity Type
CREATE TYPE legal_structure AS ENUM (
    'LIMITED_COMPANY',
    'PARTNERSHIP',
    'SOLE_PROPRIETOR',
    'NGO',
    'GOVERNMENT',
    'COOPERATIVE',
    'OTHER'
);

-- Company Size - Employee Count
CREATE TYPE employee_count_range AS ENUM (
    'MICRO_1_9',        -- 1-9 employees
    'SMALL_10_49',      -- 10-49 employees
    'MEDIUM_50_249',    -- 50-249 employees
    'LARGE_250_PLUS'    -- 250+ employees
);

-- Annual Turnover Range
CREATE TYPE annual_turnover_range AS ENUM (
    'UNDER_50K',        -- <$50K
    '50K_100K',         -- $50K-$100K
    '100K_500K',        -- $100K-$500K
    '500K_1M',          -- $500K-$1M
    '1M_5M',            -- $1M-$5M
    '5M_10M',           -- $5M-$10M
    'OVER_10M'          -- >$10M
);

-- Ownership Type
CREATE TYPE ownership_type AS ENUM (
    'LOCAL',
    'FOREIGN',
    'JOINT_VENTURE',
    'PUBLIC',
    'GOVERNMENT',
    'MIXED'
);

-- SME Category (auto-calculated)
CREATE TYPE sme_category AS ENUM (
    'MICRO',
    'SMALL',
    'MEDIUM',
    'LARGE',
    'NOT_APPLICABLE'
);

-- Women/Youth Ownership
CREATE TYPE ownership_status AS ENUM (
    'YES',
    'NO',
    'WOMEN_LED',
    'YOUTH_LED'
);

-- Operator Registration Status
CREATE TYPE operator_status AS ENUM (
    'DRAFT',
    'SUBMITTED',
    'UNDER_REVIEW',
    'APPROVED',
    'REJECTED',
    'SUSPENDED',
    'ACTIVE',
    'INACTIVE'
);

-- Contact Type
CREATE TYPE operator_contact_type AS ENUM (
    'PRIMARY',
    'ALTERNATIVE',
    'TECHNICAL',
    'FINANCIAL',
    'LEGAL'
);

-- Verification Status
CREATE TYPE verification_status AS ENUM (
    'PENDING',
    'VERIFIED',
    'FAILED',
    'EXPIRED'
);

-- Location Type
CREATE TYPE operator_location_type AS ENUM (
    'REGISTERED_ADDRESS',
    'FACTORY',
    'PRODUCTION_FACILITY',
    'WAREHOUSE',
    'OFFICE',
    'OTHER'
);

-- Factory/Production Facility Type
CREATE TYPE factory_type AS ENUM (
    'MANUFACTURING_PLANT',
    'PROCESSING_UNIT',
    'ASSEMBLY_LINE',
    'WORKSHOP',
    'PACKAGING_FACILITY',
    'OTHER'
);

-- Business Sector (Main)
CREATE TYPE main_business_sector AS ENUM (
    'AGRICULTURE',
    'MANUFACTURING',
    'SERVICES',
    'CONSTRUCTION',
    'MINING',
    'RETAIL',
    'WHOLESALE',
    'TRANSPORT',
    'ENERGY',
    'TELECOMMUNICATIONS',
    'OTHER'
);

-- Domestic Market Type
CREATE TYPE domestic_market_type AS ENUM (
    'NATIONAL',
    'REGIONAL',
    'LOCAL'
);

-- Quality Management System Type
CREATE TYPE qms_type AS ENUM (
    'ISO_9001',
    'HACCP',
    'GMP',
    'INTERNAL_SYSTEM',
    'NONE',
    'IN_PROGRESS'
);

-- Preferred Language
CREATE TYPE preferred_language AS ENUM (
    'ENGLISH',
    'FRENCH',
    'PORTUGUESE',
    'ARABIC',
    'SWAHILI',
    'OTHER'
);

-- Communication Preference
CREATE TYPE communication_preference AS ENUM (
    'EMAIL',
    'SMS',
    'PHONE',
    'WHATSAPP',
    'POSTAL_MAIL',
    'IN_PERSON'
);

-- Notification Frequency
CREATE TYPE notification_frequency AS ENUM (
    'REAL_TIME',
    'DAILY_DIGEST',
    'WEEKLY_SUMMARY',
    'MONTHLY_SUMMARY'
);

-- Digital Literacy Level
CREATE TYPE digital_literacy_level AS ENUM (
    'BASIC',
    'INTERMEDIATE',
    'ADVANCED'
);

-- Internet Access Type
CREATE TYPE internet_access_type AS ENUM (
    'HIGH_SPEED',
    'MOBILE_DATA',
    'LIMITED',
    'INTERMITTENT'
);

-- Device Type
CREATE TYPE device_type AS ENUM (
    'DESKTOP',
    'LAPTOP',
    'SMARTPHONE',
    'TABLET',
    'FEATURE_PHONE'
);

-- Assistive Technology Type
CREATE TYPE assistive_tech_type AS ENUM (
    'SCREEN_READER',
    'HIGH_CONTRAST',
    'LARGE_TEXT',
    'TEXT_TO_SPEECH',
    'KEYBOARD_NAVIGATION',
    'OTHER'
);

-- ============================================================================
-- SEQUENCES
-- ============================================================================

CREATE SEQUENCE IF NOT EXISTS operator_registration_seq START 1;

-- ============================================================================
-- SECTION A: BASIC COMPANY INFORMATION (KYC DATA)
-- ============================================================================

-- Main Operator/Company Table
CREATE TABLE IF NOT EXISTS operators (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    registration_number VARCHAR(50) UNIQUE, -- Auto-generated: OP-{country}-{seq}
    
    -- A1: Company Type & Legal Identity
    operator_type operator_type NOT NULL,
    company_legal_name VARCHAR(200) NOT NULL,
    trading_name VARCHAR(150),
    registration_number_business VARCHAR(50) NOT NULL, -- Business Registration/Incorporation Number
    tax_id VARCHAR(30), -- Tax Identification Number (TIN/VAT)
    vat_number VARCHAR(30), -- VAT Registration Number
    year_established INTEGER NOT NULL CHECK (year_established >= 1900 AND year_established <= EXTRACT(YEAR FROM CURRENT_DATE)),
    company_age INTEGER, -- Auto-calculated (display only in application, stored for reference)
    legal_structure legal_structure NOT NULL,
    business_activity TEXT NOT NULL, -- Main Business Activity description (max 500 chars)
    
    -- A2: Company Size & Financial Information
    employee_count employee_count_range NOT NULL,
    annual_turnover annual_turnover_range NOT NULL,
    annual_revenue DECIMAL(15, 2), -- Optional - for statistics
    export_percentage DECIMAL(5, 2) CHECK (export_percentage >= 0 AND export_percentage <= 100),
    import_percentage DECIMAL(5, 2) CHECK (import_percentage >= 0 AND import_percentage <= 100),
    capital_investment DECIMAL(15, 2), -- Capital Investment in Plant & Equipment
    
    -- A3: Ownership & Beneficial Ownership (KYC)
    ownership_type ownership_type NOT NULL,
    majority_owner_nationality VARCHAR(50), -- Conditional: if foreign ownership > 50%
    women_owned ownership_status NOT NULL,
    youth_owned ownership_status,
    black_owned_percentage DECIMAL(5, 2) CHECK (black_owned_percentage >= 0 AND black_owned_percentage <= 100),
    sme_category sme_category, -- Auto-calculated
    beneficial_owners_count INTEGER NOT NULL CHECK (beneficial_owners_count >= 1),
    pep_involved BOOLEAN NOT NULL DEFAULT false,
    pep_details TEXT, -- Conditional: required if PEP involved (max 500 chars)
    
    -- Status & Workflow
    status operator_status DEFAULT 'DRAFT',
    submitted_at TIMESTAMP,
    approved_at TIMESTAMP,
    rejected_at TIMESTAMP,
    rejection_reason TEXT,
    
    -- Audit columns
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_by UUID REFERENCES system_users(id) ON DELETE SET NULL,
    updated_by UUID REFERENCES system_users(id) ON DELETE SET NULL,
    
    -- Foreign keys
    user_id UUID REFERENCES system_users(id) ON DELETE SET NULL, -- Link to user account
    country_id UUID REFERENCES countries(id) ON DELETE SET NULL -- Country of operation
);

-- Indexes for operators table
CREATE INDEX IF NOT EXISTS idx_operators_user_id ON operators(user_id);
CREATE INDEX IF NOT EXISTS idx_operators_country_id ON operators(country_id);
CREATE INDEX IF NOT EXISTS idx_operators_status ON operators(status);
CREATE INDEX IF NOT EXISTS idx_operators_registration_number ON operators(registration_number);
CREATE INDEX IF NOT EXISTS idx_operators_company_legal_name ON operators(company_legal_name);

-- ============================================================================
-- SECTION B: CONTACT & LOCATION INFORMATION
-- ============================================================================

-- B1: Primary Contact Details
CREATE TABLE IF NOT EXISTS operator_contacts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    operator_id UUID NOT NULL REFERENCES operators(id) ON DELETE CASCADE,
    
    contact_type operator_contact_type NOT NULL DEFAULT 'PRIMARY',
    primary_contact VARCHAR(100) NOT NULL, -- Full Name
    contact_position VARCHAR(100) NOT NULL, -- Position/Title
    contact_email VARCHAR(150) NOT NULL,
    contact_email_verified BOOLEAN DEFAULT false,
    contact_email_verification_token VARCHAR(255),
    contact_email_verified_at TIMESTAMP,
    contact_phone VARCHAR(20) NOT NULL, -- Format: +[country code][number]
    contact_phone_verified BOOLEAN DEFAULT false,
    contact_phone_verification_code VARCHAR(10),
    contact_phone_verified_at TIMESTAMP,
    
    -- Alternative Contact (optional)
    alt_contact VARCHAR(100),
    alt_email VARCHAR(150),
    alt_phone VARCHAR(20),
    
    is_primary BOOLEAN DEFAULT false,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for operator_contacts
CREATE INDEX IF NOT EXISTS idx_operator_contacts_operator_id ON operator_contacts(operator_id);
CREATE INDEX IF NOT EXISTS idx_operator_contacts_email ON operator_contacts(contact_email);
CREATE UNIQUE INDEX IF NOT EXISTS idx_operator_contacts_primary ON operator_contacts(operator_id) WHERE is_primary = true;

-- B2: Physical Location Details
CREATE TABLE IF NOT EXISTS operator_locations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    operator_id UUID NOT NULL REFERENCES operators(id) ON DELETE CASCADE,
    
    location_type operator_location_type NOT NULL DEFAULT 'REGISTERED_ADDRESS',
    
    -- Physical Address
    physical_address TEXT NOT NULL, -- Complete address including street (max 500 chars)
    address_line1 VARCHAR(100) NOT NULL,
    address_line2 VARCHAR(100),
    postal_code VARCHAR(20) NOT NULL,
    city_town VARCHAR(100) NOT NULL,
    region_state VARCHAR(100) NOT NULL,
    country_id UUID NOT NULL REFERENCES countries(id) ON DELETE RESTRICT,
    gps_coordinates VARCHAR(50), -- Format: latitude,longitude
    
    -- Factory/Production Location Specific (if different from registered address)
    factory_location_same BOOLEAN, -- Factory/Production Location Same as Registered Address?
    factory_name VARCHAR(200), -- Conditional: if production location different
    factory_type factory_type,
    factory_size DECIMAL(10, 2), -- Facility Size (sq meters)
    
    is_primary BOOLEAN DEFAULT false, -- Primary registered address
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for operator_locations
CREATE INDEX IF NOT EXISTS idx_operator_locations_operator_id ON operator_locations(operator_id);
CREATE INDEX IF NOT EXISTS idx_operator_locations_country_id ON operator_locations(country_id);
CREATE INDEX IF NOT EXISTS idx_operator_locations_primary ON operator_locations(operator_id) WHERE is_primary = true;

-- ============================================================================
-- SECTION C: BUSINESS ACTIVITIES & MARKETS
-- ============================================================================

-- C1: Business Sectors & Activities (Array structure)
CREATE TABLE IF NOT EXISTS operator_business_sectors (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    operator_id UUID NOT NULL REFERENCES operators(id) ON DELETE CASCADE,
    
    main_sector main_business_sector NOT NULL,
    sub_sector TEXT[], -- Tag Input - Array of sub-sectors/industries
    isic_code VARCHAR(10), -- Auto-assigned based on sub-sector selection
    product_categories TEXT[], -- Tag Input - Array of product categories (HS codes)
    percentage_revenue DECIMAL(5, 2) NOT NULL CHECK (percentage_revenue >= 0 AND percentage_revenue <= 100),
    sector_start_year INTEGER CHECK (sector_start_year >= 1900 AND sector_start_year <= EXTRACT(YEAR FROM CURRENT_DATE)),
    sector_experience INTEGER, -- Auto-calculated (display only)
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for operator_business_sectors
CREATE INDEX IF NOT EXISTS idx_operator_business_sectors_operator_id ON operator_business_sectors(operator_id);
CREATE INDEX IF NOT EXISTS idx_operator_business_sectors_main_sector ON operator_business_sectors(main_sector);

-- C2: Market Reach & Trade
CREATE TABLE IF NOT EXISTS operator_markets (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    operator_id UUID NOT NULL REFERENCES operators(id) ON DELETE CASCADE,
    
    -- Domestic Markets
    domestic_markets domestic_market_type[], -- Multi-select array
    
    -- Export Markets (Array)
    export_markets UUID[], -- Array of country IDs (AfCFTA countries)
    primary_export_market UUID REFERENCES countries(id) ON DELETE SET NULL, -- Conditional: required if exports > 0
    export_start_year INTEGER CHECK (export_start_year >= 1900 AND export_start_year <= EXTRACT(YEAR FROM CURRENT_DATE)),
    
    -- Import Sources (Array)
    import_sources UUID[], -- Array of country IDs
    
    -- AfCFTA Awareness
    afcfta_awareness VARCHAR(20) NOT NULL CHECK (afcfta_awareness IN ('HIGH', 'MEDIUM', 'LOW', 'NONE')),
    trade_challenges TEXT, -- Main Challenges in Cross-border Trade (max 1000 chars)
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for operator_markets
CREATE INDEX IF NOT EXISTS idx_operator_markets_operator_id ON operator_markets(operator_id);
CREATE INDEX IF NOT EXISTS idx_operator_markets_primary_export ON operator_markets(primary_export_market);

-- C3: Production Capacity & Capabilities
CREATE TABLE IF NOT EXISTS operator_production_capacity (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    operator_id UUID NOT NULL REFERENCES operators(id) ON DELETE CASCADE,
    
    production_capacity DECIMAL(15, 2) NOT NULL, -- Annual Production Capacity
    capacity_unit VARCHAR(20) NOT NULL, -- Options: units, kg, liters, tonnes, etc.
    capacity_utilization DECIMAL(5, 2) NOT NULL CHECK (capacity_utilization >= 0 AND capacity_utilization <= 100),
    
    -- Quality Management
    quality_management VARCHAR(20) NOT NULL CHECK (quality_management IN ('YES', 'NO', 'IN_PROGRESS')),
    qms_type qms_type,
    certification_count INTEGER NOT NULL DEFAULT 0 CHECK (certification_count >= 0),
    existing_certifications TEXT, -- List Existing Certifications (max 1000 chars, conditional if count > 0)
    
    technical_staff INTEGER NOT NULL DEFAULT 0 CHECK (technical_staff >= 0),
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    UNIQUE(operator_id) -- One production capacity record per operator
);

-- Indexes for operator_production_capacity
CREATE INDEX IF NOT EXISTS idx_operator_production_capacity_operator_id ON operator_production_capacity(operator_id);

-- ============================================================================
-- SECTION D: PREFERENCES, ACCESSIBILITY & CONSENT
-- ============================================================================

-- D1: User Preferences
CREATE TABLE IF NOT EXISTS operator_preferences (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    operator_id UUID NOT NULL REFERENCES operators(id) ON DELETE CASCADE,
    
    preferred_language preferred_language NOT NULL DEFAULT 'ENGLISH',
    communication_preferences communication_preference[] NOT NULL, -- Checkbox Group - at least one required
    notification_frequency notification_frequency NOT NULL DEFAULT 'DAILY_DIGEST',
    timezone VARCHAR(50) NOT NULL, -- Based on country
    currency VARCHAR(10) NOT NULL DEFAULT 'USD', -- Options: USD, EUR, Local Currency
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    UNIQUE(operator_id) -- One preferences record per operator
);

-- Indexes for operator_preferences
CREATE INDEX IF NOT EXISTS idx_operator_preferences_operator_id ON operator_preferences(operator_id);

-- D2: Accessibility & Special Needs
CREATE TABLE IF NOT EXISTS operator_accessibility (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    operator_id UUID NOT NULL REFERENCES operators(id) ON DELETE CASCADE,
    
    assistive_tech BOOLEAN NOT NULL DEFAULT false, -- Need Accessibility Assistance?
    disability_types assistive_tech_type[], -- Multi-select conditional
    special_assistance TEXT, -- Describe specific needs (max 500 chars, conditional)
    literacy_level digital_literacy_level NOT NULL DEFAULT 'BASIC',
    internet_access internet_access_type NOT NULL,
    device_type device_type NOT NULL,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    UNIQUE(operator_id) -- One accessibility record per operator
);

-- Indexes for operator_accessibility
CREATE INDEX IF NOT EXISTS idx_operator_accessibility_operator_id ON operator_accessibility(operator_id);

-- D3: Data & Marketing Consent
CREATE TABLE IF NOT EXISTS operator_consents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    operator_id UUID NOT NULL REFERENCES operators(id) ON DELETE CASCADE,
    
    -- Required Consents
    data_consent BOOLEAN NOT NULL DEFAULT false, -- I consent to processing of personal data
    data_sharing_consent BOOLEAN NOT NULL DEFAULT false, -- I consent to share certification status in public directory
    cross_border_data BOOLEAN NOT NULL DEFAULT false, -- I consent to cross-border data sharing within AfCFTA
    terms_acceptance BOOLEAN NOT NULL DEFAULT false, -- I accept Terms and Conditions
    
    -- Optional Consents
    marketing_consent BOOLEAN DEFAULT false, -- I agree to receive marketing communications
    sms_consent BOOLEAN DEFAULT false, -- I agree to receive SMS notifications
    whatsapp_consent BOOLEAN DEFAULT false, -- I agree to receive WhatsApp communications
    
    -- Declaration
    declaration_signature VARCHAR(100) NOT NULL, -- Full name of signatory
    declaration_date DATE NOT NULL DEFAULT CURRENT_DATE,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    UNIQUE(operator_id) -- One consents record per operator
);

-- Indexes for operator_consents
CREATE INDEX IF NOT EXISTS idx_operator_consents_operator_id ON operator_consents(operator_id);

-- ============================================================================
-- TRIGGERS & FUNCTIONS
-- ============================================================================

-- Function to auto-calculate company_age
CREATE OR REPLACE FUNCTION calculate_company_age()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.year_established IS NOT NULL THEN
        NEW.company_age := EXTRACT(YEAR FROM CURRENT_DATE) - NEW.year_established;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to auto-calculate company_age
CREATE TRIGGER trigger_calculate_company_age
    BEFORE INSERT OR UPDATE ON operators
    FOR EACH ROW
    EXECUTE FUNCTION calculate_company_age();

-- Function to auto-calculate SME category based on employee_count and annual_turnover
CREATE OR REPLACE FUNCTION calculate_sme_category()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.employee_count = 'MICRO_1_9' OR 
       (NEW.employee_count = 'SMALL_10_49' AND NEW.annual_turnover IN ('UNDER_50K', '50K_100K', '100K_500K')) THEN
        NEW.sme_category := 'MICRO';
    ELSIF NEW.employee_count = 'SMALL_10_49' OR 
          (NEW.employee_count = 'MEDIUM_50_249' AND NEW.annual_turnover IN ('UNDER_50K', '50K_100K', '100K_500K', '500K_1M')) THEN
        NEW.sme_category := 'SMALL';
    ELSIF NEW.employee_count = 'MEDIUM_50_249' OR 
          (NEW.employee_count = 'LARGE_250_PLUS' AND NEW.annual_turnover IN ('UNDER_50K', '50K_100K', '500K_1M', '1M_5M')) THEN
        NEW.sme_category := 'MEDIUM';
    ELSIF NEW.employee_count = 'LARGE_250_PLUS' THEN
        NEW.sme_category := 'LARGE';
    ELSE
        NEW.sme_category := 'NOT_APPLICABLE';
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to auto-calculate SME category
CREATE TRIGGER trigger_calculate_sme_category
    BEFORE INSERT OR UPDATE ON operators
    FOR EACH ROW
    EXECUTE FUNCTION calculate_sme_category();

-- Function to auto-generate registration_number
CREATE OR REPLACE FUNCTION generate_operator_registration_number()
RETURNS TRIGGER AS $$
DECLARE
    country_code VARCHAR(3);
    seq_num INTEGER;
BEGIN
    IF NEW.registration_number IS NULL THEN
        -- Get country ISO code (first 3 chars, uppercase)
        SELECT UPPER(SUBSTRING(iso_code, 1, 3)) INTO country_code
        FROM countries
        WHERE id = NEW.country_id;
        
        -- Get next sequence number
        seq_num := nextval('operator_registration_seq');
        
        -- Format: OP-{country}-{seq}
        NEW.registration_number := 'OP-' || COALESCE(country_code, 'XXX') || '-' || LPAD(seq_num::TEXT, 6, '0');
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to auto-generate registration_number
CREATE TRIGGER trigger_generate_operator_registration_number
    BEFORE INSERT ON operators
    FOR EACH ROW
    EXECUTE FUNCTION generate_operator_registration_number();

-- Function to auto-calculate sector_experience
CREATE OR REPLACE FUNCTION calculate_sector_experience()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.sector_start_year IS NOT NULL THEN
        NEW.sector_experience := EXTRACT(YEAR FROM CURRENT_DATE) - NEW.sector_start_year;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to auto-calculate sector_experience
CREATE TRIGGER trigger_calculate_sector_experience
    BEFORE INSERT OR UPDATE ON operator_business_sectors
    FOR EACH ROW
    EXECUTE FUNCTION calculate_sector_experience();

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply updated_at trigger to all tables
CREATE TRIGGER trigger_operators_updated_at
    BEFORE UPDATE ON operators
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER trigger_operator_contacts_updated_at
    BEFORE UPDATE ON operator_contacts
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER trigger_operator_locations_updated_at
    BEFORE UPDATE ON operator_locations
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER trigger_operator_business_sectors_updated_at
    BEFORE UPDATE ON operator_business_sectors
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER trigger_operator_markets_updated_at
    BEFORE UPDATE ON operator_markets
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER trigger_operator_production_capacity_updated_at
    BEFORE UPDATE ON operator_production_capacity
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER trigger_operator_preferences_updated_at
    BEFORE UPDATE ON operator_preferences
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER trigger_operator_accessibility_updated_at
    BEFORE UPDATE ON operator_accessibility
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER trigger_operator_consents_updated_at
    BEFORE UPDATE ON operator_consents
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- CONSTRAINTS & VALIDATIONS
-- ============================================================================

-- Constraint: Total percentage_revenue across all sectors must equal 100%
-- Note: This is enforced at application level, but we can add a check function
CREATE OR REPLACE FUNCTION validate_revenue_percentages(operator_uuid UUID)
RETURNS BOOLEAN AS $$
DECLARE
    total_percentage DECIMAL;
BEGIN
    SELECT COALESCE(SUM(percentage_revenue), 0) INTO total_percentage
    FROM operator_business_sectors
    WHERE operator_id = operator_uuid;
    
    RETURN ABS(total_percentage - 100.0) < 0.01; -- Allow small floating point differences
END;
$$ LANGUAGE plpgsql;

-- ============================================================================
-- COMMENTS FOR DOCUMENTATION
-- ============================================================================

COMMENT ON TABLE operators IS 'Main operator/company registration table - Section A: Basic Company Information (KYC Data)';
COMMENT ON TABLE operator_contacts IS 'Operator contact information - Section B1: Primary Contact Details';
COMMENT ON TABLE operator_locations IS 'Operator physical locations - Section B2: Physical Location Details';
COMMENT ON TABLE operator_business_sectors IS 'Business sectors and activities - Section C1: Business Sectors & Activities (Array)';
COMMENT ON TABLE operator_markets IS 'Market reach and trade information - Section C2: Market Reach & Trade';
COMMENT ON TABLE operator_production_capacity IS 'Production capacity and capabilities - Section C3: Production Capacity & Capabilities';
COMMENT ON TABLE operator_preferences IS 'User preferences - Section D1: User Preferences';
COMMENT ON TABLE operator_accessibility IS 'Accessibility and special needs - Section D2: Accessibility & Special Needs';
COMMENT ON TABLE operator_consents IS 'Data and marketing consents - Section D3: Data & Marketing Consent';

COMMIT;

