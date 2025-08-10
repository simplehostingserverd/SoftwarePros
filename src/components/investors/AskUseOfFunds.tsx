"use client";

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

type Slice = { name: string; value: number };

const data: Slice[] = [
  { name: "Engineering & Product", value: 45 },
  { name: "Go-to-Market", value: 30 },
  { name: "Security & Compliance", value: 15 },
  { name: "G&A", value: 10 },
];

const COLORS = ["#3b82f6", "#60a5fa", "#93c5fd", "#c7d2fe"];

export default function AskUseOfFunds() {
  return (
    <div className="w-full h-[280px]">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={110}
            innerRadius={60}
            paddingAngle={3}
          >
            {data.map((entry, index) => (
              <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(v: number, n: string) => [`${v}%`, n]} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
