DO $$ BEGIN
  CREATE TYPE mark_misuse_status AS ENUM ('OPEN', 'UNDER_REVIEW', 'RESOLVED', 'DISMISSED');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE mark_sanction_type AS ENUM ('WARNING', 'SUSPENSION', 'WITHDRAWAL');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE mark_sanction_status AS ENUM ('ACTIVE', 'LIFTED');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

CREATE TABLE IF NOT EXISTS mark_misuse_incidents (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  license_id uuid NULL,
  description text NOT NULL,
  evidence_files jsonb NULL,
  status mark_misuse_status NOT NULL DEFAULT 'OPEN',
  reported_by uuid NULL,
  reviewed_by uuid NULL,
  decision_notes text NULL,
  reported_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_mark_misuse_license FOREIGN KEY (license_id) REFERENCES mark_license_agreements(id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS mark_sanctions (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  incident_id uuid NOT NULL,
  sanction_type mark_sanction_type NOT NULL,
  status mark_sanction_status NOT NULL DEFAULT 'ACTIVE',
  start_date date NULL,
  end_date date NULL,
  notes text NULL,
  created_by uuid NULL,
  created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_mark_sanctions_incident FOREIGN KEY (incident_id) REFERENCES mark_misuse_incidents(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_mark_misuse_license_id ON mark_misuse_incidents(license_id);
CREATE INDEX IF NOT EXISTS idx_mark_misuse_status ON mark_misuse_incidents(status);
CREATE INDEX IF NOT EXISTS idx_mark_sanctions_incident_id ON mark_sanctions(incident_id);
