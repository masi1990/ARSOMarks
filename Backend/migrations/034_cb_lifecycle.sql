-- CB lifecycle fields and license agreement document type
BEGIN;

-- Extend cb_document_type for signed license agreements
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM pg_type WHERE typname = 'cb_document_type' AND NOT EXISTS (
        SELECT 1 FROM pg_enum WHERE enumlabel = 'LICENSE_AGREEMENT' AND enumtypid = (SELECT oid FROM pg_type WHERE typname = 'cb_document_type')
    )) THEN
        ALTER TYPE cb_document_type ADD VALUE 'LICENSE_AGREEMENT';
    END IF;
END$$;

ALTER TABLE cb_applications
    ADD COLUMN IF NOT EXISTS license_start DATE,
    ADD COLUMN IF NOT EXISTS license_end DATE,
    ADD COLUMN IF NOT EXISTS renewal_due DATE;

COMMIT;
