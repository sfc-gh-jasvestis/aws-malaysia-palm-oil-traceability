-- ============================================================================
-- Supply Chain Traceability
-- Mill-to-port traceability for Malaysian palm oil — Dynamic Tables build chain-of-custody, Iceberg enables auditor self-service via Athena, and Row Access Policies enforce buyer-level data segregation.
-- ============================================================================
USE ROLE ACCOUNTADMIN;
CREATE DATABASE IF NOT EXISTS PALM_OIL_TRACEABILITY;
CREATE WAREHOUSE IF NOT EXISTS TRACEABILITY_WH WAREHOUSE_SIZE = 'MEDIUM' AUTO_SUSPEND = 120 AUTO_RESUME = TRUE;
USE DATABASE PALM_OIL_TRACEABILITY;
CREATE SCHEMA IF NOT EXISTS RAW;
CREATE SCHEMA IF NOT EXISTS CURATED;
CREATE SCHEMA IF NOT EXISTS ML;
CREATE SCHEMA IF NOT EXISTS AI;
CREATE SCHEMA IF NOT EXISTS SEARCH;
CREATE SCHEMA IF NOT EXISTS APP;

USE WAREHOUSE TRACEABILITY_WH;
