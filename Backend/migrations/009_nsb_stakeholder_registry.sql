-- Migration: NSB Stakeholder Registry (Phase 2.1)
-- Form: NSB-003: National Stakeholder Registration
BEGIN;

-- Market Surveillance Authorities (MSAs)
CREATE TABLE IF NOT EXISTS nsb_market_surveillance_authorities (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nsb_id UUID NOT NULL REFERENCES nsb(id) ON DELETE CASCADE,
    agency_name VARCHAR(255) NOT NULL,
    jurisdiction VARCHAR(50) NOT NULL CHECK (jurisdiction IN ('NATIONAL', 'REGIONAL')),
    contact_person_name VARCHAR(255) NOT NULL,
    contact_person_email VARCHAR(255),
    contact_person_phone VARCHAR(50),
    scope_of_authority TEXT,
    mou_status VARCHAR(50) CHECK (mou_status IN ('SIGNED', 'PENDING', 'NOT_SIGNED', 'N/A')),
    mou_document_path VARCHAR(500),
    mou_document_hash VARCHAR(64),
    system_access_level_requested VARCHAR(50) CHECK (system_access_level_requested IN ('READ_ONLY', 'FULL')),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Customs/Border Agencies
CREATE TABLE IF NOT EXISTS nsb_customs_border_agencies (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nsb_id UUID NOT NULL REFERENCES nsb(id) ON DELETE CASCADE,
    agency_name VARCHAR(255) NOT NULL,
    key_border_posts TEXT[] DEFAULT ARRAY[]::TEXT[],
    acap_verification_contact_name VARCHAR(255),
    acap_verification_contact_email VARCHAR(255),
    acap_verification_contact_phone VARCHAR(50),
    integration_with_national_single_window BOOLEAN DEFAULT false,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Regulatory Agencies (generic table to handle all types)
CREATE TABLE IF NOT EXISTS nsb_regulatory_agencies (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nsb_id UUID NOT NULL REFERENCES nsb(id) ON DELETE CASCADE,
    agency_name VARCHAR(255) NOT NULL,
    agency_type VARCHAR(100) NOT NULL, -- FOOD_DRUG_AUTHORITY, AGRICULTURE_MINISTRY, HEALTH_MINISTRY, ENVIRONMENT_AGENCY, INDUSTRY_TRADE_MINISTRY, OTHER
    other_type_description VARCHAR(255), -- For 'OTHER' type
    contact_person_name VARCHAR(255),
    contact_person_email VARCHAR(255),
    contact_person_phone VARCHAR(50),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Industry Associations Directory
CREATE TABLE IF NOT EXISTS nsb_industry_associations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nsb_id UUID NOT NULL REFERENCES nsb(id) ON DELETE CASCADE,
    association_name VARCHAR(255) NOT NULL,
    sector_industry VARCHAR(255),
    number_of_members INT,
    contact_person_name VARCHAR(255),
    contact_person_email VARCHAR(255),
    contact_person_phone VARCHAR(50),
    willingness_to_promote_acap BOOLEAN DEFAULT false,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Testing Laboratories & Inspection Bodies
CREATE TABLE IF NOT EXISTS nsb_testing_laboratories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nsb_id UUID NOT NULL REFERENCES nsb(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    accreditation_status VARCHAR(50) CHECK (accreditation_status IN ('AFRAC_MRA', 'OTHER', 'NONE')),
    other_accreditation_description VARCHAR(255),
    scope_of_accreditation TEXT,
    contact_for_acap_referrals_name VARCHAR(255),
    contact_for_acap_referrals_email VARCHAR(255),
    contact_for_acap_referrals_phone VARCHAR(50),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_nsb_msa_nsb_id ON nsb_market_surveillance_authorities(nsb_id);
CREATE INDEX IF NOT EXISTS idx_nsb_msa_active ON nsb_market_surveillance_authorities(is_active);

CREATE INDEX IF NOT EXISTS idx_nsb_customs_nsb_id ON nsb_customs_border_agencies(nsb_id);
CREATE INDEX IF NOT EXISTS idx_nsb_customs_active ON nsb_customs_border_agencies(is_active);

CREATE INDEX IF NOT EXISTS idx_nsb_regulatory_nsb_id ON nsb_regulatory_agencies(nsb_id);
CREATE INDEX IF NOT EXISTS idx_nsb_regulatory_type ON nsb_regulatory_agencies(agency_type);
CREATE INDEX IF NOT EXISTS idx_nsb_regulatory_active ON nsb_regulatory_agencies(is_active);

CREATE INDEX IF NOT EXISTS idx_nsb_industry_nsb_id ON nsb_industry_associations(nsb_id);
CREATE INDEX IF NOT EXISTS idx_nsb_industry_active ON nsb_industry_associations(is_active);

CREATE INDEX IF NOT EXISTS idx_nsb_labs_nsb_id ON nsb_testing_laboratories(nsb_id);
CREATE INDEX IF NOT EXISTS idx_nsb_labs_active ON nsb_testing_laboratories(is_active);

-- Updated at triggers
CREATE OR REPLACE FUNCTION update_nsb_stakeholder_registry_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_update_nsb_msa_updated_at
    BEFORE UPDATE ON nsb_market_surveillance_authorities
    FOR EACH ROW
    EXECUTE FUNCTION update_nsb_stakeholder_registry_updated_at();

CREATE TRIGGER trg_update_nsb_customs_updated_at
    BEFORE UPDATE ON nsb_customs_border_agencies
    FOR EACH ROW
    EXECUTE FUNCTION update_nsb_stakeholder_registry_updated_at();

CREATE TRIGGER trg_update_nsb_regulatory_updated_at
    BEFORE UPDATE ON nsb_regulatory_agencies
    FOR EACH ROW
    EXECUTE FUNCTION update_nsb_stakeholder_registry_updated_at();

CREATE TRIGGER trg_update_nsb_industry_updated_at
    BEFORE UPDATE ON nsb_industry_associations
    FOR EACH ROW
    EXECUTE FUNCTION update_nsb_stakeholder_registry_updated_at();

CREATE TRIGGER trg_update_nsb_labs_updated_at
    BEFORE UPDATE ON nsb_testing_laboratories
    FOR EACH ROW
    EXECUTE FUNCTION update_nsb_stakeholder_registry_updated_at();

COMMIT;

