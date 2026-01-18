-- Certification Body Applications
BEGIN;

DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'cb_application_status') THEN
        CREATE TYPE cb_application_status AS ENUM (
            'DRAFT',
            'SUBMITTED',
            'UNDER_REVIEW',
            'APPROVED',
            'PROVISIONAL',
            'SUSPENDED',
            'WITHDRAWN',
            'REJECTED'
        );
    END IF;
END$$;

DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'cb_accreditation_standard') THEN
        CREATE TYPE cb_accreditation_standard AS ENUM (
            'ISO_IEC_17065',
            'ISO_IEC_17021_1',
            'OTHER'
        );
    END IF;
END$$;

DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'cb_document_type') THEN
        CREATE TYPE cb_document_type AS ENUM (
            'LEGAL_REGISTRATION',
            'ACCREDITATION_CERTIFICATE',
            'ACCREDITATION_SCOPE',
            'ACKNOWLEDGEMENT_OF_APPLICATION',
            'OTHER'
        );
    END IF;
END$$;

CREATE TABLE IF NOT EXISTS cb_applications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    application_number VARCHAR(50) UNIQUE,
    legal_name VARCHAR(255) NOT NULL,
    short_name VARCHAR(100),
    contact_person_name VARCHAR(150) NOT NULL,
    contact_person_title VARCHAR(150),
    contact_email VARCHAR(150) NOT NULL,
    contact_phone VARCHAR(50) NOT NULL,
    website VARCHAR(255),
    physical_address TEXT NOT NULL,
    postal_address TEXT,
    country_id UUID REFERENCES countries(id) ON DELETE SET NULL,
    regions_of_operation TEXT[] DEFAULT ARRAY[]::TEXT[],
    regions_other TEXT,
    is_accredited BOOLEAN DEFAULT FALSE,
    accreditation_standard cb_accreditation_standard,
    accreditation_body_id UUID REFERENCES accreditation_bodies(id) ON DELETE SET NULL,
    accreditation_body_name VARCHAR(255),
    accreditation_certificate_number VARCHAR(100),
    accreditation_scope TEXT,
    accreditation_valid_until DATE,
    accreditation_application_date DATE,
    accreditation_progress_notes TEXT,
    previous_license_held BOOLEAN DEFAULT FALSE,
    previous_license_granted_at DATE,
    previous_license_terminated_at DATE,
    previous_license_termination_reason TEXT,
    applied_schemes JSONB,
    declarations JSONB,
    status cb_application_status DEFAULT 'DRAFT',
    submitted_at TIMESTAMP,
    reviewed_at TIMESTAMP,
    approved_at TIMESTAMP,
    rejected_at TIMESTAMP,
    rejection_reason TEXT,
    provisional_valid_until DATE,
    created_by UUID REFERENCES system_users(id) ON DELETE SET NULL,
    updated_by UUID REFERENCES system_users(id) ON DELETE SET NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS cb_application_documents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    application_id UUID NOT NULL REFERENCES cb_applications(id) ON DELETE CASCADE,
    document_type cb_document_type NOT NULL,
    file_name VARCHAR(255) NOT NULL,
    file_path VARCHAR(500) NOT NULL,
    file_hash VARCHAR(64) NOT NULL,
    file_size BIGINT NOT NULL,
    mime_type VARCHAR(100),
    uploaded_by UUID REFERENCES system_users(id) ON DELETE SET NULL,
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_cb_applications_status ON cb_applications(status);
CREATE INDEX IF NOT EXISTS idx_cb_applications_created_by ON cb_applications(created_by);
CREATE INDEX IF NOT EXISTS idx_cb_applications_number ON cb_applications(application_number);
CREATE INDEX IF NOT EXISTS idx_cb_application_documents_application ON cb_application_documents(application_id);

COMMIT;
