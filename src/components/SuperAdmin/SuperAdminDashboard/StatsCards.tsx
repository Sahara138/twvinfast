import { ShieldUser, User, TrendingUp, Bot } from "lucide-react";
export default function StatsCards() {
  const stats = [
    {
      label: "Total Customer",
      value: "25",
      valueColor: "#2F80ED",
      subtext: "235 excluded status",
      icon: ShieldUser,
    },
    {
      label: "Total User",
      value: "10,234",
      valueColor: "#FF9484",
      subtext: "1,234 last month",
      icon: User,
    },
    {
      label: "Monthly Revenue",
      value: "$12,350",
      valueColor: "#3BAE5A",
      subtext: "+8.5% from last month",
      icon: TrendingUp,
    },
    {
      label: "AI Requests",
      value: "34,921",
      valueColor: "#FFBB33",
      subtext: "2,342 last month",
      icon: Bot,
    },
  ];
  return (
    <div className="grid grid-cols-4 gap-6 mb-8">
      {stats.map((stat, idx) => {
        const Icon = stat.icon;
        return (
          <div
            key={idx}
            className="bg-white rounded-lg border border-gray-200 p-6"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-sm font-medium text-[#2D2D2D] mb-2">
                  {stat.label}
                </p>
              </div>

              <div className="flex items-center justify-center">
                <Icon className="w-6 h-6 text-[#454F5B]" />
              </div>
            </div>{" "}
            <p className={`text-2xl font-bold text-[${stat.valueColor}]`}>
              {stat.value}
            </p>
            <p className="text-xs mt-1 text-[#454F5B]">{stat.subtext}</p>
          </div>
        );
      })}
    </div>
  );
}
