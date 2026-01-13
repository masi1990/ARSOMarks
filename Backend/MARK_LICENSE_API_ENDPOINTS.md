# Mark License System - API Endpoints Reference

**Base URL:** `/api/mark-licenses`

All endpoints require JWT authentication unless otherwise specified.

---

## 📋 Application Endpoints (NSB-004-1)

**Base:** `/mark-licenses/applications`

| Method | Endpoint | Description | Roles |
|--------|----------|-------------|-------|
| POST | `/applications` | Create new mark license application | NSB_ADMIN, NSB_USER |
| GET | `/applications/:id` | Get application by ID | NSB_ADMIN, NSB_USER, ARSO_SECRETARIAT, SUPER_ADMIN |
| PUT | `/applications/:id` | Update draft application | NSB_ADMIN, NSB_USER |
| POST | `/applications/:id/submit` | Submit application for review | NSB_ADMIN, NSB_USER |
| GET | `/applications?nsbId=xxx&includeDrafts=true` | List applications for NSB | NSB_ADMIN, NSB_USER, ARSO_SECRETARIAT, SUPER_ADMIN |
| DELETE | `/applications/:id` | Delete draft application | NSB_ADMIN, NSB_USER |

---

## 📄 Agreement Endpoints (NSB-004-2)

**Base:** `/mark-licenses/agreements`

| Method | Endpoint | Description | Roles |
|--------|----------|-------------|-------|
| POST | `/agreements` | Generate agreement from approved application | ARSO_SECRETARIAT, SUPER_ADMIN |
| GET | `/agreements/:id` | Get agreement by ID | NSB_ADMIN, NSB_USER, ARSO_SECRETARIAT, SUPER_ADMIN |
| GET | `/agreements/by-agreement-id/:agreementId` | Get agreement by agreement ID | NSB_ADMIN, NSB_USER, ARSO_SECRETARIAT, SUPER_ADMIN |
| POST | `/agreements/:id/sign` | NSB sign agreement (electronic signature) | NSB_ADMIN, NSB_USER |
| POST | `/agreements/:id/arso-sign` | ARSO sign agreement | ARSO_SECRETARIAT, SUPER_ADMIN |
| GET | `/agreements?nsbId=xxx` | Get active agreements for NSB | NSB_ADMIN, NSB_USER, ARSO_SECRETARIAT, SUPER_ADMIN |
| GET | `/agreements/expiring?daysBeforeExpiry=30` | Check for expiring agreements | ARSO_SECRETARIAT, SUPER_ADMIN |

---

## 📊 Usage Report Endpoints (NSB-004-3)

**Base:** `/mark-licenses/reports`

| Method | Endpoint | Description | Roles |
|--------|----------|-------------|-------|
| POST | `/reports` | Create new annual usage report | NSB_ADMIN, NSB_USER |
| GET | `/reports/:id` | Get report by ID | NSB_ADMIN, NSB_USER, ARSO_SECRETARIAT, SUPER_ADMIN |
| PUT | `/reports/:id` | Update draft report | NSB_ADMIN, NSB_USER |
| POST | `/reports/:id/submit` | Submit report for review | NSB_ADMIN, NSB_USER |
| GET | `/reports?licenseId=xxx` | List all reports for a license | NSB_ADMIN, NSB_USER, ARSO_SECRETARIAT, SUPER_ADMIN |

---

## 🔄 Modification Endpoints (NSB-004-4)

**Base:** `/mark-licenses/modifications`

| Method | Endpoint | Description | Roles |
|--------|----------|-------------|-------|
| POST | `/modifications` | Request license modification | NSB_ADMIN, NSB_USER |
| GET | `/modifications/:id` | Get modification by ID | NSB_ADMIN, NSB_USER, ARSO_SECRETARIAT, SUPER_ADMIN |
| POST | `/modifications/:id/approve` | Approve modification request | ARSO_SECRETARIAT, SUPER_ADMIN |
| POST | `/modifications/:id/reject` | Reject modification request | ARSO_SECRETARIAT, SUPER_ADMIN |
| GET | `/modifications?licenseId=xxx` | Get modification history for license | NSB_ADMIN, NSB_USER, ARSO_SECRETARIAT, SUPER_ADMIN |

---

## 📦 Asset Management Endpoints

**Base:** `/mark-licenses/assets`

| Method | Endpoint | Description | Roles |
|--------|----------|-------------|-------|
| POST | `/assets/request` | Request digital assets | NSB_ADMIN, NSB_USER |
| POST | `/assets/:id/deliver` | Deliver assets (mark as delivered) | ARSO_SECRETARIAT, SUPER_ADMIN |
| POST | `/assets/:id/download` | Track asset download | NSB_ADMIN, NSB_USER |
| GET | `/assets/:id` | Get asset by ID | NSB_ADMIN, NSB_USER, ARSO_SECRETARIAT, SUPER_ADMIN |
| GET | `/assets?agreementId=xxx` | Get asset library for agreement | NSB_ADMIN, NSB_USER, ARSO_SECRETARIAT, SUPER_ADMIN |
| GET | `/assets/:id/download-history` | Get download history for asset | ARSO_SECRETARIAT, SUPER_ADMIN |

---

## 📈 Dashboard Endpoints (NSB-004-DASH)

**Base:** `/mark-licenses/dashboard`

| Method | Endpoint | Description | Roles |
|--------|----------|-------------|-------|
| GET | `/dashboard/overview?nsbId=xxx` | Get dashboard overview | NSB_ADMIN, NSB_USER, ARSO_SECRETARIAT, SUPER_ADMIN |
| GET | `/dashboard/analytics?nsbId=xxx` | Get usage analytics | NSB_ADMIN, NSB_USER, ARSO_SECRETARIAT, SUPER_ADMIN |
| GET | `/dashboard/calendar?nsbId=xxx` | Get compliance calendar | NSB_ADMIN, NSB_USER, ARSO_SECRETARIAT, SUPER_ADMIN |

---

## 🔐 Authentication

All endpoints require:
- **JWT Token** in Authorization header: `Authorization: Bearer <token>`
- **Role-based access** as specified in the table above

---

## 📝 Request/Response Examples

### Create Application
```http
POST /api/mark-licenses/applications
Content-Type: application/json
Authorization: Bearer <token>

{
  "nsbId": "uuid",
  "licenseTypes": ["PROMOTIONAL_INSTITUTIONAL"],
  "licenseDuration": "ONE_YEAR",
  "marksRequested": ["ARSO_QUALITY_MARK"],
  ...
}
```

### Submit Application
```http
POST /api/mark-licenses/applications/:id/submit
Content-Type: application/json
Authorization: Bearer <token>

{
  "confirmSubmission": true,
  "notes": "Ready for review"
}
```

### Sign Agreement
```http
POST /api/mark-licenses/agreements/:id/sign
Content-Type: application/json
Authorization: Bearer <token>

{
  "nsbSignerName": "John Doe",
  "nsbSignerTitle": "Director",
  "nsbSignerEmail": "john@example.com",
  "nsbSignerConsent": true
}
```

---

## 🎯 Status Codes

- `200 OK` - Success
- `201 Created` - Resource created
- `400 Bad Request` - Validation error
- `401 Unauthorized` - Missing or invalid token
- `403 Forbidden` - Insufficient permissions
- `404 Not Found` - Resource not found
- `500 Internal Server Error` - Server error

---

**Last Updated:** January 12, 2026

