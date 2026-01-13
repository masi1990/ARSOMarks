-- Verify existing user emails for development/testing
-- This allows existing users to login without email verification

BEGIN;

UPDATE system_users 
SET email_verified = true,
    email_verification_token = NULL
WHERE email_verified IS NULL OR email_verified = false;

COMMIT;

