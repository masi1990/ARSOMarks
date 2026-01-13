# PHASE 3: NSB AS LICENSEE - MARK APPLICATION SYSTEM
## Comprehensive Implementation Plan

---

## OVERVIEW

This document outlines the staged implementation plan for the NSB Mark License Application System (Phase 3), covering both backend and frontend development.

**System Components:**
- NSB-004-1: Mark License Application (Initial Request)
- NSB-004-2: License Agreement & Execution
- NSB-004-3: Annual Mark Usage Report
- NSB-004-4: License Modification Request
- NSB-004-DASH: License Management Dashboard

---

## IMPLEMENTATION STAGES

### **STAGE 1: Database Schema & Core Entities** ⚙️
**Duration:** 2-3 days  
**Priority:** Critical Foundation

#### Backend Tasks:
1. **Database Migration (013_mark_license_schema.sql)**
   - Create `mark_license_applications` table
   - Create `mark_license_agreements` table
   - Create `mark_license_usage_reports` table
   - Create `mark_license_modifications` table
   - Create `mark_license_media_usage` table (array support)
   - Create `mark_license_timeline` table (array support)
   - Create `mark_license_placements` table (mockups)
   - Create `mark_license_assets` table (digital assets)
   - Create `mark_license_compliance` table
   - Create supporting enums and sequences

2. **TypeORM Entities**
   - `MarkLicenseApplication.entity.ts`
   - `MarkLicenseAgreement.entity.ts`
   - `MarkLicenseUsageReport.entity.ts`
   - `MarkLicenseModification.entity.ts`
   - `MarkLicenseMediaUsage.entity.ts`
   - `MarkLicenseTimeline.entity.ts`
   - `MarkLicensePlacement.entity.ts`
   - `MarkLicenseAsset.entity.ts`
   - `MarkLicenseCompliance.entity.ts`

3. **Enums & Constants**
   - `MarkLicenseType` enum
   - `MarkLicenseStatus` enum
   - `MediaType` enum
   - `MarkType` enum (ARSO, EMA, Both)
   - `AgreementStatus` enum
   - `ReportStatus` enum

**Deliverables:**
- ✅ Database migration file
- ✅ All entity files
- ✅ Enum definitions
- ✅ Database indexes and constraints

---

### **STAGE 2: Backend DTOs & Validation** 📝
**Duration:** 2-3 days  
**Priority:** High

#### Backend Tasks:
1. **Application DTOs (NSB-004-1)**
   - `CreateMarkLicenseApplicationDto.ts`
   - `UpdateMarkLicenseApplicationDto.ts`
   - `PromotionalLicenseDetailsDto.ts`
   - `CertificationBodyLicenseDetailsDto.ts`
   - `SpecialProjectLicenseDetailsDto.ts`
   - `MediaUsageDto.ts` (array)
   - `TimelineDto.ts` (array)
   - `PlacementExampleDto.ts` (array)

2. **Agreement DTOs (NSB-004-2)**
   - `CreateMarkLicenseAgreementDto.ts`
   - `SignAgreementDto.ts`
   - `RequestAssetsDto.ts`

3. **Report DTOs (NSB-004-3)**
   - `CreateMarkUsageReportDto.ts`
   - `PromotionalUsageMetricsDto.ts`
   - `CertificationUsageMetricsDto.ts`
   - `ImpactAssessmentDto.ts`

4. **Modification DTOs (NSB-004-4)**
   - `CreateLicenseModificationDto.ts`
   - `ApproveModificationDto.ts`

5. **Validation Pipes**
   - Custom validators for conditional fields
   - Array validators
   - File upload validators

**Deliverables:**
- ✅ All DTO files with validation decorators
- ✅ Custom validation pipes
- ✅ Type-safe request/response models

---

### **STAGE 3: Backend Services & Business Logic** 🔧
**Duration:** 4-5 days  
**Priority:** High

#### Backend Tasks:
1. **MarkLicenseApplicationService**
   - `createApplication()` - Create new application
   - `updateApplication()` - Update draft application
   - `submitApplication()` - Submit for review
   - `getApplicationById()` - Get single application
   - `getApplicationsByNsb()` - List NSB's applications
   - `validateApplication()` - Business rule validation
   - `generateApplicationNumber()` - Auto-generate reference

2. **MarkLicenseAgreementService**
   - `generateAgreement()` - Create agreement from approved application
   - `signAgreement()` - Electronic signature process
   - `getAgreementById()` - Retrieve agreement
   - `getActiveAgreements()` - List active licenses
   - `checkExpiry()` - Expiry monitoring

3. **MarkUsageReportService**
   - `createReport()` - Submit annual report
   - `updateReport()` - Update draft report
   - `getReportById()` - Get single report
   - `getReportsByLicense()` - List all reports for license
   - `validateReportCompleteness()` - Check required fields

4. **MarkLicenseModificationService**
   - `requestModification()` - Create modification request
   - `approveModification()` - Approve and apply changes
   - `rejectModification()` - Reject with reason
   - `getModificationHistory()` - Track all modifications

5. **MarkAssetService**
   - `requestAssets()` - Request digital assets
   - `deliverAssets()` - Provide download links
   - `trackDownloads()` - Audit trail
   - `getAssetLibrary()` - List available assets

6. **ComplianceService**
   - `checkCompliance()` - Validate usage compliance
   - `flagNonCompliance()` - Mark violations
   - `generateComplianceReport()` - Summary report

**Deliverables:**
- ✅ All service files with business logic
- ✅ Error handling
- ✅ Transaction management
- ✅ Audit logging

---

### **STAGE 4: Backend Controllers & API Endpoints** 🌐
**Duration:** 2-3 days  
**Priority:** High

#### Backend Tasks:
1. **MarkLicenseApplicationController**
   - `POST /api/mark-licenses/applications` - Create application
   - `GET /api/mark-licenses/applications/:id` - Get application
   - `PUT /api/mark-licenses/applications/:id` - Update application
   - `POST /api/mark-licenses/applications/:id/submit` - Submit
   - `GET /api/mark-licenses/applications` - List applications
   - `DELETE /api/mark-licenses/applications/:id` - Delete draft

2. **MarkLicenseAgreementController**
   - `POST /api/mark-licenses/agreements` - Generate agreement
   - `GET /api/mark-licenses/agreements/:id` - Get agreement
   - `POST /api/mark-licenses/agreements/:id/sign` - Sign agreement
   - `GET /api/mark-licenses/agreements` - List agreements
   - `GET /api/mark-licenses/agreements/:id/download` - Download PDF

3. **MarkUsageReportController**
   - `POST /api/mark-licenses/reports` - Create report
   - `GET /api/mark-licenses/reports/:id` - Get report
   - `PUT /api/mark-licenses/reports/:id` - Update report
   - `POST /api/mark-licenses/reports/:id/submit` - Submit report
   - `GET /api/mark-licenses/reports` - List reports

4. **MarkLicenseModificationController**
   - `POST /api/mark-licenses/modifications` - Request modification
   - `GET /api/mark-licenses/modifications/:id` - Get modification
   - `POST /api/mark-licenses/modifications/:id/approve` - Approve
   - `POST /api/mark-licenses/modifications/:id/reject` - Reject

5. **MarkAssetController**
   - `POST /api/mark-licenses/assets/request` - Request assets
   - `GET /api/mark-licenses/assets` - List available assets
   - `GET /api/mark-licenses/assets/:id/download` - Download asset
   - `GET /api/mark-licenses/assets/download-history` - Audit trail

6. **MarkLicenseDashboardController**
   - `GET /api/mark-licenses/dashboard/overview` - Dashboard data
   - `GET /api/mark-licenses/dashboard/analytics` - Usage analytics
   - `GET /api/mark-licenses/dashboard/compliance` - Compliance status
   - `GET /api/mark-licenses/dashboard/calendar` - Deadlines calendar

**Deliverables:**
- ✅ All controller files
- ✅ Route guards and permissions
- ✅ Swagger/OpenAPI documentation
- ✅ Error responses

---

### **STAGE 5: File Upload & Document Management** 📎
**Duration:** 2 days  
**Priority:** Medium

#### Backend Tasks:
1. **File Upload Service**
   - Extend existing `DocumentService`
   - Support multiple file types (PDF, images, videos)
   - File size validation
   - Virus scanning integration
   - Storage organization by license ID

2. **Document Management**
   - Version control for documents
   - Document expiry tracking
   - OCR capability (future)
   - Watermarking (future)

**Deliverables:**
- ✅ Enhanced document service
- ✅ File upload endpoints
- ✅ Document retrieval endpoints

---

### **STAGE 6: Frontend Models & Services** 📦
**Duration:** 2-3 days  
**Priority:** High

#### Frontend Tasks:
1. **Models (TypeScript Interfaces)**
   - `mark-license-application.model.ts`
   - `mark-license-agreement.model.ts`
   - `mark-usage-report.model.ts`
   - `mark-license-modification.model.ts`
   - `mark-asset.model.ts`
   - `dashboard.model.ts`

2. **Services**
   - `mark-license-application.service.ts`
   - `mark-license-agreement.service.ts`
   - `mark-usage-report.service.ts`
   - `mark-license-modification.service.ts`
   - `mark-asset.service.ts`
   - `mark-license-dashboard.service.ts`

**Deliverables:**
- ✅ All model files
- ✅ All service files with HTTP methods
- ✅ Error handling
- ✅ Type safety

---

### **STAGE 7: Frontend Form Components (NSB-004-1)** 📋
**Duration:** 4-5 days  
**Priority:** High

#### Frontend Tasks:
1. **Mark License Application Component**
   - Section A: Applicant & License Type
   - Section B: Intended Use Details (with arrays)
   - Section C: Mark Usage Specifications
   - Section D: Supporting Documents
   - Form validation
   - Save as draft
   - Submit functionality
   - File upload integration

2. **Dynamic Form Sections**
   - Conditional fields based on license type
   - Array management (add/remove media, timeline)
   - Multi-step form wizard (optional)
   - Auto-save draft

**Deliverables:**
- ✅ Complete form component
- ✅ Reactive forms with validation
- ✅ File upload UI
- ✅ Responsive design

---

### **STAGE 8: Frontend Agreement Component (NSB-004-2)** ✍️
**Duration:** 2-3 days  
**Priority:** High

#### Frontend Tasks:
1. **License Agreement Component**
   - Agreement display
   - Terms and conditions viewer
   - Electronic signature interface
   - Asset request form
   - Agreement status tracking

**Deliverables:**
- ✅ Agreement component
- ✅ E-signature flow
- ✅ Asset request UI

---

### **STAGE 9: Frontend Report Component (NSB-004-3)** 📊
**Duration:** 3-4 days  
**Priority:** High

#### Frontend Tasks:
1. **Annual Usage Report Component**
   - Usage metrics arrays
   - Impact assessment form
   - Compliance declaration
   - Supporting evidence upload
   - Report submission

**Deliverables:**
- ✅ Report form component
- ✅ Dynamic metric arrays
- ✅ File attachments

---

### **STAGE 10: Frontend Modification Component (NSB-004-4)** 🔄
**Duration:** 2 days  
**Priority:** Medium

#### Frontend Tasks:
1. **License Modification Component**
   - Modification type selection
   - Change request form
   - Justification upload
   - Status tracking

**Deliverables:**
- ✅ Modification request component

---

### **STAGE 11: Frontend Dashboard (NSB-004-DASH)** 📈
**Duration:** 4-5 days  
**Priority:** High

#### Frontend Tasks:
1. **License Management Dashboard**
   - Widget 1: License Status Overview (table/grid)
   - Widget 2: Mark Asset Library (file browser)
   - Widget 3: Compliance Calendar (timeline)
   - Widget 4: Usage Analytics (charts)
   - Filters and search
   - Quick actions

2. **Charts & Visualizations**
   - Usage over time (line chart)
   - Media type breakdown (pie chart)
   - Compliance score (gauge)
   - Campaign effectiveness (bar chart)

**Deliverables:**
- ✅ Dashboard component
- ✅ Chart components (using Chart.js or similar)
- ✅ Responsive grid layout
- ✅ Interactive widgets

---

### **STAGE 12: Routing & Navigation** 🧭
**Duration:** 1-2 days  
**Priority:** Medium

#### Frontend Tasks:
1. **Routing Configuration**
   - `/mark-licenses/apply` - Application form
   - `/mark-licenses/agreements/:id` - View agreement
   - `/mark-licenses/reports` - Reports list
   - `/mark-licenses/reports/new` - New report
   - `/mark-licenses/modifications` - Modifications
   - `/mark-licenses/dashboard` - Main dashboard
   - Route guards for NSB users

**Deliverables:**
- ✅ Routing module
- ✅ Route guards
- ✅ Navigation menu updates

---

### **STAGE 13: Integration & Testing** 🧪
**Duration:** 3-4 days  
**Priority:** High

#### Tasks:
1. **Backend Testing**
   - Unit tests for services
   - Integration tests for controllers
   - Database transaction tests
   - File upload tests

2. **Frontend Testing**
   - Component unit tests
   - Service tests
   - Form validation tests
   - E2E tests (critical flows)

3. **Integration Testing**
   - End-to-end application flow
   - File upload/download
   - Agreement signing flow
   - Report submission flow

**Deliverables:**
- ✅ Test coverage > 70%
   - ✅ All critical paths tested
   - ✅ Bug fixes

---

### **STAGE 14: UI/UX Polish & Accessibility** 🎨
**Duration:** 2-3 days  
**Priority:** Medium

#### Frontend Tasks:
1. **Styling & Theming**
   - Consistent design system
   - Responsive breakpoints
   - Loading states
   - Error states
   - Success messages

2. **Accessibility**
   - ARIA labels
   - Keyboard navigation
   - Screen reader support
   - Color contrast

**Deliverables:**
- ✅ Polished UI
- ✅ Accessibility compliance
- ✅ Mobile responsive

---

### **STAGE 15: Documentation & Deployment** 📚
**Duration:** 2 days  
**Priority:** Medium

#### Tasks:
1. **Documentation**
   - API documentation (Swagger)
   - User guide
   - Developer guide
   - Database schema documentation

2. **Deployment Preparation**
   - Environment configuration
   - Migration scripts
   - Deployment checklist

**Deliverables:**
- ✅ Complete documentation
- ✅ Deployment guide

---

## TECHNICAL ARCHITECTURE DECISIONS

### **Backend:**
- **Module Name:** `mark-licensing` (separate from existing `licensing` module)
- **Database:** PostgreSQL with JSONB for flexible arrays
- **File Storage:** Local filesystem (can migrate to S3 later)
- **Validation:** class-validator with custom validators
- **Error Handling:** Global exception filters

### **Frontend:**
- **Module Name:** `mark-licensing`
- **Form Library:** Angular Reactive Forms
- **File Upload:** Angular HTTP with progress tracking
- **Charts:** Chart.js or ng2-charts
- **State Management:** Services (no NgRx for now)

### **Key Design Patterns:**
- **Repository Pattern:** Services abstract data access
- **DTO Pattern:** Separate request/response models
- **Factory Pattern:** Agreement generation
- **Strategy Pattern:** Different license type handlers

---

## DEPENDENCIES & INTEGRATIONS

### **Existing System Integration:**
- NSB Profile (NSB-001) - Auto-populate applicant info
- User Authentication - JWT tokens
- Document Management - File upload service
- Reference Data - Countries, ACAP schemes

### **External Dependencies:**
- PDF generation library (for agreements)
- Chart library (for dashboard)
- File validation library
- Date manipulation library

---

## RISK MITIGATION

### **Technical Risks:**
1. **Complex Array Management** → Use JSONB with proper indexing
2. **File Upload Performance** → Implement chunked uploads
3. **Large Form Data** → Implement pagination/sections
4. **Concurrent Edits** → Optimistic locking

### **Business Risks:**
1. **Data Validation** → Comprehensive validation rules
2. **Compliance Tracking** → Automated compliance checks
3. **Expiry Management** → Automated notifications

---

## SUCCESS CRITERIA

✅ All 5 forms implemented and functional  
✅ Complete CRUD operations for all entities  
✅ File upload/download working  
✅ Dashboard with analytics  
✅ Mobile responsive  
✅ Test coverage > 70%  
✅ Documentation complete  
✅ Production-ready deployment

---

## ESTIMATED TIMELINE

**Total Duration:** 6-8 weeks

- Stages 1-5 (Backend Core): 2 weeks
- Stages 6-11 (Frontend Core): 3 weeks
- Stages 12-15 (Polish & Deploy): 1-2 weeks

---

## NEXT STEPS

1. Review and approve this plan
2. Set up development environment
3. Begin Stage 1: Database Schema
4. Daily standups to track progress
5. Weekly demos for stakeholder feedback

---

**Document Version:** 1.0  
**Last Updated:** [Current Date]  
**Author:** Development Team

