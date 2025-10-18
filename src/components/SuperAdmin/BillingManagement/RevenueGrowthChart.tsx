import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// ✅ Define TypeScript interface for chart data
interface RevenueData {
  name: string; // X-axis label
  uv: number;   // Main metric (e.g., revenue, users, etc.)
  pv: number;   // Optional secondary metric
  amt: number;  // Optional additional metric
}

const RevenueGrowthTab: React.FC = () => {
  // ✅ Strongly typed data array
  const data: RevenueData[] = [
    { name: "Jan", uv:300, pv: 2400, amt: 2400 },
    { name: "Feb", uv: 3000, pv: 1398, amt: 2210 },
    { name: "Mar", uv: 2000, pv: 9800, amt: 2290 },
    { name: "Apr", uv: 2780, pv: 3908, amt: 2000 },
    { name: "May", uv: 1890, pv: 4800, amt: 2181 },
    { name: "June", uv: 2390, pv: 3800, amt: 2500 },
    { name: "July", uv: 3490, pv: 4300, amt: 2100 }
  ];

  return (
    // ✅ ResponsiveContainer automatically makes the chart responsive
    <ResponsiveContainer width="100%" height={350}>
      <AreaChart
        data={data}
        margin={{ top: 20, right: 20, left: 0, bottom: 0 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip
          contentStyle={{ backgroundColor: "#f4f4f4", borderRadius: "8px" }}
        />
        <Area
          type="monotone"
          dataKey="uv"
          stroke="#8884d8"
          fill="#8884d8"
          fillOpacity={0.3}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default RevenueGrowthTab;
