-- Product Traceability: standards, COC/QR, logging for scans/searches, origin country
BEGIN;

-- Ensure pgcrypto is available for gen_random_uuid
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Enum for Certificate of Conformity status
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'coc_status') THEN
    CREATE TYPE coc_status AS ENUM ('ISSUED', 'VALID', 'EXPIRED', 'REVOKED');
  END IF;
END$$;

-- Standards master
CREATE TABLE IF NOT EXISTS standards (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code VARCHAR(100) NOT NULL UNIQUE,
  name VARCHAR(255) NOT NULL,
  version VARCHAR(50),
  issuing_authority VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Product-to-standard mapping (supports linking to a certification application)
CREATE TABLE IF NOT EXISTS product_standards (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  standard_id UUID NOT NULL REFERENCES standards(id) ON DELETE CASCADE,
  certification_application_id UUID REFERENCES product_certification_applications(id) ON DELETE SET NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE (product_id, standard_id, certification_application_id)
);

-- Add origin country to products
ALTER TABLE products
  ADD COLUMN IF NOT EXISTS origin_country_id UUID REFERENCES countries(id) ON DELETE SET NULL;

-- Certificate of Conformity / traceability record
CREATE TABLE IF NOT EXISTS cocs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  coc_number VARCHAR(100) NOT NULL UNIQUE,
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  application_id UUID NOT NULL REFERENCES product_certification_applications(id) ON DELETE CASCADE,
  status coc_status NOT NULL DEFAULT 'ISSUED',
  public_url TEXT,
  qr_payload_sig TEXT,
  issued_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  expires_at TIMESTAMP,
  revoked_at TIMESTAMP,
  checksum VARCHAR(12),
  origin_country_id UUID REFERENCES countries(id) ON DELETE SET NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_cocs_product_id ON cocs(product_id);
CREATE INDEX IF NOT EXISTS idx_cocs_application_id ON cocs(application_id);
CREATE INDEX IF NOT EXISTS idx_cocs_status ON cocs(status);

-- QR tokens backing public verification links
CREATE TABLE IF NOT EXISTS qr_tokens (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  coc_id UUID NOT NULL REFERENCES cocs(id) ON DELETE CASCADE,
  token TEXT NOT NULL,
  expires_at TIMESTAMP,
  last_used_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_qr_tokens_coc_id ON qr_tokens(coc_id);

-- Status history for compliance/audit
CREATE TABLE IF NOT EXISTS coc_status_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  coc_id UUID NOT NULL REFERENCES cocs(id) ON DELETE CASCADE,
  application_id UUID REFERENCES product_certification_applications(id) ON DELETE SET NULL,
  event VARCHAR(50) NOT NULL,
  reason TEXT,
  actor_id UUID,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_coc_status_history_coc_id ON coc_status_history(coc_id);

-- Scan logs for QR verification attempts (market surveillance / anti-counterfeit)
CREATE TABLE IF NOT EXISTS scan_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  coc_id UUID REFERENCES cocs(id) ON DELETE SET NULL,
  product_id UUID REFERENCES products(id) ON DELETE SET NULL,
  application_id UUID REFERENCES product_certification_applications(id) ON DELETE SET NULL,
  token TEXT,
  ip VARCHAR(64),
  country VARCHAR(100),
  city VARCHAR(100),
  lat NUMERIC(10, 6),
  lon NUMERIC(10, 6),
  user_agent TEXT,
  result VARCHAR(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS idx_scan_logs_created_at ON scan_logs(created_at);
CREATE INDEX IF NOT EXISTS idx_scan_logs_coc_id ON scan_logs(coc_id);

-- Search logs for public product lookups
CREATE TABLE IF NOT EXISTS search_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  query TEXT,
  filters JSONB,
  ip VARCHAR(64),
  country VARCHAR(100),
  city VARCHAR(100),
  lat NUMERIC(10, 6),
  lon NUMERIC(10, 6),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS idx_search_logs_created_at ON search_logs(created_at);

COMMIT;
