DO $$ BEGIN
  CREATE TYPE complaint_status AS ENUM ('RECEIVED', 'UNDER_REVIEW', 'CLOSED', 'REJECTED');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
  CREATE TYPE appeal_status AS ENUM ('RECEIVED', 'UNDER_REVIEW', 'DECIDED', 'REJECTED');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

CREATE TABLE IF NOT EXISTS complaints (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  complaint_number text NOT NULL UNIQUE,
  complainant_name text NOT NULL,
  complainant_email text NOT NULL,
  complainant_phone text NULL,
  subject text NOT NULL,
  description text NOT NULL,
  reference_type text NULL,
  reference_id uuid NULL,
  status complaint_status NOT NULL DEFAULT 'RECEIVED',
  decision_notes text NULL,
  created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS appeals (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  appeal_number text NOT NULL UNIQUE,
  complaint_id uuid NOT NULL,
  appellant_name text NOT NULL,
  appellant_email text NOT NULL,
  appellant_phone text NULL,
  reason text NOT NULL,
  status appeal_status NOT NULL DEFAULT 'RECEIVED',
  decision_notes text NULL,
  created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_appeals_complaint FOREIGN KEY (complaint_id) REFERENCES complaints(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_complaints_status ON complaints(status);
CREATE INDEX IF NOT EXISTS idx_appeals_complaint_id ON appeals(complaint_id);
