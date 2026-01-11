-- Role requests workflow
BEGIN;

-- Ensure array column for multiple roles on users
ALTER TABLE system_users
ADD COLUMN IF NOT EXISTS roles user_role[] DEFAULT ARRAY[]::user_role[];

-- Role request status enum
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'role_request_status') THEN
        CREATE TYPE role_request_status AS ENUM ('PENDING', 'APPROVED', 'REJECTED');
    END IF;
END$$;

-- Role requests table
CREATE TABLE IF NOT EXISTS role_requests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES system_users(id) ON DELETE CASCADE,
    requested_roles user_role[] NOT NULL,
    status role_request_status DEFAULT 'PENDING',
    decision_note TEXT,
    reviewed_by UUID NULL,
    reviewed_at TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Updated at trigger
CREATE OR REPLACE FUNCTION update_role_requests_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_update_role_requests_updated_at
    BEFORE UPDATE ON role_requests
    FOR EACH ROW
    EXECUTE FUNCTION update_role_requests_updated_at();

CREATE INDEX IF NOT EXISTS idx_role_requests_user ON role_requests(user_id);
CREATE INDEX IF NOT EXISTS idx_role_requests_status ON role_requests(status);

COMMIT;

