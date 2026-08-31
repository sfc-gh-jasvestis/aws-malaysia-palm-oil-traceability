'use client';

import { useEffect, useState } from 'react';
import { AppLayout } from '@/components/AppLayout';
import { KPICard } from '@/components/KPICard';
import { Chart } from '@/components/Chart';
import { DataTable } from '@/components/DataTable';
import { AskAI } from '@/components/AskAI';
import { ActionMemo } from '@/components/ActionMemo';
import { GeoMap } from '@/components/GeoMap';
import { ArchitectureDiagram } from '@/components/ArchitectureDiagram';

interface DemoNarrative {
  title: string;
  duration: string;
  thesis: string;
  tabs: any[];
}

export default function HomePage() {
  const [narrative, setNarrative] = useState<DemoNarrative | null>(null);
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetch('/demo_narrative.json')
      .then((r) => r.json())
      .then(setNarrative)
      .catch(() => {});
    fetch('/api/data')
      .then((r) => r.json())
      .then(setData)
      .catch(() => {});
  }, []);

  const title = narrative?.title || 'SEA AWS Demo';

  const executiveCockpit = (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KPICard title="TTP Coverage" value="96.8%" status="neutral" />
        <KPICard title="MSPO Certified" value="87%" status="neutral" />
        <KPICard title="Smallholders Traced" value="98K" status="neutral" />
        <KPICard title="Mills Monitored" value="247" status="neutral" />
      </div>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div className="lg:col-span-1">
          <GeoMap
            country="malaysia"
            markers={[{"label": "Kuala Lumpur", "value": "PETRONAS Tower HQ", "color": "blue", "size": "lg"}, {"label": "Johor Bahru", "value": "Refinery: 242K bpd", "color": "green", "size": "lg"}, {"label": "Kota Kinabalu", "value": "Deepwater ops", "color": "green", "size": "md"}, {"label": "Kuching", "value": "Sarawak gas", "color": "green", "size": "md"}]}
            routes={[]}
            title="Geographic Overview"
            height={400}
          />
        </div>
        <div className="lg:col-span-1 grid grid-cols-1 gap-4">
      <div className="grid grid-cols-1 gap-4 grid-cols-1">
        <Chart data={data?.timeseries || (() => { const d = []; const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']; const base = 120; for (let i = 0; i < 12; i++) d.push({ period: months[i], value: Math.round(base + Math.sin(i/2)*40 + (Math.random()*20-10)) }); return d; })()} type="line" xKey="period" yKeys={[{ key: 'value', name: '% Coverage' }]} title="Traceability Progress (Quarterly)" />
        <Chart data={data?.categories || [{ category: 'North', count: 82 }, { category: 'Central', count: 74 }, { category: 'South', count: 91 }, { category: 'Highland', count: 68 }, { category: 'Coastal', count: 77 }]} type="bar" xKey="category" yKeys={[{ key: 'count', name: 'Mills' }]} title="Certification by Scheme" />
      </div>
        </div>
      </div>
      <DataTable columns={[
          { key: 'id', header: '#' },
          { key: 'name', header: 'Mill' },
          { key: 'status', header: 'TTP Status' },
          { key: 'value', header: 'Coverage %' },
      ]} data={data?.entities || []} title="Mill Traceability Status" />
    </div>
  );

  const domainTab1 = (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <KPICard title="Collection Points" value="1,247" />
        <KPICard title="GPS-Mapped Plots" value="84K" />
        <KPICard title="Data Completeness" value="98%" />
      </div>
      <Chart data={data?.detail || [{ x: 'Mon', y: 24 }, { x: 'Tue', y: 28 }, { x: 'Wed', y: 22 }, { x: 'Thu', y: 31 }, { x: 'Fri', y: 26 }, { x: 'Sat', y: 19 }, { x: 'Sun', y: 23 }]} type="area" xKey="x" yKeys={[{ key: 'y', name: 'MT (K)' }]} title="Volume by Supply Tier" height={400} />
    </div>
  );

  const domainTab2 = (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Chart data={data?.breakdown || [{ label: 'Zone North', value: 35 }, { label: 'Zone Central', value: 28 }, { label: 'Zone South', value: 22 }, { label: 'Zone East', value: 15 }]} type="pie" xKey="label" yKeys={[{ key: 'value', name: 'Cases' }]} title="Non-Compliance Cases" />
        <ActionMemo persona={{ name: 'Puan Siti Aminah', role: 'Sustainability Director' }} context={{}} onGenerate={async () => ({ subject: 'Action Required', body: 'AI-generated recommendation based on current data patterns.', urgency: 'HIGH', actions: ['Investigate NDPE alert for Sabah supplier', 'Onboard 3K smallholders to platform', 'Prepare RSPO ACOP for 2024'] })} />
      </div>
    </div>
  );

  const askAiTab = (
    <div className="h-[600px]">
      <AskAI title="Ask AI" mode="sql" sampleQuestions={['Which mills have TTP gaps?', 'Show supply chain risk by district', 'What volume is at risk from non-compliant suppliers?']} onSubmit={async (question, mode) => ({ answer: `[Demo Mode] Response to: "${question}" (${mode} mode). Connect to Snowflake for live data.`, sql: mode === 'sql' ? 'SELECT * FROM CURATED.SUMMARY LIMIT 10;' : undefined })} />
    </div>
  );

  const architectureTab = (
    <ArchitectureDiagram
      snowflakeFeatures={['Dynamic Tables (5-min refresh)', 'ML Functions (Forecast + Anomaly)', 'Cortex Search + Agent', 'Semantic View + Intelligence', 'Alerts + Notifications']}
      awsServices={[{ name: 'Amazon S3', role: 'Strategy Docs' }, { name: 'Amazon S3 + Kinesis', role: 'Integration' }, { name: 'Amazon SNS', role: 'Integration' }, { name: 'Amazon QuickSight + Q', role: 'Integration' }]}
    />
  );

  const tabs = [
    { id: 'executive-cockpit', label: 'Executive Cockpit', icon: '📊', content: executiveCockpit },
    { id: 'domain-1', label: 'Supply Chain Map', icon: '📈', content: domainTab1 },
    { id: 'domain-2', label: 'NDPE Compliance', icon: '⚡', content: domainTab2 },
    { id: 'ask-ai', label: 'Ask AI', icon: '🤖', content: askAiTab },
    { id: 'architecture', label: 'Architecture & Data', icon: '🏗️', content: architectureTab },
  ];

  return <AppLayout title={title} tabs={tabs} narrative={narrative} />;
}
