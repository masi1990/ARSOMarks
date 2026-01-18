-- Operator scheme type and payload for ACAP 1-2 sections
BEGIN;

ALTER TABLE operators
    ADD COLUMN IF NOT EXISTS scheme_type TEXT,
    ADD COLUMN IF NOT EXISTS scheme_payload JSONB;

COMMIT;
