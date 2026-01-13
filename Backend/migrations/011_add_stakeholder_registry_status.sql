-- Migration: Add stakeholder registry status tracking
-- Adds status field to track draft vs submitted stakeholder registries

BEGIN;

-- Create enum for stakeholder registry status
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'stakeholder_registry_status_type') THEN
        CREATE TYPE stakeholder_registry_status_type AS ENUM (
            'DRAFT',
            'SUBMITTED'
        );
    END IF;
END$$;

-- Add status field to nsb table
ALTER TABLE nsb
    ADD COLUMN IF NOT EXISTS stakeholder_registry_status stakeholder_registry_status_type DEFAULT 'DRAFT',
    ADD COLUMN IF NOT EXISTS stakeholder_registry_submitted_at TIMESTAMP,
    ADD COLUMN IF NOT EXISTS stakeholder_registry_submitted_by UUID REFERENCES system_users(id) ON DELETE SET NULL;

-- Create index for filtering by status
CREATE INDEX IF NOT EXISTS idx_nsb_stakeholder_registry_status ON nsb(stakeholder_registry_status);

COMMIT;

