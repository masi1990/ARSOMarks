-- Authentication Schema Migration
-- Adds password, password reset, and role enum to system_users

BEGIN;

-- Create user role enum based on ACAP standards
CREATE TYPE user_role AS ENUM (
    'SUPER_ADMIN',           -- ARSO Central Secretariat super admin
    'ARSO_COUNCIL',          -- ARSO Council member
    'CACO_MEMBER',           -- ARSO Conformity Assessment Committee member
    'ARSO_SECRETARIAT',      -- ARSO Central Secretariat staff
    'ADVISORY_COMMITTEE',    -- Advisory Committee member
    'SMC_MEMBER',            -- Standards Management Committee member
    'NSB_ADMIN',             -- National Standards Body administrator
    'NSB_USER',              -- National Standards Body user
    'CB_ADMIN',              -- Certification Body administrator
    'CB_USER',               -- Certification Body user
    'OPERATOR',              -- Certified client/operator
    'ACCREDITATION_BODY',    -- Accreditation Body user
    'PUBLIC'                 -- Public user (limited access)
);

-- Add authentication fields to system_users
ALTER TABLE system_users 
    ADD COLUMN IF NOT EXISTS password_hash VARCHAR(255),
    ADD COLUMN IF NOT EXISTS password_reset_token VARCHAR(255),
    ADD COLUMN IF NOT EXISTS password_reset_expires TIMESTAMP,
    ADD COLUMN IF NOT EXISTS email_verified BOOLEAN DEFAULT false,
    ADD COLUMN IF NOT EXISTS email_verification_token VARCHAR(255),
    ADD COLUMN IF NOT EXISTS last_login TIMESTAMP,
    ADD COLUMN IF NOT EXISTS failed_login_attempts INTEGER DEFAULT 0,
    ADD COLUMN IF NOT EXISTS locked_until TIMESTAMP,
    ADD COLUMN IF NOT EXISTS phone VARCHAR(50),
    ADD COLUMN IF NOT EXISTS organization_id UUID,  -- Can reference NSB, CB, etc.
    ADD COLUMN IF NOT EXISTS organization_type VARCHAR(50),  -- 'NSB', 'CB', 'OPERATOR', etc.
    ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP;

-- Update role column to use enum (if data exists, convert first)
-- Note: This assumes existing roles are compatible or need manual migration
DO $$
BEGIN
    -- Only alter if the column doesn't already use the enum
    IF EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'system_users' 
        AND column_name = 'role' 
        AND data_type = 'character varying'
    ) THEN
        -- Convert existing role column to enum
        ALTER TABLE system_users 
            ALTER COLUMN role TYPE VARCHAR(100);
        
        -- Add new role_enum column
        ALTER TABLE system_users 
            ADD COLUMN role_enum user_role;
        
        -- Migrate existing roles (if any) - adjust as needed
        UPDATE system_users 
        SET role_enum = CASE 
            WHEN role = 'SUPER_ADMIN' THEN 'SUPER_ADMIN'::user_role
            WHEN role = 'ARSO_COUNCIL' THEN 'ARSO_COUNCIL'::user_role
            WHEN role = 'CACO_MEMBER' THEN 'CACO_MEMBER'::user_role
            WHEN role = 'ARSO_SECRETARIAT' THEN 'ARSO_SECRETARIAT'::user_role
            WHEN role = 'ADVISORY_COMMITTEE' THEN 'ADVISORY_COMMITTEE'::user_role
            WHEN role = 'SMC_MEMBER' THEN 'SMC_MEMBER'::user_role
            WHEN role = 'NSB_ADMIN' THEN 'NSB_ADMIN'::user_role
            WHEN role = 'NSB_USER' THEN 'NSB_USER'::user_role
            WHEN role = 'CB_ADMIN' THEN 'CB_ADMIN'::user_role
            WHEN role = 'CB_USER' THEN 'CB_USER'::user_role
            WHEN role = 'OPERATOR' THEN 'OPERATOR'::user_role
            WHEN role = 'ACCREDITATION_BODY' THEN 'ACCREDITATION_BODY'::user_role
            ELSE 'PUBLIC'::user_role
        END;
        
        -- Drop old column and rename new one
        ALTER TABLE system_users DROP COLUMN role;
        ALTER TABLE system_users RENAME COLUMN role_enum TO role;
    END IF;
END $$;

-- If no existing data, just add the enum column
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'system_users' 
        AND column_name = 'role' 
        AND udt_name = 'user_role'
    ) THEN
        ALTER TABLE system_users 
            DROP COLUMN IF EXISTS role,
            ADD COLUMN role user_role;
    END IF;
END $$;

-- Create index for password reset token lookups
CREATE INDEX IF NOT EXISTS idx_system_users_reset_token ON system_users(password_reset_token) 
    WHERE password_reset_token IS NOT NULL;

-- Create index for email verification
CREATE INDEX IF NOT EXISTS idx_system_users_verification_token ON system_users(email_verification_token) 
    WHERE email_verification_token IS NOT NULL;

-- Create trigger for updated_at
CREATE OR REPLACE FUNCTION update_system_users_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_system_users_updated_at
    BEFORE UPDATE ON system_users
    FOR EACH ROW
    EXECUTE FUNCTION update_system_users_updated_at();

COMMIT;

