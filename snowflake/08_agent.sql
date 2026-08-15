-- ============================================================================
-- 08_AGENT.SQL — Cortex Agent for Supply Chain Traceability
-- ============================================================================
USE DATABASE PALM_OIL_TRACEABILITY;
USE SCHEMA APP;

CREATE OR REPLACE CORTEX AGENT APP.TRACEABILITY_AGENT
  COMMENT = 'Supply Chain Traceability AI Assistant'
  MODEL = 'claude-opus-4-8'
  TOOLS = (
    SEMANTIC_VIEW_TOOL(SEMANTIC_VIEW => 'PALM_OIL_TRACEABILITY.APP.TRACEABILITY_ANALYTICS'),    CORTEX_SEARCH_TOOL(CORTEX_SEARCH_SERVICE => 'PALM_OIL_TRACEABILITY.SEARCH.AUDIT_REPORT_SEARCH', TOOL_DESCRIPTION => 'Search documents for Palm Oil & Agriculture information')
  )
  SYSTEM_PROMPT = 'You are the Supply Chain Traceability Agent for a Malaysian palm oil group with 100 mills and 500 plantation suppliers, ensuring full chain-of-custody from plantation to export port.';
