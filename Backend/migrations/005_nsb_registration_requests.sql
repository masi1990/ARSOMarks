-- NSB Registration Requests and Extended NSB Fields
BEGIN;

-- Registration Request Status enum
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'nsb_registration_request_status') THEN
        CREATE TYPE nsb_registration_request_status AS ENUM ('DRAFT', 'SUBMITTED', 'UNDER_REVIEW', 'APPROVED', 'REJECTED');
    END IF;
END$$;

-- NSB Document Type enum
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'nsb_document_type') THEN
        CREATE TYPE nsb_document_type AS ENUM (
            'NSB_ESTABLISHMENT_CHARTER',
            'ARSO_MEMBERSHIP_CERTIFICATE',
            'GOVERNMENT_GAZETTE_NOTICE',
            'DECLARATION_OF_AUTHORITY',
            'NATIONAL_STANDARDS_ACT',
            'NATIONAL_CONFORMITY_ASSESSMENT_POLICY',
            'ORGANIZATIONAL_CHART',
            'OTHER'
        );
    END IF;
END$$;

-- NSB Registration Requests table
CREATE TABLE IF NOT EXISTS nsb_registration_requests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    country_id UUID NOT NULL REFERENCES countries(id) ON DELETE CASCADE,
    country_name VARCHAR(255) NOT NULL,
    nsb_official_name VARCHAR(255) NOT NULL,
    nsb_acronym VARCHAR(50),
    iso_alpha3_code VARCHAR(3) NOT NULL,
    contact_person_name VARCHAR(255) NOT NULL,
    contact_person_title VARCHAR(255),
    contact_email VARCHAR(255) NOT NULL,
    contact_phone VARCHAR(50),
    contact_mobile VARCHAR(50),
    additional_user_slots_requested INT DEFAULT 0,
    requested_roles TEXT[] DEFAULT ARRAY[]::TEXT[],
    status nsb_registration_request_status DEFAULT 'DRAFT',
    remarks TEXT,
    reviewed_by UUID REFERENCES system_users(id) ON DELETE SET NULL,
    reviewed_at TIMESTAMP,
    created_by UUID REFERENCES system_users(id) ON DELETE SET NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    nsb_id UUID REFERENCES nsb(id) ON DELETE SET NULL
);

-- NSB Registration Request Documents table
CREATE TABLE IF NOT EXISTS nsb_registration_request_documents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    registration_request_id UUID NOT NULL REFERENCES nsb_registration_requests(id) ON DELETE CASCADE,
    document_type nsb_document_type NOT NULL,
    file_name VARCHAR(255) NOT NULL,
    file_path VARCHAR(500) NOT NULL,
    file_hash VARCHAR(64) NOT NULL,
    file_size BIGINT NOT NULL,
    mime_type VARCHAR(100),
    uploaded_by UUID REFERENCES system_users(id) ON DELETE SET NULL,
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Updated at trigger for registration requests
CREATE OR REPLACE FUNCTION update_nsb_registration_requests_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_update_nsb_registration_requests_updated_at
    BEFORE UPDATE ON nsb_registration_requests
    FOR EACH ROW
    EXECUTE FUNCTION update_nsb_registration_requests_updated_at();

-- Indexes for registration requests
CREATE INDEX IF NOT EXISTS idx_nsb_registration_requests_country ON nsb_registration_requests(country_id);
CREATE INDEX IF NOT EXISTS idx_nsb_registration_requests_status ON nsb_registration_requests(status);
CREATE INDEX IF NOT EXISTS idx_nsb_registration_requests_created_by ON nsb_registration_requests(created_by);
CREATE INDEX IF NOT EXISTS idx_nsb_registration_requests_nsb_id ON nsb_registration_requests(nsb_id);

-- Indexes for registration request documents
CREATE INDEX IF NOT EXISTS idx_nsb_registration_request_documents_request ON nsb_registration_request_documents(registration_request_id);
CREATE INDEX IF NOT EXISTS idx_nsb_registration_request_documents_type ON nsb_registration_request_documents(document_type);

-- Extend NSB table with Stage 1.2 fields
ALTER TABLE nsb
ADD COLUMN IF NOT EXISTS website_url VARCHAR(500),
ADD COLUMN IF NOT EXISTS social_media_handles JSONB,
ADD COLUMN IF NOT EXISTS total_staff INT,
ADD COLUMN IF NOT EXISTS key_departments TEXT[],
ADD COLUMN IF NOT EXISTS national_quality_policy_link VARCHAR(500),
ADD COLUMN IF NOT EXISTS acap_coordinator_name VARCHAR(255),
ADD COLUMN IF NOT EXISTS acap_coordinator_contact VARCHAR(255),
ADD COLUMN IF NOT EXISTS market_surveillance_focal_point_name VARCHAR(255),
ADD COLUMN IF NOT EXISTS market_surveillance_focal_point_contact VARCHAR(255),
ADD COLUMN IF NOT EXISTS customs_trade_focal_point_name VARCHAR(255),
ADD COLUMN IF NOT EXISTS customs_trade_focal_point_contact VARCHAR(255),
ADD COLUMN IF NOT EXISTS consumer_affairs_focal_point_name VARCHAR(255),
ADD COLUMN IF NOT EXISTS consumer_affairs_focal_point_contact VARCHAR(255);

COMMIT;

