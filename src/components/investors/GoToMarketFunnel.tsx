'use client';

import { Cell, Funnel, FunnelChart, LabelList, ResponsiveContainer, Tooltip } from 'recharts';

type FunnelStage = {
  name: string;
  value: number;
};

const data: FunnelStage[] = [
  { name: 'Top of Funnel', value: 100 },
  { name: 'SQLs', value: 45 },
  { name: 'Pilots', value: 18 },
  { name: 'Contracts', value: 8 },
];

const COLORS = ['#c7d2fe', '#93c5fd', '#60a5fa', '#3b82f6'];

export default function GoToMarketFunnel() {
  return (
    <div className="w-full h-[280px]">
      <ResponsiveContainer width="100%" height="100%">
        <FunnelChart>
          <Tooltip formatter={(v: number, _n: string, item: any) => [`${v}%`, item?.payload?.name]} />
          <Funnel dataKey="value" data={data} isAnimationActive>
            {data.map((entry, index) => (
              <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
            ))}
            <LabelList position="right" dataKey="name" style={{ fill: '#374151', fontSize: 12 }} />
          </Funnel>
        </FunnelChart>
      </ResponsiveContainer>
    </div>
  );
}


