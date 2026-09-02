-- Generated from generator/demo_specs/aws-malaysia-palm-oil-traceability.json
-- Regenerate with: python3 generator/gen_repo_docs.py aws-malaysia-palm-oil-traceability
-- This is the schema that is actually deployed for MY_PALM_OIL_TRACEABILITY.

-- MY_PALM_OIL_TRACEABILITY  (Supply Chain Traceability)
-- generated from generator/demo_specs/aws-malaysia-palm-oil-traceability.json - do not hand-edit
CREATE DATABASE IF NOT EXISTS MY_PALM_OIL_TRACEABILITY;
CREATE SCHEMA IF NOT EXISTS MY_PALM_OIL_TRACEABILITY.RAW;
CREATE SCHEMA IF NOT EXISTS MY_PALM_OIL_TRACEABILITY.CURATED;
CREATE SCHEMA IF NOT EXISTS MY_PALM_OIL_TRACEABILITY.APP;
USE DATABASE MY_PALM_OIL_TRACEABILITY;

-- 5 real regions; entity names carry their region so the two always agree
