-- Migration to make operator table and related tables fields nullable for draft saves
-- This removes NOT NULL constraints to allow partial data saves

BEGIN;

-- Make all required operator fields nullable
ALTER TABLE operators 
  ALTER COLUMN operator_type DROP NOT NULL,
  ALTER COLUMN company_legal_name DROP NOT NULL,
  ALTER COLUMN registration_number_business DROP NOT NULL,
  ALTER COLUMN year_established DROP NOT NULL,
  ALTER COLUMN legal_structure DROP NOT NULL,
  ALTER COLUMN business_activity DROP NOT NULL,
  ALTER COLUMN employee_count DROP NOT NULL,
  ALTER COLUMN annual_turnover DROP NOT NULL,
  ALTER COLUMN ownership_type DROP NOT NULL,
  ALTER COLUMN women_owned DROP NOT NULL,
  ALTER COLUMN beneficial_owners_count DROP NOT NULL,
  ALTER COLUMN pep_involved DROP NOT NULL,
  ALTER COLUMN pep_involved DROP DEFAULT;

-- Make operator_locations fields nullable
ALTER TABLE operator_locations 
  ALTER COLUMN location_type DROP NOT NULL,
  ALTER COLUMN physical_address DROP NOT NULL,
  ALTER COLUMN address_line1 DROP NOT NULL,
  ALTER COLUMN postal_code DROP NOT NULL,
  ALTER COLUMN city_town DROP NOT NULL,
  ALTER COLUMN region_state DROP NOT NULL,
  ALTER COLUMN country_id DROP NOT NULL;

-- Make operator_contacts fields nullable
ALTER TABLE operator_contacts 
  ALTER COLUMN contact_type DROP NOT NULL,
  ALTER COLUMN primary_contact DROP NOT NULL,
  ALTER COLUMN contact_position DROP NOT NULL,
  ALTER COLUMN contact_email DROP NOT NULL,
  ALTER COLUMN contact_phone DROP NOT NULL,
  ALTER COLUMN contact_email_verified DROP NOT NULL,
  ALTER COLUMN contact_phone_verified DROP NOT NULL;

-- Make operator_business_sectors fields nullable
ALTER TABLE operator_business_sectors 
  ALTER COLUMN main_sector DROP NOT NULL,
  ALTER COLUMN percentage_revenue DROP NOT NULL;

-- Make operator_markets fields nullable
ALTER TABLE operator_markets 
  ALTER COLUMN domestic_markets DROP NOT NULL,
  ALTER COLUMN afcfta_awareness DROP NOT NULL;

-- Make operator_production_capacity fields nullable
ALTER TABLE operator_production_capacity 
  ALTER COLUMN production_capacity DROP NOT NULL,
  ALTER COLUMN capacity_unit DROP NOT NULL,
  ALTER COLUMN capacity_utilization DROP NOT NULL,
  ALTER COLUMN quality_management DROP NOT NULL,
  ALTER COLUMN certification_count DROP NOT NULL,
  ALTER COLUMN technical_staff DROP NOT NULL;

-- Make operator_preferences fields nullable
ALTER TABLE operator_preferences 
  ALTER COLUMN preferred_language DROP NOT NULL,
  ALTER COLUMN communication_preferences DROP NOT NULL,
  ALTER COLUMN notification_frequency DROP NOT NULL,
  ALTER COLUMN timezone DROP NOT NULL,
  ALTER COLUMN currency DROP NOT NULL;

-- Make operator_accessibility fields nullable
ALTER TABLE operator_accessibility 
  ALTER COLUMN assistive_tech DROP NOT NULL,
  ALTER COLUMN literacy_level DROP NOT NULL,
  ALTER COLUMN internet_access DROP NOT NULL,
  ALTER COLUMN device_type DROP NOT NULL;

-- Make operator_consents fields nullable
ALTER TABLE operator_consents 
  ALTER COLUMN data_consent DROP NOT NULL,
  ALTER COLUMN data_sharing_consent DROP NOT NULL,
  ALTER COLUMN cross_border_data DROP NOT NULL,
  ALTER COLUMN terms_acceptance DROP NOT NULL,
  ALTER COLUMN declaration_signature DROP NOT NULL,
  ALTER COLUMN declaration_date DROP NOT NULL;

COMMIT;

