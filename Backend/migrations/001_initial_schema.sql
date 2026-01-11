-- ARSO Marks / ACAP Licensing - Initial Schema
-- PostgreSQL migration to create core and reference tables with enums and triggers.

BEGIN;

-- Extensions
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Enumerations
CREATE TYPE nsb_classification AS ENUM ('GOVERNMENT_AGENCY', 'PARASTATAL', 'PRIVATE', 'OTHER');
CREATE TYPE nsb_status AS ENUM ('ACTIVE', 'INACTIVE', 'SUSPENDED');
CREATE TYPE nsb_contact_type AS ENUM ('PRIMARY', 'ALTERNATIVE', 'TECHNICAL', 'FINANCIAL', 'ARSO_LIAISON');
CREATE TYPE nsb_location_type AS ENUM ('HEADQUARTERS', 'BRANCH', 'LABORATORY', 'REGIONAL_OFFICE');

CREATE TYPE application_type AS ENUM ('FULL', 'PROVISIONAL', 'RENEWAL', 'SCOPE_EXTENSION');
CREATE TYPE application_status AS ENUM (
    'DRAFT',
    'SUBMITTED',
    'UNDER_REVIEW',
    'PENDING_WITNESS',
    'PENDING_CACO',
    'APPROVED_PENDING_PAYMENT',
    'APPROVED_PENDING_AGREEMENT',
    'ACTIVE',
    'PROVISIONAL',
    'SUSPENDED',
    'WITHDRAWN',
    'REJECTED'
);

CREATE TYPE license_type AS ENUM ('FULL', 'PROVISIONAL');
CREATE TYPE license_status AS ENUM ('ACTIVE', 'PROVISIONAL', 'SUSPENDED', 'WITHDRAWN', 'EXPIRED', 'REVOKED');

CREATE TYPE compliance_type AS ENUM ('SURVEILLANCE', 'RECERTIFICATION', 'WITNESS_AUDIT');
CREATE TYPE compliance_status AS ENUM ('SCHEDULED', 'COMPLETED', 'OVERDUE', 'CANCELLED');

CREATE TYPE document_type AS ENUM (
    'LEGAL_REGISTRATION',
    'ACCREDITATION_CERTIFICATE',
    'QUALITY_MANUAL',
    'AUDITOR_COMPETENCE_MATRIX',
    'OTHER'
);
CREATE TYPE document_verification_status AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

CREATE TYPE membership_status AS ENUM ('MEMBER', 'CANDIDATE', 'SUSPENDED', 'WITHDRAWN');

-- Sequences for human-friendly numbers
CREATE SEQUENCE IF NOT EXISTS license_application_seq START 1;
CREATE SEQUENCE IF NOT EXISTS license_seq START 1;

-- Core user table to back audit columns
CREATE TABLE IF NOT EXISTS system_users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    role VARCHAR(100),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Reference Data
CREATE TABLE IF NOT EXISTS regions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    code VARCHAR(10) UNIQUE NOT NULL,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS countries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    iso_code VARCHAR(2) UNIQUE NOT NULL,
    name VARCHAR(100) NOT NULL,
    region_id UUID REFERENCES regions(id),
    continent VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS regional_economic_communities (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    code VARCHAR(10) UNIQUE NOT NULL, -- 'ECOWAS', 'COMESA', 'SADC', 'EAC'
    name VARCHAR(100) NOT NULL,
    description TEXT,
    headquarters_country_id UUID REFERENCES countries(id),
    established_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS country_rec_memberships (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    country_id UUID NOT NULL REFERENCES countries(id) ON DELETE CASCADE,
    rec_id UUID NOT NULL REFERENCES regional_economic_communities(id) ON DELETE CASCADE,
    membership_status membership_status DEFAULT 'MEMBER',
    joined_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(country_id, rec_id)
);

-- ACAP Schemes Reference
CREATE TABLE IF NOT EXISTS acap_schemes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    code VARCHAR(10) UNIQUE NOT NULL, -- 'A1', 'A2', 'B', 'C', etc.
    name VARCHAR(200) NOT NULL,
    description TEXT,
    category VARCHAR(100), -- 'PRIMARY_PRODUCTION', 'PROCESSING', 'SUSTAINABILITY'
    applicable_standards JSONB,
    requirements JSONB,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Accreditation Bodies (AFRAC MRA Signatories)
CREATE TABLE IF NOT EXISTS accreditation_bodies (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    country_id UUID REFERENCES countries(id),
    is_frac_mra_signatory BOOLEAN DEFAULT false,
    mra_scope JSONB,
    contact_details JSONB,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Core Entity: NSB (National Standards Body)
CREATE TABLE IF NOT EXISTS nsb (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    short_name VARCHAR(100),
    country_id UUID NOT NULL REFERENCES countries(id) ON DELETE CASCADE,
    classification nsb_classification NOT NULL,
    registration_number VARCHAR(100),
    description TEXT,
    status nsb_status DEFAULT 'ACTIVE',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_by UUID REFERENCES system_users(id) ON DELETE SET NULL,
    updated_by UUID REFERENCES system_users(id) ON DELETE SET NULL
);

-- Ensure only one active NSB per country
CREATE UNIQUE INDEX IF NOT EXISTS idx_nsb_active_country ON nsb (country_id) WHERE status = 'ACTIVE';
CREATE INDEX IF NOT EXISTS idx_nsb_country_id ON nsb(country_id);

-- NSB Contact Information
CREATE TABLE IF NOT EXISTS nsb_contacts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nsb_id UUID NOT NULL REFERENCES nsb(id) ON DELETE CASCADE,
    contact_type nsb_contact_type NOT NULL,
    name VARCHAR(255) NOT NULL,
    designation VARCHAR(100),
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    mobile VARCHAR(50),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- NSB Physical Locations
CREATE TABLE IF NOT EXISTS nsb_locations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nsb_id UUID NOT NULL REFERENCES nsb(id) ON DELETE CASCADE,
    location_type nsb_location_type NOT NULL,
    address_line_1 VARCHAR(255),
    address_line_2 VARCHAR(255),
    city VARCHAR(100),
    state_province VARCHAR(100),
    postal_code VARCHAR(50),
    country_id UUID REFERENCES countries(id),
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    is_primary BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- License Application (separate from NSB)
CREATE TABLE IF NOT EXISTS license_applications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    application_number VARCHAR(100) UNIQUE NOT NULL DEFAULT (
        'ARSO-APP-' || to_char(now(), 'YYYY') || '-' || LPAD(nextval('license_application_seq')::TEXT, 6, '0')
    ),
    nsb_id UUID NOT NULL REFERENCES nsb(id) ON DELETE CASCADE,
    application_type application_type DEFAULT 'FULL',
    status application_status DEFAULT 'DRAFT',
    applied_schemes JSONB, -- Array of ACAP schemes
    accreditation_details JSONB,
    organizational_details JSONB,
    financial_details JSONB,
    technical_competence_details JSONB,
    qms_details JSONB,
    declarations JSONB,
    submission_data JSONB, -- Data at time of submission
    is_provisional BOOLEAN DEFAULT false,
    provisional_valid_until DATE,
    submitted_at TIMESTAMP,
    reviewed_at TIMESTAMP,
    approved_at TIMESTAMP,
    rejected_at TIMESTAMP,
    rejection_reason TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_by UUID REFERENCES system_users(id) ON DELETE SET NULL,
    updated_by UUID REFERENCES system_users(id) ON DELETE SET NULL,
    CONSTRAINT license_applications_valid_status_transition CHECK (
        (status = 'DRAFT' AND submitted_at IS NULL)
        OR (status IN (
            'SUBMITTED',
            'UNDER_REVIEW',
            'APPROVED_PENDING_PAYMENT',
            'APPROVED_PENDING_AGREEMENT',
            'ACTIVE',
            'REJECTED',
            'PENDING_WITNESS',
            'PENDING_CACO',
            'PROVISIONAL',
            'SUSPENDED',
            'WITHDRAWN'
        ) AND submitted_at IS NOT NULL)
    )
);

-- Application Documents (Version Controlled)
CREATE TABLE IF NOT EXISTS application_documents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    application_id UUID NOT NULL REFERENCES license_applications(id) ON DELETE CASCADE,
    document_type document_type NOT NULL,
    document_category VARCHAR(50),
    file_name VARCHAR(255) NOT NULL,
    file_path VARCHAR(500) NOT NULL,
    file_hash VARCHAR(64) NOT NULL,
    file_size BIGINT NOT NULL,
    mime_type VARCHAR(100),
    version INTEGER DEFAULT 1,
    is_current BOOLEAN DEFAULT true,
    verification_status document_verification_status DEFAULT 'PENDING',
    verified_by UUID REFERENCES system_users(id) ON DELETE SET NULL,
    verified_at TIMESTAMP,
    remarks TEXT,
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    uploaded_by UUID NOT NULL REFERENCES system_users(id) ON DELETE SET NULL
);

-- Application Workflow History
CREATE TABLE IF NOT EXISTS application_workflow_history (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    application_id UUID NOT NULL REFERENCES license_applications(id) ON DELETE CASCADE,
    from_status application_status,
    to_status application_status NOT NULL,
    action_performed VARCHAR(100) NOT NULL,
    performed_by UUID NOT NULL REFERENCES system_users(id) ON DELETE SET NULL,
    performed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    notes TEXT,
    metadata JSONB
);

-- Issued Licenses
CREATE TABLE IF NOT EXISTS licenses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    license_number VARCHAR(100) UNIQUE NOT NULL DEFAULT (
        'ARSO-LIC-' || to_char(now(), 'YYYY') || '-' || LPAD(nextval('license_seq')::TEXT, 6, '0')
    ),
    application_id UUID NOT NULL UNIQUE REFERENCES license_applications(id) ON DELETE CASCADE,
    nsb_id UUID NOT NULL REFERENCES nsb(id) ON DELETE CASCADE,
    license_type license_type DEFAULT 'FULL',
    status license_status DEFAULT 'ACTIVE',
    valid_from DATE NOT NULL,
    valid_until DATE NOT NULL,
    authorized_schemes JSONB NOT NULL,
    authorized_marks JSONB,
    scope_description TEXT,
    conditions JSONB,
    annual_fee DECIMAL(15, 2),
    royalty_percentage DECIMAL(5, 2),
    certificate_url VARCHAR(500),
    qr_code_hash VARCHAR(64),
    issued_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    issued_by UUID REFERENCES system_users(id) ON DELETE SET NULL,
    renewed_at TIMESTAMP,
    suspended_at TIMESTAMP,
    suspension_reason TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- License Compliance Tracking
CREATE TABLE IF NOT EXISTS license_compliance (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    license_id UUID NOT NULL REFERENCES licenses(id) ON DELETE CASCADE,
    compliance_type compliance_type NOT NULL,
    scheduled_date DATE NOT NULL,
    actual_date DATE,
    status compliance_status DEFAULT 'SCHEDULED',
    findings TEXT,
    corrective_actions TEXT,
    next_due_date DATE,
    conducted_by UUID REFERENCES system_users(id) ON DELETE SET NULL,
    report_url VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_license_applications_nsb_id ON license_applications(nsb_id);
CREATE INDEX IF NOT EXISTS idx_license_applications_status ON license_applications(status);
CREATE INDEX IF NOT EXISTS idx_license_applications_submitted_at ON license_applications(submitted_at);

CREATE INDEX IF NOT EXISTS idx_licenses_nsb_id ON licenses(nsb_id);
CREATE INDEX IF NOT EXISTS idx_licenses_status ON licenses(status);
CREATE INDEX IF NOT EXISTS idx_licenses_valid_until ON licenses(valid_until);

CREATE INDEX IF NOT EXISTS idx_application_documents_app_id ON application_documents(application_id);
CREATE INDEX IF NOT EXISTS idx_application_documents_type_status ON application_documents(document_type, verification_status);

CREATE INDEX IF NOT EXISTS idx_license_compliance_license_id ON license_compliance(license_id);
CREATE INDEX IF NOT EXISTS idx_country_rec_memberships ON country_rec_memberships(country_id, rec_id);

-- Trigger helpers
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_nsb_updated_at
    BEFORE UPDATE ON nsb
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_license_applications_updated_at
    BEFORE UPDATE ON license_applications
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_licenses_updated_at
    BEFORE UPDATE ON licenses
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_license_compliance_updated_at
    BEFORE UPDATE ON license_compliance
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

COMMIT;

