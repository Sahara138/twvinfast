import { Users, CircleStop, ShieldCheck, ShieldUser } from "lucide-react";
import StatsGrid from "../../shared/StatsGrid";
import StatsCard from "../../shared/StatsCard";
export default function BillingManagementStatsCards() {
  const stats = [
    {
      label: "Total Invoices",
      value: "04",
      color: "#2F80ED",
      subtext: "This month",
      icon: Users,
    },
    {
      label: "Paid Invoices",
      value: "02",
      color: "#FF9484",
      subtext: "$798",
      icon: CircleStop,
    },
    {
      label: "Pending",
      value: "01",
      color: "#3BAE5A",
      subtext: "Awaiting payment",
      icon: ShieldCheck,
    },
    {
      label: "Overdue",
      value: "01",
      color: "#FFBB33",
      subtext: "Requires attention",
      icon: ShieldUser,
    }

  ];

  return (
    <StatsGrid>
      {stats.map((item, i) => (
        <StatsCard key={i} {...item} />
      ))}
    </StatsGrid>
  );
}