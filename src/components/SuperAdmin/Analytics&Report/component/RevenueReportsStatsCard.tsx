import { FaChartBar, FaUser } from "react-icons/fa";
import StatsGrid from "../../../shared/StatsGrid";
import StatsCard from "../../../shared/StatsCard";
import { TbMoneybag } from "react-icons/tb";
import { RiShieldUserFill } from "react-icons/ri";
import { FaChartLine } from "react-icons/fa6";
export default function RevenueStatsCard() {
  const stats = [
    {
      label: "Monthly Revenue",
      value: "250",
      color: "#2F80ED",
      subtext: "+10.5% from last month",
      icon: TbMoneybag,
    },
    {
      label: "Annual Revenue",
      value: "$348,920",
      color: "#FF9484",
      subtext: "+22.1% year over year",
      icon: FaChartLine,
    },
    {
      label: "Active Subscriptions",
      value: "02",
      color: "#3BAE5A",
      subtext: "Out of 03 total",
      icon: TbMoneybag,
    },
    {
      label: "Churn Rate",
      value: "2.3%",
      color: "#FFBB33",
      subtext: "-0.5% from last month",
      icon: FaChartBar,
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