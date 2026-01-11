-- Migration: Add missing NSB profile fields for National Legal Framework links
BEGIN;

ALTER TABLE nsb
ADD COLUMN IF NOT EXISTS national_standards_act_link VARCHAR(500),
ADD COLUMN IF NOT EXISTS national_conformity_assessment_policy_link VARCHAR(500);

COMMIT;

