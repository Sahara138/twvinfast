import { Users, CircleStop, ShieldCheck, ShieldUser } from "lucide-react";
import StatsGrid from "../../shared/StatsGrid";
import StatsCard from "../../shared/StatsCard";
export default function UserManagementStatsCards() {
  const stats = [
    {
      label: "Total Users",
      value: "50",
      color: "#2F80ED",
      subtext: "Across all accounts",
      icon: Users,
    },
    {
      label: "Active Users",
      value: "25",
      color: "#FF9484",
      subtext: "Currently online",
      icon: CircleStop,
    },
    {
      label: "2FA Enabled",
      value: "34",
      color: "#3BAE5A",
      subtext: "Security compliant",
      icon: ShieldCheck,
    },
    {
      label: "Admins",
      value: "18",
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
