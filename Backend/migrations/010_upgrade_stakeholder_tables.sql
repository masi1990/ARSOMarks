-- Migration: Upgrade existing stakeholder tables to complete specification
-- This migration adds missing columns to existing tables from migration 009
-- and creates new tables that don't exist yet

BEGIN;

-- ============================================================================
-- UPGRADE EXISTING TABLES - Add missing columns
-- ============================================================================

-- Upgrade nsb_market_surveillance_authorities
ALTER TABLE nsb_market_surveillance_authorities
    ADD COLUMN IF NOT EXISTS agency_name_english VARCHAR(255),
    ADD COLUMN IF NOT EXISTS acronym VARCHAR(50),
    ADD COLUMN IF NOT EXISTS jurisdiction_other VARCHAR(255),
    ADD COLUMN IF NOT EXISTS parent_ministry VARCHAR(255),
    ADD COLUMN IF NOT EXISTS contact_person_title VARCHAR(100),
    ADD COLUMN IF NOT EXISTS contact_alt VARCHAR(255),
    ADD COLUMN IF NOT EXISTS scope_other TEXT,
    ADD COLUMN IF NOT EXISTS products_covered TEXT[] DEFAULT ARRAY[]::TEXT[],
    ADD COLUMN IF NOT EXISTS mou_start_date DATE,
    ADD COLUMN IF NOT EXISTS mou_end_date DATE,
    ADD COLUMN IF NOT EXISTS custom_access_requirements TEXT,
    ADD COLUMN IF NOT EXISTS training_status VARCHAR(50),
    ADD COLUMN IF NOT EXISTS last_training_date DATE,
    ADD COLUMN IF NOT EXISTS is_national_focal_point BOOLEAN DEFAULT false,
    ADD COLUMN IF NOT EXISTS notes TEXT,
    ADD COLUMN IF NOT EXISTS created_by UUID REFERENCES system_users(id) ON DELETE SET NULL;

-- Update existing columns if needed (change jurisdiction type if it's VARCHAR)
DO $$
BEGIN
    -- If jurisdiction is VARCHAR, we need to handle it carefully
    IF EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'nsb_market_surveillance_authorities' 
        AND column_name = 'jurisdiction' 
        AND data_type = 'character varying'
    ) THEN
        -- Convert existing data to enum-compatible format
        ALTER TABLE nsb_market_surveillance_authorities
        ALTER COLUMN jurisdiction TYPE VARCHAR(50);
        -- Add check constraint if not exists
        IF NOT EXISTS (
            SELECT 1 FROM pg_constraint 
            WHERE conname = 'nsb_market_surveillance_authorities_jurisdiction_check'
        ) THEN
            ALTER TABLE nsb_market_surveillance_authorities
            ADD CONSTRAINT nsb_market_surveillance_authorities_jurisdiction_check
            CHECK (jurisdiction IN ('NATIONAL', 'REGIONAL', 'PROVINCIAL', 'COUNTY', 'MUNICIPAL', 'SPECIAL_ECONOMIC_ZONE', 'OTHER'));
        END IF;
    END IF;
END$$;

-- Update scope_of_authority to array if it's TEXT
DO $$
BEGIN
    IF EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'nsb_market_surveillance_authorities' 
        AND column_name = 'scope_of_authority' 
        AND data_type = 'text'
        AND udt_name = 'text'
    ) THEN
        -- Convert to array type
        ALTER TABLE nsb_market_surveillance_authorities
        ALTER COLUMN scope_of_authority TYPE TEXT[] USING 
            CASE 
                WHEN scope_of_authority IS NULL OR scope_of_authority = '' THEN ARRAY[]::TEXT[]
                ELSE ARRAY[scope_of_authority]
            END;
    END IF;
END$$;

-- Update mou_status to match new enum values
DO $$
BEGIN
    IF EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'nsb_market_surveillance_authorities' 
        AND column_name = 'mou_status' 
        AND data_type = 'character varying'
    ) THEN
        -- Update existing constraint to include new values
        ALTER TABLE nsb_market_surveillance_authorities
        DROP CONSTRAINT IF EXISTS nsb_market_surveillance_authorities_mou_status_check;
        
        ALTER TABLE nsb_market_surveillance_authorities
        ADD CONSTRAINT nsb_market_surveillance_authorities_mou_status_check
        CHECK (mou_status IN (
            'NOT_REQUIRED', 'PLANNED', 'DRAFT_UNDER_REVIEW', 'SIGNED_ACTIVE',
            'EXPIRED', 'TERMINATED', 'NOT_APPLICABLE', 'SIGNED', 'PENDING', 'NOT_SIGNED', 'N/A'
        ));
    END IF;
END$$;

-- Update system_access_level_requested to access_level if needed
DO $$
BEGIN
    IF EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'nsb_market_surveillance_authorities' 
        AND column_name = 'system_access_level_requested'
    ) AND NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'nsb_market_surveillance_authorities' 
        AND column_name = 'access_level'
    ) THEN
        -- Rename column
        ALTER TABLE nsb_market_surveillance_authorities
        RENAME COLUMN system_access_level_requested TO access_level;
    END IF;
EXCEPTION
    WHEN others THEN
        -- Ignore errors during column rename
        RAISE NOTICE 'Error renaming access_level column: %', SQLERRM;
END$$;

-- Upgrade nsb_customs_border_agencies
ALTER TABLE nsb_customs_border_agencies
    ADD COLUMN IF NOT EXISTS parent_ministry VARCHAR(255),
    ADD COLUMN IF NOT EXISTS primary_contact_name VARCHAR(255),
    ADD COLUMN IF NOT EXISTS coordinator_email VARCHAR(255),
    ADD COLUMN IF NOT EXISTS coordinator_phone VARCHAR(50),
    ADD COLUMN IF NOT EXISTS integration_status VARCHAR(50),
    ADD COLUMN IF NOT EXISTS integration_details TEXT,
    ADD COLUMN IF NOT EXISTS api_available VARCHAR(20),
    ADD COLUMN IF NOT EXISTS created_by UUID REFERENCES system_users(id) ON DELETE SET NULL;

-- Update column names if they exist with old names
DO $$
BEGIN
    IF EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'nsb_customs_border_agencies' 
        AND column_name = 'acap_verification_contact_name'
    ) AND NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'nsb_customs_border_agencies' 
        AND column_name = 'primary_contact_name'
    ) THEN
        ALTER TABLE nsb_customs_border_agencies
        RENAME COLUMN acap_verification_contact_name TO primary_contact_name;
    END IF;
    
    IF EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'nsb_customs_border_agencies' 
        AND column_name = 'acap_verification_contact_email'
    ) AND NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'nsb_customs_border_agencies' 
        AND column_name = 'coordinator_email'
    ) THEN
        ALTER TABLE nsb_customs_border_agencies
        RENAME COLUMN acap_verification_contact_email TO coordinator_email;
    END IF;
    
    IF EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'nsb_customs_border_agencies' 
        AND column_name = 'acap_verification_contact_phone'
    ) AND NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'nsb_customs_border_agencies' 
        AND column_name = 'coordinator_phone'
    ) THEN
        ALTER TABLE nsb_customs_border_agencies
        RENAME COLUMN acap_verification_contact_phone TO coordinator_phone;
    END IF;
    
    IF EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'nsb_customs_border_agencies' 
        AND column_name = 'integration_with_national_single_window'
    ) THEN
        ALTER TABLE nsb_customs_border_agencies
        DROP COLUMN integration_with_national_single_window;
    END IF;
EXCEPTION
    WHEN others THEN
        -- Ignore errors during column rename/drop
        RAISE NOTICE 'Error updating customs columns: %', SQLERRM;
END$$;

-- Set NOT NULL constraints where needed (after data migration)
-- NOTE: We skip NOT NULL constraints here since existing data might have NULLs
-- These can be added later after data is migrated/filled
-- DO $$
-- BEGIN
--     -- Only add NOT NULL if column doesn't have existing data that's NULL
--     IF NOT EXISTS (SELECT 1 FROM nsb_customs_border_agencies WHERE parent_ministry IS NULL LIMIT 1) THEN
--         ALTER TABLE nsb_customs_border_agencies ALTER COLUMN parent_ministry SET NOT NULL;
--     END IF;
-- EXCEPTION
--     WHEN others THEN
--         RAISE NOTICE 'Skipping NOT NULL constraint on parent_ministry: %', SQLERRM;
-- END$$;

-- Upgrade nsb_regulatory_agencies
ALTER TABLE nsb_regulatory_agencies
    ADD COLUMN IF NOT EXISTS specific_department VARCHAR(255),
    ADD COLUMN IF NOT EXISTS engagement_level VARCHAR(50),
    ADD COLUMN IF NOT EXISTS relevant_mandate TEXT,
    ADD COLUMN IF NOT EXISTS created_by UUID REFERENCES system_users(id) ON DELETE SET NULL;

-- Update agency_type if it exists as VARCHAR
DO $$
BEGIN
    IF EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'nsb_regulatory_agencies' 
        AND column_name = 'agency_type' 
        AND data_type = 'character varying'
    ) THEN
        -- Ensure it has proper check constraint
        ALTER TABLE nsb_regulatory_agencies
        DROP CONSTRAINT IF EXISTS nsb_regulatory_agencies_agency_type_check;
        
        ALTER TABLE nsb_regulatory_agencies
        ADD CONSTRAINT nsb_regulatory_agencies_agency_type_check
        CHECK (agency_type IN (
            'FOOD_DRUG_AUTHORITY', 'AGRICULTURE_MINISTRY', 'HEALTH_MINISTRY',
            'ENVIRONMENT_AGENCY', 'INDUSTRY_TRADE_MINISTRY', 'OTHER'
        ));
    END IF;
END$$;

-- Upgrade nsb_industry_associations
ALTER TABLE nsb_industry_associations
    ADD COLUMN IF NOT EXISTS acronym VARCHAR(50),
    ADD COLUMN IF NOT EXISTS registration_number VARCHAR(100),
    ADD COLUMN IF NOT EXISTS primary_sector TEXT[] DEFAULT ARRAY[]::TEXT[],
    ADD COLUMN IF NOT EXISTS sub_sectors TEXT[] DEFAULT ARRAY[]::TEXT[],
    ADD COLUMN IF NOT EXISTS membership_type TEXT[] DEFAULT ARRAY[]::TEXT[],
    ADD COLUMN IF NOT EXISTS estimated_sme_members INT,
    ADD COLUMN IF NOT EXISTS contact_title VARCHAR(100),
    ADD COLUMN IF NOT EXISTS website VARCHAR(500),
    ADD COLUMN IF NOT EXISTS willingness_to_promote_acap VARCHAR(50),
    ADD COLUMN IF NOT EXISTS promotion_methods TEXT[] DEFAULT ARRAY[]::TEXT[],
    ADD COLUMN IF NOT EXISTS training_needs TEXT[] DEFAULT ARRAY[]::TEXT[],
    ADD COLUMN IF NOT EXISTS member_challenges TEXT[] DEFAULT ARRAY[]::TEXT[],
    ADD COLUMN IF NOT EXISTS annual_events TEXT,
    ADD COLUMN IF NOT EXISTS notes TEXT,
    ADD COLUMN IF NOT EXISTS created_by UUID REFERENCES system_users(id) ON DELETE SET NULL;

-- Migrate existing data
DO $$
BEGIN
    -- Convert sector_industry to primary_sector array
    IF EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'nsb_industry_associations' 
        AND column_name = 'sector_industry' 
        AND data_type = 'character varying'
    ) THEN
        UPDATE nsb_industry_associations
        SET primary_sector = CASE 
            WHEN sector_industry IS NULL OR sector_industry = '' THEN ARRAY[]::TEXT[]
            ELSE ARRAY[sector_industry]
        END
        WHERE primary_sector = ARRAY[]::TEXT[] OR primary_sector IS NULL;
        
        -- Drop old column after migration
        ALTER TABLE nsb_industry_associations
        DROP COLUMN IF EXISTS sector_industry;
    END IF;
    
    -- Convert number_of_members to member_count
    IF EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'nsb_industry_associations' 
        AND column_name = 'number_of_members'
    ) THEN
        UPDATE nsb_industry_associations
        SET member_count = number_of_members
        WHERE member_count IS NULL AND number_of_members IS NOT NULL;
        
        ALTER TABLE nsb_industry_associations
        DROP COLUMN IF EXISTS number_of_members;
    END IF;
    
    -- Convert willingness_to_promote_acap boolean to VARCHAR
    IF EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'nsb_industry_associations' 
        AND column_name = 'willingness_to_promote_acap' 
        AND data_type = 'boolean'
    ) THEN
        -- Convert boolean to VARCHAR using USING clause
        ALTER TABLE nsb_industry_associations
        ALTER COLUMN willingness_to_promote_acap TYPE VARCHAR(50) USING 
            CASE 
                WHEN willingness_to_promote_acap = true THEN 'ALREADY_PROMOTING'
                ELSE 'NEUTRAL'
            END;
    END IF;
EXCEPTION
    WHEN others THEN
        -- Ignore errors during column type conversion
        RAISE NOTICE 'Error converting willingness_to_promote_acap: %', SQLERRM;
END$$;

-- Set NOT NULL constraints where needed
-- NOTE: We skip NOT NULL constraints here since existing data might have NULLs
-- These can be added later after data is migrated/filled

-- Upgrade nsb_testing_laboratories
ALTER TABLE nsb_testing_laboratories
    ADD COLUMN IF NOT EXISTS organization_type VARCHAR(50),
    ADD COLUMN IF NOT EXISTS legal_status VARCHAR(50),
    ADD COLUMN IF NOT EXISTS acap_contact_name VARCHAR(255),
    ADD COLUMN IF NOT EXISTS contact_email VARCHAR(255),
    ADD COLUMN IF NOT EXISTS contact_phone VARCHAR(50),
    ADD COLUMN IF NOT EXISTS emergency_contact VARCHAR(255),
    ADD COLUMN IF NOT EXISTS testing_categories TEXT[] DEFAULT ARRAY[]::TEXT[],
    ADD COLUMN IF NOT EXISTS specific_test_methods TEXT[] DEFAULT ARRAY[]::TEXT[],
    ADD COLUMN IF NOT EXISTS products_covered TEXT[] DEFAULT ARRAY[]::TEXT[],
    ADD COLUMN IF NOT EXISTS report_languages TEXT[] DEFAULT ARRAY[]::TEXT[],
    ADD COLUMN IF NOT EXISTS digital_capability VARCHAR(50),
    ADD COLUMN IF NOT EXISTS typical_turnaround_time VARCHAR(20),
    ADD COLUMN IF NOT EXISTS fee_structure_type VARCHAR(50),
    ADD COLUMN IF NOT EXISTS willing_acap_listing VARCHAR(20) DEFAULT 'NO',
    ADD COLUMN IF NOT EXISTS listing_conditions TEXT,
    ADD COLUMN IF NOT EXISTS notes TEXT,
    ADD COLUMN IF NOT EXISTS created_by UUID REFERENCES system_users(id) ON DELETE SET NULL;

-- Migrate existing data
DO $$
BEGIN
    -- Convert contact_for_acap_referrals_name to acap_contact_name
    IF EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'nsb_testing_laboratories' 
        AND column_name = 'contact_for_acap_referrals_name'
    ) THEN
        UPDATE nsb_testing_laboratories
        SET acap_contact_name = contact_for_acap_referrals_name
        WHERE acap_contact_name IS NULL;
        
        ALTER TABLE nsb_testing_laboratories
        DROP COLUMN IF EXISTS contact_for_acap_referrals_name;
    END IF;
    
    IF EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'nsb_testing_laboratories' 
        AND column_name = 'contact_for_acap_referrals_email'
    ) THEN
        UPDATE nsb_testing_laboratories
        SET contact_email = contact_for_acap_referrals_email
        WHERE contact_email IS NULL;
        
        ALTER TABLE nsb_testing_laboratories
        DROP COLUMN IF EXISTS contact_for_acap_referrals_email;
    END IF;
    
    IF EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'nsb_testing_laboratories' 
        AND column_name = 'contact_for_acap_referrals_phone'
    ) THEN
        UPDATE nsb_testing_laboratories
        SET contact_phone = contact_for_acap_referrals_phone
        WHERE contact_phone IS NULL;
        
        ALTER TABLE nsb_testing_laboratories
        DROP COLUMN IF EXISTS contact_for_acap_referrals_phone;
    END IF;
    
    -- Convert scope_of_accreditation to array if needed
    IF EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'nsb_testing_laboratories' 
        AND column_name = 'scope_of_accreditation' 
        AND data_type = 'text'
    ) THEN
        -- Keep scope_of_accreditation as TEXT, it's used in accreditations table
        -- Don't drop it
    END IF;
    
    -- Migrate accreditation_status
    IF EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'nsb_testing_laboratories' 
        AND column_name = 'accreditation_status' 
        AND data_type = 'character varying'
    ) THEN
        ALTER TABLE nsb_testing_laboratories
        DROP CONSTRAINT IF EXISTS nsb_testing_laboratories_accreditation_status_check;
        
        ALTER TABLE nsb_testing_laboratories
        ADD CONSTRAINT nsb_testing_laboratories_accreditation_status_check
        CHECK (accreditation_status IN (
            'AFRAC_MRA_SIGNATORY', 'ILAC_MRA_SIGNATORY', 'REGIONAL_MRA',
            'NATIONAL_ACCREDITATION_ONLY', 'NOT_ACCREDITED', 'APPLICATION_IN_PROGRESS',
            'AFRAC_MRA', 'OTHER', 'NONE'
        ));
    END IF;
END$$;

-- Set NOT NULL constraints where needed
-- NOTE: We skip NOT NULL constraints here since existing data might have NULLs
-- These can be added later after data is migrated/filled

-- ============================================================================
-- CREATE NEW TABLES THAT DON'T EXIST YET
-- ============================================================================

-- MSA Documents
CREATE TABLE IF NOT EXISTS nsb_msa_documents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    msa_id UUID NOT NULL REFERENCES nsb_market_surveillance_authorities(id) ON DELETE CASCADE,
    document_type VARCHAR(50) NOT NULL,
    file_name VARCHAR(255) NOT NULL,
    file_path VARCHAR(500) NOT NULL,
    file_hash VARCHAR(64) NOT NULL,
    file_size BIGINT NOT NULL,
    mime_type VARCHAR(100),
    uploaded_by UUID REFERENCES system_users(id) ON DELETE SET NULL,
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
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

-- Border Posts
CREATE TABLE IF NOT EXISTS nsb_border_posts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    customs_agency_id UUID NOT NULL REFERENCES nsb_customs_border_agencies(id) ON DELETE CASCADE,
    border_post_name VARCHAR(255) NOT NULL,
    post_type VARCHAR(50) NOT NULL,
    location VARCHAR(255) NOT NULL,
    gps_coordinates VARCHAR(100),
    contact_name VARCHAR(255) NOT NULL,
    contact_phone VARCHAR(50) NOT NULL,
    contact_email VARCHAR(255),
    operating_hours VARCHAR(255) NOT NULL,
    verification_equipment TEXT[] DEFAULT ARRAY[]::TEXT[],
    training_needs TEXT[] DEFAULT ARRAY[]::TEXT[],
    estimated_annual_traffic VARCHAR(20),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Customs Agency Documents
CREATE TABLE IF NOT EXISTS nsb_customs_documents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    customs_agency_id UUID NOT NULL REFERENCES nsb_customs_border_agencies(id) ON DELETE CASCADE,
    document_type VARCHAR(50) NOT NULL,
    file_name VARCHAR(255) NOT NULL,
    file_path VARCHAR(500) NOT NULL,
    file_hash VARCHAR(64) NOT NULL,
    file_size BIGINT NOT NULL,
    mime_type VARCHAR(100),
    uploaded_by UUID REFERENCES system_users(id) ON DELETE SET NULL,
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Regulatory Agency Documents
CREATE TABLE IF NOT EXISTS nsb_regulatory_agency_documents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    regulatory_agency_id UUID NOT NULL REFERENCES nsb_regulatory_agencies(id) ON DELETE CASCADE,
    document_type VARCHAR(50) NOT NULL,
    file_name VARCHAR(255) NOT NULL,
    file_path VARCHAR(500) NOT NULL,
    file_hash VARCHAR(64) NOT NULL,
    file_size BIGINT NOT NULL,
    mime_type VARCHAR(100),
    uploaded_by UUID REFERENCES system_users(id) ON DELETE SET NULL,
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Industry Association Documents
CREATE TABLE IF NOT EXISTS nsb_industry_association_documents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    association_id UUID NOT NULL REFERENCES nsb_industry_associations(id) ON DELETE CASCADE,
    document_type VARCHAR(50) NOT NULL,
    file_name VARCHAR(255) NOT NULL,
    file_path VARCHAR(500) NOT NULL,
    file_hash VARCHAR(64) NOT NULL,
    file_size BIGINT NOT NULL,
    mime_type VARCHAR(100),
    uploaded_by UUID REFERENCES system_users(id) ON DELETE SET NULL,
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Laboratory Accreditations
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
    document_type VARCHAR(50) NOT NULL,
    file_name VARCHAR(255) NOT NULL,
    file_path VARCHAR(500) NOT NULL,
    file_hash VARCHAR(64) NOT NULL,
    file_size BIGINT NOT NULL,
    mime_type VARCHAR(100),
    uploaded_by UUID REFERENCES system_users(id) ON DELETE SET NULL,
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Other Stakeholder Groups (if enum types exist)
CREATE TABLE IF NOT EXISTS nsb_other_stakeholder_groups (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nsb_id UUID NOT NULL REFERENCES nsb(id) ON DELETE CASCADE,
    stakeholder_category VARCHAR(50) NOT NULL,
    category_other VARCHAR(255),
    primary_contact_name VARCHAR(255) NOT NULL,
    contact_email VARCHAR(255) NOT NULL,
    contact_phone VARCHAR(50) NOT NULL,
    engagement_level VARCHAR(50) NOT NULL,
    nsb_priority_level VARCHAR(50) NOT NULL,
    category_specific_data JSONB,
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
    document_type VARCHAR(50) NOT NULL,
    file_name VARCHAR(255) NOT NULL,
    file_path VARCHAR(500) NOT NULL,
    file_hash VARCHAR(64) NOT NULL,
    file_size BIGINT NOT NULL,
    mime_type VARCHAR(100),
    uploaded_by UUID REFERENCES system_users(id) ON DELETE SET NULL,
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- CB Application Reviews
CREATE TABLE IF NOT EXISTS nsb_cb_application_reviews (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    cb_application_id UUID NOT NULL,
    nsb_id UUID NOT NULL REFERENCES nsb(id) ON DELETE CASCADE,
    review_status VARCHAR(50) DEFAULT 'NEW',
    cb_registration_number VARCHAR(100),
    legal_status_verification_result VARCHAR(50),
    legal_status_verification_date TIMESTAMP,
    tax_compliance_status VARCHAR(50),
    national_accreditation_number VARCHAR(100),
    accreditation_verification_result VARCHAR(50),
    accreditation_scope_match VARCHAR(50),
    previous_nsb_engagements TEXT,
    reputation_check VARCHAR(50),
    sector_need_assessment VARCHAR(50),
    gap_filled_description TEXT,
    regional_balance_impact VARCHAR(50),
    cb_capacity_assessment VARCHAR(50),
    recommended_limits TEXT,
    existing_relationship VARCHAR(50),
    conflict_of_interest_check VARCHAR(50),
    conflict_details TEXT,
    nsb_recommendation VARCHAR(50),
    approval_conditions TEXT[] DEFAULT ARRAY[]::TEXT[],
    information_requested TEXT[] DEFAULT ARRAY[]::TEXT[],
    rejection_reason VARCHAR(100),
    rejection_reason_other TEXT,
    nsb_comments TEXT,
    nsb_reviewer_id UUID NOT NULL REFERENCES system_users(id) ON DELETE SET NULL,
    review_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    days_in_queue INT,
    priority_flag VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- CB Application Review Documents
CREATE TABLE IF NOT EXISTS nsb_cb_review_documents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    review_id UUID NOT NULL REFERENCES nsb_cb_application_reviews(id) ON DELETE CASCADE,
    document_type VARCHAR(50) NOT NULL,
    file_name VARCHAR(255) NOT NULL,
    file_path VARCHAR(500) NOT NULL,
    file_hash VARCHAR(64) NOT NULL,
    file_size BIGINT NOT NULL,
    mime_type VARCHAR(100),
    uploaded_by UUID REFERENCES system_users(id) ON DELETE SET NULL,
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================================
-- CREATE MISSING INDEXES
-- ============================================================================

-- MSA Indexes
CREATE INDEX IF NOT EXISTS idx_nsb_msa_focal_point ON nsb_market_surveillance_authorities(is_national_focal_point) WHERE is_national_focal_point = true;
CREATE INDEX IF NOT EXISTS idx_nsb_msa_documents_msa ON nsb_msa_documents(msa_id);

-- Customs Indexes
CREATE INDEX IF NOT EXISTS idx_nsb_border_posts_customs ON nsb_border_posts(customs_agency_id);
CREATE INDEX IF NOT EXISTS idx_nsb_border_posts_active ON nsb_border_posts(is_active);
CREATE INDEX IF NOT EXISTS idx_nsb_customs_documents_customs ON nsb_customs_documents(customs_agency_id);
CREATE INDEX IF NOT EXISTS idx_nsb_customs_api_documents ON nsb_customs_api_documents(customs_agency_id);

-- Regulatory Agency Indexes
CREATE INDEX IF NOT EXISTS idx_nsb_regulatory_documents_reg ON nsb_regulatory_agency_documents(regulatory_agency_id);

-- Industry Association Indexes
CREATE INDEX IF NOT EXISTS idx_nsb_industry_reg_number ON nsb_industry_associations(registration_number);
CREATE INDEX IF NOT EXISTS idx_nsb_industry_documents_assoc ON nsb_industry_association_documents(association_id);

-- Laboratory Indexes
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
-- UPDATE TRIGGERS
-- ============================================================================

-- Ensure updated_at triggers exist for all tables
CREATE OR REPLACE FUNCTION update_stakeholder_timestamp()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Border Posts trigger
DROP TRIGGER IF EXISTS trg_update_border_post_updated_at ON nsb_border_posts;
CREATE TRIGGER trg_update_border_post_updated_at
    BEFORE UPDATE ON nsb_border_posts
    FOR EACH ROW EXECUTE FUNCTION update_stakeholder_timestamp();

-- Lab Accreditations trigger
DROP TRIGGER IF EXISTS trg_update_lab_accreditation_updated_at ON nsb_laboratory_accreditations;
CREATE TRIGGER trg_update_lab_accreditation_updated_at
    BEFORE UPDATE ON nsb_laboratory_accreditations
    FOR EACH ROW EXECUTE FUNCTION update_stakeholder_timestamp();

-- Other Stakeholder Groups trigger
DROP TRIGGER IF EXISTS trg_update_other_stakeholder_updated_at ON nsb_other_stakeholder_groups;
CREATE TRIGGER trg_update_other_stakeholder_updated_at
    BEFORE UPDATE ON nsb_other_stakeholder_groups
    FOR EACH ROW EXECUTE FUNCTION update_stakeholder_timestamp();

-- CB Review trigger
DROP TRIGGER IF EXISTS trg_update_cb_review_updated_at ON nsb_cb_application_reviews;
CREATE TRIGGER trg_update_cb_review_updated_at
    BEFORE UPDATE ON nsb_cb_application_reviews
    FOR EACH ROW EXECUTE FUNCTION update_stakeholder_timestamp();

COMMIT;

