# Supply Chain Traceability

**Malaysia - Palm Oil & Agriculture**
Use case: Supply Chain Traceability

> Mill-to-port traceability for Malaysian palm oil — Dynamic Tables build chain-of-custody, Iceberg enables auditor self-service via Athena, and Row Access Policies enforce buyer-level data segregation.

## Why Snowflake

Snowflake builds mill-to-port chain-of-custody with Dynamic Tables, enables auditor self-service via Iceberg/Athena, and enforces buyer-level data segregation — all native SQL, no external blockchain needed

- **Dynamic Tables for real-time chain-of-custody** - Only demo building supply chain traceability with Dynamic Tables — not batch ETL
- **Iceberg Tables for auditor self-service via Athena** - Only demo enabling external auditor access without Snowflake license
- **Row Access Policies for buyer data segregation** - Only demo enforcing multi-buyer data isolation in supply chain context
- **Malaysian palm oil traceability context** - RSPO, MSPO, NDPE-specific with realistic mill names and supply chain structure
- **200 audit reports searchable** - Cortex Search on third-party audit findings with severity classification
- **AWS Lake Formation + Iceberg integration** - Only demo showing Snowflake governance as alternative to Lake Formation for supply chain

## What is deployed

| | |
|---|---|
| Database | `MY_PALM_OIL_TRACEABILITY` |
| Service | `MY_PALM_OIL_TRACEABILITY_APP` |
| Compute pool | `SEA_DEMOS_MALAYSIA_POOL` |
| Dimension table | `RAW.BUYERS` (20 rows) |
| Fact table | `RAW.CHAIN_OF_CUSTODY` (250,000 rows, 90 days) |
| Curated layer | `CURATED.PERFORMANCE_SUMMARY`, `CURATED.TREND_ANALYSIS`, `CURATED.KPI_SUMMARY` |
| Currency | MYR (RM) |

Regions in play: Selangor, Johor, Penang, Sabah, Sarawak
Segments: MSPO Certified, RSPO Certified, In Transition, Uncertified

Dynamic tables are created suspended and refreshed on demand:

```bash
./refresh_demo_data.sh MY_PALM_OIL_TRACEABILITY
```

## KPI cards

Every card below is served live from `CURATED.KPI_SUMMARY`. The app keeps the
original literal as a fallback, so it still renders if Snowflake is unreachable.

| Card | Value | Backed by |
|---|---|---|
| TTP Coverage | `96.8%` | average per event |
| MSPO Certified | `87%` | average per event |
| Smallholders Traced | `98K` | total across Buyers |
| Mills Monitored | `247` | total across Buyers |
| Collection Points | `1,247` | total across Buyers |
| GPS-Mapped Plots | `84K` | total across Buyers |
| Data Completeness | `98%` | average per event |


## Demo flow

1. Executive Cockpit
2. Chain of Custody
3. Auditor Access
4. Ask AI
5. Architecture & Data

## Talking points

- **100 mills** - tracked across Peninsular, Sabah, and Sarawak
- **50,000 records** - chain-of-custody entries maintained in real-time
- **99.2% traceable** - volume traceable to plantation level
- **RM 8.9B** - traced export volume this year
- **200 audit reports** - searchable via Cortex Search
- **8 mills** - below 95% traceability threshold
- **3 mills** - flagged for mass balance variance >5%

## Business impact

- 86% of global palm oil buyers now require full traceability to plantation level (CDP Forests)
- RSPO-certified traceable palm oil commands 8-12% price premium over non-traceable (RSPO)
- Malaysia's MSPO mandatory certification covers 94% of planted area as of 2023 (MPOCC)
- Supply chain traceability reduces fraud risk by 45% and improves buyer confidence scores (Deloitte Supply Chain)

---
Generated from `generator/demo_specs/aws-malaysia-palm-oil-traceability.json`. Do not hand-edit: run
`python3 generator/gen_repo_docs.py aws-malaysia-palm-oil-traceability` instead.
