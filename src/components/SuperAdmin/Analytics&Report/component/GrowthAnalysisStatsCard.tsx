import { FaChartBar } from "react-icons/fa";
import StatsGrid from "../../../shared/StatsGrid";
import StatsCard from "../../../shared/StatsCard";
import { TbMoneybag } from "react-icons/tb";
import { RiShieldUserFill } from "react-icons/ri";
export default function GrowthAnalysisStatsCard() {
  const stats = [
    {
      label: "Customer Growth",
      value: "69%",
      color: "#2F80ED",
      subtext: "Year-over-year growth",
      icon: RiShieldUserFill,
    },
    {
      label: "Revenue Growth",
      value: "90%",
      color: "#FF9484",
      subtext: "Year-over-year growth",
      icon: TbMoneybag,
    },
    {
      label: "Churn Rate",
      value: "2.3%",
      color: "#3BAE5A",
      subtext: "-0.5% from last month",
      icon: FaChartBar,
    },
    {
      label: "Net Retention",
      value: "112%",
      color: "#FFBB33",
      subtext: "Revenue retention rate",
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