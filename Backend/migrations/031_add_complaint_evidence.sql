ALTER TABLE complaints
  ADD COLUMN IF NOT EXISTS evidence_files jsonb NULL;
