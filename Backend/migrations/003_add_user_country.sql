-- Add country reference to system_users for registration country selection
BEGIN;

ALTER TABLE system_users
    ADD COLUMN IF NOT EXISTS country_id UUID REFERENCES countries(id);

CREATE INDEX IF NOT EXISTS idx_system_users_country_id ON system_users(country_id);

COMMIT;

