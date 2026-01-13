-- Migration: Phase 2 - Complete Stakeholder Management Ecosystem
-- Forms: NSB-003-1, NSB-003-2, NSB-003-3, NSB-003-4, CB-FAC-001
-- This migration implements the complete specification for Phase 2 Stakeholder Management

BEGIN;

-- ============================================================================
-- ENUMS FOR STAKEHOLDER MANAGEMENT
-- ============================================================================

-- MSA Jurisdiction Types
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'msa_jurisdiction_type') THEN
        CREATE TYPE msa_jurisdiction_type AS ENUM (
            'NATIONAL', 'REGIONAL', 'PROVINCIAL', 'COUNTY', 'MUNICIPAL', 
            'SPECIAL_ECONOMIC_ZONE', 'OTHER'
        );
    END IF;
END$$;

-- MSA Scope of Authority Types
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'msa_scope_type') THEN
        CREATE TYPE msa_scope_type AS ENUM (
            'PRODUCT_SAFETY', 'QUALITY_CONTROL', 'METROLOGY', 'CONSUMER_PROTECTION',
            'ENVIRONMENTAL_COMPLIANCE', 'HEALTH_STANDARDS', 'AGRICULTURE_STANDARDS',
            'IMPORT_EXPORT_CONTROL', 'OTHER'
        );
    END IF;
END$$;

-- MOU Status
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'mou_status_type') THEN
        CREATE TYPE mou_status_type AS ENUM (
            'NOT_REQUIRED', 'PLANNED', 'DRAFT_UNDER_REVIEW', 'SIGNED_ACTIVE',
            'EXPIRED', 'TERMINATED', 'NOT_APPLICABLE'
        );
    END IF;
END$$;

-- System Access Level
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'system_access_level_type') THEN
        CREATE TYPE system_access_level_type AS ENUM (
            'NO_ACCESS', 'READ_ONLY_PORTAL', 'FULL_SUBMISSION_ACCESS', 'CUSTOM'
        );
    END IF;
END$$;

-- ACAP Training Status
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'acap_training_status_type') THEN
        CREATE TYPE acap_training_status_type AS ENUM (
            'NOT_TRAINED', 'BASIC_AWARENESS', 'TECHNICAL_TRAINING_COMPLETED', 'TRAINER_CERTIFIED'
        );
    END IF;
END$$;

-- Customs Integration Status
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'customs_integration_status_type') THEN
        CREATE TYPE customs_integration_status_type AS ENUM (
            'FULLY_INTEGRATED', 'PARTIAL_INTEGRATION', 'PLANNED_INTEGRATION',
            'NO_INTEGRATION', 'UNKNOWN'
        );
    END IF;
END$$;

-- Border Post Type
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'border_post_type') THEN
        CREATE TYPE border_post_type AS ENUM (
            'AIRPORT', 'SEAPORT', 'LAND_BORDER', 'DRY_PORT', 'INLAND_DEPOT', 'OTHER'
        );
    END IF;
END$$;

-- Regulatory Agency Type
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'regulatory_agency_type') THEN
        CREATE TYPE regulatory_agency_type AS ENUM (
            'FOOD_DRUG_AUTHORITY', 'AGRICULTURE_MINISTRY', 'HEALTH_MINISTRY',
            'ENVIRONMENT_AGENCY', 'INDUSTRY_TRADE_MINISTRY', 'OTHER'
        );
    END IF;
END$$;

-- Engagement Level
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'engagement_level_type') THEN
        CREATE TYPE engagement_level_type AS ENUM (
            'ACTIVE_PARTNER', 'INTERESTED', 'NEUTRAL', 'RESISTANT', 'NO_ENGAGEMENT',
            'REGULAR_CONTACT', 'OCCASIONAL_CONTACT', 'NEW_CONTACT', 'DORMANT'
        );
    END IF;
END$$;

-- Laboratory Type
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'laboratory_type') THEN
        CREATE TYPE laboratory_type AS ENUM (
            'TESTING_LABORATORY', 'CALIBRATION_LABORATORY', 'MEDICAL_LABORATORY',
            'INSPECTION_BODY', 'CERTIFICATION_BODY', 'RESEARCH_INSTITUTE'
        );
    END IF;
END$$;

-- Laboratory Legal Status
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'laboratory_legal_status_type') THEN
        CREATE TYPE laboratory_legal_status_type AS ENUM (
            'GOVERNMENT_OWNED', 'PRIVATE_COMMERCIAL', 'UNIVERSITY_AFFILIATED',
            'NON_PROFIT', 'INTERNATIONAL_BRANCH'
        );
    END IF;
END$$;

-- Accreditation Status
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'accreditation_status_type') THEN
        CREATE TYPE accreditation_status_type AS ENUM (
            'AFRAC_MRA_SIGNATORY', 'ILAC_MRA_SIGNATORY', 'REGIONAL_MRA',
            'NATIONAL_ACCREDITATION_ONLY', 'NOT_ACCREDITED', 'APPLICATION_IN_PROGRESS'
        );
    END IF;
END$$;

-- Digital Capability Type
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'digital_capability_type') THEN
        CREATE TYPE digital_capability_type AS ENUM (
            'PDF_REPORTS_ONLY', 'DIGITAL_SIGNATURES', 'API_INTEGRATION',
            'BLOCKCHAIN_ENABLED', 'NONE'
        );
    END IF;
END$$;

-- Stakeholder Category Type
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'stakeholder_category_type') THEN
        CREATE TYPE stakeholder_category_type AS ENUM (
            'ACADEMIC_RESEARCH', 'CONSUMER_ORGANIZATIONS', 'DEVELOPMENT_PARTNERS',
            'FINANCIAL_INSTITUTIONS', 'MEDIA_ORGANIZATIONS', 'PROFESSIONAL_BODIES',
            'TRADE_UNIONS', 'OTHER'
        );
    END IF;
END$$;

-- Academic Institution Type
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'academic_institution_type') THEN
        CREATE TYPE academic_institution_type AS ENUM (
            'UNIVERSITY', 'POLYTECHNIC', 'RESEARCH_INSTITUTE', 'TECHNICAL_COLLEGE', 'THINK_TANK'
        );
    END IF;
END$$;

-- Development Partner Type
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'development_partner_type') THEN
        CREATE TYPE development_partner_type AS ENUM (
            'UN_AGENCY', 'BILATERAL_DONOR', 'MULTILATERAL_BANK', 'INTERNATIONAL_NGO', 'FOUNDATION'
        );
    END IF;
END$$;

-- NSB Priority Level
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'nsb_priority_level_type') THEN
        CREATE TYPE nsb_priority_level_type AS ENUM (
            'HIGH_PRIORITY', 'MEDIUM_PRIORITY', 'LOW_PRIORITY', 'MONITOR_ONLY'
        );
    END IF;
END$$;

-- CB Application Review Status (for CB-FAC-001)
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'cb_review_status_type') THEN
        CREATE TYPE cb_review_status_type AS ENUM (
            'NEW', 'UNDER_REVIEW', 'INFO_REQUESTED', 'AWAITING_RESPONSE',
            'APPROVED', 'REJECTED'
        );
    END IF;
END$$;

-- NSB Recommendation Type
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'nsb_recommendation_type') THEN
        CREATE TYPE nsb_recommendation_type AS ENUM (
            'APPROVE_WITHOUT_CONDITIONS', 'APPROVE_WITH_CONDITIONS',
            'REQUEST_MORE_INFORMATION', 'REJECT'
        );
    END IF;
END$$;

-- Sector Need Assessment Type
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'sector_need_assessment_type') THEN
        CREATE TYPE sector_need_assessment_type AS ENUM (
            'CRITICAL_NEED', 'HIGH_NEED', 'MODERATE_NEED', 'LOW_NEED', 'SATURATED'
        );
    END IF;
END$$;

-- ============================================================================
-- FORM NSB-003-1: NATIONAL AUTHORITIES DIRECTORY
-- ============================================================================

-- SECTION A: MARKET SURVEILLANCE AUTHORITIES (MSAs)
CREATE TABLE IF NOT EXISTS nsb_market_surveillance_authorities (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nsb_id UUID NOT NULL REFERENCES nsb(id) ON DELETE CASCADE,
    -- Basic Information
    agency_name VARCHAR(255) NOT NULL,
    agency_name_english VARCHAR(255), -- English translation
    acronym VARCHAR(50),
    jurisdiction msa_jurisdiction_type NOT NULL,
    jurisdiction_other VARCHAR(255), -- If "OTHER" selected
    parent_ministry VARCHAR(255), -- Supervising Ministry
    -- Contact Information
    contact_person_name VARCHAR(255) NOT NULL,
    contact_person_title VARCHAR(100),
    contact_email VARCHAR(255) NOT NULL,
    contact_phone VARCHAR(50) NOT NULL,
    contact_alt VARCHAR(255), -- Alternative Contact
    -- Authority Scope
    scope_of_authority TEXT[], -- Array of msa_scope_type (stored as text array)
    scope_other TEXT, -- If "OTHER" selected
    products_covered TEXT[], -- Tag Input - HS codes or product categories
    -- MOU Information
    mou_status mou_status_type NOT NULL,
    mou_document_path VARCHAR(500),
    mou_document_hash VARCHAR(64),
    mou_start_date DATE,
    mou_end_date DATE,
    -- System Access
    access_level system_access_level_type NOT NULL,
    custom_access_requirements TEXT, -- If "CUSTOM" selected
    -- Training Information
    training_status acap_training_status_type NOT NULL,
    last_training_date DATE,
    is_national_focal_point BOOLEAN DEFAULT false, -- Designated as National ACAP Focal Point
    -- Additional Information
    notes TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_by UUID REFERENCES system_users(id) ON DELETE SET NULL
);

-- MSA Documents (for MOU and other attachments)
CREATE TABLE IF NOT EXISTS nsb_msa_documents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    msa_id UUID NOT NULL REFERENCES nsb_market_surveillance_authorities(id) ON DELETE CASCADE,
    document_type VARCHAR(50) NOT NULL, -- 'MOU', 'MANDATE', 'ORG_CHART', 'OTHER'
    file_name VARCHAR(255) NOT NULL,
    file_path VARCHAR(500) NOT NULL,
    file_hash VARCHAR(64) NOT NULL,
    file_size BIGINT NOT NULL,
    mime_type VARCHAR(100),
    uploaded_by UUID REFERENCES system_users(id) ON DELETE SET NULL,
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- SECTION B: CUSTOMS/BORDER AGENCIES
CREATE TABLE IF NOT EXISTS nsb_customs_border_agencies (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nsb_id UUID NOT NULL REFERENCES nsb(id) ON DELETE CASCADE,
    -- Agency Information
    agency_name VARCHAR(255) NOT NULL,
    parent_ministry VARCHAR(255) NOT NULL, -- Usually Ministry of Finance/Trade
    -- Primary Contact
    primary_contact_name VARCHAR(255) NOT NULL, -- National ACAP Coordinator
    coordinator_email VARCHAR(255) NOT NULL,
    coordinator_phone VARCHAR(50) NOT NULL,
    -- Integration Status
    integration_status customs_integration_status_type NOT NULL,
    integration_details TEXT, -- Describe integration level and capabilities
    api_available VARCHAR(20) CHECK (api_available IN ('YES', 'NO', 'UNDER_DEVELOPMENT')),
    -- Status
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_by UUID REFERENCES system_users(id) ON DELETE SET NULL
);

-- Customs API Documentation
CREATE TABLE IF NOT EXISTS nsb_customs_api_documents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    customs_agency_id UUID NOT NULL REFERENCES nsb_customs_border_agencies(id) ON DELETE CASCADE,
    file_name VARCHAR(255) NOT NULL,
    file_path VARCHAR(500) NOT NULL,
    file_hash VARCHAR(64) NOT NULL,
    file_size BIGINT NOT NULL,
    mime_type VARCHAR(100),
    uploaded_by UUID REFERENCES system_users(id) ON DELETE SET NULL,
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Border Posts Array (Dynamic - Add/Remove as needed)
CREATE TABLE IF NOT EXISTS nsb_border_posts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    customs_agency_id UUID NOT NULL REFERENCES nsb_customs_border_agencies(id) ON DELETE CASCADE,
    border_post_name VARCHAR(255) NOT NULL,
    post_type border_post_type NOT NULL,
    location VARCHAR(255) NOT NULL, -- City/Region
    gps_coordinates VARCHAR(100), -- Latitude, Longitude
    -- Contact Information
    contact_name VARCHAR(255) NOT NULL, -- ACAP Verification Contact
    contact_phone VARCHAR(50) NOT NULL,
    contact_email VARCHAR(255),
    operating_hours VARCHAR(255) NOT NULL, -- For ACAP verification
    -- Equipment and Training
    verification_equipment TEXT[], -- Array: QR Code Scanner, UV Light, etc.
    training_needs TEXT[], -- Array: Basic ACAP Awareness, Advanced Verification, etc.
    estimated_annual_traffic VARCHAR(20) CHECK (estimated_annual_traffic IN ('HIGH', 'MEDIUM', 'LOW')), -- >1M, 100K-1M, <100K
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Customs Agency Documents
CREATE TABLE IF NOT EXISTS nsb_customs_documents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    customs_agency_id UUID NOT NULL REFERENCES nsb_customs_border_agencies(id) ON DELETE CASCADE,
    document_type VARCHAR(50) NOT NULL, -- 'MANDATE', 'INTEGRATION_AGREEMENT', 'BORDER_POST_DIRECTORY', 'OTHER'
    file_name VARCHAR(255) NOT NULL,
    file_path VARCHAR(500) NOT NULL,
    file_hash VARCHAR(64) NOT NULL,
    file_size BIGINT NOT NULL,
    mime_type VARCHAR(100),
    uploaded_by UUID REFERENCES system_users(id) ON DELETE SET NULL,
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- SECTION C: REGULATORY AGENCIES
CREATE TABLE IF NOT EXISTS nsb_regulatory_agencies (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nsb_id UUID NOT NULL REFERENCES nsb(id) ON DELETE CASCADE,
    -- Agency Information
    agency_type regulatory_agency_type NOT NULL,
    agency_name VARCHAR(255) NOT NULL, -- Custom name if different from type
    specific_department VARCHAR(255), -- e.g., Plant Health, Livestock, Fisheries
    -- Contact Information
    contact_person_name VARCHAR(255),
    contact_email VARCHAR(255),
    contact_phone VARCHAR(50),
    -- Engagement
    engagement_level engagement_level_type,
    relevant_mandate TEXT, -- How their mandate relates to ACAP
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_by UUID REFERENCES system_users(id) ON DELETE SET NULL
);

-- Regulatory Agency Documents
CREATE TABLE IF NOT EXISTS nsb_regulatory_agency_documents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    regulatory_agency_id UUID NOT NULL REFERENCES nsb_regulatory_agencies(id) ON DELETE CASCADE,
    document_type VARCHAR(50) NOT NULL, -- 'COOPERATION_AGREEMENT', 'ORG_CHART', 'OTHER'
    file_name VARCHAR(255) NOT NULL,
    file_path VARCHAR(500) NOT NULL,
    file_hash VARCHAR(64) NOT NULL,
    file_size BIGINT NOT NULL,
    mime_type VARCHAR(100),
    uploaded_by UUID REFERENCES system_users(id) ON DELETE SET NULL,
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================================
-- FORM NSB-003-2: INDUSTRY ASSOCIATIONS DIRECTORY
-- ============================================================================

CREATE TABLE IF NOT EXISTS nsb_industry_associations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nsb_id UUID NOT NULL REFERENCES nsb(id) ON DELETE CASCADE,
    -- Basic Information
    association_name VARCHAR(255) NOT NULL,
    acronym VARCHAR(50),
    registration_number VARCHAR(100) NOT NULL, -- Legal Registration Number
    -- Sector/Industry (Multi-select - stored as array)
    primary_sector TEXT[] NOT NULL, -- Based on ISIC codes + ACAP priority sectors
    sub_sectors TEXT[], -- Specific product categories (Tag Input)
    membership_type TEXT[] NOT NULL, -- Array: Manufacturers, Importers, Exporters, etc.
    -- Membership Information
    member_count INT NOT NULL,
    estimated_sme_members INT,
    -- Contact Information
    contact_person_name VARCHAR(255) NOT NULL,
    contact_title VARCHAR(100) NOT NULL,
    contact_email VARCHAR(255) NOT NULL,
    contact_phone VARCHAR(50) NOT NULL,
    website VARCHAR(500),
    -- ACAP Promotion
    willingness_to_promote_acap VARCHAR(50) CHECK (willingness_to_promote_acap IN (
        'EAGER_TO_PROMOTE', 'WILLING_IF_SUPPORTED', 'NEUTRAL', 'RESISTANT', 'ALREADY_PROMOTING'
    )),
    promotion_methods TEXT[], -- Array: Workshops/Seminars, Newsletter Features, etc.
    -- Training and Challenges
    training_needs TEXT[] NOT NULL, -- Array: ACAP Awareness, Certification Process, etc.
    member_challenges TEXT[], -- Array: High Costs, Complex Process, etc.
    -- Additional Information
    annual_events TEXT, -- Key Annual Events
    notes TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_by UUID REFERENCES system_users(id) ON DELETE SET NULL
);

-- Industry Association Documents
CREATE TABLE IF NOT EXISTS nsb_industry_association_documents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    association_id UUID NOT NULL REFERENCES nsb_industry_associations(id) ON DELETE CASCADE,
    document_type VARCHAR(50) NOT NULL, -- 'REGISTRATION_CERTIFICATE', 'MEMBERSHIP_DIRECTORY', 'COLLABORATION_AGREEMENT', 'OTHER'
    file_name VARCHAR(255) NOT NULL,
    file_path VARCHAR(500) NOT NULL,
    file_hash VARCHAR(64) NOT NULL,
    file_size BIGINT NOT NULL,
    mime_type VARCHAR(100),
    uploaded_by UUID REFERENCES system_users(id) ON DELETE SET NULL,
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================================
-- FORM NSB-003-3: TESTING LABORATORIES & INSPECTION BODIES
-- ============================================================================

CREATE TABLE IF NOT EXISTS nsb_testing_laboratories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nsb_id UUID NOT NULL REFERENCES nsb(id) ON DELETE CASCADE,
    -- Basic Information
    name VARCHAR(255) NOT NULL,
    organization_type laboratory_type NOT NULL,
    legal_status laboratory_legal_status_type NOT NULL,
    -- Accreditation Information (Main status)
    accreditation_status accreditation_status_type NOT NULL,
    -- Contact Information
    acap_contact_name VARCHAR(255) NOT NULL, -- ACAP Referral Contact Person
    contact_email VARCHAR(255) NOT NULL,
    contact_phone VARCHAR(50) NOT NULL,
    emergency_contact VARCHAR(255), -- After-hours Contact
    -- Testing Capabilities
    testing_categories TEXT[] NOT NULL, -- Array: Chemical Analysis, Microbiological, etc.
    specific_test_methods TEXT[], -- Tag Input - ISO/IEC test method standards
    products_covered TEXT[] NOT NULL, -- Tag Input - HS codes or product categories
    -- Reporting Capabilities
    report_languages TEXT[], -- Array: English, French, Portuguese, etc.
    digital_capability digital_capability_type NOT NULL,
    typical_turnaround_time VARCHAR(20) CHECK (typical_turnaround_time IN (
        'LESS_THAN_24_HOURS', '2_3_DAYS', '1_WEEK', '2_WEEKS', 'MORE_THAN_2_WEEKS'
    )),
    fee_structure_type VARCHAR(50) CHECK (fee_structure_type IN (
        'FIXED_RATES', 'NEGOTIATED_CONTRACTS', 'GOVERNMENT_SUBSIDIZED', 'COMMERCIAL_RATES'
    )),
    -- Directory Listing
    willing_acap_listing VARCHAR(20) CHECK (willing_acap_listing IN ('YES', 'NO', 'CONDITIONAL')) NOT NULL,
    listing_conditions TEXT, -- If conditional listing
    -- Additional Information
    notes TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_by UUID REFERENCES system_users(id) ON DELETE SET NULL
);

-- Laboratory Accreditations Array (Multiple accreditations per lab)
CREATE TABLE IF NOT EXISTS nsb_laboratory_accreditations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    laboratory_id UUID NOT NULL REFERENCES nsb_testing_laboratories(id) ON DELETE CASCADE,
    accreditation_body VARCHAR(255) NOT NULL,
    certificate_number VARCHAR(100) NOT NULL,
    scope_of_accreditation TEXT NOT NULL,
    accreditation_expiry_date DATE NOT NULL,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Laboratory Documents
CREATE TABLE IF NOT EXISTS nsb_laboratory_documents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    laboratory_id UUID NOT NULL REFERENCES nsb_testing_laboratories(id) ON DELETE CASCADE,
    document_type VARCHAR(50) NOT NULL, -- 'ACCREDITATION_CERTIFICATE', 'SCOPE_DOCUMENT', 'CAPABILITY_STATEMENT', 'PRICE_LIST', 'OTHER'
    file_name VARCHAR(255) NOT NULL,
    file_path VARCHAR(500) NOT NULL,
    file_hash VARCHAR(64) NOT NULL,
    file_size BIGINT NOT NULL,
    mime_type VARCHAR(100),
    uploaded_by UUID REFERENCES system_users(id) ON DELETE SET NULL,
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================================
-- FORM NSB-003-4: OTHER STAKEHOLDER GROUPS
-- ============================================================================

CREATE TABLE IF NOT EXISTS nsb_other_stakeholder_groups (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nsb_id UUID NOT NULL REFERENCES nsb(id) ON DELETE CASCADE,
    -- Category Information
    stakeholder_category stakeholder_category_type NOT NULL,
    category_other VARCHAR(255), -- If "OTHER" selected
    -- Common Fields for All Categories
    primary_contact_name VARCHAR(255) NOT NULL,
    contact_email VARCHAR(255) NOT NULL,
    contact_phone VARCHAR(50) NOT NULL,
    engagement_level engagement_level_type NOT NULL,
    nsb_priority_level nsb_priority_level_type NOT NULL,
    -- Category-Specific Fields (Stored as JSONB for flexibility)
    category_specific_data JSONB, -- Stores different fields based on category
    -- Additional Information
    notes TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_by UUID REFERENCES system_users(id) ON DELETE SET NULL
);

-- Other Stakeholder Group Documents
CREATE TABLE IF NOT EXISTS nsb_other_stakeholder_documents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    stakeholder_group_id UUID NOT NULL REFERENCES nsb_other_stakeholder_groups(id) ON DELETE CASCADE,
    document_type VARCHAR(50) NOT NULL, -- Varies by category
    file_name VARCHAR(255) NOT NULL,
    file_path VARCHAR(500) NOT NULL,
    file_hash VARCHAR(64) NOT NULL,
    file_size BIGINT NOT NULL,
    mime_type VARCHAR(100),
    uploaded_by UUID REFERENCES system_users(id) ON DELETE SET NULL,
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================================
-- FORM CB-FAC-001: CB APPLICATION REVIEW DASHBOARD
-- ============================================================================

-- Note: This assumes CB applications are stored in a separate table (cb_applications)
-- If not existing, create a reference table or link to license_applications

-- CB Application Reviews (NSB Assessment)
CREATE TABLE IF NOT EXISTS nsb_cb_application_reviews (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    cb_application_id UUID NOT NULL, -- References cb_applications or license_applications
    nsb_id UUID NOT NULL REFERENCES nsb(id) ON DELETE CASCADE,
    review_status cb_review_status_type DEFAULT 'NEW',
    -- National Verification Results
    cb_registration_number VARCHAR(100),
    legal_status_verification_result VARCHAR(50), -- From National Business Registry API
    legal_status_verification_date TIMESTAMP,
    tax_compliance_status VARCHAR(50) CHECK (tax_compliance_status IN (
        'COMPLIANT', 'NON_COMPLIANT', 'UNKNOWN', 'NOT_APPLICABLE'
    )),
    national_accreditation_number VARCHAR(100),
    accreditation_verification_result VARCHAR(50), -- From National AB API
    accreditation_scope_match VARCHAR(50) CHECK (accreditation_scope_match IN (
        'FULL_MATCH', 'PARTIAL_MATCH', 'NO_MATCH', 'REQUIRES_ASSESSMENT'
    )),
    previous_nsb_engagements TEXT,
    reputation_check VARCHAR(50) CHECK (reputation_check IN (
        'NO_ISSUES', 'MINOR_ISSUES', 'MAJOR_ISSUES', 'UNKNOWN'
    )),
    -- NSB Assessment
    sector_need_assessment sector_need_assessment_type,
    gap_filled_description TEXT,
    regional_balance_impact VARCHAR(50) CHECK (regional_balance_impact IN (
        'IMPROVES_BALANCE', 'NEUTRAL', 'WORSENS_CONCENTRATION'
    )),
    cb_capacity_assessment VARCHAR(50) CHECK (cb_capacity_assessment IN (
        'HIGH_CAPACITY', 'MODERATE_CAPACITY', 'LIMITED_CAPACITY', 'UNKNOWN'
    )),
    recommended_limits TEXT, -- e.g., Sector restrictions, volume limits
    existing_relationship VARCHAR(50) CHECK (existing_relationship IN (
        'CLOSE_PARTNER', 'REGULAR_CONTACT', 'OCCASIONAL_CONTACT', 'NEW_ENTITY', 'PREVIOUS_ISSUES'
    )),
    conflict_of_interest_check VARCHAR(50) CHECK (conflict_of_interest_check IN (
        'NO_CONFLICT_IDENTIFIED', 'POTENTIAL_CONFLICT', 'CLEAR_CONFLICT'
    )),
    conflict_details TEXT,
    -- Recommendation & Decision
    nsb_recommendation nsb_recommendation_type,
    approval_conditions TEXT[], -- Array of conditions
    information_requested TEXT[], -- Array of specific requests
    rejection_reason VARCHAR(100), -- Predefined option
    rejection_reason_other TEXT, -- If "Other" selected
    nsb_comments TEXT, -- Internal notes for ARSO
    nsb_reviewer_id UUID NOT NULL REFERENCES system_users(id) ON DELETE SET NULL,
    review_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    -- Status Tracking
    days_in_queue INT, -- Calculated field
    priority_flag VARCHAR(20), -- Automated based on sector gaps, regional balance, etc.
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- CB Application Review Documents
CREATE TABLE IF NOT EXISTS nsb_cb_review_documents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    review_id UUID NOT NULL REFERENCES nsb_cb_application_reviews(id) ON DELETE CASCADE,
    document_type VARCHAR(50) NOT NULL, -- 'VERIFICATION_REPORT', 'CORRESPONDENCE', 'INTERNAL_MEMO', 'OTHER'
    file_name VARCHAR(255) NOT NULL,
    file_path VARCHAR(500) NOT NULL,
    file_hash VARCHAR(64) NOT NULL,
    file_size BIGINT NOT NULL,
    mime_type VARCHAR(100),
    uploaded_by UUID REFERENCES system_users(id) ON DELETE SET NULL,
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================================
-- INDEXES FOR PERFORMANCE
-- ============================================================================

-- MSA Indexes
CREATE INDEX IF NOT EXISTS idx_nsb_msa_nsb_id ON nsb_market_surveillance_authorities(nsb_id);
CREATE INDEX IF NOT EXISTS idx_nsb_msa_active ON nsb_market_surveillance_authorities(is_active);
CREATE INDEX IF NOT EXISTS idx_nsb_msa_focal_point ON nsb_market_surveillance_authorities(is_national_focal_point) WHERE is_national_focal_point = true;
CREATE INDEX IF NOT EXISTS idx_nsb_msa_documents_msa ON nsb_msa_documents(msa_id);

-- Customs Indexes
CREATE INDEX IF NOT EXISTS idx_nsb_customs_nsb_id ON nsb_customs_border_agencies(nsb_id);
CREATE INDEX IF NOT EXISTS idx_nsb_customs_active ON nsb_customs_border_agencies(is_active);
CREATE INDEX IF NOT EXISTS idx_nsb_border_posts_customs ON nsb_border_posts(customs_agency_id);
CREATE INDEX IF NOT EXISTS idx_nsb_border_posts_active ON nsb_border_posts(is_active);
CREATE INDEX IF NOT EXISTS idx_nsb_customs_documents_customs ON nsb_customs_documents(customs_agency_id);

-- Regulatory Agency Indexes
CREATE INDEX IF NOT EXISTS idx_nsb_regulatory_nsb_id ON nsb_regulatory_agencies(nsb_id);
CREATE INDEX IF NOT EXISTS idx_nsb_regulatory_type ON nsb_regulatory_agencies(agency_type);
CREATE INDEX IF NOT EXISTS idx_nsb_regulatory_active ON nsb_regulatory_agencies(is_active);
CREATE INDEX IF NOT EXISTS idx_nsb_regulatory_documents_reg ON nsb_regulatory_agency_documents(regulatory_agency_id);

-- Industry Association Indexes
CREATE INDEX IF NOT EXISTS idx_nsb_industry_nsb_id ON nsb_industry_associations(nsb_id);
CREATE INDEX IF NOT EXISTS idx_nsb_industry_active ON nsb_industry_associations(is_active);
CREATE INDEX IF NOT EXISTS idx_nsb_industry_reg_number ON nsb_industry_associations(registration_number);
CREATE INDEX IF NOT EXISTS idx_nsb_industry_documents_assoc ON nsb_industry_association_documents(association_id);

-- Laboratory Indexes
CREATE INDEX IF NOT EXISTS idx_nsb_labs_nsb_id ON nsb_testing_laboratories(nsb_id);
CREATE INDEX IF NOT EXISTS idx_nsb_labs_active ON nsb_testing_laboratories(is_active);
CREATE INDEX IF NOT EXISTS idx_nsb_labs_type ON nsb_testing_laboratories(organization_type);
CREATE INDEX IF NOT EXISTS idx_nsb_lab_accreditations_lab ON nsb_laboratory_accreditations(laboratory_id);
CREATE INDEX IF NOT EXISTS idx_nsb_lab_accreditations_active ON nsb_laboratory_accreditations(is_active);
CREATE INDEX IF NOT EXISTS idx_nsb_lab_documents_lab ON nsb_laboratory_documents(laboratory_id);

-- Other Stakeholder Group Indexes
CREATE INDEX IF NOT EXISTS idx_nsb_other_stakeholder_nsb_id ON nsb_other_stakeholder_groups(nsb_id);
CREATE INDEX IF NOT EXISTS idx_nsb_other_stakeholder_category ON nsb_other_stakeholder_groups(stakeholder_category);
CREATE INDEX IF NOT EXISTS idx_nsb_other_stakeholder_active ON nsb_other_stakeholder_groups(is_active);
CREATE INDEX IF NOT EXISTS idx_nsb_other_stakeholder_priority ON nsb_other_stakeholder_groups(nsb_priority_level);
CREATE INDEX IF NOT EXISTS idx_nsb_other_stakeholder_documents ON nsb_other_stakeholder_documents(stakeholder_group_id);

-- CB Review Indexes
CREATE INDEX IF NOT EXISTS idx_nsb_cb_review_cb_app ON nsb_cb_application_reviews(cb_application_id);
CREATE INDEX IF NOT EXISTS idx_nsb_cb_review_nsb_id ON nsb_cb_application_reviews(nsb_id);
CREATE INDEX IF NOT EXISTS idx_nsb_cb_review_status ON nsb_cb_application_reviews(review_status);
CREATE INDEX IF NOT EXISTS idx_nsb_cb_review_recommendation ON nsb_cb_application_reviews(nsb_recommendation);
CREATE INDEX IF NOT EXISTS idx_nsb_cb_review_reviewer ON nsb_cb_application_reviews(nsb_reviewer_id);
CREATE INDEX IF NOT EXISTS idx_nsb_cb_review_documents_review ON nsb_cb_review_documents(review_id);

-- ============================================================================
-- UPDATED_AT TRIGGERS
-- ============================================================================

-- Generic function for updating timestamp
CREATE OR REPLACE FUNCTION update_stakeholder_timestamp()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply triggers to all stakeholder tables
CREATE TRIGGER trg_update_msa_updated_at
    BEFORE UPDATE ON nsb_market_surveillance_authorities
    FOR EACH ROW EXECUTE FUNCTION update_stakeholder_timestamp();

CREATE TRIGGER trg_update_customs_updated_at
    BEFORE UPDATE ON nsb_customs_border_agencies
    FOR EACH ROW EXECUTE FUNCTION update_stakeholder_timestamp();

CREATE TRIGGER trg_update_border_post_updated_at
    BEFORE UPDATE ON nsb_border_posts
    FOR EACH ROW EXECUTE FUNCTION update_stakeholder_timestamp();

CREATE TRIGGER trg_update_regulatory_updated_at
    BEFORE UPDATE ON nsb_regulatory_agencies
    FOR EACH ROW EXECUTE FUNCTION update_stakeholder_timestamp();

CREATE TRIGGER trg_update_industry_updated_at
    BEFORE UPDATE ON nsb_industry_associations
    FOR EACH ROW EXECUTE FUNCTION update_stakeholder_timestamp();

CREATE TRIGGER trg_update_lab_updated_at
    BEFORE UPDATE ON nsb_testing_laboratories
    FOR EACH ROW EXECUTE FUNCTION update_stakeholder_timestamp();

CREATE TRIGGER trg_update_lab_accreditation_updated_at
    BEFORE UPDATE ON nsb_laboratory_accreditations
    FOR EACH ROW EXECUTE FUNCTION update_stakeholder_timestamp();

CREATE TRIGGER trg_update_other_stakeholder_updated_at
    BEFORE UPDATE ON nsb_other_stakeholder_groups
    FOR EACH ROW EXECUTE FUNCTION update_stakeholder_timestamp();

CREATE TRIGGER trg_update_cb_review_updated_at
    BEFORE UPDATE ON nsb_cb_application_reviews
    FOR EACH ROW EXECUTE FUNCTION update_stakeholder_timestamp();

COMMIT;
