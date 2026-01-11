"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRole = exports.MembershipStatus = exports.DocumentVerificationStatus = exports.DocumentType = exports.ComplianceStatus = exports.ComplianceType = exports.LicenseStatus = exports.LicenseType = exports.ApplicationStatus = exports.ApplicationType = exports.NsbLocationType = exports.NsbContactType = exports.NsbStatus = exports.NsbClassification = void 0;
var NsbClassification;
(function (NsbClassification) {
    NsbClassification["GOVERNMENT_AGENCY"] = "GOVERNMENT_AGENCY";
    NsbClassification["PARASTATAL"] = "PARASTATAL";
    NsbClassification["PRIVATE"] = "PRIVATE";
    NsbClassification["OTHER"] = "OTHER";
})(NsbClassification || (exports.NsbClassification = NsbClassification = {}));
var NsbStatus;
(function (NsbStatus) {
    NsbStatus["ACTIVE"] = "ACTIVE";
    NsbStatus["INACTIVE"] = "INACTIVE";
    NsbStatus["SUSPENDED"] = "SUSPENDED";
})(NsbStatus || (exports.NsbStatus = NsbStatus = {}));
var NsbContactType;
(function (NsbContactType) {
    NsbContactType["PRIMARY"] = "PRIMARY";
    NsbContactType["ALTERNATIVE"] = "ALTERNATIVE";
    NsbContactType["TECHNICAL"] = "TECHNICAL";
    NsbContactType["FINANCIAL"] = "FINANCIAL";
    NsbContactType["ARSO_LIAISON"] = "ARSO_LIAISON";
})(NsbContactType || (exports.NsbContactType = NsbContactType = {}));
var NsbLocationType;
(function (NsbLocationType) {
    NsbLocationType["HEADQUARTERS"] = "HEADQUARTERS";
    NsbLocationType["BRANCH"] = "BRANCH";
    NsbLocationType["LABORATORY"] = "LABORATORY";
    NsbLocationType["REGIONAL_OFFICE"] = "REGIONAL_OFFICE";
})(NsbLocationType || (exports.NsbLocationType = NsbLocationType = {}));
var ApplicationType;
(function (ApplicationType) {
    ApplicationType["FULL"] = "FULL";
    ApplicationType["PROVISIONAL"] = "PROVISIONAL";
    ApplicationType["RENEWAL"] = "RENEWAL";
    ApplicationType["SCOPE_EXTENSION"] = "SCOPE_EXTENSION";
})(ApplicationType || (exports.ApplicationType = ApplicationType = {}));
var ApplicationStatus;
(function (ApplicationStatus) {
    ApplicationStatus["DRAFT"] = "DRAFT";
    ApplicationStatus["SUBMITTED"] = "SUBMITTED";
    ApplicationStatus["UNDER_REVIEW"] = "UNDER_REVIEW";
    ApplicationStatus["PENDING_WITNESS"] = "PENDING_WITNESS";
    ApplicationStatus["PENDING_CACO"] = "PENDING_CACO";
    ApplicationStatus["APPROVED_PENDING_PAYMENT"] = "APPROVED_PENDING_PAYMENT";
    ApplicationStatus["APPROVED_PENDING_AGREEMENT"] = "APPROVED_PENDING_AGREEMENT";
    ApplicationStatus["ACTIVE"] = "ACTIVE";
    ApplicationStatus["PROVISIONAL"] = "PROVISIONAL";
    ApplicationStatus["SUSPENDED"] = "SUSPENDED";
    ApplicationStatus["WITHDRAWN"] = "WITHDRAWN";
    ApplicationStatus["REJECTED"] = "REJECTED";
})(ApplicationStatus || (exports.ApplicationStatus = ApplicationStatus = {}));
var LicenseType;
(function (LicenseType) {
    LicenseType["FULL"] = "FULL";
    LicenseType["PROVISIONAL"] = "PROVISIONAL";
})(LicenseType || (exports.LicenseType = LicenseType = {}));
var LicenseStatus;
(function (LicenseStatus) {
    LicenseStatus["ACTIVE"] = "ACTIVE";
    LicenseStatus["PROVISIONAL"] = "PROVISIONAL";
    LicenseStatus["SUSPENDED"] = "SUSPENDED";
    LicenseStatus["WITHDRAWN"] = "WITHDRAWN";
    LicenseStatus["EXPIRED"] = "EXPIRED";
    LicenseStatus["REVOKED"] = "REVOKED";
})(LicenseStatus || (exports.LicenseStatus = LicenseStatus = {}));
var ComplianceType;
(function (ComplianceType) {
    ComplianceType["SURVEILLANCE"] = "SURVEILLANCE";
    ComplianceType["RECERTIFICATION"] = "RECERTIFICATION";
    ComplianceType["WITNESS_AUDIT"] = "WITNESS_AUDIT";
})(ComplianceType || (exports.ComplianceType = ComplianceType = {}));
var ComplianceStatus;
(function (ComplianceStatus) {
    ComplianceStatus["SCHEDULED"] = "SCHEDULED";
    ComplianceStatus["COMPLETED"] = "COMPLETED";
    ComplianceStatus["OVERDUE"] = "OVERDUE";
    ComplianceStatus["CANCELLED"] = "CANCELLED";
})(ComplianceStatus || (exports.ComplianceStatus = ComplianceStatus = {}));
var DocumentType;
(function (DocumentType) {
    DocumentType["LEGAL_REGISTRATION"] = "LEGAL_REGISTRATION";
    DocumentType["ACCREDITATION_CERTIFICATE"] = "ACCREDITATION_CERTIFICATE";
    DocumentType["QUALITY_MANUAL"] = "QUALITY_MANUAL";
    DocumentType["AUDITOR_COMPETENCE_MATRIX"] = "AUDITOR_COMPETENCE_MATRIX";
    DocumentType["OTHER"] = "OTHER";
})(DocumentType || (exports.DocumentType = DocumentType = {}));
var DocumentVerificationStatus;
(function (DocumentVerificationStatus) {
    DocumentVerificationStatus["PENDING"] = "PENDING";
    DocumentVerificationStatus["APPROVED"] = "APPROVED";
    DocumentVerificationStatus["REJECTED"] = "REJECTED";
})(DocumentVerificationStatus || (exports.DocumentVerificationStatus = DocumentVerificationStatus = {}));
var MembershipStatus;
(function (MembershipStatus) {
    MembershipStatus["MEMBER"] = "MEMBER";
    MembershipStatus["CANDIDATE"] = "CANDIDATE";
    MembershipStatus["SUSPENDED"] = "SUSPENDED";
    MembershipStatus["WITHDRAWN"] = "WITHDRAWN";
})(MembershipStatus || (exports.MembershipStatus = MembershipStatus = {}));
var UserRole;
(function (UserRole) {
    UserRole["SUPER_ADMIN"] = "SUPER_ADMIN";
    UserRole["ARSO_COUNCIL"] = "ARSO_COUNCIL";
    UserRole["CACO_MEMBER"] = "CACO_MEMBER";
    UserRole["ARSO_SECRETARIAT"] = "ARSO_SECRETARIAT";
    UserRole["ADVISORY_COMMITTEE"] = "ADVISORY_COMMITTEE";
    UserRole["SMC_MEMBER"] = "SMC_MEMBER";
    UserRole["NSB_ADMIN"] = "NSB_ADMIN";
    UserRole["NSB_USER"] = "NSB_USER";
    UserRole["CB_ADMIN"] = "CB_ADMIN";
    UserRole["CB_USER"] = "CB_USER";
    UserRole["OPERATOR"] = "OPERATOR";
    UserRole["ACCREDITATION_BODY"] = "ACCREDITATION_BODY";
    UserRole["PUBLIC"] = "PUBLIC";
})(UserRole || (exports.UserRole = UserRole = {}));
//# sourceMappingURL=index.js.map