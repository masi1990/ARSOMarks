"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccreditationStatus = exports.RegulatoryAgencyType = exports.SystemAccessLevel = exports.MouStatus = exports.MsaJurisdiction = exports.NsbProfileDocumentType = exports.NsbDocumentType = exports.NsbRegistrationRequestStatus = exports.RoleRequestStatus = exports.UserRole = exports.MembershipStatus = exports.DocumentVerificationStatus = exports.DocumentType = exports.ComplianceStatus = exports.ComplianceType = exports.LicenseStatus = exports.LicenseType = exports.ApplicationStatus = exports.ApplicationType = exports.NsbLocationType = exports.NsbContactType = exports.NsbStatus = exports.NsbClassification = void 0;
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
    NsbContactType["ACAP_COORDINATOR"] = "ACAP_COORDINATOR";
    NsbContactType["MARKET_SURVEILLANCE_FOCAL_POINT"] = "MARKET_SURVEILLANCE_FOCAL_POINT";
    NsbContactType["CUSTOMS_TRADE_FOCAL_POINT"] = "CUSTOMS_TRADE_FOCAL_POINT";
    NsbContactType["CONSUMER_AFFAIRS_FOCAL_POINT"] = "CONSUMER_AFFAIRS_FOCAL_POINT";
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
var RoleRequestStatus;
(function (RoleRequestStatus) {
    RoleRequestStatus["PENDING"] = "PENDING";
    RoleRequestStatus["APPROVED"] = "APPROVED";
    RoleRequestStatus["REJECTED"] = "REJECTED";
})(RoleRequestStatus || (exports.RoleRequestStatus = RoleRequestStatus = {}));
var NsbRegistrationRequestStatus;
(function (NsbRegistrationRequestStatus) {
    NsbRegistrationRequestStatus["DRAFT"] = "DRAFT";
    NsbRegistrationRequestStatus["SUBMITTED"] = "SUBMITTED";
    NsbRegistrationRequestStatus["UNDER_REVIEW"] = "UNDER_REVIEW";
    NsbRegistrationRequestStatus["APPROVED"] = "APPROVED";
    NsbRegistrationRequestStatus["REJECTED"] = "REJECTED";
})(NsbRegistrationRequestStatus || (exports.NsbRegistrationRequestStatus = NsbRegistrationRequestStatus = {}));
var NsbDocumentType;
(function (NsbDocumentType) {
    NsbDocumentType["NSB_ESTABLISHMENT_CHARTER"] = "NSB_ESTABLISHMENT_CHARTER";
    NsbDocumentType["ARSO_MEMBERSHIP_CERTIFICATE"] = "ARSO_MEMBERSHIP_CERTIFICATE";
    NsbDocumentType["GOVERNMENT_GAZETTE_NOTICE"] = "GOVERNMENT_GAZETTE_NOTICE";
    NsbDocumentType["DECLARATION_OF_AUTHORITY"] = "DECLARATION_OF_AUTHORITY";
    NsbDocumentType["NATIONAL_STANDARDS_ACT"] = "NATIONAL_STANDARDS_ACT";
    NsbDocumentType["NATIONAL_CONFORMITY_ASSESSMENT_POLICY"] = "NATIONAL_CONFORMITY_ASSESSMENT_POLICY";
    NsbDocumentType["ORGANIZATIONAL_CHART"] = "ORGANIZATIONAL_CHART";
    NsbDocumentType["OTHER"] = "OTHER";
})(NsbDocumentType || (exports.NsbDocumentType = NsbDocumentType = {}));
var NsbProfileDocumentType;
(function (NsbProfileDocumentType) {
    NsbProfileDocumentType["NATIONAL_STANDARDS_ACT_DOCUMENT"] = "NATIONAL_STANDARDS_ACT_DOCUMENT";
    NsbProfileDocumentType["NATIONAL_CONFORMITY_ASSESSMENT_POLICY_DOCUMENT"] = "NATIONAL_CONFORMITY_ASSESSMENT_POLICY_DOCUMENT";
    NsbProfileDocumentType["NATIONAL_QUALITY_POLICY_DOCUMENT"] = "NATIONAL_QUALITY_POLICY_DOCUMENT";
    NsbProfileDocumentType["ORGANIZATIONAL_CHART_DOCUMENT"] = "ORGANIZATIONAL_CHART_DOCUMENT";
    NsbProfileDocumentType["OTHER"] = "OTHER";
})(NsbProfileDocumentType || (exports.NsbProfileDocumentType = NsbProfileDocumentType = {}));
var MsaJurisdiction;
(function (MsaJurisdiction) {
    MsaJurisdiction["NATIONAL"] = "NATIONAL";
    MsaJurisdiction["REGIONAL"] = "REGIONAL";
})(MsaJurisdiction || (exports.MsaJurisdiction = MsaJurisdiction = {}));
var MouStatus;
(function (MouStatus) {
    MouStatus["SIGNED"] = "SIGNED";
    MouStatus["PENDING"] = "PENDING";
    MouStatus["NOT_SIGNED"] = "NOT_SIGNED";
    MouStatus["N_A"] = "N/A";
})(MouStatus || (exports.MouStatus = MouStatus = {}));
var SystemAccessLevel;
(function (SystemAccessLevel) {
    SystemAccessLevel["READ_ONLY"] = "READ_ONLY";
    SystemAccessLevel["FULL"] = "FULL";
})(SystemAccessLevel || (exports.SystemAccessLevel = SystemAccessLevel = {}));
var RegulatoryAgencyType;
(function (RegulatoryAgencyType) {
    RegulatoryAgencyType["FOOD_DRUG_AUTHORITY"] = "FOOD_DRUG_AUTHORITY";
    RegulatoryAgencyType["AGRICULTURE_MINISTRY"] = "AGRICULTURE_MINISTRY";
    RegulatoryAgencyType["HEALTH_MINISTRY"] = "HEALTH_MINISTRY";
    RegulatoryAgencyType["ENVIRONMENT_AGENCY"] = "ENVIRONMENT_AGENCY";
    RegulatoryAgencyType["INDUSTRY_TRADE_MINISTRY"] = "INDUSTRY_TRADE_MINISTRY";
    RegulatoryAgencyType["OTHER"] = "OTHER";
})(RegulatoryAgencyType || (exports.RegulatoryAgencyType = RegulatoryAgencyType = {}));
var AccreditationStatus;
(function (AccreditationStatus) {
    AccreditationStatus["AFRAC_MRA"] = "AFRAC_MRA";
    AccreditationStatus["OTHER"] = "OTHER";
    AccreditationStatus["NONE"] = "NONE";
})(AccreditationStatus || (exports.AccreditationStatus = AccreditationStatus = {}));
//# sourceMappingURL=index.js.map