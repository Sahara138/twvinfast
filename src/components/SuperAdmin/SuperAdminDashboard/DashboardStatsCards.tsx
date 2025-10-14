import { ShieldUser, User, TrendingUp, Bot } from "lucide-react";
import StatsCard from "../../shared/StatsCard";
import StatsGrid from "../../shared/StatsGrid";


export default function DashboardStatsCards() {
  const stats = [
    {
      label: "Total Customer",
      value: "25",
      color: "#2F80ED",
      subtext: "235 excluded status",
      icon: ShieldUser,
    },
    {
      label: "Total User",
      value: "10,234",
      color: "#FF9484",
      subtext: "1,234 last month",
      icon: User,
    },
    {
      label: "Monthly Revenue",
      value: "$12,350",
      color: "#3BAE5A",
      subtext: "+8.5% from last month",
      icon: TrendingUp,
    },
    {
      label: "AI Requests",
      value: "34,921",
      color: "#FFBB33",
      subtext: "2,342 last month",
      icon: Bot,
    },
  ];

  return (
    <StatsGrid>
      {stats.map((item, i) => (
        <StatsCard key={i} {...item} />
      ))}
    </StatsGrid>
  );
}
