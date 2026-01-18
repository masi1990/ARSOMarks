-- Evidence file storage for multi-file uploads across modules
BEGIN;

DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'evidence_parent_type') THEN
        CREATE TYPE evidence_parent_type AS ENUM (
            'COMPLAINT',
            'APPEAL',
            'CERTIFICATION_AUDIT',
            'AUDIT_FINDING',
            'CORRECTIVE_ACTION',
            'MARK_MISUSE',
            'MARK_LICENSE',
            'CB_APPLICATION',
            'CB_LICENSE',
            'OPERATOR_CONTRACT',
            'OTHER'
        );
    END IF;
END$$;

CREATE TABLE IF NOT EXISTS evidence_files (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    parent_type evidence_parent_type NOT NULL,
    parent_id UUID NOT NULL,
    original_name TEXT NOT NULL,
    stored_name TEXT NOT NULL,
    stored_path TEXT NOT NULL,
    mime_type TEXT NOT NULL,
    size INTEGER NOT NULL,
    hash TEXT NOT NULL,
    uploaded_by UUID,
    description TEXT,
    created_at TIMESTAMP WITHOUT TIME ZONE DEFAULT NOW() NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_evidence_files_parent ON evidence_files (parent_type, parent_id);

COMMIT;
