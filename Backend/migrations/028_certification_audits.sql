-- Certification audits, findings, corrective actions, sampling, labs, test results
BEGIN;

DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'certification_audit_type') THEN
        CREATE TYPE certification_audit_type AS ENUM (
            'DOCUMENT_REVIEW',
            'INITIAL',
            'SURVEILLANCE',
            'RECERTIFICATION',
            'FOLLOW_UP',
            'UNANNOUNCED'
        );
    END IF;
END$$;

DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'audit_finding_type') THEN
        CREATE TYPE audit_finding_type AS ENUM (
            'MAJOR',
            'MINOR',
            'OBSERVATION',
            'CRITICAL'
        );
    END IF;
END$$;

DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'audit_finding_status') THEN
        CREATE TYPE audit_finding_status AS ENUM (
            'OPEN',
            'UNDER_REVIEW',
            'CLOSED'
        );
    END IF;
END$$;

DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'corrective_action_status') THEN
        CREATE TYPE corrective_action_status AS ENUM (
            'PENDING',
            'VERIFIED',
            'REJECTED'
        );
    END IF;
END$$;

DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'sampling_status') THEN
        CREATE TYPE sampling_status AS ENUM (
            'PENDING',
            'COLLECTED',
            'TESTED'
        );
    END IF;
END$$;

DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'test_result_status') THEN
        CREATE TYPE test_result_status AS ENUM (
            'PASS',
            'FAIL',
            'CONDITIONAL_PASS'
        );
    END IF;
END$$;

CREATE TABLE IF NOT EXISTS certification_audits (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    application_id UUID NOT NULL REFERENCES product_certification_applications(id) ON DELETE CASCADE,
    audit_type certification_audit_type NOT NULL,
    status compliance_status DEFAULT 'SCHEDULED',
    planned_date DATE,
    actual_date DATE,
    window_start DATE,
    window_end DATE,
    is_unannounced BOOLEAN DEFAULT FALSE,
    notes TEXT,
    created_by UUID REFERENCES system_users(id) ON DELETE SET NULL,
    updated_by UUID REFERENCES system_users(id) ON DELETE SET NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS certification_audit_findings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    audit_id UUID NOT NULL REFERENCES certification_audits(id) ON DELETE CASCADE,
    finding_type audit_finding_type NOT NULL,
    description TEXT NOT NULL,
    deadline_date DATE,
    status audit_finding_status DEFAULT 'OPEN',
    closed_at TIMESTAMP,
    created_by UUID REFERENCES system_users(id) ON DELETE SET NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS corrective_actions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    finding_id UUID NOT NULL REFERENCES certification_audit_findings(id) ON DELETE CASCADE,
    action_plan TEXT NOT NULL,
    evidence_notes TEXT,
    evidence_files JSONB,
    status corrective_action_status DEFAULT 'PENDING',
    verified_by UUID REFERENCES system_users(id) ON DELETE SET NULL,
    verified_at TIMESTAMP,
    decision_notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS sampling_records (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    audit_id UUID NOT NULL REFERENCES certification_audits(id) ON DELETE CASCADE,
    status sampling_status DEFAULT 'PENDING',
    sampling_method TEXT,
    sampling_location TEXT,
    quantity NUMERIC(10,2),
    quantity_unit VARCHAR(30),
    traceability TEXT,
    sampled_at DATE,
    created_by UUID REFERENCES system_users(id) ON DELETE SET NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS laboratories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    country_id UUID REFERENCES countries(id) ON DELETE SET NULL,
    accreditation_body_id UUID REFERENCES accreditation_bodies(id) ON DELETE SET NULL,
    accreditation_number VARCHAR(100),
    is_accredited BOOLEAN DEFAULT FALSE,
    scope TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS test_results (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    sampling_id UUID NOT NULL REFERENCES sampling_records(id) ON DELETE CASCADE,
    laboratory_id UUID REFERENCES laboratories(id) ON DELETE SET NULL,
    parameters JSONB,
    report_file_path VARCHAR(500),
    result_status test_result_status DEFAULT 'PASS',
    tested_at DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_cert_audits_application ON certification_audits(application_id);
CREATE INDEX IF NOT EXISTS idx_audit_findings_audit ON certification_audit_findings(audit_id);
CREATE INDEX IF NOT EXISTS idx_sampling_records_audit ON sampling_records(audit_id);
CREATE INDEX IF NOT EXISTS idx_test_results_sampling ON test_results(sampling_id);

COMMIT;
