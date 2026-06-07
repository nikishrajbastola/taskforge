"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type ApplicationStatusChartProps = {
  pending: number;
  accepted: number;
  rejected: number;
};

export default function ApplicationStatusChart({
  pending,
  accepted,
  rejected,
}: ApplicationStatusChartProps) {
  const data = [
    { status: "Pending", count: pending },
    { status: "Accepted", count: accepted },
    { status: "Rejected", count: rejected },
  ];

  return (
    <div style={chartWrapper}>
      <ResponsiveContainer width="100%" height={260}>
        <BarChart data={data}>
          <XAxis
            dataKey="status"
            stroke="#a1a1aa"
          />

          <YAxis
            stroke="#a1a1aa"
            allowDecimals={false}
          />

          <Tooltip
            contentStyle={{
              background: "#111",
              border: "1px solid #333",
              borderRadius: "12px",
            }}
          />

          <Bar
            dataKey="count"
            fill="#c084fc"
            radius={[8, 8, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

const chartWrapper = {
  width: "100%",
  height: "280px",
};