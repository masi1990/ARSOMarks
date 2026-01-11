-- Migration: Add NSB Documents table and update contact types
BEGIN;

-- Add new contact types to enum (if enum exists, otherwise create it)
DO $$
BEGIN
    -- Add new enum values if they don't exist
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'nsb_contact_type') THEN
        CREATE TYPE nsb_contact_type AS ENUM (
            'PRIMARY',
            'ALTERNATIVE',
            'TECHNICAL',
            'FINANCIAL',
            'ARSO_LIAISON',
            'ACAP_COORDINATOR',
            'MARKET_SURVEILLANCE_FOCAL_POINT',
            'CUSTOMS_TRADE_FOCAL_POINT',
            'CONSUMER_AFFAIRS_FOCAL_POINT'
        );
    ELSE
        -- Add new values to existing enum
        ALTER TYPE nsb_contact_type ADD VALUE IF NOT EXISTS 'ACAP_COORDINATOR';
        ALTER TYPE nsb_contact_type ADD VALUE IF NOT EXISTS 'MARKET_SURVEILLANCE_FOCAL_POINT';
        ALTER TYPE nsb_contact_type ADD VALUE IF NOT EXISTS 'CUSTOMS_TRADE_FOCAL_POINT';
        ALTER TYPE nsb_contact_type ADD VALUE IF NOT EXISTS 'CONSUMER_AFFAIRS_FOCAL_POINT';
    END IF;
END$$;

-- Create NSB Profile Document Type enum
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'nsb_profile_document_type') THEN
        CREATE TYPE nsb_profile_document_type AS ENUM (
            'NATIONAL_STANDARDS_ACT_DOCUMENT',
            'NATIONAL_CONFORMITY_ASSESSMENT_POLICY_DOCUMENT',
            'NATIONAL_QUALITY_POLICY_DOCUMENT',
            'ORGANIZATIONAL_CHART_DOCUMENT',
            'OTHER'
        );
    END IF;
END$$;

-- Create NSB Documents table
CREATE TABLE IF NOT EXISTS nsb_documents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nsb_id UUID NOT NULL REFERENCES nsb(id) ON DELETE CASCADE,
    document_type nsb_profile_document_type NOT NULL,
    file_name VARCHAR(255) NOT NULL,
    file_path VARCHAR(500) NOT NULL,
    file_hash VARCHAR(64) NOT NULL,
    file_size BIGINT NOT NULL,
    mime_type VARCHAR(100),
    uploaded_by UUID REFERENCES system_users(id) ON DELETE SET NULL,
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for NSB documents
CREATE INDEX IF NOT EXISTS idx_nsb_documents_nsb_id ON nsb_documents(nsb_id);
CREATE INDEX IF NOT EXISTS idx_nsb_documents_type ON nsb_documents(document_type);

COMMIT;

