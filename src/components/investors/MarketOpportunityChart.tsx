'use client';

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

type MarketPoint = {
  year: number;
  marketSizeB: number;
};

const data: MarketPoint[] = [
  { year: 2024, marketSizeB: 60 },
  { year: 2025, marketSizeB: 70 },
  { year: 2026, marketSizeB: 78 },
  { year: 2027, marketSizeB: 88 },
  { year: 2028, marketSizeB: 96 },
  { year: 2029, marketSizeB: 100 },
  { year: 2030, marketSizeB: 104 },
];

export default function MarketOpportunityChart() {
  return (
    <div className="w-full h-[320px]">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 16, bottom: 0, left: 0 }}>
          <defs>
            <linearGradient id="marketGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.35} />
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.02} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis
            dataKey="year"
            tickLine={false}
            axisLine={false}
            tick={{ fill: '#6b7280', fontSize: 12 }}
          />
          <YAxis
            tickFormatter={(v) => `$${v}B`}
            width={56}
            tickLine={false}
            axisLine={false}
            tick={{ fill: '#6b7280', fontSize: 12 }}
            domain={[0, 110]}
          />
          <Tooltip
            formatter={(value: number) => [`$${value.toFixed(0)}B`, 'Market Size']}
            labelFormatter={(label) => `Year ${label}`}
            contentStyle={{ borderRadius: 8, border: '1px solid #e5e7eb' }}
          />
          <Area
            type="monotone"
            dataKey="marketSizeB"
            stroke="#2563eb"
            strokeWidth={2}
            fill="url(#marketGradient)"
            name="Market Size"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}


