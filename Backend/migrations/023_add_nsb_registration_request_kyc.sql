BEGIN;

ALTER TABLE nsb_registration_requests
  ADD COLUMN legal_status text,
  ADD COLUMN establishment_act_name text,
  ADD COLUMN establishment_act_number text,
  ADD COLUMN establishment_act_date date,
  ADD COLUMN registration_number text,
  ADD COLUMN registration_authority text,
  ADD COLUMN tax_identification_number text,
  ADD COLUMN vat_number text,
  ADD COLUMN year_established int,
  ADD COLUMN website varchar(500),
  ADD COLUMN director_general_name varchar(255),
  ADD COLUMN director_general_title varchar(255),
  ADD COLUMN director_general_email varchar(255),
  ADD COLUMN director_general_phone varchar(50),
  ADD COLUMN board_chair_name varchar(255),
  ADD COLUMN board_chair_email varchar(255),
  ADD COLUMN board_chair_phone varchar(50),
  ADD COLUMN headquarters_address jsonb,
  ADD COLUMN postal_address jsonb,
  ADD COLUMN additional_addresses jsonb,
  ADD COLUMN additional_contacts jsonb,
  ADD COLUMN key_officials jsonb,
  ADD COLUMN international_memberships jsonb,
  ADD COLUMN mandate_areas text[];

COMMIT;
