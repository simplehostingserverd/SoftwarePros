'use client';

import { Bar, BarChart, CartesianGrid, LabelList, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

type TractionPoint = {
  label: string;
  value: number;
};

const data: TractionPoint[] = [
  { label: 'Patients', value: 100 },
  { label: 'Providers', value: 50 },
  { label: 'Uptime', value: 99.9 },
  { label: 'Cost↓', value: 40 },
];

export default function TractionKPIChart() {
  return (
    <div className="w-full h-[280px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 10, right: 16, bottom: 0, left: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="label" tickLine={false} axisLine={false} tick={{ fill: '#6b7280', fontSize: 12 }} />
          <YAxis
            tickFormatter={(v) => `${v}${v > 90 ? '%' : 'k'}`}
            width={48}
            tickLine={false}
            axisLine={false}
            tick={{ fill: '#6b7280', fontSize: 12 }}
          />
          <Tooltip
            formatter={(value: number, name, item) => {
              if (item && item.payload.label === 'Uptime') return [`${value}%`, 'Uptime'];
              if (item && item.payload.label === 'Cost↓') return [`${value}%`, 'Cost Reduction'];
              return [`${value}k`, name as string];
            }}
            contentStyle={{ borderRadius: 8, border: '1px solid #e5e7eb' }}
          />
          <Bar dataKey="value" radius={[6, 6, 0, 0]} fill="#60a5fa">
            <LabelList dataKey="value" position="top" style={{ fill: '#374151', fontSize: 12 }} />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}


