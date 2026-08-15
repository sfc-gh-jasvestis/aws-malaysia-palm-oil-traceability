# Demo Script: Supply Chain Traceability
## ~4-Minute Recorded Walkthrough
**Format**: Screen recording with voiceover
**Target**: Customer meeting / booth loop / social share
**Narrative**: "Snowflake builds mill-to-port chain-of-custody with Dynamic Tables, enables auditor self-service via Iceberg/Athena, and enforces buyer-level data segregation — all native SQL, no external blockchain needed"
**Demo Mode**: Open app with `?demo=true` for presenter notes

---

## Two Personas

| Persona | Role | Tool | What they care about |
|---|---|---|---|
| **Puan Rosnah binti Abdullah** | VP Supply Chain | React App (SPCS) | End-to-end traceability, buyer compliance requirements, shipment delays, NDPE commitments |
| **James Ong** | Traceability Auditor | Amazon QuickSight | Audit trail integrity, certification verification, mass balance reconciliation, data access controls |

---

## What's Built

| Layer | Component | Detail |
|---|---|---|
| **RAW** | 7 tables | MILLS (100), SHIPMENTS (20000), CHAIN_OF_CUSTODY (50000), CERTIFICATIONS (3000), AUDIT_REPORTS (200), BUYERS (30), PLANTATION_SUPPLIERS (500) |
| **CURATED** | 4 Dynamic Tables | FULL_CHAIN_OF_CUSTODY, MILL_TRACEABILITY_SCORE, BUYER_SUPPLY_CHAIN_VIEW, MASS_BALANCE_RECONCILIATION |
| **ML** | ML.ANOMALY_DETECTION | Forecasting + anomaly detection |
| **AI** | AI_PARSE_DOCUMENT, SUMMARIZE, AI_CLASSIFY | Classification + extraction |
| **Search** | Cortex Search | 200 documents indexed |
| **Agent** | TRACEABILITY_AGENT | Semantic View + Search tools |


---

## The Story

A major Malaysian palm oil group operates 100 mills sourcing from 500 plantation suppliers across Peninsular Malaysia, Sabah, and Sarawak. International buyers like Unilever, Nestlé, and Wilmar require full plantation-to-port traceability and NDPE compliance proof. Eight mills are below the 95% traceability threshold, and mass balance reconciliation flags 3 mills with suspicious variance. Auditors need self-service access without a Snowflake license.

---

## Script

### [0:00–0:45] EXECUTIVE COCKPIT

**Show**: Executive Cockpit tab

> "One hundred mills tracked — 99.2% of volume traceable to plantation level."

**Action**: Point at the 99.2% traceability KPI

### [0:45–1:30] CHAIN OF CUSTODY

**Show**: Chain of Custody tab

> "Full plantation-to-port chain for every tonne of CPO — built automatically by Dynamic Tables."

**Action**: Click shipment SHP-2024-0847 for full chain visualization

### [1:30–2:15] AUDITOR ACCESS

**Show**: Auditor Access tab

> "Row Access Policies enforce buyer-level data segregation — Unilever sees only their supply chain."

**Action**: Show Row Access Policy in action — toggle between buyer views

### [2:15–3:00] ASK AI

**Show**: Ask AI tab

> "Puan Rosnah asks: 'What percentage of our volume is traceable to plantation?'"

**Action**: Type: 'What is our traceability percentage by mill?'

### [3:00–3:45] ARCHITECTURE & DATA

**Show**: Architecture & Data tab

> "Seven Snowflake capabilities, six AWS services."

**Action**: Walk through architecture diagram


---

## Key Demo Differentiators

1. **Dynamic Tables for real-time chain-of-custody** — Only demo building supply chain traceability with Dynamic Tables — not batch ETL
2. **Iceberg Tables for auditor self-service via Athena** — Only demo enabling external auditor access without Snowflake license
3. **Row Access Policies for buyer data segregation** — Only demo enforcing multi-buyer data isolation in supply chain context
4. **Malaysian palm oil traceability context** — RSPO, MSPO, NDPE-specific with realistic mill names and supply chain structure
5. **200 audit reports searchable** — Cortex Search on third-party audit findings with severity classification
6. **AWS Lake Formation + Iceberg integration** — Only demo showing Snowflake governance as alternative to Lake Formation for supply chain


---

## Demo Prep Checklist

### Data Verification
- [ ] `SELECT COUNT(*) FROM PALM_OIL_TRACEABILITY.RAW.MILLS` → 100
- [ ] `SELECT COUNT(*) FROM PALM_OIL_TRACEABILITY.RAW.CHAIN_OF_CUSTODY` → 50000
- [ ] `SELECT COUNT(*) FROM PALM_OIL_TRACEABILITY.RAW.SHIPMENTS` → 20000

### ML Model Verification
- [ ] `SELECT COUNT(*) FROM PALM_OIL_TRACEABILITY.ML.MASS_BALANCE_ANOMALY_RESULTS WHERE IS_ANOMALY = TRUE` → >=3

### AI/Agent Verification
- [ ] `SELECT COUNT(*) FROM PALM_OIL_TRACEABILITY.AI.PARSED_AUDIT_REPORTS` → 200
- [ ] `SELECT COUNT(*) FROM PALM_OIL_TRACEABILITY.AI.SHIPMENT_RISK_CLASSIFICATION` → >0

