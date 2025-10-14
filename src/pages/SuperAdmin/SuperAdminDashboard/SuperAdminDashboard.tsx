import {  ShieldUser } from "lucide-react";
import Heading from "../../../components/Admin/Heading";
import Heading2 from "../../../components/shared/Heading2";
import StatsCards from "../../../components/SuperAdmin/SuperAdminDashboard/DashboardStatsCards";

export default function SuperAdminDashboard() {
  const segmentData = [
    { label: "Pro 47%", value: 47, color: "#3b82f6" }, // Tailwind blue-500
    { label: "Enterprise 37%", value: 37, color: "#10b981" }, // Tailwind green-500
    { label: "Starter 16%", value: 16, color: "#ef4444" }, // Tailwind red-500
  ];

  const topBusinesses = [
    { rank: "01", name: "TechCorp Inc.", revenue: "$3,980" },
    { rank: "02", name: "GlobalTech", revenue: "$3,290" },
    { rank: "03", name: "InnovateLabs", revenue: "$2,870" },
    { rank: "04", name: "StartupXYZ", revenue: "$2,720" },
    { rank: "05", name: "DataCorp", revenue: "$2,580" },
  ];

  const recentCustomers = [
    {
      name: "TechCorp Inc.",
      views: "142 views",
      time: "2 days ago",
      badge: "Enterprise",
      actions: ["Edit", "View"],
    },
    {
      name: "StartupXYZ",
      views: "121 views",
      time: "2 days ago",
      badge: "Pro",
      actions: ["Edit", "View"],
    },
    {
      name: "GlobalTech",
      views: "107 views",
      time: "2 days ago",
      badge: "Enterprise",
      actions: ["Edit", "View"],
    },
    {
      name: "InnovateLabs",
      views: "95 views",
      time: "2 days ago",
      badge: "Basic",
      actions: ["Edit", "Subscribe"],
    },
  ];

  // 🎯 Type for doughnut chart segments
  interface SegmentPath {
    color: string;
    dasharray: number;
    offset: number;
  }

  const getDoughnutPath = (): SegmentPath[] => {
    const radius = 60;
    const circumference = 2 * Math.PI * radius;
    let offset = 0;

    const segments: SegmentPath[] = [];

    segmentData.forEach((seg) => {
      const dasharray = (seg.value / 100) * circumference;
      segments.push({
        color: seg.color,
        dasharray,
        offset,
      });
      offset += dasharray;
    });

    return segments;
  };

  const doughnutSegments = getDoughnutPath();

  return (
    <div className="min-h-screen ">
      <Heading
        heading1="Global Overview"
        heading2="   Manage your platform with complete administrative control"
      />

      {/* Main Content */}
      <div className="">
        {/* Stats Cards */}
        <StatsCards />

        {/* Charts Row */}
        <div className="grid grid-cols-3 gap-6 mb-8">
          {/* Customer Segments */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <Heading2
              heading1="Customer Segments"
              heading2="Distribution by subscription plan"
            />

            <div className="flex justify-center mb-6">
              <svg
                width="160"
                height="160"
                viewBox="0 0 160 160"
                className="drop-shadow-sm"
              >
                <circle
                  cx="80"
                  cy="80"
                  r="60"
                  fill="none"
                  stroke="#e5e7eb"
                  strokeWidth="24"
                />

                {/* Dynamic Segments */}
                {doughnutSegments.map((seg, i) => (
                  <circle
                    key={i}
                    cx="80"
                    cy="80"
                    r="60"
                    fill="none"
                    stroke={seg.color}
                    strokeWidth="24"
                    strokeDasharray={`${seg.dasharray} ${
                      2 * Math.PI * 60 - seg.dasharray
                    }`}
                    strokeDashoffset={-seg.offset}
                    strokeLinecap="round"
                    transform="rotate(-90 80 80)"
                  />
                ))}
              </svg>
            </div>

            {/* Legend */}
            <div className="space-y-3">
              {segmentData.map((seg, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: seg.color }}
                  ></div>
                  <span className="text-xs text-gray-700">{seg.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Top Performing Businesses */}
          <div className="bg-white rounded-lg border border-gray-200 p-6 col-span-2">
            <Heading2
              heading1=" Top Performing Businesses"
              heading2="   Highest revenue generating customers"
            />

            <div className="space-y-3">
              {topBusinesses.map((biz) => (
                <div
                  key={biz.rank}
                  className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0 hover:bg-[#FDF5E7] px-4 rounded-xl"
                >
                  <div className="flex items-center gap-3 ">
                    <div className="w-12 h-12 bg-[#DFE3E8] rounded-lg flex items-center justify-center">
                      <span className="text-lg font-semibold">{biz.rank}</span>
                    </div>
                    <span className="text-lg text-[#161C24] font-medium flex flex-col">
                      {biz.name}
                      <span className="text-[#454F5B] mt-0.5 text-sm">
                        145 user
                      </span>
                    </span>
                  </div>
                  <span className="text-base font-medium flex flex-col">
                    {biz.revenue}

                    <span className="text-[#ED990B] text-sm mt-0.5 ">
                      +12.2%
                    </span>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Customers */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <Heading2
            heading1="            Recent Customers
"
            heading2="             Latest customer registrations and status
"
          />

          <div className="space-y-0">
            {recentCustomers.map((customer, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between py-4 border-b border-gray-100 last:border-0"
              >
                {/* Customer Info */}
                <div className="flex items-center gap-3 flex-1">
                  <div className="w-12 h-12 bg-[#D9D9D9] rounded-full flex items-center justify-center">
                    <span className="text-xs font-semibold text-gray-700">
                      <ShieldUser />
                    </span>
                  </div>
                  <div>
                    <p className="text-lg font-medium text-[#161C24]">
                      {customer.name}
                    </p>
                    <div className="flex items-center text-[#454F5B] text-sm gap-4 mt-1">
                      <span className=" ">{customer.views}</span>
                      <span className=" ">{customer.time}</span>
                    </div>
                  </div>
                </div>

                {/* Badge and Actions */}
                <div className="flex items-center gap-3">
                  {/* Badge */}
                  <span
                    className={`text-sm font-semibold px-3 py-1.5 rounded-xl ${
                      customer.badge === "Enterprise"
                        ? "bg-purple-100 text-purple-700"
                        : customer.badge === "Pro"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {customer.badge}
                  </span>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-2">
                    {customer.actions.map((action, i) => (
                      <button
                        key={i}
                        className={`text-sm font-semibold px-3 py-1.5 rounded-xl transition ${
                          action === "Subscribe"
                            ? "bg-red-500 text-white hover:bg-red-600"
                            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                        }`}
                      >
                        {action}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
