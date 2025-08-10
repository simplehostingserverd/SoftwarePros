'use client';

import { PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart, ResponsiveContainer, Tooltip } from 'recharts';

type Metric = 'Security' | 'Interoperability' | 'Scalability' | 'Speed' | 'AI/ML';

type DataPoint = {
  metric: Metric;
  SoftwarePros: number;
  Incumbent: number;
};

const data: DataPoint[] = [
  { metric: 'Security', SoftwarePros: 95, Incumbent: 80 },
  { metric: 'Interoperability', SoftwarePros: 90, Incumbent: 70 },
  { metric: 'Scalability', SoftwarePros: 88, Incumbent: 75 },
  { metric: 'Speed', SoftwarePros: 85, Incumbent: 65 },
  { metric: 'AI/ML', SoftwarePros: 82, Incumbent: 60 },
];

export default function CompetitiveRadar() {
  return (
    <div className="w-full h-[320px]">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart outerRadius={110} data={data}>
          <PolarGrid stroke="#e5e7eb" />
          <PolarAngleAxis dataKey="metric" tick={{ fill: '#6b7280', fontSize: 12 }} />
          <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: '#9ca3af', fontSize: 10 }} />
          <Tooltip
            formatter={(value: number, name: string) => [`${value}`, name]}
            contentStyle={{ borderRadius: 8, border: '1px solid #e5e7eb' }}
          />
          <Radar name="SoftwarePros" dataKey="SoftwarePros" stroke="#2563eb" fill="#3b82f6" fillOpacity={0.25} />
          <Radar name="Incumbent" dataKey="Incumbent" stroke="#9ca3af" fill="#9ca3af" fillOpacity={0.15} />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}


