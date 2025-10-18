import { Users, CircleStop, ShieldCheck, ShieldUser } from "lucide-react";
import StatsGrid from "../../shared/StatsGrid";
import StatsCard from "../../shared/StatsCard";
export default function BusinessManagementStatsCards() {
  const stats = [
    {
      label: "Total Datasets",
      value: "03",
      color: "#2F80ED",
      subtext: "Across all accounts",
      icon: Users,
    },
    {
      label: "Total Records",
      value: "2524",
      color: "#FF9484",
      subtext: "Currently online",
      icon: CircleStop,
    },
    {
      label: "Active Datasets",
      value: "01",
      color: "#3BAE5A",
      subtext: "Security compliant",
      icon: ShieldCheck,
    },
    {
      label: "Storage Used",
      value: "2.3 GB",
      color: "#FFBB33",
      subtext: "Administrative access",
      icon: ShieldUser,
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
