import { Users, User, Briefcase, AlertCircle } from "lucide-react";
import StatsGrid from "../../shared/StatsGrid";
import StatsCard from "../../shared/StatsCard";

export default function CustomerManagementStatsCards() {
  const stats = [
    {
      label: "Total Customer",
      value: "25",
      color: "#2F80ED",
      subtext: "+8 from last month",
      icon: Users,
    },
    {
      label: "Total User",
      value: "364",
      color: "#FF9484",
      subtext: "+54 from last month",
      icon: User,
    },
    {
      label: "Trial Accounts",
      value: "12",
      color: "#3BAE5A",
      subtext: "11% from last month",
      icon: Briefcase,
    },
    {
      label: "Suspended Accounts",
      value: "17",
      color: "#FFBB33",
      subtext: "+2.1% from last month",
      icon: AlertCircle,
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
