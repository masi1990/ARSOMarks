-- ARSO Marks / Document Upload Center System - OP-003
-- PostgreSQL migration to create document upload tables, enums, and supporting structures.
-- This schema supports FORM OP-003: Document Upload Center
--
-- Sections:
-- A: Mandatory Documents Checklist
-- B: Test Reports & Certificates (Array)
-- C: Supply Chain & Traceability Documents
-- D: Environmental Documents (EMA Only)

BEGIN;

-- Extensions (if not already created)
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ============================================================================
-- ENUMERATIONS FOR DOCUMENT UPLOAD SYSTEM
-- ============================================================================

-- Document Category
CREATE TYPE document_category AS ENUM (
    'COMPANY_LEGAL',
    'QUALITY_MANAGEMENT',
    'TECHNICAL_PRODUCTION',
    'TEST_REPORTS',
    'CERTIFICATES',
    'SUPPLY_CHAIN',
    'ENVIRONMENTAL',
    'OTHER'
);

-- Document Type (Specific document types)
CREATE TYPE operator_document_type AS ENUM (
    -- Company & Legal Documents
    'BUSINESS_REGISTRATION',
    'TAX_CERTIFICATE',
    'MEMORANDUM_ARTICLES',
    'DIRECTORS_LIST',
    'OWNERSHIP_STRUCTURE',
    'AUTHORIZED_SIGNATORY',
    
    -- Quality Management Documents
    'QUALITY_MANUAL',
    'PROCEDURES_MANUAL',
    'ORGANIZATIONAL_CHART',
    'JOB_DESCRIPTIONS',
    'TRAINING_RECORDS',
    'INTERNAL_AUDIT_RECORDS',
    'MANAGEMENT_REVIEW',
    
    -- Technical & Production Documents
    'FACTORY_LAYOUT',
    'EQUIPMENT_LIST',
    'CALIBRATION_CERTIFICATES',
    'MAINTENANCE_RECORDS',
    'PROCESS_FLOW_DIAGRAMS',
    'CONTROL_PLANS',
    'RAW_MATERIAL_SPECS',
    'FINISHED_PRODUCT_SPECS',
    
    -- Test Reports
    'TEST_REPORT',
    
    -- Certificates
    'EXISTING_CERTIFICATE',
    
    -- Supply Chain Documents
    'SUPPLIER_LIST',
    'SUPPLIER_EVALUATION',
    'MATERIAL_CERTIFICATE',
    'TRACEABILITY_RECORDS',
    'BATCH_RECORDS',
    'RECALL_PROCEDURE',
    
    -- Environmental Documents (EMA)
    'ENVIRONMENTAL_POLICY',
    'ENVIRONMENTAL_MANUAL',
    'LCA_REPORT',
    'CARBON_FOOTPRINT_REPORT',
    'ENERGY_AUDIT',
    'WASTE_AUDIT',
    'RECYCLING_CERTIFICATE',
    'SUSTAINABLE_SOURCING',
    
    -- Other
    'OTHER'
);

-- Document Verification Status
CREATE TYPE document_verification_status AS ENUM (
    'PENDING',
    'UNDER_REVIEW',
    'APPROVED',
    'REJECTED',
    'EXPIRED',
    'REQUIRES_REVISION'
);

-- Test Report Status
CREATE TYPE test_report_status AS ENUM (
    'PENDING',
    'VERIFIED',
    'APPIRED',
    'REJECTED'
);

-- Pass/Fail Status
CREATE TYPE pass_fail_status AS ENUM (
    'PASS',
    'FAIL',
    'CONDITIONAL_PASS'
);

-- File Format
CREATE TYPE file_format AS ENUM (
    'PDF',
    'JPG',
    'PNG',
    'DOC',
    'DOCX',
    'XLS',
    'XLSX',
    'CSV',
    'DWG',
    'AI',
    'EPS',
    'OTHER'
);

-- ============================================================================
-- SECTION A: MANDATORY DOCUMENTS CHECKLIST
-- ============================================================================

-- Operator Documents Registry
CREATE TABLE IF NOT EXISTS operator_documents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    operator_id UUID NOT NULL REFERENCES operators(id) ON DELETE CASCADE,
    
    -- Document Metadata
    document_category document_category NOT NULL,
    document_type operator_document_type NOT NULL,
    document_name VARCHAR(255) NOT NULL, -- User-friendly name
    description TEXT, -- Optional description
    
    -- File Information
    file_name VARCHAR(255) NOT NULL, -- Original filename
    file_path TEXT NOT NULL, -- Storage path
    file_size BIGINT NOT NULL, -- File size in bytes
    file_format file_format NOT NULL,
    mime_type VARCHAR(100),
    
    -- Document Status
    is_required BOOLEAN DEFAULT true, -- Is this a required document?
    is_mandatory BOOLEAN DEFAULT false, -- Is this mandatory for certification?
    verification_status document_verification_status DEFAULT 'PENDING',
    verified_by UUID REFERENCES system_users(id) ON DELETE SET NULL,
    verified_at TIMESTAMP,
    verification_notes TEXT, -- Notes from verifier
    
    -- Expiry Tracking (for time-sensitive documents)
    expiry_date DATE,
    is_expired BOOLEAN DEFAULT false,
    expiry_notification_sent BOOLEAN DEFAULT false,
    
    -- Version Control
    version_number INTEGER DEFAULT 1,
    is_current_version BOOLEAN DEFAULT true,
    previous_version_id UUID REFERENCES operator_documents(id) ON DELETE SET NULL,
    
    -- Upload Metadata
    uploaded_by UUID REFERENCES system_users(id) ON DELETE SET NULL,
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    -- Audit columns
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for operator_documents
CREATE INDEX IF NOT EXISTS idx_operator_documents_operator_id ON operator_documents(operator_id);
CREATE INDEX IF NOT EXISTS idx_operator_documents_category ON operator_documents(document_category);
CREATE INDEX IF NOT EXISTS idx_operator_documents_type ON operator_documents(document_type);
CREATE INDEX IF NOT EXISTS idx_operator_documents_status ON operator_documents(verification_status);
CREATE INDEX IF NOT EXISTS idx_operator_documents_expiry ON operator_documents(expiry_date) WHERE expiry_date IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_operator_documents_current_version ON operator_documents(operator_id, document_type) WHERE is_current_version = true;

-- ============================================================================
-- SECTION B: TEST REPORTS & CERTIFICATES (ARRAY)
-- ============================================================================

-- Test Reports (Array - multiple test reports per product/application)
CREATE TABLE IF NOT EXISTS product_test_reports (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id UUID REFERENCES products(id) ON DELETE CASCADE,
    application_id UUID REFERENCES product_certification_applications(id) ON DELETE CASCADE,
    
    -- Test Report Details
    test_lab_name VARCHAR(255) NOT NULL, -- Testing Laboratory Name
    lab_accreditation VARCHAR(255) NOT NULL, -- Laboratory Accreditation Details
    test_standard VARCHAR(100) NOT NULL, -- Test Standard Used (code and year)
    test_date DATE NOT NULL, -- Date of Testing (within last 3 years)
    sample_description TEXT NOT NULL, -- How sample was obtained
    test_parameters TEXT NOT NULL, -- Parameters Tested (list all)
    test_results_summary TEXT NOT NULL, -- Test Results Summary (Pass/Fail with values)
    pass_fail pass_fail_status NOT NULL, -- Overall Pass/Fail Status
    
    -- File Information
    file_name VARCHAR(255) NOT NULL,
    file_path TEXT NOT NULL,
    file_size BIGINT NOT NULL,
    file_format file_format NOT NULL DEFAULT 'PDF',
    mime_type VARCHAR(100),
    
    -- Status
    verification_status test_report_status DEFAULT 'PENDING',
    verified_by UUID REFERENCES system_users(id) ON DELETE SET NULL,
    verified_at TIMESTAMP,
    verification_notes TEXT,
    
    -- Upload Metadata
    uploaded_by UUID REFERENCES system_users(id) ON DELETE SET NULL,
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    -- Order/Sequence
    display_order INTEGER DEFAULT 0,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for product_test_reports
CREATE INDEX IF NOT EXISTS idx_product_test_reports_product_id ON product_test_reports(product_id);
CREATE INDEX IF NOT EXISTS idx_product_test_reports_application_id ON product_test_reports(application_id);
CREATE INDEX IF NOT EXISTS idx_product_test_reports_test_date ON product_test_reports(test_date);
CREATE INDEX IF NOT EXISTS idx_product_test_reports_status ON product_test_reports(verification_status);

-- Existing Certificates (Array - multiple certificates per product/application)
CREATE TABLE IF NOT EXISTS product_existing_certificates (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id UUID REFERENCES products(id) ON DELETE CASCADE,
    application_id UUID REFERENCES product_certification_applications(id) ON DELETE CASCADE,
    
    -- Certificate Details
    certificate_name VARCHAR(255) NOT NULL, -- Certificate Name/Type (e.g., ISO 9001, HACCP)
    certificate_number VARCHAR(50) NOT NULL,
    issuing_body VARCHAR(255) NOT NULL, -- Issuing Body
    issue_date DATE NOT NULL,
    expiry_date DATE NOT NULL,
    certificate_scope TEXT NOT NULL, -- What is certified
    
    -- File Information
    file_name VARCHAR(255) NOT NULL,
    file_path TEXT NOT NULL,
    file_size BIGINT NOT NULL,
    file_format file_format NOT NULL,
    mime_type VARCHAR(100),
    
    -- Status
    verification_status document_verification_status DEFAULT 'PENDING',
    verified_by UUID REFERENCES system_users(id) ON DELETE SET NULL,
    verified_at TIMESTAMP,
    verification_notes TEXT,
    
    -- Expiry Tracking
    is_expired BOOLEAN DEFAULT false,
    days_until_expiry INTEGER,
    expiry_notification_sent BOOLEAN DEFAULT false,
    
    -- Upload Metadata
    uploaded_by UUID REFERENCES system_users(id) ON DELETE SET NULL,
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    -- Order/Sequence
    display_order INTEGER DEFAULT 0,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for product_existing_certificates
CREATE INDEX IF NOT EXISTS idx_product_certificates_product_id ON product_existing_certificates(product_id);
CREATE INDEX IF NOT EXISTS idx_product_certificates_application_id ON product_existing_certificates(application_id);
CREATE INDEX IF NOT EXISTS idx_product_certificates_expiry ON product_existing_certificates(expiry_date);
CREATE INDEX IF NOT EXISTS idx_product_certificates_status ON product_existing_certificates(verification_status);

-- ============================================================================
-- SECTION C: SUPPLY CHAIN & TRACEABILITY DOCUMENTS
-- ============================================================================

-- Supply Chain Documents (per operator/product)
CREATE TABLE IF NOT EXISTS supply_chain_documents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    operator_id UUID REFERENCES operators(id) ON DELETE CASCADE,
    product_id UUID REFERENCES products(id) ON DELETE CASCADE,
    
    -- Document Type
    document_type operator_document_type NOT NULL CHECK (
        document_type IN (
            'SUPPLIER_LIST',
            'SUPPLIER_EVALUATION',
            'MATERIAL_CERTIFICATE',
            'TRACEABILITY_RECORDS',
            'BATCH_RECORDS',
            'RECALL_PROCEDURE'
        )
    ),
    document_name VARCHAR(255) NOT NULL,
    description TEXT,
    
    -- File Information
    file_name VARCHAR(255) NOT NULL,
    file_path TEXT NOT NULL,
    file_size BIGINT NOT NULL,
    file_format file_format NOT NULL,
    mime_type VARCHAR(100),
    
    -- Status
    verification_status document_verification_status DEFAULT 'PENDING',
    verified_by UUID REFERENCES system_users(id) ON DELETE SET NULL,
    verified_at TIMESTAMP,
    verification_notes TEXT,
    
    -- Upload Metadata
    uploaded_by UUID REFERENCES system_users(id) ON DELETE SET NULL,
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for supply_chain_documents
CREATE INDEX IF NOT EXISTS idx_supply_chain_docs_operator_id ON supply_chain_documents(operator_id);
CREATE INDEX IF NOT EXISTS idx_supply_chain_docs_product_id ON supply_chain_documents(product_id);
CREATE INDEX IF NOT EXISTS idx_supply_chain_docs_type ON supply_chain_documents(document_type);
CREATE INDEX IF NOT EXISTS idx_supply_chain_docs_status ON supply_chain_documents(verification_status);

-- ============================================================================
-- SECTION D: ENVIRONMENTAL DOCUMENTS (EMA ONLY)
-- ============================================================================

-- Environmental Documents (per product - conditional on EMA mark)
CREATE TABLE IF NOT EXISTS environmental_documents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id UUID REFERENCES products(id) ON DELETE CASCADE,
    application_id UUID REFERENCES product_certification_applications(id) ON DELETE CASCADE,
    
    -- Document Type
    document_type operator_document_type NOT NULL CHECK (
        document_type IN (
            'ENVIRONMENTAL_POLICY',
            'ENVIRONMENTAL_MANUAL',
            'LCA_REPORT',
            'CARBON_FOOTPRINT_REPORT',
            'ENERGY_AUDIT',
            'WASTE_AUDIT',
            'RECYCLING_CERTIFICATE',
            'SUSTAINABLE_SOURCING'
        )
    ),
    document_name VARCHAR(255) NOT NULL,
    description TEXT,
    
    -- File Information
    file_name VARCHAR(255) NOT NULL,
    file_path TEXT NOT NULL,
    file_size BIGINT NOT NULL,
    file_format file_format NOT NULL,
    mime_type VARCHAR(100),
    
    -- Status
    verification_status document_verification_status DEFAULT 'PENDING',
    verified_by UUID REFERENCES system_users(id) ON DELETE SET NULL,
    verified_at TIMESTAMP,
    verification_notes TEXT,
    
    -- Upload Metadata
    uploaded_by UUID REFERENCES system_users(id) ON DELETE SET NULL,
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for environmental_documents
CREATE INDEX IF NOT EXISTS idx_environmental_docs_product_id ON environmental_documents(product_id);
CREATE INDEX IF NOT EXISTS idx_environmental_docs_application_id ON environmental_documents(application_id);
CREATE INDEX IF NOT EXISTS idx_environmental_docs_type ON environmental_documents(document_type);
CREATE INDEX IF NOT EXISTS idx_environmental_docs_status ON environmental_documents(verification_status);

-- ============================================================================
-- TRIGGERS & FUNCTIONS
-- ============================================================================

-- Function to check and update expiry status
CREATE OR REPLACE FUNCTION check_document_expiry()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.expiry_date IS NOT NULL THEN
        IF NEW.expiry_date < CURRENT_DATE THEN
            NEW.is_expired := true;
        ELSE
            NEW.is_expired := false;
        END IF;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to check document expiry
CREATE TRIGGER trigger_check_operator_document_expiry
    BEFORE INSERT OR UPDATE ON operator_documents
    FOR EACH ROW
    EXECUTE FUNCTION check_document_expiry();

-- Function to calculate days until expiry for certificates
CREATE OR REPLACE FUNCTION calculate_certificate_expiry()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.expiry_date IS NOT NULL THEN
        NEW.days_until_expiry := NEW.expiry_date - CURRENT_DATE;
        IF NEW.days_until_expiry < 0 THEN
            NEW.is_expired := true;
        ELSE
            NEW.is_expired := false;
        END IF;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to calculate certificate expiry
CREATE TRIGGER trigger_calculate_certificate_expiry
    BEFORE INSERT OR UPDATE ON product_existing_certificates
    FOR EACH ROW
    EXECUTE FUNCTION calculate_certificate_expiry();

-- Function to update updated_at timestamp
CREATE TRIGGER trigger_operator_documents_updated_at
    BEFORE UPDATE ON operator_documents
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER trigger_product_test_reports_updated_at
    BEFORE UPDATE ON product_test_reports
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER trigger_product_certificates_updated_at
    BEFORE UPDATE ON product_existing_certificates
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER trigger_supply_chain_docs_updated_at
    BEFORE UPDATE ON supply_chain_documents
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER trigger_environmental_docs_updated_at
    BEFORE UPDATE ON environmental_documents
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- COMMENTS FOR DOCUMENTATION
-- ============================================================================

COMMENT ON TABLE operator_documents IS 'Operator documents registry - Section A: Mandatory Documents Checklist';
COMMENT ON TABLE product_test_reports IS 'Test reports array - Section B1: Test Reports Details';
COMMENT ON TABLE product_existing_certificates IS 'Existing certificates array - Section B2: Existing Certificates';
COMMENT ON TABLE supply_chain_documents IS 'Supply chain and traceability documents - Section C: Supply Chain & Traceability Documents';
COMMENT ON TABLE environmental_documents IS 'Environmental documents for EMA - Section D: Environmental Documents (EMA Only)';

COMMIT;

