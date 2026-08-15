-- ============================================================================
-- 03_STAGING.SQL — Generate synthetic data for Supply Chain Traceability
-- Country: MALAYSIA | Currency: MYR
-- ============================================================================
USE DATABASE PALM_OIL_TRACEABILITY;
USE SCHEMA RAW;

-- Data generation scripts are demo-specific.
-- See the handcrafted SQL in the aws-malaysia-semiconductor-yield demo for
-- the full pattern: GENERATOR + UNIFORM + LATERAL for distribution,
-- Cortex Complete for text generation, engineered key demo numbers.

-- Target row counts:
-- MILLS: 100 rows — Palm oil mills with GPS coordinates, capacity, and certification status
-- SHIPMENTS: 20,000 rows — CPO and CPKO shipments from mill to refinery to port
-- CHAIN_OF_CUSTODY: 50,000 rows — Custody transfer records linking plantation to mill to buyer
-- CERTIFICATIONS: 3,000 rows — RSPO, MSPO, ISCC, and NDPE certifications per mill and supplier
-- AUDIT_REPORTS: 200 rows — Third-party audit reports, mass balance reconciliations, and findings
-- BUYERS: 30 rows — International buyers with sustainability requirements and data access scope
-- PLANTATION_SUPPLIERS: 500 rows — Smallholders and estate suppliers feeding into each mill
