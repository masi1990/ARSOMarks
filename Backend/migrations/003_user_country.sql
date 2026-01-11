-- Add country reference to system_users for registration

BEGIN;

ALTER TABLE system_users
ADD COLUMN IF NOT EXISTS country_id UUID REFERENCES countries(id) ON DELETE SET NULL;

COMMIT;

