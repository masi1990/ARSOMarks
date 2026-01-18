-- Migration: Update users' organizationId from approved NSB registration requests
-- This fixes the issue where users who had their NSB registration requests approved
-- before the automatic organizationId update was implemented need their organizationId set

BEGIN;

-- Update users' organizationId and organizationType based on approved NSB registration requests
UPDATE system_users su
SET 
  organization_id = nrr.nsb_id,
  organization_type = 'NSB',
  updated_at = CURRENT_TIMESTAMP
FROM nsb_registration_requests nrr
WHERE 
  su.id = nrr.created_by
  AND nrr.status = 'APPROVED'
  AND nrr.nsb_id IS NOT NULL
  AND (su.organization_id IS NULL OR su.organization_id != nrr.nsb_id);

-- Log the number of users updateda
DO $$
DECLARE
  updated_count INTEGER;
BEGIN
  GET DIAGNOSTICS updated_count = ROW_COUNT;
  RAISE NOTICE 'Updated % users with organizationId from approved NSB registration requests', updated_count;
END $$;

COMMIT;

