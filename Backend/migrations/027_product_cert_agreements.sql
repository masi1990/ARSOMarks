-- Product certification agreements and CB change requests
BEGIN;

DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'certification_agreement_type') THEN
        CREATE TYPE certification_agreement_type AS ENUM (
            'CERTIFICATION_AGREEMENT',
            'SUB_LICENSE_AGREEMENT'
        );
    END IF;
END$$;

DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'certification_agreement_status') THEN
        CREATE TYPE certification_agreement_status AS ENUM (
            'PENDING_CB_APPROVAL',
            'APPROVED',
            'REJECTED'
        );
    END IF;
END$$;

DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'cb_change_request_status') THEN
        CREATE TYPE cb_change_request_status AS ENUM (
            'PENDING',
            'APPROVED',
            'REJECTED'
        );
    END IF;
END$$;

CREATE TABLE IF NOT EXISTS product_certification_agreements (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    application_id UUID NOT NULL REFERENCES product_certification_applications(id) ON DELETE CASCADE,
    agreement_type certification_agreement_type NOT NULL,
    status certification_agreement_status DEFAULT 'PENDING_CB_APPROVAL',
    contract_start DATE,
    contract_end DATE,
    signed_by_name VARCHAR(150),
    signed_at TIMESTAMP,
    file_name VARCHAR(255) NOT NULL,
    file_path VARCHAR(500) NOT NULL,
    file_hash VARCHAR(64) NOT NULL,
    file_size BIGINT NOT NULL,
    mime_type VARCHAR(100),
    uploaded_by UUID REFERENCES system_users(id) ON DELETE SET NULL,
    cb_approved_by UUID REFERENCES system_users(id) ON DELETE SET NULL,
    cb_approved_at TIMESTAMP,
    rejection_reason TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS product_certification_cb_change_requests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    application_id UUID NOT NULL REFERENCES product_certification_applications(id) ON DELETE CASCADE,
    current_cb_id UUID,
    requested_cb_id UUID,
    justification TEXT NOT NULL,
    penalty_policy TEXT,
    status cb_change_request_status DEFAULT 'PENDING',
    requested_by UUID REFERENCES system_users(id) ON DELETE SET NULL,
    reviewed_by UUID REFERENCES system_users(id) ON DELETE SET NULL,
    reviewed_at TIMESTAMP,
    decision_reason TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_product_cert_agreements_application ON product_certification_agreements(application_id);
CREATE INDEX IF NOT EXISTS idx_product_cert_change_requests_application ON product_certification_cb_change_requests(application_id);

COMMIT;
