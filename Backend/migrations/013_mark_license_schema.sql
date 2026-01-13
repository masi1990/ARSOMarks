-- ARSO Marks / NSB Mark License Application System - Phase 3
-- PostgreSQL migration to create mark license tables, enums, and supporting structures.
-- This schema supports NSB-004-1, NSB-004-2, NSB-004-3, NSB-004-4, and NSB-004-DASH

BEGIN;

-- Extensions (if not already created)
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Enumerations for Mark License System
CREATE TYPE mark_license_type AS ENUM (
    'PROMOTIONAL_INSTITUTIONAL',
    'CERTIFICATION_BODY',
    'SPECIAL_PROJECT'
);

CREATE TYPE mark_license_status AS ENUM (
    'DRAFT',
    'SUBMITTED',
    'UNDER_REVIEW',
    'APPROVED_PENDING_AGREEMENT',
    'PENDING_NSB_SIGNATURE',
    'PENDING_ARSO_SIGNATURE',
    'EXECUTED',
    'ACTIVE',
    'EXPIRED',
    'SUSPENDED',
    'REJECTED',
    'WITHDRAWN',
    'TERMINATED'
);

CREATE TYPE mark_type AS ENUM (
    'ARSO_QUALITY_MARK',
    'ECO_MARK_AFRICA',
    'BOTH'
);

CREATE TYPE media_type AS ENUM (
    'DIGITAL_ONLINE',
    'PRINT',
    'BROADCAST',
    'OUTDOOR',
    'EVENTS',
    'SOCIAL_MEDIA',
    'OTHER'
);

CREATE TYPE agreement_status AS ENUM (
    'DRAFT',
    'PENDING_NSB',
    'PENDING_ARSO',
    'EXECUTED',
    'ARCHIVED'
);

CREATE TYPE report_status AS ENUM (
    'DRAFT',
    'SUBMITTED',
    'UNDER_REVIEW',
    'APPROVED',
    'REJECTED',
    'REQUIRES_REVISION'
);

CREATE TYPE modification_status AS ENUM (
    'PENDING',
    'UNDER_REVIEW',
    'APPROVED',
    'REJECTED',
    'IMPLEMENTED'
);

CREATE TYPE asset_delivery_method AS ENUM (
    'PORTAL_DOWNLOAD',
    'EMAIL_DELIVERY',
    'PHYSICAL_MEDIA',
    'OTHER'
);

CREATE TYPE asset_file_type AS ENUM (
    'VECTOR_AI',
    'VECTOR_EPS',
    'PNG',
    'JPEG',
    'PDF',
    'VIDEO',
    'OTHER'
);

CREATE TYPE license_duration_type AS ENUM (
    'ONE_YEAR',
    'TWO_YEARS',
    'THREE_YEARS',
    'PROJECT_BASED',
    'OTHER'
);

-- Sequences for human-friendly numbers
CREATE SEQUENCE IF NOT EXISTS mark_license_application_seq START 1;
CREATE SEQUENCE IF NOT EXISTS mark_license_agreement_seq START 1;
CREATE SEQUENCE IF NOT EXISTS mark_license_report_seq START 1;

-- ============================================================================
-- TABLE: mark_license_applications (NSB-004-1)
-- ============================================================================
CREATE TABLE IF NOT EXISTS mark_license_applications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    application_number VARCHAR(100) UNIQUE NOT NULL DEFAULT (
        'NSB-004-1-' || to_char(now(), 'YYYY') || '-' || LPAD(nextval('mark_license_application_seq')::TEXT, 6, '0')
    ),
    nsb_id UUID NOT NULL REFERENCES nsb(id) ON DELETE CASCADE,
    nsb_applicant_name VARCHAR(255) NOT NULL, -- Auto-filled from NSB profile
    application_date DATE NOT NULL DEFAULT CURRENT_DATE,
    application_reference VARCHAR(100), -- NSB's internal tracking number
    
    -- License Type Information
    license_types TEXT[] NOT NULL, -- Array: ['PROMOTIONAL_INSTITUTIONAL', 'CERTIFICATION_BODY', etc.]
    license_duration license_duration_type NOT NULL,
    license_duration_other TEXT, -- If 'OTHER' selected
    
    -- License Type Specific Details (JSONB for flexibility)
    promotional_license_details JSONB, -- For PROMOTIONAL_INSTITUTIONAL
    certification_body_details JSONB, -- For CERTIFICATION_BODY
    special_project_details JSONB, -- For SPECIAL_PROJECT
    
    -- Intended Use Details (Arrays stored as JSONB)
    media_usage JSONB, -- Array of media usage objects
    campaign_timeline JSONB, -- Array of timeline phases
    expected_impact_metrics JSONB, -- Impact assessment data
    
    -- Mark Usage Specifications
    marks_requested mark_type[] NOT NULL, -- Array: ['ARSO_QUALITY_MARK', 'ECO_MARK_AFRICA', 'BOTH']
    mark_colors_needed TEXT[], -- Array of color variations
    mark_sizes_needed TEXT,
    mark_languages TEXT[], -- Array of languages
    
    -- Compliance Declarations
    annex_b_compliance BOOLEAN DEFAULT false,
    brand_guidelines_ack BOOLEAN DEFAULT false,
    modification_policy_acceptance BOOLEAN DEFAULT false,
    
    -- Supporting Documents (stored as JSONB array with metadata)
    supporting_documents JSONB, -- Array of document references
    
    -- Declarations
    declaration_signatory VARCHAR(255) NOT NULL,
    signatory_title VARCHAR(100) NOT NULL,
    signatory_email VARCHAR(255) NOT NULL,
    audit_rights_acceptance BOOLEAN NOT NULL DEFAULT false,
    annual_reporting_commitment BOOLEAN NOT NULL DEFAULT false,
    data_sharing_consent BOOLEAN NOT NULL DEFAULT false,
    
    -- Status and Workflow
    status mark_license_status DEFAULT 'DRAFT',
    submitted_at TIMESTAMP,
    reviewed_at TIMESTAMP,
    approved_at TIMESTAMP,
    rejected_at TIMESTAMP,
    rejection_reason TEXT,
    
    -- Audit
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_by UUID REFERENCES system_users(id) ON DELETE SET NULL,
    updated_by UUID REFERENCES system_users(id) ON DELETE SET NULL
);

-- ============================================================================
-- TABLE: mark_license_placements (Placement Examples/Mockups)
-- ============================================================================
CREATE TABLE IF NOT EXISTS mark_license_placements (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    application_id UUID NOT NULL REFERENCES mark_license_applications(id) ON DELETE CASCADE,
    file_name VARCHAR(255) NOT NULL,
    file_path VARCHAR(500) NOT NULL,
    file_hash VARCHAR(64) NOT NULL,
    file_size BIGINT NOT NULL,
    mime_type VARCHAR(100),
    description TEXT NOT NULL, -- Where/how mark will appear
    file_format VARCHAR(50), -- Auto-detected
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    uploaded_by UUID REFERENCES system_users(id) ON DELETE SET NULL
);

-- ============================================================================
-- TABLE: mark_license_agreements (NSB-004-2)
-- ============================================================================
CREATE TABLE IF NOT EXISTS mark_license_agreements (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    agreement_id VARCHAR(100) UNIQUE NOT NULL DEFAULT (
        'LIC-NSB' || LPAD(nextval('mark_license_agreement_seq')::TEXT, 6, '0') || '-' || 
        to_char(now(), 'YYYY') || '-' || LPAD(nextval('mark_license_agreement_seq')::TEXT, 3, '0')
    ),
    application_id UUID NOT NULL UNIQUE REFERENCES mark_license_applications(id) ON DELETE CASCADE,
    nsb_id UUID NOT NULL REFERENCES nsb(id) ON DELETE CASCADE,
    
    -- License Details
    license_type_display TEXT NOT NULL, -- Human-readable license type
    license_start_date DATE NOT NULL,
    license_end_date DATE NOT NULL,
    license_terms_display TEXT, -- System-generated terms
    royalty_fee_structure JSONB, -- Fee structure details
    payment_schedule JSONB,
    usage_restrictions TEXT,
    termination_clauses TEXT,
    
    -- NSB Signatory Details
    nsb_signer_name VARCHAR(255) NOT NULL,
    nsb_signer_title VARCHAR(100) NOT NULL,
    nsb_signer_email VARCHAR(255) NOT NULL,
    nsb_signer_ip VARCHAR(45), -- IP address at signature
    nsb_signer_timestamp TIMESTAMP,
    nsb_signer_consent BOOLEAN DEFAULT false,
    nsb_signature_image_path VARCHAR(500), -- Optional scanned signature
    
    -- ARSO Signatory Details
    arso_signer_name VARCHAR(255),
    arso_signer_title VARCHAR(100),
    arso_signer_timestamp TIMESTAMP,
    
    -- Agreement Status
    agreement_status agreement_status DEFAULT 'DRAFT',
    
    -- Agreement Document
    agreement_document_path VARCHAR(500), -- Generated PDF path
    
    -- Audit
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_by UUID REFERENCES system_users(id) ON DELETE SET NULL,
    updated_by UUID REFERENCES system_users(id) ON DELETE SET NULL
);

-- ============================================================================
-- TABLE: mark_license_assets (Digital Asset Management)
-- ============================================================================
CREATE TABLE IF NOT EXISTS mark_license_assets (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    agreement_id UUID NOT NULL REFERENCES mark_license_agreements(id) ON DELETE CASCADE,
    
    -- Asset Request Details
    asset_request_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    requested_assets TEXT[] NOT NULL, -- Array of asset types requested
    asset_delivery_method asset_delivery_method NOT NULL,
    asset_recipient_name VARCHAR(255) NOT NULL,
    asset_recipient_email VARCHAR(255) NOT NULL,
    asset_use_confirmation BOOLEAN DEFAULT false,
    
    -- Asset Files
    asset_files JSONB, -- Array of file metadata
    
    -- Delivery Status
    delivered_at TIMESTAMP,
    delivery_method_used asset_delivery_method,
    download_count INTEGER DEFAULT 0,
    
    -- Audit
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_by UUID REFERENCES system_users(id) ON DELETE SET NULL
);

-- ============================================================================
-- TABLE: mark_license_asset_downloads (Download History/Audit Trail)
-- ============================================================================
CREATE TABLE IF NOT EXISTS mark_license_asset_downloads (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    asset_id UUID NOT NULL REFERENCES mark_license_assets(id) ON DELETE CASCADE,
    file_path VARCHAR(500) NOT NULL,
    downloaded_by UUID REFERENCES system_users(id) ON DELETE SET NULL,
    downloaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ip_address VARCHAR(45),
    user_agent TEXT
);

-- ============================================================================
-- TABLE: mark_license_usage_reports (NSB-004-3)
-- ============================================================================
CREATE TABLE IF NOT EXISTS mark_license_usage_reports (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    report_number VARCHAR(100) UNIQUE NOT NULL DEFAULT (
        'NSB-004-3-' || to_char(now(), 'YYYY') || '-' || LPAD(nextval('mark_license_report_seq')::TEXT, 6, '0')
    ),
    license_id UUID NOT NULL REFERENCES mark_license_agreements(id) ON DELETE CASCADE,
    agreement_id VARCHAR(100) NOT NULL, -- Reference to agreement_id for easy lookup
    
    -- Reporting Period
    report_period_start DATE NOT NULL,
    report_period_end DATE NOT NULL,
    report_year INTEGER NOT NULL,
    
    -- Reporting Contact
    nsb_contact_name VARCHAR(255) NOT NULL,
    nsb_contact_email VARCHAR(255) NOT NULL,
    report_submission_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    -- Usage Metrics (Arrays stored as JSONB)
    promotional_usage_metrics JSONB, -- Array for promotional campaigns
    certification_usage_metrics JSONB, -- Array for CB usage
    impact_assessment JSONB, -- Impact metrics
    
    -- Compliance Declaration
    compliance_checks JSONB, -- Array of compliance checkboxes
    non_compliance_issues TEXT,
    corrective_actions_taken TEXT,
    planned_usage_next_year TEXT NOT NULL,
    renewal_intention VARCHAR(20), -- 'YES', 'NO', 'UNDECIDED'
    
    -- Supporting Evidence (JSONB array)
    supporting_evidence JSONB, -- Array of file references
    samples JSONB, -- Array of sample materials
    testimonials JSONB, -- Array of testimonial references
    
    -- Status
    status report_status DEFAULT 'DRAFT',
    submitted_at TIMESTAMP,
    reviewed_at TIMESTAMP,
    approved_at TIMESTAMP,
    rejected_at TIMESTAMP,
    rejection_reason TEXT,
    
    -- Audit
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_by UUID REFERENCES system_users(id) ON DELETE SET NULL,
    updated_by UUID REFERENCES system_users(id) ON DELETE SET NULL
);

-- ============================================================================
-- TABLE: mark_license_modifications (NSB-004-4)
-- ============================================================================
CREATE TABLE IF NOT EXISTS mark_license_modifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    original_license_id UUID NOT NULL REFERENCES mark_license_agreements(id) ON DELETE CASCADE,
    agreement_id VARCHAR(100) NOT NULL, -- Reference for easy lookup
    
    -- Modification Details
    modification_types TEXT[] NOT NULL, -- Array: ['EXTEND_DURATION', 'CHANGE_SCOPE', etc.]
    modification_reason TEXT NOT NULL,
    proposed_changes TEXT NOT NULL,
    effective_date_request DATE NOT NULL,
    supporting_justification_path VARCHAR(500), -- File path
    impact_assessment TEXT,
    fee_adjustment_needed VARCHAR(20), -- 'YES', 'NO', 'TO_BE_DETERMINED'
    
    -- Status
    status modification_status DEFAULT 'PENDING',
    submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    reviewed_at TIMESTAMP,
    approved_at TIMESTAMP,
    rejected_at TIMESTAMP,
    rejection_reason TEXT,
    implemented_at TIMESTAMP,
    
    -- Implementation Details (if approved)
    implemented_changes JSONB, -- What was actually changed
    
    -- Audit
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_by UUID REFERENCES system_users(id) ON DELETE SET NULL,
    updated_by UUID REFERENCES system_users(id) ON DELETE SET NULL,
    reviewed_by UUID REFERENCES system_users(id) ON DELETE SET NULL
);

-- ============================================================================
-- TABLE: mark_license_compliance (Compliance Tracking)
-- ============================================================================
CREATE TABLE IF NOT EXISTS mark_license_compliance (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    license_id UUID NOT NULL REFERENCES mark_license_agreements(id) ON DELETE CASCADE,
    
    -- Compliance Check
    compliance_type VARCHAR(50) NOT NULL, -- 'USAGE_COMPLIANCE', 'BRAND_GUIDELINES', etc.
    check_date DATE NOT NULL,
    checked_by UUID REFERENCES system_users(id) ON DELETE SET NULL,
    
    -- Findings
    is_compliant BOOLEAN DEFAULT true,
    findings TEXT,
    violations JSONB, -- Array of violations if any
    corrective_actions_required TEXT,
    corrective_actions_taken TEXT,
    
    -- Follow-up
    next_check_date DATE,
    resolved_at TIMESTAMP,
    
    -- Audit
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================================
-- INDEXES for Performance
-- ============================================================================

-- Mark License Applications
CREATE INDEX IF NOT EXISTS idx_mark_license_applications_nsb_id ON mark_license_applications(nsb_id);
CREATE INDEX IF NOT EXISTS idx_mark_license_applications_status ON mark_license_applications(status);
CREATE INDEX IF NOT EXISTS idx_mark_license_applications_application_date ON mark_license_applications(application_date);
CREATE INDEX IF NOT EXISTS idx_mark_license_applications_created_at ON mark_license_applications(created_at);

-- Mark License Placements
CREATE INDEX IF NOT EXISTS idx_mark_license_placements_application_id ON mark_license_placements(application_id);

-- Mark License Agreements
CREATE INDEX IF NOT EXISTS idx_mark_license_agreements_nsb_id ON mark_license_agreements(nsb_id);
CREATE INDEX IF NOT EXISTS idx_mark_license_agreements_application_id ON mark_license_agreements(application_id);
CREATE INDEX IF NOT EXISTS idx_mark_license_agreements_status ON mark_license_agreements(agreement_status);
CREATE INDEX IF NOT EXISTS idx_mark_license_agreements_end_date ON mark_license_agreements(license_end_date);
CREATE INDEX IF NOT EXISTS idx_mark_license_agreements_start_date ON mark_license_agreements(license_start_date);

-- Mark License Assets
CREATE INDEX IF NOT EXISTS idx_mark_license_assets_agreement_id ON mark_license_assets(agreement_id);

-- Mark License Asset Downloads
CREATE INDEX IF NOT EXISTS idx_mark_license_asset_downloads_asset_id ON mark_license_asset_downloads(asset_id);
CREATE INDEX IF NOT EXISTS idx_mark_license_asset_downloads_downloaded_at ON mark_license_asset_downloads(downloaded_at);

-- Mark License Usage Reports
CREATE INDEX IF NOT EXISTS idx_mark_license_usage_reports_license_id ON mark_license_usage_reports(license_id);
CREATE INDEX IF NOT EXISTS idx_mark_license_usage_reports_status ON mark_license_usage_reports(status);
CREATE INDEX IF NOT EXISTS idx_mark_license_usage_reports_report_year ON mark_license_usage_reports(report_year);
CREATE INDEX IF NOT EXISTS idx_mark_license_usage_reports_submission_date ON mark_license_usage_reports(report_submission_date);

-- Mark License Modifications
CREATE INDEX IF NOT EXISTS idx_mark_license_modifications_license_id ON mark_license_modifications(original_license_id);
CREATE INDEX IF NOT EXISTS idx_mark_license_modifications_status ON mark_license_modifications(status);

-- Mark License Compliance
CREATE INDEX IF NOT EXISTS idx_mark_license_compliance_license_id ON mark_license_compliance(license_id);
CREATE INDEX IF NOT EXISTS idx_mark_license_compliance_check_date ON mark_license_compliance(check_date);
CREATE INDEX IF NOT EXISTS idx_mark_license_compliance_is_compliant ON mark_license_compliance(is_compliant);

-- ============================================================================
-- TRIGGERS for Auto-updating updated_at
-- ============================================================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_mark_license_applications_updated_at BEFORE UPDATE ON mark_license_applications
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_mark_license_agreements_updated_at BEFORE UPDATE ON mark_license_agreements
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_mark_license_assets_updated_at BEFORE UPDATE ON mark_license_assets
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_mark_license_usage_reports_updated_at BEFORE UPDATE ON mark_license_usage_reports
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_mark_license_modifications_updated_at BEFORE UPDATE ON mark_license_modifications
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_mark_license_compliance_updated_at BEFORE UPDATE ON mark_license_compliance
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

COMMIT;

-- ============================================================================
-- NOTES:
-- ============================================================================
-- 1. JSONB fields are used for flexible array storage and nested data
-- 2. Arrays (TEXT[], mark_type[]) are used for simple lists
-- 3. All tables include audit columns (created_at, updated_at, created_by, updated_by)
-- 4. Foreign keys use ON DELETE CASCADE for data integrity
-- 5. Indexes are created for common query patterns
-- 6. Triggers automatically update updated_at timestamps
-- 7. Sequences generate human-friendly reference numbers

