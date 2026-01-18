CREATE TABLE IF NOT EXISTS cb_compliance_profiles (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  cb_application_id uuid NOT NULL UNIQUE,
  responsible_persons jsonb NULL,
  auditor_qualifications jsonb NULL,
  countries_of_certification text[] NULL,
  local_offices jsonb NULL,
  created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_cb_compliance_application FOREIGN KEY (cb_application_id) REFERENCES cb_applications(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_cb_compliance_application ON cb_compliance_profiles(cb_application_id);
