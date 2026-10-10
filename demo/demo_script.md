# Palm Oil Mill-to-Port Traceability

**Malaysia - Agriculture supply chain**
Use case: Chain of custody for crude palm oil (CPO) from mill to bulking terminal in a fictional supply chain

> A fictional Malaysian CPO supply chain, 40 mills from Sabah to Pahang, traced from mill weighbridge to port bulking terminal: dynamic tables for traceability to plantation, a holdout-evaluated custody-break classifier, a CPO custody-transfer forecast and grounded AI answers. Custody checks are demo signals, not audit or certification verdicts.

## Why Snowflake

- **Dynamic tables** reconcile CPO custody transfers, traceability to plantation, custody flags, confirmed custody breaks and mass-balance reconciliation rates from RAW mill data, with checks in `run_core.py`
- **Custody-break classification** gives a holdout-evaluated next-7-day probability per mill
- **Dispatch forecast** projects 14 days of network-wide CPO custody transfers with prediction intervals, for bulking terminal intake planning
- **Grounded AI**: the Cortex Agent (Analyst over a semantic view, plus Search over SOPs) shows its SQL and SOP citations
- **Live transfers**: a native dispatch simulator (Snowflake only) or Amazon Data Firehose, S3 and Snowpipe (AWS build), then an alert and email

## What is built

| | |
|---|---|
| Dimension table | `RAW.MILLS` (40 rows) |
| Fact table | `RAW.MILL_DAILY` (3,600 mill-days, 90 days) |
| Curated layer | `CURATED.KPI_SUMMARY`, `PERFORMANCE_SUMMARY`, `SIGNAL_SUMMARY`, `TREND_ANALYSIS` |
| ML | `ML.CUSTODY_RISK_SCORES`, `ML.CUSTODY_RISK_HOLDOUT_METRICS`, `ML.DISPATCH_FORECAST`, `ML.MB_VARIANCE_ANOMALIES` |

Cities: Lahad Datu, Sandakan, Tawau, Bintulu, Miri, Sibu, Teluk Intan, Kuantan.
Sourcing models: Group estate mill, Settler scheme mill, Independent smallholder mill, Collection centre mill, Crushing-contract mill.

## KPI cards (live from `CURATED.KPI_SUMMARY`; no fallback values)

| Card | Value from the seeded data |
|---|---|
| Traceability to Plantation | 79.8% |
| CPO Custody Transfers | 43,995 |
| CPO Dispatched (kt) | 1,171 |
| Custody Flags | 623 |
| Confirmed Custody Breaks | 168 |
| Flag Precision | 27.0% |
| Lots Held at Bulking Terminal | 72 |
| Mass-Balance Reconciliation Rate | 79.3% |
| Mills Monitored | 40 |
| Supplier Link Coverage | 70.6% |
| Supplier Verifications Pending | 1,181 |
| Registered FFB Suppliers | 14,752 |

Values are synthetic. A rebuild reproduces them because the data is HASH-seeded; dates are relative to the build day.

## Demo flow

1. Executive Cockpit: KPIs, daily CPO custody transfers against custody flags, flags and confirmed custody breaks by custody signal, mill table
2. Predictive: holdout metrics, risk bands, 14-day CPO dispatch forecast, mass-balance variance anomalies
3. Supplier Registry: mass-balance reconciliation rate, supplier link coverage and pending verifications, reconciliation rate against confirmed breaks, then generate the action memo
4. Live Transfers: run `CALL APP.SIMULATE_TRANSFERS(20)` (Snowflake only) or `python aws/publish_transfers.py --count 20` (AWS build). Then run `EXECUTE ALERT APP.LIVE_TRANSFER_ALERT` and show the alert log and email.
5. Ask AI: the Cortex Agent answers metric questions through the semantic view and cites SOPs from Cortex Search. The SQL is shown.
6. QuickSight (AWS build): the same Snowflake tables through DIRECT_QUERY
7. Architecture: both builds side by side

## Talking points

- About one custody flag in four is confirmed as a custody break (27.0%). The rest are false positives, and that is where the traceability team loses its week.
- Mass balance variance produces the most confirmed breaks (33); unregistered supplier intake raises the most flags (136), of which 31 are confirmed. Weighbridge system outage flags hit every mill in a town at once and are never confirmed.
- The risk model is evaluated on a time-based holdout: precision 0.43 and recall 0.20 at 0.5, against a 0.26 base rate. Use it to order mill visits, not as a verdict. Forecast and anomaly figures can shift slightly with the build day.
- Weighbridge system outage days are excluded from model training, because the mill did not cause them.

## Business impact

Use only the sourced references in `README.md` (Business Impact).
