import { FaUser } from "react-icons/fa";
import StatsGrid from "../../../shared/StatsGrid";
import StatsCard from "../../../shared/StatsCard";
import { TbMoneybag } from "react-icons/tb";
import { FaBarsProgress } from "react-icons/fa6";
import { RiShieldUserFill } from "react-icons/ri";
export default function OverviewStatsCard() {
  const stats = [
    {
      label: "Total Users",
      value: "250",
      color: "#2F80ED",
      subtext: "+10.5% from last month",
      icon: FaUser,
    },
    {
      label: "Monthly Revenue",
      value: "$33,680",
      color: "#FF9484",
      subtext: "16.4% from last month",
      icon: TbMoneybag,
    },
    {
      label: "AI Requests",
      value: "15K",
      color: "#3BAE5A",
      subtext: "+13.8% from last month",
      icon: FaBarsProgress,
    },
    {
      label: "Active Businesses",
      value: "65",
      color: "#FFBB33",
      subtext: "+6.1% from last month",
      icon: RiShieldUserFill,
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