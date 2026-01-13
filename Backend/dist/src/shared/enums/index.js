"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QMSType = exports.DomesticMarketType = exports.MainBusinessSector = exports.FactoryType = exports.OperatorLocationType = exports.VerificationStatus = exports.OperatorContactType = exports.ApplicationRegistrationStatus = exports.OperatorStatus = exports.OwnershipStatus = exports.SMECategory = exports.OwnershipType = exports.AnnualTurnoverRange = exports.EmployeeCountRange = exports.LegalStructure = exports.OperatorType = exports.LicenseDurationType = exports.AssetFileType = exports.AssetDeliveryMethod = exports.ModificationStatus = exports.ReportStatus = exports.AgreementStatus = exports.MediaType = exports.MarkType = exports.MarkLicenseStatus = exports.MarkLicenseType = exports.AccreditationStatus = exports.RegulatoryAgencyType = exports.SystemAccessLevel = exports.MouStatus = exports.MsaJurisdiction = exports.NsbProfileDocumentType = exports.NsbDocumentType = exports.NsbRegistrationRequestStatus = exports.RoleRequestStatus = exports.UserRole = exports.MembershipStatus = exports.DocumentVerificationStatus = exports.DocumentType = exports.ComplianceStatus = exports.ComplianceType = exports.LicenseStatus = exports.LicenseType = exports.ApplicationStatus = exports.ApplicationType = exports.NsbLocationType = exports.NsbContactType = exports.StakeholderRegistryStatus = exports.NsbStatus = exports.NsbClassification = void 0;
exports.FileFormat = exports.PassFailStatus = exports.TestReportStatus = exports.DocumentVerificationStatusExtended = exports.OperatorDocumentType = exports.DocumentCategory = exports.VolumeUnit = exports.AuditTeamSize = exports.AuditLanguage = exports.TakeBackProgramStatus = exports.EnvironmentalManagementSystem = exports.LifecycleAspect = exports.LifecycleAssessmentType = exports.ThirdPartyVerificationStatus = exports.EnvironmentalBenefit = exports.TraceabilityStatus = exports.TestReportsAvailability = exports.TechnicalDocsStatus = exports.StandardComplianceStatus = exports.PackagingType = exports.TargetConsumerGroup = exports.ProductCategory = exports.ExpectedTimeline = exports.PriorityProcessing = exports.MarkCombinationPreference = exports.MarkRequestedType = exports.ProductCertificationStatus = exports.ProductCertificationType = exports.ApplicationScope = exports.CertificationSchemeType = exports.AssistiveTechType = exports.DeviceType = exports.InternetAccessType = exports.DigitalLiteracyLevel = exports.NotificationFrequency = exports.CommunicationPreference = exports.PreferredLanguage = void 0;
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
var StakeholderRegistryStatus;
(function (StakeholderRegistryStatus) {
    StakeholderRegistryStatus["DRAFT"] = "DRAFT";
    StakeholderRegistryStatus["SUBMITTED"] = "SUBMITTED";
})(StakeholderRegistryStatus || (exports.StakeholderRegistryStatus = StakeholderRegistryStatus = {}));
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
var MarkLicenseType;
(function (MarkLicenseType) {
    MarkLicenseType["PROMOTIONAL_INSTITUTIONAL"] = "PROMOTIONAL_INSTITUTIONAL";
    MarkLicenseType["CERTIFICATION_BODY"] = "CERTIFICATION_BODY";
    MarkLicenseType["SPECIAL_PROJECT"] = "SPECIAL_PROJECT";
})(MarkLicenseType || (exports.MarkLicenseType = MarkLicenseType = {}));
var MarkLicenseStatus;
(function (MarkLicenseStatus) {
    MarkLicenseStatus["DRAFT"] = "DRAFT";
    MarkLicenseStatus["SUBMITTED"] = "SUBMITTED";
    MarkLicenseStatus["UNDER_REVIEW"] = "UNDER_REVIEW";
    MarkLicenseStatus["APPROVED_PENDING_AGREEMENT"] = "APPROVED_PENDING_AGREEMENT";
    MarkLicenseStatus["PENDING_NSB_SIGNATURE"] = "PENDING_NSB_SIGNATURE";
    MarkLicenseStatus["PENDING_ARSO_SIGNATURE"] = "PENDING_ARSO_SIGNATURE";
    MarkLicenseStatus["EXECUTED"] = "EXECUTED";
    MarkLicenseStatus["ACTIVE"] = "ACTIVE";
    MarkLicenseStatus["EXPIRED"] = "EXPIRED";
    MarkLicenseStatus["SUSPENDED"] = "SUSPENDED";
    MarkLicenseStatus["REJECTED"] = "REJECTED";
    MarkLicenseStatus["WITHDRAWN"] = "WITHDRAWN";
    MarkLicenseStatus["TERMINATED"] = "TERMINATED";
})(MarkLicenseStatus || (exports.MarkLicenseStatus = MarkLicenseStatus = {}));
var MarkType;
(function (MarkType) {
    MarkType["ARSO_QUALITY_MARK"] = "ARSO_QUALITY_MARK";
    MarkType["ECO_MARK_AFRICA"] = "ECO_MARK_AFRICA";
    MarkType["BOTH"] = "BOTH";
})(MarkType || (exports.MarkType = MarkType = {}));
var MediaType;
(function (MediaType) {
    MediaType["DIGITAL_ONLINE"] = "DIGITAL_ONLINE";
    MediaType["PRINT"] = "PRINT";
    MediaType["BROADCAST"] = "BROADCAST";
    MediaType["OUTDOOR"] = "OUTDOOR";
    MediaType["EVENTS"] = "EVENTS";
    MediaType["SOCIAL_MEDIA"] = "SOCIAL_MEDIA";
    MediaType["OTHER"] = "OTHER";
})(MediaType || (exports.MediaType = MediaType = {}));
var AgreementStatus;
(function (AgreementStatus) {
    AgreementStatus["DRAFT"] = "DRAFT";
    AgreementStatus["PENDING_NSB"] = "PENDING_NSB";
    AgreementStatus["PENDING_ARSO"] = "PENDING_ARSO";
    AgreementStatus["EXECUTED"] = "EXECUTED";
    AgreementStatus["ARCHIVED"] = "ARCHIVED";
})(AgreementStatus || (exports.AgreementStatus = AgreementStatus = {}));
var ReportStatus;
(function (ReportStatus) {
    ReportStatus["DRAFT"] = "DRAFT";
    ReportStatus["SUBMITTED"] = "SUBMITTED";
    ReportStatus["UNDER_REVIEW"] = "UNDER_REVIEW";
    ReportStatus["APPROVED"] = "APPROVED";
    ReportStatus["REJECTED"] = "REJECTED";
    ReportStatus["REQUIRES_REVISION"] = "REQUIRES_REVISION";
})(ReportStatus || (exports.ReportStatus = ReportStatus = {}));
var ModificationStatus;
(function (ModificationStatus) {
    ModificationStatus["PENDING"] = "PENDING";
    ModificationStatus["UNDER_REVIEW"] = "UNDER_REVIEW";
    ModificationStatus["APPROVED"] = "APPROVED";
    ModificationStatus["REJECTED"] = "REJECTED";
    ModificationStatus["IMPLEMENTED"] = "IMPLEMENTED";
})(ModificationStatus || (exports.ModificationStatus = ModificationStatus = {}));
var AssetDeliveryMethod;
(function (AssetDeliveryMethod) {
    AssetDeliveryMethod["PORTAL_DOWNLOAD"] = "PORTAL_DOWNLOAD";
    AssetDeliveryMethod["EMAIL_DELIVERY"] = "EMAIL_DELIVERY";
    AssetDeliveryMethod["PHYSICAL_MEDIA"] = "PHYSICAL_MEDIA";
    AssetDeliveryMethod["OTHER"] = "OTHER";
})(AssetDeliveryMethod || (exports.AssetDeliveryMethod = AssetDeliveryMethod = {}));
var AssetFileType;
(function (AssetFileType) {
    AssetFileType["VECTOR_AI"] = "VECTOR_AI";
    AssetFileType["VECTOR_EPS"] = "VECTOR_EPS";
    AssetFileType["PNG"] = "PNG";
    AssetFileType["JPEG"] = "JPEG";
    AssetFileType["PDF"] = "PDF";
    AssetFileType["VIDEO"] = "VIDEO";
    AssetFileType["OTHER"] = "OTHER";
})(AssetFileType || (exports.AssetFileType = AssetFileType = {}));
var LicenseDurationType;
(function (LicenseDurationType) {
    LicenseDurationType["ONE_YEAR"] = "ONE_YEAR";
    LicenseDurationType["TWO_YEARS"] = "TWO_YEARS";
    LicenseDurationType["THREE_YEARS"] = "THREE_YEARS";
    LicenseDurationType["PROJECT_BASED"] = "PROJECT_BASED";
    LicenseDurationType["OTHER"] = "OTHER";
})(LicenseDurationType || (exports.LicenseDurationType = LicenseDurationType = {}));
var OperatorType;
(function (OperatorType) {
    OperatorType["MANUFACTURER"] = "MANUFACTURER";
    OperatorType["IMPORTER"] = "IMPORTER";
    OperatorType["EXPORTER"] = "EXPORTER";
    OperatorType["DISTRIBUTOR"] = "DISTRIBUTOR";
    OperatorType["RETAILER"] = "RETAILER";
    OperatorType["SERVICE_PROVIDER"] = "SERVICE_PROVIDER";
    OperatorType["OTHER"] = "OTHER";
})(OperatorType || (exports.OperatorType = OperatorType = {}));
var LegalStructure;
(function (LegalStructure) {
    LegalStructure["LIMITED_COMPANY"] = "LIMITED_COMPANY";
    LegalStructure["PARTNERSHIP"] = "PARTNERSHIP";
    LegalStructure["SOLE_PROPRIETOR"] = "SOLE_PROPRIETOR";
    LegalStructure["NGO"] = "NGO";
    LegalStructure["GOVERNMENT"] = "GOVERNMENT";
    LegalStructure["COOPERATIVE"] = "COOPERATIVE";
    LegalStructure["OTHER"] = "OTHER";
})(LegalStructure || (exports.LegalStructure = LegalStructure = {}));
var EmployeeCountRange;
(function (EmployeeCountRange) {
    EmployeeCountRange["MICRO_1_9"] = "MICRO_1_9";
    EmployeeCountRange["SMALL_10_49"] = "SMALL_10_49";
    EmployeeCountRange["MEDIUM_50_249"] = "MEDIUM_50_249";
    EmployeeCountRange["LARGE_250_PLUS"] = "LARGE_250_PLUS";
})(EmployeeCountRange || (exports.EmployeeCountRange = EmployeeCountRange = {}));
var AnnualTurnoverRange;
(function (AnnualTurnoverRange) {
    AnnualTurnoverRange["UNDER_50K"] = "UNDER_50K";
    AnnualTurnoverRange["50K_100K"] = "50K_100K";
    AnnualTurnoverRange["100K_500K"] = "100K_500K";
    AnnualTurnoverRange["500K_1M"] = "500K_1M";
    AnnualTurnoverRange["1M_5M"] = "1M_5M";
    AnnualTurnoverRange["5M_10M"] = "5M_10M";
    AnnualTurnoverRange["OVER_10M"] = "OVER_10M";
})(AnnualTurnoverRange || (exports.AnnualTurnoverRange = AnnualTurnoverRange = {}));
var OwnershipType;
(function (OwnershipType) {
    OwnershipType["LOCAL"] = "LOCAL";
    OwnershipType["FOREIGN"] = "FOREIGN";
    OwnershipType["JOINT_VENTURE"] = "JOINT_VENTURE";
    OwnershipType["PUBLIC"] = "PUBLIC";
    OwnershipType["GOVERNMENT"] = "GOVERNMENT";
    OwnershipType["MIXED"] = "MIXED";
})(OwnershipType || (exports.OwnershipType = OwnershipType = {}));
var SMECategory;
(function (SMECategory) {
    SMECategory["MICRO"] = "MICRO";
    SMECategory["SMALL"] = "SMALL";
    SMECategory["MEDIUM"] = "MEDIUM";
    SMECategory["LARGE"] = "LARGE";
    SMECategory["NOT_APPLICABLE"] = "NOT_APPLICABLE";
})(SMECategory || (exports.SMECategory = SMECategory = {}));
var OwnershipStatus;
(function (OwnershipStatus) {
    OwnershipStatus["YES"] = "YES";
    OwnershipStatus["NO"] = "NO";
    OwnershipStatus["WOMEN_LED"] = "WOMEN_LED";
    OwnershipStatus["YOUTH_LED"] = "YOUTH_LED";
})(OwnershipStatus || (exports.OwnershipStatus = OwnershipStatus = {}));
var OperatorStatus;
(function (OperatorStatus) {
    OperatorStatus["DRAFT"] = "DRAFT";
    OperatorStatus["SUBMITTED"] = "SUBMITTED";
    OperatorStatus["UNDER_REVIEW"] = "UNDER_REVIEW";
    OperatorStatus["APPROVED"] = "APPROVED";
    OperatorStatus["REJECTED"] = "REJECTED";
    OperatorStatus["SUSPENDED"] = "SUSPENDED";
    OperatorStatus["ACTIVE"] = "ACTIVE";
    OperatorStatus["INACTIVE"] = "INACTIVE";
})(OperatorStatus || (exports.OperatorStatus = OperatorStatus = {}));
var ApplicationRegistrationStatus;
(function (ApplicationRegistrationStatus) {
    ApplicationRegistrationStatus["DRAFT"] = "DRAFT";
    ApplicationRegistrationStatus["SUBMITTED"] = "SUBMITTED";
    ApplicationRegistrationStatus["UNDER_REVIEW"] = "UNDER_REVIEW";
    ApplicationRegistrationStatus["APPROVED"] = "APPROVED";
    ApplicationRegistrationStatus["REJECTED"] = "REJECTED";
    ApplicationRegistrationStatus["ACTIVE"] = "ACTIVE";
    ApplicationRegistrationStatus["SUSPENDED"] = "SUSPENDED";
    ApplicationRegistrationStatus["WITHDRAWN"] = "WITHDRAWN";
})(ApplicationRegistrationStatus || (exports.ApplicationRegistrationStatus = ApplicationRegistrationStatus = {}));
var OperatorContactType;
(function (OperatorContactType) {
    OperatorContactType["PRIMARY"] = "PRIMARY";
    OperatorContactType["ALTERNATIVE"] = "ALTERNATIVE";
    OperatorContactType["TECHNICAL"] = "TECHNICAL";
    OperatorContactType["FINANCIAL"] = "FINANCIAL";
    OperatorContactType["LEGAL"] = "LEGAL";
})(OperatorContactType || (exports.OperatorContactType = OperatorContactType = {}));
var VerificationStatus;
(function (VerificationStatus) {
    VerificationStatus["PENDING"] = "PENDING";
    VerificationStatus["VERIFIED"] = "VERIFIED";
    VerificationStatus["FAILED"] = "FAILED";
    VerificationStatus["EXPIRED"] = "EXPIRED";
})(VerificationStatus || (exports.VerificationStatus = VerificationStatus = {}));
var OperatorLocationType;
(function (OperatorLocationType) {
    OperatorLocationType["REGISTERED_ADDRESS"] = "REGISTERED_ADDRESS";
    OperatorLocationType["FACTORY"] = "FACTORY";
    OperatorLocationType["PRODUCTION_FACILITY"] = "PRODUCTION_FACILITY";
    OperatorLocationType["WAREHOUSE"] = "WAREHOUSE";
    OperatorLocationType["OFFICE"] = "OFFICE";
    OperatorLocationType["OTHER"] = "OTHER";
})(OperatorLocationType || (exports.OperatorLocationType = OperatorLocationType = {}));
var FactoryType;
(function (FactoryType) {
    FactoryType["MANUFACTURING_PLANT"] = "MANUFACTURING_PLANT";
    FactoryType["PROCESSING_UNIT"] = "PROCESSING_UNIT";
    FactoryType["ASSEMBLY_LINE"] = "ASSEMBLY_LINE";
    FactoryType["WORKSHOP"] = "WORKSHOP";
    FactoryType["PACKAGING_FACILITY"] = "PACKAGING_FACILITY";
    FactoryType["OTHER"] = "OTHER";
})(FactoryType || (exports.FactoryType = FactoryType = {}));
var MainBusinessSector;
(function (MainBusinessSector) {
    MainBusinessSector["AGRICULTURE"] = "AGRICULTURE";
    MainBusinessSector["MANUFACTURING"] = "MANUFACTURING";
    MainBusinessSector["SERVICES"] = "SERVICES";
    MainBusinessSector["CONSTRUCTION"] = "CONSTRUCTION";
    MainBusinessSector["MINING"] = "MINING";
    MainBusinessSector["RETAIL"] = "RETAIL";
    MainBusinessSector["WHOLESALE"] = "WHOLESALE";
    MainBusinessSector["TRANSPORT"] = "TRANSPORT";
    MainBusinessSector["ENERGY"] = "ENERGY";
    MainBusinessSector["TELECOMMUNICATIONS"] = "TELECOMMUNICATIONS";
    MainBusinessSector["OTHER"] = "OTHER";
})(MainBusinessSector || (exports.MainBusinessSector = MainBusinessSector = {}));
var DomesticMarketType;
(function (DomesticMarketType) {
    DomesticMarketType["NATIONAL"] = "NATIONAL";
    DomesticMarketType["REGIONAL"] = "REGIONAL";
    DomesticMarketType["LOCAL"] = "LOCAL";
})(DomesticMarketType || (exports.DomesticMarketType = DomesticMarketType = {}));
var QMSType;
(function (QMSType) {
    QMSType["ISO_9001"] = "ISO_9001";
    QMSType["HACCP"] = "HACCP";
    QMSType["GMP"] = "GMP";
    QMSType["INTERNAL_SYSTEM"] = "INTERNAL_SYSTEM";
    QMSType["NONE"] = "NONE";
    QMSType["IN_PROGRESS"] = "IN_PROGRESS";
})(QMSType || (exports.QMSType = QMSType = {}));
var PreferredLanguage;
(function (PreferredLanguage) {
    PreferredLanguage["ENGLISH"] = "ENGLISH";
    PreferredLanguage["FRENCH"] = "FRENCH";
    PreferredLanguage["PORTUGUESE"] = "PORTUGUESE";
    PreferredLanguage["ARABIC"] = "ARABIC";
    PreferredLanguage["SWAHILI"] = "SWAHILI";
    PreferredLanguage["OTHER"] = "OTHER";
})(PreferredLanguage || (exports.PreferredLanguage = PreferredLanguage = {}));
var CommunicationPreference;
(function (CommunicationPreference) {
    CommunicationPreference["EMAIL"] = "EMAIL";
    CommunicationPreference["SMS"] = "SMS";
    CommunicationPreference["PHONE"] = "PHONE";
    CommunicationPreference["WHATSAPP"] = "WHATSAPP";
    CommunicationPreference["POSTAL_MAIL"] = "POSTAL_MAIL";
    CommunicationPreference["IN_PERSON"] = "IN_PERSON";
})(CommunicationPreference || (exports.CommunicationPreference = CommunicationPreference = {}));
var NotificationFrequency;
(function (NotificationFrequency) {
    NotificationFrequency["REAL_TIME"] = "REAL_TIME";
    NotificationFrequency["DAILY_DIGEST"] = "DAILY_DIGEST";
    NotificationFrequency["WEEKLY_SUMMARY"] = "WEEKLY_SUMMARY";
    NotificationFrequency["MONTHLY_SUMMARY"] = "MONTHLY_SUMMARY";
})(NotificationFrequency || (exports.NotificationFrequency = NotificationFrequency = {}));
var DigitalLiteracyLevel;
(function (DigitalLiteracyLevel) {
    DigitalLiteracyLevel["BASIC"] = "BASIC";
    DigitalLiteracyLevel["INTERMEDIATE"] = "INTERMEDIATE";
    DigitalLiteracyLevel["ADVANCED"] = "ADVANCED";
})(DigitalLiteracyLevel || (exports.DigitalLiteracyLevel = DigitalLiteracyLevel = {}));
var InternetAccessType;
(function (InternetAccessType) {
    InternetAccessType["HIGH_SPEED"] = "HIGH_SPEED";
    InternetAccessType["MOBILE_DATA"] = "MOBILE_DATA";
    InternetAccessType["LIMITED"] = "LIMITED";
    InternetAccessType["INTERMITTENT"] = "INTERMITTENT";
})(InternetAccessType || (exports.InternetAccessType = InternetAccessType = {}));
var DeviceType;
(function (DeviceType) {
    DeviceType["DESKTOP"] = "DESKTOP";
    DeviceType["LAPTOP"] = "LAPTOP";
    DeviceType["SMARTPHONE"] = "SMARTPHONE";
    DeviceType["TABLET"] = "TABLET";
    DeviceType["FEATURE_PHONE"] = "FEATURE_PHONE";
})(DeviceType || (exports.DeviceType = DeviceType = {}));
var AssistiveTechType;
(function (AssistiveTechType) {
    AssistiveTechType["SCREEN_READER"] = "SCREEN_READER";
    AssistiveTechType["HIGH_CONTRAST"] = "HIGH_CONTRAST";
    AssistiveTechType["LARGE_TEXT"] = "LARGE_TEXT";
    AssistiveTechType["TEXT_TO_SPEECH"] = "TEXT_TO_SPEECH";
    AssistiveTechType["KEYBOARD_NAVIGATION"] = "KEYBOARD_NAVIGATION";
    AssistiveTechType["OTHER"] = "OTHER";
})(AssistiveTechType || (exports.AssistiveTechType = AssistiveTechType = {}));
var CertificationSchemeType;
(function (CertificationSchemeType) {
    CertificationSchemeType["SCHEME_1_TYPE_TESTING"] = "SCHEME_1_TYPE_TESTING";
    CertificationSchemeType["SCHEME_2_TESTING_SURVEILLANCE"] = "SCHEME_2_TESTING_SURVEILLANCE";
    CertificationSchemeType["SCHEME_3_TESTING_QUALITY_SYSTEM"] = "SCHEME_3_TESTING_QUALITY_SYSTEM";
    CertificationSchemeType["SCHEME_4_BATCH_TESTING"] = "SCHEME_4_BATCH_TESTING";
    CertificationSchemeType["SCHEME_5_100_PERCENT_TESTING"] = "SCHEME_5_100_PERCENT_TESTING";
})(CertificationSchemeType || (exports.CertificationSchemeType = CertificationSchemeType = {}));
var ApplicationScope;
(function (ApplicationScope) {
    ApplicationScope["SINGLE_PRODUCT"] = "SINGLE_PRODUCT";
    ApplicationScope["PRODUCT_FAMILY"] = "PRODUCT_FAMILY";
    ApplicationScope["MULTIPLE_PRODUCTS"] = "MULTIPLE_PRODUCTS";
    ApplicationScope["FACTORY_PROCESS"] = "FACTORY_PROCESS";
    ApplicationScope["MULTIPLE_FACTORIES"] = "MULTIPLE_FACTORIES";
})(ApplicationScope || (exports.ApplicationScope = ApplicationScope = {}));
var ProductCertificationType;
(function (ProductCertificationType) {
    ProductCertificationType["NEW_CERTIFICATION"] = "NEW_CERTIFICATION";
    ProductCertificationType["RENEWAL"] = "RENEWAL";
    ProductCertificationType["EXTENSION_NEW_PRODUCTS"] = "EXTENSION_NEW_PRODUCTS";
    ProductCertificationType["TRANSFER_FROM_OTHER_CB"] = "TRANSFER_FROM_OTHER_CB";
    ProductCertificationType["SCOPE_EXTENSION"] = "SCOPE_EXTENSION";
})(ProductCertificationType || (exports.ProductCertificationType = ProductCertificationType = {}));
var ProductCertificationStatus;
(function (ProductCertificationStatus) {
    ProductCertificationStatus["DRAFT"] = "DRAFT";
    ProductCertificationStatus["SUBMITTED"] = "SUBMITTED";
    ProductCertificationStatus["UNDER_REVIEW"] = "UNDER_REVIEW";
    ProductCertificationStatus["PENDING_DOCUMENTS"] = "PENDING_DOCUMENTS";
    ProductCertificationStatus["PENDING_TESTING"] = "PENDING_TESTING";
    ProductCertificationStatus["PENDING_AUDIT"] = "PENDING_AUDIT";
    ProductCertificationStatus["APPROVED_PENDING_PAYMENT"] = "APPROVED_PENDING_PAYMENT";
    ProductCertificationStatus["APPROVED"] = "APPROVED";
    ProductCertificationStatus["REJECTED"] = "REJECTED";
    ProductCertificationStatus["WITHDRAWN"] = "WITHDRAWN";
    ProductCertificationStatus["SUSPENDED"] = "SUSPENDED";
    ProductCertificationStatus["CERTIFIED"] = "CERTIFIED";
    ProductCertificationStatus["EXPIRED"] = "EXPIRED";
})(ProductCertificationStatus || (exports.ProductCertificationStatus = ProductCertificationStatus = {}));
var MarkRequestedType;
(function (MarkRequestedType) {
    MarkRequestedType["ARSO_QUALITY_MARK"] = "ARSO_QUALITY_MARK";
    MarkRequestedType["ECO_MARK_AFRICA"] = "ECO_MARK_AFRICA";
    MarkRequestedType["BOTH"] = "BOTH";
})(MarkRequestedType || (exports.MarkRequestedType = MarkRequestedType = {}));
var MarkCombinationPreference;
(function (MarkCombinationPreference) {
    MarkCombinationPreference["BOTH_MARKS_SAME_PRODUCT"] = "BOTH_MARKS_SAME_PRODUCT";
    MarkCombinationPreference["SEPARATE_MARKS_DIFFERENT_PRODUCTS"] = "SEPARATE_MARKS_DIFFERENT_PRODUCTS";
    MarkCombinationPreference["UNDECIDED"] = "UNDECIDED";
})(MarkCombinationPreference || (exports.MarkCombinationPreference = MarkCombinationPreference = {}));
var PriorityProcessing;
(function (PriorityProcessing) {
    PriorityProcessing["YES"] = "YES";
    PriorityProcessing["NO"] = "NO";
})(PriorityProcessing || (exports.PriorityProcessing = PriorityProcessing = {}));
var ExpectedTimeline;
(function (ExpectedTimeline) {
    ExpectedTimeline["URGENT_1_2_MONTHS"] = "URGENT_1_2_MONTHS";
    ExpectedTimeline["STANDARD_3_4_MONTHS"] = "STANDARD_3_4_MONTHS";
    ExpectedTimeline["FLEXIBLE_5_6_MONTHS"] = "FLEXIBLE_5_6_MONTHS";
})(ExpectedTimeline || (exports.ExpectedTimeline = ExpectedTimeline = {}));
var ProductCategory;
(function (ProductCategory) {
    ProductCategory["FOOD_BEVERAGE"] = "FOOD_BEVERAGE";
    ProductCategory["TEXTILES"] = "TEXTILES";
    ProductCategory["ELECTRONICS"] = "ELECTRONICS";
    ProductCategory["CHEMICALS"] = "CHEMICALS";
    ProductCategory["CONSTRUCTION"] = "CONSTRUCTION";
    ProductCategory["MACHINERY"] = "MACHINERY";
    ProductCategory["AGRICULTURE"] = "AGRICULTURE";
    ProductCategory["COSMETICS"] = "COSMETICS";
    ProductCategory["PHARMACEUTICALS"] = "PHARMACEUTICALS";
    ProductCategory["AUTOMOTIVE"] = "AUTOMOTIVE";
    ProductCategory["OTHER"] = "OTHER";
})(ProductCategory || (exports.ProductCategory = ProductCategory = {}));
var TargetConsumerGroup;
(function (TargetConsumerGroup) {
    TargetConsumerGroup["GENERAL_PUBLIC"] = "GENERAL_PUBLIC";
    TargetConsumerGroup["CHILDREN"] = "CHILDREN";
    TargetConsumerGroup["ELDERLY"] = "ELDERLY";
    TargetConsumerGroup["PREGNANT_WOMEN"] = "PREGNANT_WOMEN";
    TargetConsumerGroup["PROFESSIONALS"] = "PROFESSIONALS";
    TargetConsumerGroup["INDUSTRIAL_USERS"] = "INDUSTRIAL_USERS";
    TargetConsumerGroup["INSTITUTIONAL"] = "INSTITUTIONAL";
    TargetConsumerGroup["OTHER"] = "OTHER";
})(TargetConsumerGroup || (exports.TargetConsumerGroup = TargetConsumerGroup = {}));
var PackagingType;
(function (PackagingType) {
    PackagingType["BOTTLE"] = "BOTTLE";
    PackagingType["BOX"] = "BOX";
    PackagingType["POUCH"] = "POUCH";
    PackagingType["BAG"] = "BAG";
    PackagingType["CAN"] = "CAN";
    PackagingType["JAR"] = "JAR";
    PackagingType["BULK"] = "BULK";
    PackagingType["OTHER"] = "OTHER";
})(PackagingType || (exports.PackagingType = PackagingType = {}));
var StandardComplianceStatus;
(function (StandardComplianceStatus) {
    StandardComplianceStatus["FULLY_COMPLIANT"] = "FULLY_COMPLIANT";
    StandardComplianceStatus["PARTIALLY_COMPLIANT"] = "PARTIALLY_COMPLIANT";
    StandardComplianceStatus["NON_COMPLIANT"] = "NON_COMPLIANT";
    StandardComplianceStatus["UNKNOWN"] = "UNKNOWN";
})(StandardComplianceStatus || (exports.StandardComplianceStatus = StandardComplianceStatus = {}));
var TechnicalDocsStatus;
(function (TechnicalDocsStatus) {
    TechnicalDocsStatus["COMPLETE"] = "COMPLETE";
    TechnicalDocsStatus["PARTIAL"] = "PARTIAL";
    TechnicalDocsStatus["NONE"] = "NONE";
})(TechnicalDocsStatus || (exports.TechnicalDocsStatus = TechnicalDocsStatus = {}));
var TestReportsAvailability;
(function (TestReportsAvailability) {
    TestReportsAvailability["YES_ACCREDITED_LAB"] = "YES_ACCREDITED_LAB";
    TestReportsAvailability["YES_NON_ACCREDITED"] = "YES_NON_ACCREDITED";
    TestReportsAvailability["SOME"] = "SOME";
    TestReportsAvailability["NONE"] = "NONE";
})(TestReportsAvailability || (exports.TestReportsAvailability = TestReportsAvailability = {}));
var TraceabilityStatus;
(function (TraceabilityStatus) {
    TraceabilityStatus["FULL"] = "FULL";
    TraceabilityStatus["PARTIAL"] = "PARTIAL";
    TraceabilityStatus["NONE"] = "NONE";
})(TraceabilityStatus || (exports.TraceabilityStatus = TraceabilityStatus = {}));
var EnvironmentalBenefit;
(function (EnvironmentalBenefit) {
    EnvironmentalBenefit["ENERGY_EFFICIENT"] = "ENERGY_EFFICIENT";
    EnvironmentalBenefit["WATER_EFFICIENT"] = "WATER_EFFICIENT";
    EnvironmentalBenefit["RECYCLABLE"] = "RECYCLABLE";
    EnvironmentalBenefit["BIODEGRADABLE"] = "BIODEGRADABLE";
    EnvironmentalBenefit["COMPOSTABLE"] = "COMPOSTABLE";
    EnvironmentalBenefit["LOW_EMISSIONS"] = "LOW_EMISSIONS";
    EnvironmentalBenefit["REDUCED_WASTE"] = "REDUCED_WASTE";
    EnvironmentalBenefit["SUSTAINABLE_SOURCING"] = "SUSTAINABLE_SOURCING";
    EnvironmentalBenefit["RENEWABLE_MATERIALS"] = "RENEWABLE_MATERIALS";
    EnvironmentalBenefit["CARBON_NEUTRAL"] = "CARBON_NEUTRAL";
    EnvironmentalBenefit["OTHER"] = "OTHER";
})(EnvironmentalBenefit || (exports.EnvironmentalBenefit = EnvironmentalBenefit = {}));
var ThirdPartyVerificationStatus;
(function (ThirdPartyVerificationStatus) {
    ThirdPartyVerificationStatus["YES"] = "YES";
    ThirdPartyVerificationStatus["NO"] = "NO";
    ThirdPartyVerificationStatus["IN_PROGRESS"] = "IN_PROGRESS";
})(ThirdPartyVerificationStatus || (exports.ThirdPartyVerificationStatus = ThirdPartyVerificationStatus = {}));
var LifecycleAssessmentType;
(function (LifecycleAssessmentType) {
    LifecycleAssessmentType["FULL_LCA"] = "FULL_LCA";
    LifecycleAssessmentType["PARTIAL_LCA"] = "PARTIAL_LCA";
    LifecycleAssessmentType["SCREENING_LCA"] = "SCREENING_LCA";
    LifecycleAssessmentType["NONE"] = "NONE";
})(LifecycleAssessmentType || (exports.LifecycleAssessmentType = LifecycleAssessmentType = {}));
var LifecycleAspect;
(function (LifecycleAspect) {
    LifecycleAspect["RAW_MATERIAL_EXTRACTION"] = "RAW_MATERIAL_EXTRACTION";
    LifecycleAspect["MATERIAL_PROCESSING"] = "MATERIAL_PROCESSING";
    LifecycleAspect["MANUFACTURING"] = "MANUFACTURING";
    LifecycleAspect["PACKAGING"] = "PACKAGING";
    LifecycleAspect["DISTRIBUTION"] = "DISTRIBUTION";
    LifecycleAspect["USE_CONSUMPTION"] = "USE_CONSUMPTION";
    LifecycleAspect["END_OF_LIFE_DISPOSAL"] = "END_OF_LIFE_DISPOSAL";
    LifecycleAspect["RECYCLING"] = "RECYCLING";
})(LifecycleAspect || (exports.LifecycleAspect = LifecycleAspect = {}));
var EnvironmentalManagementSystem;
(function (EnvironmentalManagementSystem) {
    EnvironmentalManagementSystem["ISO_14001_CERTIFIED"] = "ISO_14001_CERTIFIED";
    EnvironmentalManagementSystem["INTERNAL_EMS"] = "INTERNAL_EMS";
    EnvironmentalManagementSystem["NONE"] = "NONE";
})(EnvironmentalManagementSystem || (exports.EnvironmentalManagementSystem = EnvironmentalManagementSystem = {}));
var TakeBackProgramStatus;
(function (TakeBackProgramStatus) {
    TakeBackProgramStatus["YES"] = "YES";
    TakeBackProgramStatus["NO"] = "NO";
    TakeBackProgramStatus["PLANNED"] = "PLANNED";
})(TakeBackProgramStatus || (exports.TakeBackProgramStatus = TakeBackProgramStatus = {}));
var AuditLanguage;
(function (AuditLanguage) {
    AuditLanguage["ENGLISH"] = "ENGLISH";
    AuditLanguage["FRENCH"] = "FRENCH";
    AuditLanguage["PORTUGUESE"] = "PORTUGUESE";
    AuditLanguage["ARABIC"] = "ARABIC";
    AuditLanguage["LOCAL_LANGUAGE"] = "LOCAL_LANGUAGE";
})(AuditLanguage || (exports.AuditLanguage = AuditLanguage = {}));
var AuditTeamSize;
(function (AuditTeamSize) {
    AuditTeamSize["ONE_AUDITOR"] = "ONE_AUDITOR";
    AuditTeamSize["TWO_AUDITORS"] = "TWO_AUDITORS";
    AuditTeamSize["FLEXIBLE"] = "FLEXIBLE";
})(AuditTeamSize || (exports.AuditTeamSize = AuditTeamSize = {}));
var VolumeUnit;
(function (VolumeUnit) {
    VolumeUnit["UNITS"] = "UNITS";
    VolumeUnit["KG"] = "KG";
    VolumeUnit["LITERS"] = "LITERS";
    VolumeUnit["TONNES"] = "TONNES";
    VolumeUnit["CONTAINERS"] = "CONTAINERS";
    VolumeUnit["PALLETS"] = "PALLETS";
    VolumeUnit["CUBIC_METERS"] = "CUBIC_METERS";
    VolumeUnit["OTHER"] = "OTHER";
})(VolumeUnit || (exports.VolumeUnit = VolumeUnit = {}));
var DocumentCategory;
(function (DocumentCategory) {
    DocumentCategory["COMPANY_LEGAL"] = "COMPANY_LEGAL";
    DocumentCategory["QUALITY_MANAGEMENT"] = "QUALITY_MANAGEMENT";
    DocumentCategory["TECHNICAL_PRODUCTION"] = "TECHNICAL_PRODUCTION";
    DocumentCategory["TEST_REPORTS"] = "TEST_REPORTS";
    DocumentCategory["CERTIFICATES"] = "CERTIFICATES";
    DocumentCategory["SUPPLY_CHAIN"] = "SUPPLY_CHAIN";
    DocumentCategory["ENVIRONMENTAL"] = "ENVIRONMENTAL";
    DocumentCategory["OTHER"] = "OTHER";
})(DocumentCategory || (exports.DocumentCategory = DocumentCategory = {}));
var OperatorDocumentType;
(function (OperatorDocumentType) {
    OperatorDocumentType["BUSINESS_REGISTRATION"] = "BUSINESS_REGISTRATION";
    OperatorDocumentType["TAX_CERTIFICATE"] = "TAX_CERTIFICATE";
    OperatorDocumentType["MEMORANDUM_ARTICLES"] = "MEMORANDUM_ARTICLES";
    OperatorDocumentType["DIRECTORS_LIST"] = "DIRECTORS_LIST";
    OperatorDocumentType["OWNERSHIP_STRUCTURE"] = "OWNERSHIP_STRUCTURE";
    OperatorDocumentType["AUTHORIZED_SIGNATORY"] = "AUTHORIZED_SIGNATORY";
    OperatorDocumentType["QUALITY_MANUAL"] = "QUALITY_MANUAL";
    OperatorDocumentType["PROCEDURES_MANUAL"] = "PROCEDURES_MANUAL";
    OperatorDocumentType["ORGANIZATIONAL_CHART"] = "ORGANIZATIONAL_CHART";
    OperatorDocumentType["JOB_DESCRIPTIONS"] = "JOB_DESCRIPTIONS";
    OperatorDocumentType["TRAINING_RECORDS"] = "TRAINING_RECORDS";
    OperatorDocumentType["INTERNAL_AUDIT_RECORDS"] = "INTERNAL_AUDIT_RECORDS";
    OperatorDocumentType["MANAGEMENT_REVIEW"] = "MANAGEMENT_REVIEW";
    OperatorDocumentType["FACTORY_LAYOUT"] = "FACTORY_LAYOUT";
    OperatorDocumentType["EQUIPMENT_LIST"] = "EQUIPMENT_LIST";
    OperatorDocumentType["CALIBRATION_CERTIFICATES"] = "CALIBRATION_CERTIFICATES";
    OperatorDocumentType["MAINTENANCE_RECORDS"] = "MAINTENANCE_RECORDS";
    OperatorDocumentType["PROCESS_FLOW_DIAGRAMS"] = "PROCESS_FLOW_DIAGRAMS";
    OperatorDocumentType["CONTROL_PLANS"] = "CONTROL_PLANS";
    OperatorDocumentType["RAW_MATERIAL_SPECS"] = "RAW_MATERIAL_SPECS";
    OperatorDocumentType["FINISHED_PRODUCT_SPECS"] = "FINISHED_PRODUCT_SPECS";
    OperatorDocumentType["TEST_REPORT"] = "TEST_REPORT";
    OperatorDocumentType["EXISTING_CERTIFICATE"] = "EXISTING_CERTIFICATE";
    OperatorDocumentType["SUPPLIER_LIST"] = "SUPPLIER_LIST";
    OperatorDocumentType["SUPPLIER_EVALUATION"] = "SUPPLIER_EVALUATION";
    OperatorDocumentType["MATERIAL_CERTIFICATE"] = "MATERIAL_CERTIFICATE";
    OperatorDocumentType["TRACEABILITY_RECORDS"] = "TRACEABILITY_RECORDS";
    OperatorDocumentType["BATCH_RECORDS"] = "BATCH_RECORDS";
    OperatorDocumentType["RECALL_PROCEDURE"] = "RECALL_PROCEDURE";
    OperatorDocumentType["ENVIRONMENTAL_POLICY"] = "ENVIRONMENTAL_POLICY";
    OperatorDocumentType["ENVIRONMENTAL_MANUAL"] = "ENVIRONMENTAL_MANUAL";
    OperatorDocumentType["LCA_REPORT"] = "LCA_REPORT";
    OperatorDocumentType["CARBON_FOOTPRINT_REPORT"] = "CARBON_FOOTPRINT_REPORT";
    OperatorDocumentType["ENERGY_AUDIT"] = "ENERGY_AUDIT";
    OperatorDocumentType["WASTE_AUDIT"] = "WASTE_AUDIT";
    OperatorDocumentType["RECYCLING_CERTIFICATE"] = "RECYCLING_CERTIFICATE";
    OperatorDocumentType["SUSTAINABLE_SOURCING"] = "SUSTAINABLE_SOURCING";
    OperatorDocumentType["OTHER"] = "OTHER";
})(OperatorDocumentType || (exports.OperatorDocumentType = OperatorDocumentType = {}));
var DocumentVerificationStatusExtended;
(function (DocumentVerificationStatusExtended) {
    DocumentVerificationStatusExtended["PENDING"] = "PENDING";
    DocumentVerificationStatusExtended["UNDER_REVIEW"] = "UNDER_REVIEW";
    DocumentVerificationStatusExtended["APPROVED"] = "APPROVED";
    DocumentVerificationStatusExtended["REJECTED"] = "REJECTED";
    DocumentVerificationStatusExtended["EXPIRED"] = "EXPIRED";
    DocumentVerificationStatusExtended["REQUIRES_REVISION"] = "REQUIRES_REVISION";
})(DocumentVerificationStatusExtended || (exports.DocumentVerificationStatusExtended = DocumentVerificationStatusExtended = {}));
var TestReportStatus;
(function (TestReportStatus) {
    TestReportStatus["PENDING"] = "PENDING";
    TestReportStatus["VERIFIED"] = "VERIFIED";
    TestReportStatus["APPROVED"] = "APPROVED";
    TestReportStatus["REJECTED"] = "REJECTED";
})(TestReportStatus || (exports.TestReportStatus = TestReportStatus = {}));
var PassFailStatus;
(function (PassFailStatus) {
    PassFailStatus["PASS"] = "PASS";
    PassFailStatus["FAIL"] = "FAIL";
    PassFailStatus["CONDITIONAL_PASS"] = "CONDITIONAL_PASS";
})(PassFailStatus || (exports.PassFailStatus = PassFailStatus = {}));
var FileFormat;
(function (FileFormat) {
    FileFormat["PDF"] = "PDF";
    FileFormat["JPG"] = "JPG";
    FileFormat["PNG"] = "PNG";
    FileFormat["DOC"] = "DOC";
    FileFormat["DOCX"] = "DOCX";
    FileFormat["XLS"] = "XLS";
    FileFormat["XLSX"] = "XLSX";
    FileFormat["CSV"] = "CSV";
    FileFormat["DWG"] = "DWG";
    FileFormat["AI"] = "AI";
    FileFormat["EPS"] = "EPS";
    FileFormat["OTHER"] = "OTHER";
})(FileFormat || (exports.FileFormat = FileFormat = {}));
//# sourceMappingURL=index.js.map