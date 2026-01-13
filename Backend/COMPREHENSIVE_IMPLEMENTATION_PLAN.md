# ARSO MARK CERTIFICATION SYSTEM: COMPREHENSIVE IMPLEMENTATION PLAN

## OVERVIEW

This document outlines the complete staged implementation plan for the ARSO Mark Certification System, covering:

1. **FORM OP-001**: Operator Registration & Profile (KYC Data)
2. **FORM OP-002**: Product Certification Application
3. **FORM OP-003**: Document Upload Center
4. **PHASE 3**: NSB Mark License Application System (NSB-004 series)

---

## SYSTEM ARCHITECTURE

### Backend Stack
- **Framework**: NestJS (TypeScript)
- **Database**: PostgreSQL with JSONB for flexible arrays
- **ORM**: TypeORM
- **Validation**: class-validator, class-transformer
- **File Storage**: Local filesystem (migrate to S3/cloud later)

### Frontend Stack
- **Framework**: Angular (TypeScript)
- **Forms**: Angular Reactive Forms
- **UI**: Tailwind CSS
- **Charts**: Chart.js / ng2-charts (for dashboards)

---

## IMPLEMENTATION STAGES

### **STAGE 1: DATABASE SCHEMA - OPERATOR REGISTRATION (OP-001)** 🗄️
**Duration:** 3-4 days  
**Priority:** Critical Foundation

#### Database Tables Required:

1. **`operators`** - Main operator/company table
   - Company legal info (name, registration, tax ID, etc.)
   - Company size & financial info
   - Ownership & beneficial ownership
   - Status tracking

2. **`operator_contacts`** - Contact information (array support)
   - Primary and alternative contacts
   - Email/phone verification status

3. **`operator_locations`** - Physical locations (array support)
   - Registered address
   - Factory/production locations

4. **`operator_business_sectors`** - Business activities (array)
   - Main sectors, sub-sectors, ISIC codes
   - Product categories, HS codes
   - Revenue percentages

5. **`operator_markets`** - Market reach & trade
   - Domestic markets
   - Export markets (array)
   - Import sources (array)

6. **`operator_production_capacity`** - Production capabilities
   - Capacity, utilization
   - Quality management systems
   - Technical staff

7. **`operator_preferences`** - User preferences & accessibility
   - Language, timezone, currency
   - Communication preferences
   - Accessibility needs

8. **`operator_consents`** - Data & marketing consents
   - Privacy consents
   - Marketing opt-ins
   - Terms acceptance

#### Enums Required:
- `operator_type` - Type of business
- `legal_structure` - Legal entity type
- `employee_count_range` - Company size
- `annual_turnover_range` - Revenue ranges
- `ownership_type` - Ownership classification
- `operator_status` - Registration status

**Deliverables:**
- ✅ Migration file: `014_operator_registration_schema.sql`
- ✅ All table definitions with indexes
- ✅ Foreign key constraints
- ✅ Audit columns (created_at, updated_at, created_by, updated_by)

---

### **STAGE 2: DATABASE SCHEMA - PRODUCT CERTIFICATION (OP-002)** 🗄️
**Duration:** 3-4 days  
**Priority:** Critical Foundation

#### Database Tables Required:

1. **`product_certification_applications`** - Main application table
   - Application type, scheme, scope
   - Volume, priority, timeline
   - Status workflow

2. **`products`** - Product information (array support)
   - Basic product details
   - Description, intended use
   - Target markets, consumers
   - Physical specifications

3. **`product_technical_specs`** - Technical specifications
   - Applicable standards (array)
   - Regulatory approvals
   - Technical documentation status

4. **`product_components`** - Components & supply chain
   - Key components, raw materials
   - Component sources
   - Supplier information

5. **`product_environmental_claims`** - Environmental benefits (EMA)
   - Environmental benefits (array)
   - Lifecycle assessment
   - Carbon footprint

6. **`product_certification_cb_selection`** - CB preferences
   - Preferred CB
   - Audit requirements
   - Language preferences

7. **`product_certification_declarations`** - Applicant declarations
   - Truth declaration
   - Compliance commitments
   - Fee acceptance

#### Enums Required:
- `certification_scheme_type` - ACAP scheme types
- `application_scope` - Single product, family, etc.
- `certification_type` - New, renewal, extension
- `product_category` - Product categories
- `application_status` - Workflow status

**Deliverables:**
- ✅ Migration file: `015_product_certification_schema.sql`
- ✅ All table definitions
- ✅ Relationships to operators table
- ✅ Indexes for performance

---

### **STAGE 3: DATABASE SCHEMA - DOCUMENT UPLOAD CENTER (OP-003)** 🗄️
**Duration:** 2-3 days  
**Priority:** High

#### Database Tables Required:

1. **`operator_documents`** - Document registry
   - Document type, category
   - File metadata
   - Upload status, verification

2. **`product_test_reports`** - Test reports (array)
   - Lab information
   - Test standards, dates
   - Results, pass/fail status

3. **`product_existing_certificates`** - Existing certificates (array)
   - Certificate details
   - Issuing body, dates
   - Scope

4. **`supply_chain_documents`** - Supply chain docs
   - Supplier lists
   - Material certificates
   - Traceability records

5. **`environmental_documents`** - Environmental docs (EMA)
   - Environmental policy
   - LCA reports
   - Carbon footprint reports

#### Enums Required:
- `document_category` - Legal, Quality, Technical, Environmental
- `document_type` - Specific document types
- `document_verification_status` - Verification workflow
- `test_report_status` - Test report status

**Deliverables:**
- ✅ Migration file: `016_document_upload_schema.sql`
- ✅ File storage structure
- ✅ Document versioning support
- ✅ Expiry tracking

---

### **STAGE 4: BACKEND ENTITIES & DTOs - OPERATOR SYSTEM** 📝
**Duration:** 4-5 days  
**Priority:** High

#### Backend Tasks:

1. **Entities** (`src/modules/operator/entities/`)
   - `operator.entity.ts`
   - `operator-contact.entity.ts`
   - `operator-location.entity.ts`
   - `operator-business-sector.entity.ts`
   - `operator-market.entity.ts`
   - `operator-production-capacity.entity.ts`
   - `operator-preference.entity.ts`
   - `operator-consent.entity.ts`

2. **DTOs** (`src/modules/operator/dtos/`)
   - `create-operator-registration.dto.ts` (Section A: Company Info)
   - `update-operator-registration.dto.ts`
   - `operator-contact.dto.ts` (Section B: Contact Info)
   - `operator-location.dto.ts`
   - `operator-business-activity.dto.ts` (Section C: Business Activities)
   - `operator-market.dto.ts`
   - `operator-production.dto.ts`
   - `operator-preference.dto.ts` (Section D: Preferences)
   - `operator-consent.dto.ts`
   - `submit-operator-registration.dto.ts`

3. **Validation Rules**
   - Custom validators for conditional fields
   - Array validators (sectors, markets, locations)
   - Email/phone format validators
   - Percentage sum validators (revenue must equal 100%)

**Deliverables:**
- ✅ All entity files with TypeORM decorators
- ✅ All DTO files with validation decorators
- ✅ Custom validation pipes
- ✅ Type-safe models

---

### **STAGE 5: BACKEND ENTITIES & DTOs - PRODUCT CERTIFICATION** 📝
**Duration:** 4-5 days  
**Priority:** High

#### Backend Tasks:

1. **Entities** (`src/modules/product-certification/entities/`)
   - `product-certification-application.entity.ts`
   - `product.entity.ts`
   - `product-technical-spec.entity.ts`
   - `product-component.entity.ts`
   - `product-environmental-claim.entity.ts`
   - `product-cb-selection.entity.ts`
   - `product-certification-declaration.entity.ts`

2. **DTOs** (`src/modules/product-certification/dtos/`)
   - `create-product-certification-application.dto.ts`
   - `product-dto.ts` (array support)
   - `product-technical-spec.dto.ts`
   - `product-component.dto.ts`
   - `product-environmental-claim.dto.ts`
   - `product-cb-selection.dto.ts`
   - `product-declaration.dto.ts`
   - `submit-product-certification.dto.ts`

3. **Validation Rules**
   - Product array validation
   - Standards array validation
   - Environmental claims validation (EMA only)
   - HS code format validation

**Deliverables:**
- ✅ All entity files
- ✅ All DTO files with validation
- ✅ Complex validation logic

---

### **STAGE 6: BACKEND SERVICES - OPERATOR & PRODUCT SYSTEMS** 🔧
**Duration:** 5-6 days  
**Priority:** High

#### Backend Tasks:

1. **OperatorService** (`src/modules/operator/services/`)
   - `createOperatorRegistration()` - Create new registration
   - `updateOperatorRegistration()` - Update draft
   - `submitOperatorRegistration()` - Submit for review
   - `getOperatorById()` - Get operator profile
   - `validateOperatorData()` - Business rule validation
   - `verifyContactInfo()` - Email/phone verification
   - `calculateCompanyAge()` - Auto-calculate from year established
   - `calculateSMECategory()` - Auto-classify SME

2. **ProductCertificationService** (`src/modules/product-certification/services/`)
   - `createApplication()` - Create new application
   - `updateApplication()` - Update draft
   - `submitApplication()` - Submit for review
   - `getApplicationById()` - Get application
   - `validateApplication()` - Business rules
   - `generateApplicationNumber()` - Auto-generate reference
   - `validateProductArray()` - Validate product data
   - `checkStandardsCompliance()` - Standards validation

3. **DocumentService** (extend existing)
   - `uploadOperatorDocument()` - Upload with categorization
   - `uploadProductDocument()` - Product-specific docs
   - `uploadTestReport()` - Test report with metadata
   - `uploadCertificate()` - Existing certificate
   - `getDocumentsByCategory()` - Retrieve by category
   - `verifyDocument()` - Document verification workflow

**Deliverables:**
- ✅ All service files with business logic
- ✅ Error handling
- ✅ Transaction management
- ✅ Audit logging

---

### **STAGE 7: BACKEND CONTROLLERS - OPERATOR & PRODUCT APIs** 🌐
**Duration:** 3-4 days  
**Priority:** High

#### Backend Tasks:

1. **OperatorController** (`src/modules/operator/controllers/`)
   - `POST /api/operators/register` - Create registration
   - `GET /api/operators/:id` - Get operator profile
   - `PUT /api/operators/:id` - Update registration
   - `POST /api/operators/:id/submit` - Submit for review
   - `GET /api/operators` - List operators (with filters)
   - `POST /api/operators/:id/verify-email` - Verify email
   - `POST /api/operators/:id/verify-phone` - Verify phone

2. **ProductCertificationController** (`src/modules/product-certification/controllers/`)
   - `POST /api/product-certifications/applications` - Create application
   - `GET /api/product-certifications/applications/:id` - Get application
   - `PUT /api/product-certifications/applications/:id` - Update application
   - `POST /api/product-certifications/applications/:id/submit` - Submit
   - `GET /api/product-certifications/applications` - List applications
   - `GET /api/product-certifications/applications/:id/products` - Get products

3. **DocumentUploadController** (extend existing)
   - `POST /api/documents/operators/:operatorId/upload` - Upload operator doc
   - `POST /api/documents/products/:productId/upload` - Upload product doc
   - `POST /api/documents/test-reports` - Upload test report
   - `POST /api/documents/certificates` - Upload certificate
   - `GET /api/documents/operators/:operatorId` - List operator docs
   - `GET /api/documents/products/:productId` - List product docs
   - `GET /api/documents/:id/download` - Download document

**Deliverables:**
- ✅ All controller files
- ✅ Route guards and permissions
- ✅ Swagger/OpenAPI documentation
- ✅ Error responses

---

### **STAGE 8: FRONTEND MODELS & SERVICES** 📦
**Duration:** 2-3 days  
**Priority:** High

#### Frontend Tasks:

1. **Models** (`Frontend/src/app/models/`)
   - `operator-registration.model.ts`
   - `operator-contact.model.ts`
   - `operator-location.model.ts`
   - `operator-business-sector.model.ts`
   - `product-certification-application.model.ts`
   - `product.model.ts`
   - `document.model.ts`

2. **Services** (`Frontend/src/app/services/`)
   - `operator-registration.service.ts`
   - `product-certification.service.ts`
   - `document-upload.service.ts`

**Deliverables:**
- ✅ All model files
- ✅ All service files with HTTP methods
- ✅ Error handling
- ✅ Type safety

---

### **STAGE 9: FRONTEND - OPERATOR REGISTRATION FORM (OP-001)** 📋
**Duration:** 6-7 days  
**Priority:** High

#### Frontend Tasks:

1. **Operator Registration Component** (`Frontend/src/app/pages/operator/`)
   - Multi-step form wizard:
     - **Step 1**: Section A - Basic Company Information
     - **Step 2**: Section B - Contact & Location Information
     - **Step 3**: Section C - Business Activities & Markets
     - **Step 4**: Section D - Preferences & Consent
   - Dynamic arrays (sectors, locations, markets)
   - Conditional fields (based on selections)
   - Auto-calculations (company age, SME category)
   - Save as draft functionality
   - Form validation
   - File upload integration

2. **Sub-components**:
   - `company-info-section.component.ts`
   - `contact-location-section.component.ts`
   - `business-activities-section.component.ts`
   - `preferences-consent-section.component.ts`
   - `factory-location-array.component.ts` (reusable)
   - `business-sector-array.component.ts` (reusable)

**Deliverables:**
- ✅ Complete multi-step form
- ✅ Reactive forms with validation
- ✅ Array management UI
- ✅ Responsive design
- ✅ Auto-save draft

---

### **STAGE 10: FRONTEND - PRODUCT CERTIFICATION FORM (OP-002)** 📋
**Duration:** 7-8 days  
**Priority:** High

#### Frontend Tasks:

1. **Product Certification Component** (`Frontend/src/app/pages/product-certification/`)
   - Multi-step form wizard:
     - **Step 1**: Section A - Application Type Selection
     - **Step 2**: Section B - Product Information (array)
     - **Step 3**: Section C - Technical Specifications
     - **Step 4**: Section D - Environmental Claims (conditional - EMA only)
     - **Step 5**: Section E - Certification Body Selection
     - **Step 6**: Section F - Declarations & Fees
   - Product array management (add/remove/edit products)
   - Standards array (tag input with auto-suggest)
   - Environmental claims (conditional section)
   - File upload for technical docs
   - Form validation

2. **Sub-components**:
   - `application-type-section.component.ts`
   - `product-array-section.component.ts`
   - `product-details-form.component.ts` (reusable for each product)
   - `technical-specs-section.component.ts`
   - `environmental-claims-section.component.ts` (conditional)
   - `cb-selection-section.component.ts`
   - `declarations-section.component.ts`

**Deliverables:**
- ✅ Complete multi-step form
- ✅ Product array management
- ✅ Conditional sections
- ✅ File upload integration
- ✅ Responsive design

---

### **STAGE 11: FRONTEND - DOCUMENT UPLOAD CENTER (OP-003)** 📎
**Duration:** 4-5 days  
**Priority:** High

#### Frontend Tasks:

1. **Document Upload Center Component** (`Frontend/src/app/pages/documents/`)
   - Tabbed interface:
     - **Tab 1**: Mandatory Documents Checklist
       - Company & Legal Documents
       - Quality Management Documents
       - Technical & Production Documents
     - **Tab 2**: Test Reports & Certificates (array)
     - **Tab 3**: Supply Chain & Traceability
     - **Tab 4**: Environmental Documents (conditional - EMA)
   - Document upload with drag & drop
   - Progress tracking
   - Document status indicators
   - Download functionality
   - Document verification status

2. **Sub-components**:
   - `document-checklist.component.ts`
   - `test-report-array.component.ts`
   - `certificate-array.component.ts`
   - `document-upload-item.component.ts` (reusable)
   - `document-status-badge.component.ts`

**Deliverables:**
- ✅ Complete document center
- ✅ File upload with progress
- ✅ Document management UI
- ✅ Status tracking
- ✅ Responsive design

---

### **STAGE 12: FRONTEND - DASHBOARDS & LISTS** 📈
**Duration:** 3-4 days  
**Priority:** Medium

#### Frontend Tasks:

1. **Operator Dashboard** (`Frontend/src/app/pages/operator/dashboard/`)
   - Registration status
   - Profile completeness indicator
   - Quick actions
   - Recent activity

2. **Product Certification Dashboard** (`Frontend/src/app/pages/product-certification/dashboard/`)
   - Application status overview
   - Products list
   - Certification progress
   - Timeline

3. **Document Center Dashboard** (`Frontend/src/app/pages/documents/dashboard/`)
   - Document upload progress
   - Missing documents alert
   - Verification status
   - Expiry alerts

**Deliverables:**
- ✅ All dashboard components
- ✅ Status indicators
- ✅ Quick actions
- ✅ Responsive design

---

### **STAGE 13: ROUTING & NAVIGATION** 🧭
**Duration:** 1-2 days  
**Priority:** Medium

#### Frontend Tasks:

1. **Routing Configuration**
   - `/operator/register` - Operator registration
   - `/operator/profile` - View/edit profile
   - `/operator/dashboard` - Operator dashboard
   - `/product-certification/apply` - New application
   - `/product-certification/applications` - Applications list
   - `/product-certification/applications/:id` - View application
   - `/documents/upload` - Document upload center
   - `/documents/list` - Documents list
   - Route guards for OPERATOR role

**Deliverables:**
- ✅ Routing module
- ✅ Route guards
- ✅ Navigation menu updates

---

### **STAGE 14: INTEGRATION & TESTING** 🧪
**Duration:** 4-5 days  
**Priority:** High

#### Tasks:

1. **Backend Testing**
   - Unit tests for services
   - Integration tests for controllers
   - Database transaction tests
   - File upload tests
   - Validation tests

2. **Frontend Testing**
   - Component unit tests
   - Service tests
   - Form validation tests
   - E2E tests (critical flows)

3. **Integration Testing**
   - End-to-end operator registration flow
   - End-to-end product certification flow
   - Document upload/download flow
   - Form submission workflows

**Deliverables:**
- ✅ Test coverage > 70%
- ✅ All critical paths tested
- ✅ Bug fixes

---

### **STAGE 15: UI/UX POLISH & ACCESSIBILITY** 🎨
**Duration:** 3-4 days  
**Priority:** Medium

#### Frontend Tasks:

1. **Styling & Theming**
   - Consistent design system
   - Responsive breakpoints
   - Loading states
   - Error states
   - Success messages
   - Form field styling

2. **Accessibility**
   - ARIA labels
   - Keyboard navigation
   - Screen reader support
   - Color contrast
   - Focus management

**Deliverables:**
- ✅ Polished UI
- ✅ Accessibility compliance
- ✅ Mobile responsive

---

### **STAGE 16: DOCUMENTATION & DEPLOYMENT** 📚
**Duration:** 2 days  
**Priority:** Medium

#### Tasks:

1. **Documentation**
   - API documentation (Swagger)
   - User guide for operators
   - Developer guide
   - Database schema documentation
   - Form field reference guide

2. **Deployment Preparation**
   - Environment configuration
   - Migration scripts
   - Deployment checklist

**Deliverables:**
- ✅ Complete documentation
- ✅ Deployment guide

---

## TECHNICAL ARCHITECTURE DECISIONS

### **Database Design:**
- **Arrays**: Use JSONB columns for flexible arrays (sectors, markets, products)
- **Relationships**: Foreign keys with CASCADE where appropriate
- **Indexes**: Index on frequently queried fields (operator_id, application_id, status)
- **Audit Trail**: created_at, updated_at, created_by, updated_by on all tables

### **Backend Design:**
- **Module Structure**: Separate modules for operator, product-certification, documents
- **Validation**: class-validator with custom validators for complex rules
- **Error Handling**: Global exception filters with consistent error responses
- **File Storage**: Organized by entity type and ID (uploads/operators/{id}/, uploads/products/{id}/)

### **Frontend Design:**
- **Form Architecture**: Multi-step wizards with save-as-draft
- **Array Management**: Reusable components for dynamic arrays
- **State Management**: Services with RxJS for reactive data
- **File Upload**: Angular HTTP with progress tracking

---

## DEPENDENCIES & INTEGRATIONS

### **Existing System Integration:**
- User Authentication - JWT tokens (OPERATOR role)
- Reference Data - Countries, ACAP schemes, HS codes, ISIC codes
- Document Management - File upload service
- NSB Management - For CB selection in product certification

### **External Dependencies:**
- HS Code database/API (for product categorization)
- ISIC Code database (for business sector classification)
- Email service (for verification)
- SMS service (for phone verification)
- PDF generation (for certificates)

---

## RISK MITIGATION

### **Technical Risks:**
1. **Complex Array Management** → Use JSONB with proper indexing and validation
2. **Large Form Data** → Implement pagination/sections, save-as-draft
3. **File Upload Performance** → Implement chunked uploads, progress tracking
4. **Concurrent Edits** → Optimistic locking, version tracking

### **Business Risks:**
1. **Data Validation** → Comprehensive validation rules, server-side validation
2. **KYC Compliance** → Structured data collection, verification workflows
3. **Document Management** → Version control, expiry tracking, verification status

---

## SUCCESS CRITERIA

✅ All 3 operator/product forms implemented and functional  
✅ Complete CRUD operations for all entities  
✅ File upload/download working  
✅ Multi-step forms with save-as-draft  
✅ Array management (sectors, products, documents)  
✅ Conditional fields working correctly  
✅ Auto-calculations (company age, SME category)  
✅ Mobile responsive  
✅ Test coverage > 70%  
✅ Documentation complete  
✅ Production-ready deployment

---

## ESTIMATED TIMELINE

**Total Duration:** 10-12 weeks

- Stages 1-3 (Database Schema): 2 weeks
- Stages 4-7 (Backend Core): 3 weeks
- Stages 8-11 (Frontend Core): 4 weeks
- Stages 12-16 (Polish & Deploy): 2-3 weeks

---

## NEXT STEPS

1. ✅ Review and approve this plan
2. Begin Stage 1: Database Schema for Operator Registration
3. Daily standups to track progress
4. Weekly demos for stakeholder feedback

---

**Document Version:** 1.0  
**Last Updated:** 2025-01-15  
**Author:** Development Team

