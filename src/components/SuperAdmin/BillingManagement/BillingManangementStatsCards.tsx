import { Users, CircleStop, ShieldCheck, ShieldUser } from "lucide-react";
import StatsGrid from "../../shared/StatsGrid";
import StatsCard from "../../shared/StatsCard";
export default function BillingManagementStatsCards() {
  const stats = [
    {
      label: "Monthly Revenue",
      value: "12350",
      color: "#2F80ED",
      revenue: "11.5%",
      get subtext() {
        return `${this.revenue} from last month`;
      },
      icon: Users,
    },
    {
      label: "Annual Revenue",
      value: "348,920",
      color: "#FF9484",
      revenue: "+22.1%",
      get subtext() {
        return `${this.revenue} from last month`;
      },
      icon: CircleStop,
    },
    {
      label: "Active Subscriptions",
      value: "02",
      color: "#3BAE5A",
      revenue: "-0.5%",
      get subtext() {
        return `Out of ${this.revenue} total`;
      },
      icon: ShieldCheck,
    },
    {
      label: "Churn Rate",
      value: "2.3%",
      color: "#FFBB33",
      revenue: "-0.5%",
      get subtext() {
        return `${this.revenue} from last month`;
      },
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
