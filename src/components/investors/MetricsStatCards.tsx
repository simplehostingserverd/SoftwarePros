'use client';

type Stat = {
  label: string;
  value: string | number;
  sublabel?: string;
};

const stats: Stat[] = [
  { label: 'ARR Potential (3yr)', value: '$8–12M', sublabel: 'Mid-market focus' },
  { label: 'Gross Margin', value: '75–85%', sublabel: 'Software + services' },
  { label: 'Payback', value: '< 12 mo', sublabel: 'Efficient GTM' },
  { label: 'Uptime', value: '99.9%', sublabel: 'Mission-critical' },
];

export default function MetricsStatCards() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {stats.map((s) => (
        <div key={s.label} className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <div className="text-xs uppercase tracking-wide text-gray-500">{s.label}</div>
          <div className="mt-1 text-2xl font-bold text-gray-900">{s.value}</div>
          {s.sublabel ? <div className="text-xs text-gray-500">{s.sublabel}</div> : null}
        </div>
      ))}
    </div>
  );
}
