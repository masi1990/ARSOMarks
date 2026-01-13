-- ARSO Marks / Product Certification Application System - OP-002
-- PostgreSQL migration to create product certification tables, enums, and supporting structures.
-- This schema supports FORM OP-002: Product Certification Application
--
-- Sections:
-- A: Application Type Selection
-- B: Product Information (Array Structure)
-- C: Technical Specifications & Compliance
-- D: Environmental Claims (For EMA Only)
-- E: Certification Body Selection
-- F: Declaration & Fees

BEGIN;

-- Extensions (if not already created)
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ============================================================================
-- ENUMERATIONS FOR PRODUCT CERTIFICATION SYSTEM
-- ============================================================================

-- Certification Scheme Type (ACAP Schemes)
CREATE TYPE certification_scheme_type AS ENUM (
    'SCHEME_1_TYPE_TESTING',
    'SCHEME_2_TESTING_SURVEILLANCE',
    'SCHEME_3_TESTING_QUALITY_SYSTEM',
    'SCHEME_4_BATCH_TESTING',
    'SCHEME_5_100_PERCENT_TESTING'
);

-- Application Scope
CREATE TYPE application_scope AS ENUM (
    'SINGLE_PRODUCT',
    'PRODUCT_FAMILY',
    'MULTIPLE_PRODUCTS',
    'FACTORY_PROCESS',
    'MULTIPLE_FACTORIES'
);

-- Certification Type
CREATE TYPE certification_type AS ENUM (
    'NEW_CERTIFICATION',
    'RENEWAL',
    'EXTENSION_NEW_PRODUCTS',
    'TRANSFER_FROM_OTHER_CB',
    'SCOPE_EXTENSION'
);

-- Product Certification Application Status
CREATE TYPE product_certification_status AS ENUM (
    'DRAFT',
    'SUBMITTED',
    'UNDER_REVIEW',
    'PENDING_DOCUMENTS',
    'PENDING_TESTING',
    'PENDING_AUDIT',
    'APPROVED_PENDING_PAYMENT',
    'APPROVED',
    'REJECTED',
    'WITHDRAWN',
    'SUSPENDED',
    'CERTIFIED',
    'EXPIRED'
);

-- Mark Type Requested
CREATE TYPE mark_requested_type AS ENUM (
    'ARSO_QUALITY_MARK',
    'ECO_MARK_AFRICA',
    'BOTH'
);

-- Mark Combination Preference
CREATE TYPE mark_combination_preference AS ENUM (
    'BOTH_MARKS_SAME_PRODUCT',
    'SEPARATE_MARKS_DIFFERENT_PRODUCTS',
    'UNDECIDED'
);

-- Priority Processing
CREATE TYPE priority_processing AS ENUM (
    'YES',
    'NO'
);

-- Expected Timeline
CREATE TYPE expected_timeline AS ENUM (
    'URGENT_1_2_MONTHS',
    'STANDARD_3_4_MONTHS',
    'FLEXIBLE_5_6_MONTHS'
);

-- Product Category
CREATE TYPE product_category AS ENUM (
    'FOOD_BEVERAGE',
    'TEXTILES',
    'ELECTRONICS',
    'CHEMICALS',
    'CONSTRUCTION',
    'MACHINERY',
    'AGRICULTURE',
    'COSMETICS',
    'PHARMACEUTICALS',
    'AUTOMOTIVE',
    'OTHER'
);

-- Target Consumer Groups
CREATE TYPE target_consumer_group AS ENUM (
    'GENERAL_PUBLIC',
    'CHILDREN',
    'ELDERLY',
    'PREGNANT_WOMEN',
    'PROFESSIONALS',
    'INDUSTRIAL_USERS',
    'INSTITUTIONAL',
    'OTHER'
);

-- Packaging Type
CREATE TYPE packaging_type AS ENUM (
    'BOTTLE',
    'BOX',
    'POUCH',
    'BAG',
    'CAN',
    'JAR',
    'BULK',
    'OTHER'
);

-- Standard Compliance Status
CREATE TYPE standard_compliance_status AS ENUM (
    'FULLY_COMPLIANT',
    'PARTIALLY_COMPLIANT',
    'NON_COMPLIANT',
    'UNKNOWN'
);

-- Technical Documentation Status
CREATE TYPE technical_docs_status AS ENUM (
    'COMPLETE',
    'PARTIAL',
    'NONE'
);

-- Test Reports Availability
CREATE TYPE test_reports_availability AS ENUM (
    'YES_ACCREDITED_LAB',
    'YES_NON_ACCREDITED',
    'SOME',
    'NONE'
);

-- Traceability System Status
CREATE TYPE traceability_status AS ENUM (
    'FULL',
    'PARTIAL',
    'NONE'
);

-- Environmental Benefits (EMA)
CREATE TYPE environmental_benefit AS ENUM (
    'ENERGY_EFFICIENT',
    'WATER_EFFICIENT',
    'RECYCLABLE',
    'BIODEGRADABLE',
    'COMPOSTABLE',
    'LOW_EMISSIONS',
    'REDUCED_WASTE',
    'SUSTAINABLE_SOURCING',
    'RENEWABLE_MATERIALS',
    'CARBON_NEUTRAL',
    'OTHER'
);

-- Third-party Verification Status
CREATE TYPE third_party_verification_status AS ENUM (
    'YES',
    'NO',
    'IN_PROGRESS'
);

-- Lifecycle Assessment Type
CREATE TYPE lifecycle_assessment_type AS ENUM (
    'FULL_LCA',
    'PARTIAL_LCA',
    'SCREENING_LCA',
    'NONE'
);

-- Lifecycle Aspects
CREATE TYPE lifecycle_aspect AS ENUM (
    'RAW_MATERIAL_EXTRACTION',
    'MATERIAL_PROCESSING',
    'MANUFACTURING',
    'PACKAGING',
    'DISTRIBUTION',
    'USE_CONSUMPTION',
    'END_OF_LIFE_DISPOSAL',
    'RECYCLING'
);

-- Environmental Management System
CREATE TYPE environmental_management_system AS ENUM (
    'ISO_14001_CERTIFIED',
    'INTERNAL_EMS',
    'NONE'
);

-- Take-back Program Status
CREATE TYPE take_back_program_status AS ENUM (
    'YES',
    'NO',
    'PLANNED'
);

-- Audit Language
CREATE TYPE audit_language AS ENUM (
    'ENGLISH',
    'FRENCH',
    'PORTUGUESE',
    'ARABIC',
    'LOCAL_LANGUAGE'
);

-- Audit Team Size Preference
CREATE TYPE audit_team_size AS ENUM (
    'ONE_AUDITOR',
    'TWO_AUDITORS',
    'FLEXIBLE'
);

-- Volume Unit
CREATE TYPE volume_unit AS ENUM (
    'UNITS',
    'KG',
    'LITERS',
    'TONNES',
    'CONTAINERS',
    'PALLETS',
    'CUBIC_METERS',
    'OTHER'
);

-- ============================================================================
-- SEQUENCES
-- ============================================================================

CREATE SEQUENCE IF NOT EXISTS product_certification_application_seq START 1;

-- ============================================================================
-- SECTION A: APPLICATION TYPE SELECTION
-- ============================================================================

-- Main Product Certification Application Table
CREATE TABLE IF NOT EXISTS product_certification_applications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    application_number VARCHAR(50) UNIQUE, -- Auto-generated: PCA-{country}-{seq}
    
    operator_id UUID NOT NULL REFERENCES operators(id) ON DELETE CASCADE,
    
    -- A1: Mark Selection
    mark_requested mark_requested_type[] NOT NULL, -- Array: at least one required
    arso_quality_mark BOOLEAN DEFAULT false,
    eco_mark_africa BOOLEAN DEFAULT false,
    mark_combination mark_combination_preference,
    
    -- A2: Certification Scheme Details
    scheme_type certification_scheme_type NOT NULL,
    scheme_description TEXT, -- Auto-populated based on scheme (display only)
    application_scope application_scope NOT NULL,
    certification_type certification_type NOT NULL,
    
    -- A3: Volume & Priority
    estimated_volume DECIMAL(15, 2) NOT NULL,
    volume_unit volume_unit NOT NULL,
    peak_month INTEGER CHECK (peak_month >= 1 AND peak_month <= 12), -- 1-12 for months
    priority_processing priority_processing NOT NULL DEFAULT 'NO',
    priority_reason TEXT, -- Conditional: required if priority selected (max 500 chars)
    expected_timeline expected_timeline NOT NULL,
    
    -- Status & Workflow
    status product_certification_status DEFAULT 'DRAFT',
    submitted_at TIMESTAMP,
    approved_at TIMESTAMP,
    rejected_at TIMESTAMP,
    rejection_reason TEXT,
    certified_at TIMESTAMP,
    certificate_number VARCHAR(50),
    
    -- Audit columns
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_by UUID REFERENCES system_users(id) ON DELETE SET NULL,
    updated_by UUID REFERENCES system_users(id) ON DELETE SET NULL
);

-- Indexes for product_certification_applications
CREATE INDEX IF NOT EXISTS idx_product_cert_apps_operator_id ON product_certification_applications(operator_id);
CREATE INDEX IF NOT EXISTS idx_product_cert_apps_status ON product_certification_applications(status);
CREATE INDEX IF NOT EXISTS idx_product_cert_apps_application_number ON product_certification_applications(application_number);
CREATE INDEX IF NOT EXISTS idx_product_cert_apps_scheme_type ON product_certification_applications(scheme_type);

-- ============================================================================
-- SECTION B: PRODUCT INFORMATION (ARRAY STRUCTURE)
-- ============================================================================

-- Products Table (Array - one row per product)
CREATE TABLE IF NOT EXISTS products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    application_id UUID NOT NULL REFERENCES product_certification_applications(id) ON DELETE CASCADE,
    
    -- B1: Basic Product Details
    product_name VARCHAR(200) NOT NULL, -- Product Common/Trade Name
    product_scientific_name VARCHAR(200), -- Scientific/Botanical Name (for agricultural products)
    brand_name VARCHAR(100) NOT NULL,
    model_variant VARCHAR(100) NOT NULL, -- Model/Variant/Type
    product_code VARCHAR(50), -- Internal Product Code/SKU
    hs_code VARCHAR(12) NOT NULL, -- HS Code (6-8 digit)
    hs_description TEXT, -- Auto-populated from HS database (display only)
    product_category product_category NOT NULL,
    
    -- B2: Product Description & Use
    product_description TEXT NOT NULL, -- Detailed Product Description (min 50 chars, max 2000)
    intended_use TEXT NOT NULL, -- Intended Use/Application (max 1000 chars)
    key_features TEXT[], -- Key Features/Selling Points (Tag Input - Array)
    unique_selling_point TEXT, -- Unique Selling Proposition (max 500 chars)
    
    -- B3: Target Market & Consumers
    intended_markets UUID[], -- Target Export Markets (Array of country IDs - AfCFTA countries)
    primary_target_market UUID REFERENCES countries(id) ON DELETE SET NULL,
    target_consumers target_consumer_group[] NOT NULL, -- Multi-select array
    consumer_warnings TEXT, -- Consumer Warnings/Precautions (max 1000 chars)
    shelf_life VARCHAR(50), -- Shelf Life/Expiry Period (Number + Unit)
    storage_conditions TEXT, -- Storage Conditions (max 500 chars)
    
    -- B4: Physical Specifications
    unit_weight VARCHAR(50), -- Unit Weight/Size (Number + Unit)
    dimensions VARCHAR(100), -- Product Dimensions (L×W×H) - Format: length×width×height unit
    color TEXT[], -- Product Color(s) - Tag Input Array
    material_composition TEXT, -- Material Composition (max 1000 chars)
    packaging_type packaging_type NOT NULL,
    packaging_material VARCHAR(100) NOT NULL, -- e.g., Plastic, Glass, Paperboard
    packaging_weight VARCHAR(50), -- Packaging Weight (Number + Unit)
    units_per_package INTEGER CHECK (units_per_package > 0),
    
    -- Order/Sequence in application (for array management)
    display_order INTEGER DEFAULT 0,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for products
CREATE INDEX IF NOT EXISTS idx_products_application_id ON products(application_id);
CREATE INDEX IF NOT EXISTS idx_products_hs_code ON products(hs_code);
CREATE INDEX IF NOT EXISTS idx_products_product_category ON products(product_category);
CREATE INDEX IF NOT EXISTS idx_products_display_order ON products(application_id, display_order);

-- ============================================================================
-- SECTION C: TECHNICAL SPECIFICATIONS & COMPLIANCE
-- ============================================================================

-- C1: Standards & Regulations (per product)
CREATE TABLE IF NOT EXISTS product_technical_specs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    
    -- Standards (Arrays)
    applicable_standards TEXT[] NOT NULL, -- Tag Input - Min 1 standard required
    mandatory_standards TEXT[] NOT NULL, -- Standards required by law
    voluntary_standards TEXT[], -- Standards beyond legal requirements (optional)
    
    -- Compliance Status (per standard - stored as JSONB for flexibility)
    standard_status JSONB, -- {standard_code: compliance_status} mapping
    
    regulatory_body VARCHAR(200) NOT NULL, -- Regulatory Body for Product Category
    regulatory_approval TEXT, -- Existing Regulatory Approvals (max 1000 chars)
    
    -- C2: Technical Documentation
    technical_docs_available technical_docs_status NOT NULL,
    missing_documents TEXT, -- List Missing Technical Documents (max 1000 chars, conditional)
    test_reports_available test_reports_availability NOT NULL,
    test_coverage DECIMAL(5, 2) CHECK (test_coverage >= 0 AND test_coverage <= 100), -- Estimate % of requirements tested
    manufacturing_process TEXT NOT NULL, -- Brief Manufacturing Process Description (max 2000 chars)
    process_flow_diagram BOOLEAN NOT NULL DEFAULT false, -- Process Flow Diagram Available?
    
    -- C3: Components & Supply Chain
    key_components TEXT NOT NULL, -- Key Components/Raw Materials (max 2000 chars)
    critical_components TEXT NOT NULL, -- Critical Components (safety/performance) (max 1000 chars)
    component_sources TEXT NOT NULL, -- Source of Components (max 1000 chars)
    supplier_list_available VARCHAR(20) CHECK (supplier_list_available IN ('YES', 'PARTIAL', 'NO')),
    traceability_system traceability_status NOT NULL,
    batch_traceability traceability_status NOT NULL,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    UNIQUE(product_id) -- One technical spec per product
);

-- Indexes for product_technical_specs
CREATE INDEX IF NOT EXISTS idx_product_technical_specs_product_id ON product_technical_specs(product_id);
CREATE INDEX IF NOT EXISTS idx_product_technical_specs_applicable_standards ON product_technical_specs USING GIN(applicable_standards);

-- ============================================================================
-- SECTION D: ENVIRONMENTAL CLAIMS (FOR EMA ONLY)
-- ============================================================================

-- Environmental Claims (per product - conditional on EMA mark)
CREATE TABLE IF NOT EXISTS product_environmental_claims (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    
    -- D1: Environmental Benefits
    environmental_benefits environmental_benefit[] NOT NULL, -- Multi-select array
    benefit_quantification JSONB, -- {benefit: quantification_data} mapping (max 500 chars per benefit)
    eco_claims_supporting TEXT NOT NULL, -- Supporting Evidence for Environmental Claims (max 2000 chars)
    third_party_verification third_party_verification_status NOT NULL,
    verifier_name VARCHAR(200), -- Conditional: required if third-party verified
    
    -- D2: Lifecycle Assessment
    lifecycle_aspects lifecycle_aspect[] NOT NULL, -- Checkbox Group Array
    lifecycle_assessment lifecycle_assessment_type NOT NULL,
    carbon_footprint BOOLEAN NOT NULL DEFAULT false, -- Carbon Footprint Calculated?
    carbon_value DECIMAL(15, 2), -- Carbon Footprint Value (kg CO₂e/unit) - conditional
    
    -- D3: Environmental Management
    environmental_management environmental_management_system NOT NULL,
    environmental_policy BOOLEAN NOT NULL DEFAULT false, -- Environmental Policy Documented?
    waste_management TEXT NOT NULL, -- Waste Management System (max 1000 chars)
    recycling_info TEXT NOT NULL, -- Recycling/Disposal Information for Consumers (max 1000 chars)
    take_back_program take_back_program_status NOT NULL,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    UNIQUE(product_id) -- One environmental claim record per product
);

-- Indexes for product_environmental_claims
CREATE INDEX IF NOT EXISTS idx_product_environmental_claims_product_id ON product_environmental_claims(product_id);
CREATE INDEX IF NOT EXISTS idx_product_environmental_claims_benefits ON product_environmental_claims USING GIN(environmental_benefits);

-- ============================================================================
-- SECTION E: CERTIFICATION BODY SELECTION
-- ============================================================================

-- CB Selection (per application)
CREATE TABLE IF NOT EXISTS product_certification_cb_selection (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    application_id UUID NOT NULL REFERENCES product_certification_applications(id) ON DELETE CASCADE,
    
    -- E1: CB Preferences
    preferred_cb UUID, -- Preferred Certification Body (references CB/NSB)
    cb_selection_reason TEXT NOT NULL, -- Reason for CB Selection (max 1000 chars)
    previous_cb BOOLEAN NOT NULL DEFAULT false, -- Previously Certified by Another CB?
    previous_cb_name VARCHAR(200), -- Conditional: required if previously certified
    previous_certificate_number VARCHAR(50), -- Conditional: required if previously certified
    
    -- E2: Audit Requirements
    audit_language audit_language NOT NULL,
    audit_timing TEXT NOT NULL, -- Preferred Audit Timing/Constraints (max 500 chars)
    peak_periods TEXT NOT NULL, -- Peak Periods to Avoid (max 500 chars)
    special_requirements TEXT, -- Special Audit Requirements (max 500 chars, optional)
    audit_team_size audit_team_size NOT NULL,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    UNIQUE(application_id) -- One CB selection per application
);

-- Indexes for product_certification_cb_selection
CREATE INDEX IF NOT EXISTS idx_product_cert_cb_selection_application_id ON product_certification_cb_selection(application_id);
CREATE INDEX IF NOT EXISTS idx_product_cert_cb_selection_preferred_cb ON product_certification_cb_selection(preferred_cb);

-- ============================================================================
-- SECTION F: DECLARATION & FEES
-- ============================================================================

-- Applicant Declarations (per application)
CREATE TABLE IF NOT EXISTS product_certification_declarations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    application_id UUID NOT NULL REFERENCES product_certification_applications(id) ON DELETE CASCADE,
    
    -- F1: Applicant Declarations
    truth_declaration BOOLEAN NOT NULL DEFAULT false, -- I declare all information is true
    compliance_commitment BOOLEAN NOT NULL DEFAULT false, -- I commit to maintain compliance
    surveillance_acceptance BOOLEAN NOT NULL DEFAULT false, -- I accept surveillance audits
    corrective_action_commitment BOOLEAN NOT NULL DEFAULT false, -- I commit to implement corrective actions
    market_surveillance_acceptance BOOLEAN NOT NULL DEFAULT false, -- I accept market surveillance
    mark_usage_commitment BOOLEAN NOT NULL DEFAULT false, -- I commit to use ARSO marks only as authorized
    
    -- F2: Fee Acceptance
    fees_acceptance BOOLEAN NOT NULL DEFAULT false, -- I accept the fee structure
    fee_breakdown_acknowledged BOOLEAN NOT NULL DEFAULT false, -- I acknowledge fee breakdown
    payment_terms_accepted BOOLEAN NOT NULL DEFAULT false, -- I accept payment terms
    additional_costs_understood BOOLEAN NOT NULL DEFAULT false, -- I understand additional costs may arise
    
    -- F3: Final Submission
    applicant_name VARCHAR(100) NOT NULL, -- Name of Applicant
    applicant_position VARCHAR(100) NOT NULL, -- Position/Title of Applicant
    applicant_signature TEXT, -- Digital Signature (Signature Pad)
    submission_date DATE NOT NULL DEFAULT CURRENT_DATE,
    submission_time TIME NOT NULL DEFAULT CURRENT_TIME,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    UNIQUE(application_id) -- One declaration record per application
);

-- Indexes for product_certification_declarations
CREATE INDEX IF NOT EXISTS idx_product_cert_declarations_application_id ON product_certification_declarations(application_id);

-- ============================================================================
-- TRIGGERS & FUNCTIONS
-- ============================================================================

-- Function to auto-generate application_number
CREATE OR REPLACE FUNCTION generate_product_cert_application_number()
RETURNS TRIGGER AS $$
DECLARE
    country_code VARCHAR(3);
    seq_num INTEGER;
    operator_country_id UUID;
BEGIN
    IF NEW.application_number IS NULL THEN
        -- Get operator's country
        SELECT country_id INTO operator_country_id
        FROM operators
        WHERE id = NEW.operator_id;
        
        -- Get country ISO code (first 3 chars, uppercase)
        SELECT UPPER(SUBSTRING(iso_code, 1, 3)) INTO country_code
        FROM countries
        WHERE id = operator_country_id;
        
        -- Get next sequence number
        seq_num := nextval('product_certification_application_seq');
        
        -- Format: PCA-{country}-{seq}
        NEW.application_number := 'PCA-' || COALESCE(country_code, 'XXX') || '-' || LPAD(seq_num::TEXT, 6, '0');
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to auto-generate application_number
CREATE TRIGGER trigger_generate_product_cert_application_number
    BEFORE INSERT ON product_certification_applications
    FOR EACH ROW
    EXECUTE FUNCTION generate_product_cert_application_number();

-- Function to update updated_at timestamp
CREATE TRIGGER trigger_product_cert_apps_updated_at
    BEFORE UPDATE ON product_certification_applications
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER trigger_products_updated_at
    BEFORE UPDATE ON products
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER trigger_product_technical_specs_updated_at
    BEFORE UPDATE ON product_technical_specs
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER trigger_product_environmental_claims_updated_at
    BEFORE UPDATE ON product_environmental_claims
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER trigger_product_cert_cb_selection_updated_at
    BEFORE UPDATE ON product_certification_cb_selection
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER trigger_product_cert_declarations_updated_at
    BEFORE UPDATE ON product_certification_declarations
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- COMMENTS FOR DOCUMENTATION
-- ============================================================================

COMMENT ON TABLE product_certification_applications IS 'Main product certification application table - Section A: Application Type Selection';
COMMENT ON TABLE products IS 'Product information array - Section B: Product Information (one row per product)';
COMMENT ON TABLE product_technical_specs IS 'Technical specifications and compliance - Section C: Technical Specifications & Compliance';
COMMENT ON TABLE product_environmental_claims IS 'Environmental claims for EMA - Section D: Environmental Claims (For EMA Only)';
COMMENT ON TABLE product_certification_cb_selection IS 'Certification body selection - Section E: Certification Body Selection';
COMMENT ON TABLE product_certification_declarations IS 'Applicant declarations and fees - Section F: Declaration & Fees';

COMMIT;

