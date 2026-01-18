# High-Level Test Scripts (Role & Data-Flow Ordered)

## Public Consumer (Unauthenticated)
- Open `/` and view certified products search; verify list populates via `GET /public/certified-products`.
- Submit public complaint form with attachments; expect 201 response from `POST /complaints` and success toast.
- Attempt to access `/portal/*`; expect redirect to login/unauthorized.

## Authentication & Account Recovery (All roles)
- Register new user with required fields; expect `POST /auth/register` success and verification prompt.
- Login with valid credentials; expect token stored and portal redirect; Http calls include Authorization header.
- Invalid credentials show inline error and no token stored.
- Forgot/reset password: request reset link (`POST /auth/forgot-password`), follow token flow to set new password (`POST /auth/reset-password`), then login succeeds.
- Verify email flow (`POST /auth/verify-email`) marks account as verified.

## Operator – Application Registration & Documents
- Create application registration via form; expect `POST /application-registrations` returns ID.
- Upload required documents against application (`POST /document-upload/:applicationId/...`); verify list refresh and download links (`GET /document-upload/.../view`).
- Edit application and resubmit; expect `PUT/PATCH` as implemented and status updates on list page.

## Operator – Product Certification Flow
- Start product certification application; save draft then submit; verify `POST /product-certifications` followed by detail fetches.
- Add products/specifications, volume info, and documents; ensure multi-select fields persist.
- Check application appears in list and detail route `/portal/product-certification/applications/:id` loads correctly.

## Operator – Mark Licensing
- Apply for mark license (`POST /mark-licenses/applications`); confirm dashboard metrics update.
- Add agreements/reports/modifications as applicable via respective forms; document uploads succeed.
- Report mark misuse with description/file; expect `POST /mark-licenses/applications/misuse` and incident visible in list.

## Operator – Complaints (Portal)
- Submit portal complaint; verify `POST /complaints` success and evidence upload path `POST /complaints/:id/evidence`.
- Review complaint status updates reflected on reload.

## NSB Admin/User – NSB Management
- Submit NSB registration request as allowed role; verify `POST /nsb-registration-requests`.
- Review NSB requests (approve/reject); expect status change persisted via respective endpoints.
- Manage stakeholder registry entries (create/list/update) through `/nsb` services; documents open via `GET .../documents/:id/view`.
- View NSB dashboard metrics load without errors.

## CB Admin/User – Conformity Body Flows
- Create CB application (`POST /cb-applications`) and view list `/cb/applications`.
- Update CB compliance profile (`POST /cb-compliance/:cbApplicationId`); subsequent `GET` returns saved data.

## Certification Audits (Operator/CB as applicable)
- Create audit with scheduling fields; verify `POST /certification-audits`.
- Add findings, sampling, labs, and test results; ensure each child form persists and appears in timeline list.
- File uploads or external links render and remain accessible.

## ARSO Secretariat / Super Admin – Approvals & Reference Data
- Review role requests list (`GET /auth/role-requests`), approve/deny (`POST /auth/role-requests/:id/decision`); user roles change on next login/profile fetch.
- Approve NSB/CB/applications where applicable; status updates visible to submitters.
- Manage reference data (countries, regions, RECs, schemes, accreditation bodies); create/update items and verify lists refresh.
- Manage system roles/users in role admin page; changes reflected in navigation visibility for affected users.

## Document Upload Area (Cross-role)
- Switch between document categories; tab state persists.
- Upload, replace, delete documents; success toasts and list updates.
- Download/view document using generated `.../view` links; file loads in browser.

## Authorization & Navigation Guards
- Access a portal route without token → redirected to login.
- Authenticated user lacking required role hits guarded route (e.g., `/portal/reference-data`) → redirected to unauthorized page.
- Token present with correct roles loads route and displays sidebar/menu appropriate to role set.

## Regression & UX Consistency Checks
- All text inputs/selects/textareas show neutral white background, slate borders, and focus ring per Tailwind base/global styles.
- Buttons use neutral/dark palette (`btn`, `btn-primary`, `btn-secondary`) and honor disabled state.
- Cards/panels render white/neutral backgrounds with slate borders across pages (auth, portal, public layouts).

