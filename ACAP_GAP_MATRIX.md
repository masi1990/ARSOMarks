## ACAP Gap Matrix (Modules)

| Module | Required fields/workflows | Current state (inferred) | Gap / action |
| --- | --- | --- | --- |
| CB approval (ACAP 1-3) | Intake identity/contact/address/regions; accreditation status + AB (AFRAC MRA) info; cert/scope/ack attachments; prior license history; status flow applied→review→provisional→approved→suspended/withdrawn; provisional expiry (≤2y) + transfer; license dates (start/end/provisional_end/renewal_due); signed Annex A storage | CB approval module exists; status/date fields and attachments not present; provisional/transfer rules not enforced | Add fields + migration + DTO updates; AFRAC AB validation; lifecycle endpoints + guards; license file upload/storage; provisional expiry scheduler/check |
| CB compliance profile | Responsible persons; audit personnel qualifications; countries of certification; local office relationships; complaints/appeals log | Basic profile likely minimal | Extend entity/DTO with arrays/JSON + validations; add endpoints to manage collections; attach evidence uploads |
| CB accreditation | Accreditation status ISO/IEC 17065/17021-1; AB info; certificate/scope uploads; non-accredited tracking (application date/progress) | Not captured | Add accreditation entity/fields; upload handling; AFRAC MRA lookup/enum; progress updates |
| Operator registration (ACAP 1-1) | geo_lat/geo_lng/geo_accuracy_m; legal_reg_number_type/value; group_manager_id; group_members[]; scheme-specific sections per ACAP 1-2 | Registration DTO/entity missing geo/legal/group/scheme blocks | Extend entity/DTO; add validation for accuracy and required combos; scheme block placeholder per scheme payload |
| Contracts (operator) | certification_agreement, sub_license_agreement, contract_start/end (3y), cb_change_request + justification + penalty policy | Not modeled | Add contract bundle entity or fields on operator/certification; upload endpoints; 3y validity enforcement |
| Certification cycle | Audit entity types (doc_review/initial/surveillance/recert/follow_up/unannounced); scheduling rules; planned vs actual dates; time-window checks (e.g., NC closure) | Certification-audit module exists but limited | Add type enum + scheduling fields; window validation; store planned/actual; rule helpers |
| NC/CAPA | NC types (major/minor/observation/critical); deadlines; evidence uploads; verification; escalation to suspension | NC entities exist but light | Add severity/deadline/closure verification; evidence link; escalation workflow |
| Sampling/testing | Sampling record (qty/location/method/traceability); lab accreditation (AFRAC/ILAC); test report upload; link to audit | Entities exist | Add missing fields + validation + uploads; lab accreditation check |
| Marks & sanctions | Mark license tied to certificate; usage approvals; misuse incidents; sanction workflow (warning/suspension/withdrawal) + registry | Mark licensing module exists; misuse/sanctions partially present | Add mark_license entity link to certificates; incident workflow; sanction states/dates; reporting endpoints |
| Evidence uploads/downloads | Multi-file evidence per NC/CAPA/audit/contract/etc.; list + download | Upload services exist per module; no shared evidence model | Introduce evidence model + service; normalize metadata; endpoints list/download; link to parents |
| Scheme-specific payloads (ACAP 1-2) | scheme_type/scope; per-scheme JSON payload validated per annex (sites, quantities, processes, sampling rules, audit team quals, group/QMS) | Not present | Add JSON schema set + validation; store per operator/application |
| Complaints/appeals (ISO 17065) | Intake → adjudicate → notify; log; linkage to CB/operator | Complaints module exists | Ensure ISO 17065 log fields and statuses; evidence uploads; decision timestamps |
| ISO/IEC 17065 controls | Impartiality committee/risks/meetings; public directory of certified products; certification decision logs + separation; records retention/access | Not present | Add management records + endpoints; directory listing; decision log with role separation; retention policy fields |

## ACAP Gap Matrix (Schemes)

| Scheme | Areas | Gap / action |
| --- | --- | --- |
| ACAP 1-3 (CB approval) | Intake data, accreditation status/AB, Annex A license storage, lifecycle transitions, provisional expiry/transfer, responsible persons, audit personnel quals, countries/local offices, complaints/appeals log | Implement intake & accreditation fields; enforce lifecycle; store license; add compliance profile fields and validations |
| ACAP 1-1 (Operator) | Geo coords ±10m; legal registration ID/type; group manager/members; scheme-specific sections; certification/sub-license agreements; contract term 3y; CB change penalty; marks issuance only after certificate; misuse/sanctions | Extend registration; contract bundle; mark license gating; misuse/sanction workflow |
| ACAP 1-2 (Scheme annexes) | Production sites/quantities/processes; sampling rules (square-root); audit team quals; group/QMS; scheme_payload JSON per scheme | Add scheme_type/scope + payload; validate with per-annex JSON schemas |
| ISO/IEC 17065 | Impartiality mechanisms; complaints/appeals log; public directory; certification decision log with separation; retention/access controls | Add management entities/endpoints; expose directory; enforce decision separation and retention metadata |

## Immediate Implementation Notes
- Use shared evidence model to support multi-file uploads with parent type/id, filename, storage key, uploaded_by, size, mime, created_at.
- Add JSON schema validation via pipes (class-validator + custom Ajv/Zod) for CB compliance and scheme_payload fields.
- Add lifecycle guards to enforce provisional ≤ 2 years and require accredited CB for transfer to approved.
- Ensure AFRAC MRA accreditation body validation via enum/lookup table.
