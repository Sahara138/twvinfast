
import Heading from "../../../components/Admin/Heading";
import StatsCards from "../../../components/SuperAdmin/SuperAdminDashboard/StatsCards";

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
   
      <Heading heading1="Global Overview" heading2="   Manage your platform with complete administrative control" />

      {/* Main Content */}
      <div className="">
        {/* Stats Cards */}
        <StatsCards/>

        {/* Charts Row */}
        <div className="grid grid-cols-3 gap-6 mb-8">
          {/* Customer Segments */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-sm font-semibold text-gray-900 mb-1">
              Customer Segments
            </h3>
            <p className="text-xs text-gray-500 mb-6">
              Distribution by subscription plan
            </p>

            {/* SVG Doughnut Chart */}
            <div className="flex justify-center mb-6">
              <svg
                width="160"
                height="160"
                viewBox="0 0 160 160"
                className="drop-shadow-sm"
              >
                {/* Background Circle */}
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
            <h3 className="text-sm font-semibold text-gray-900 mb-1">
              Top Performing Businesses
            </h3>
            <p className="text-xs text-gray-500 mb-6">
              Highest revenue generating customers
            </p>

            <div className="space-y-3">
              {topBusinesses.map((biz) => (
                <div
                  key={biz.rank}
                  className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-xs font-bold text-blue-600">
                        {biz.rank}
                      </span>
                    </div>
                    <span className="text-sm text-gray-900 font-medium">
                      {biz.name}
                    </span>
                  </div>
                  <span className="text-sm font-bold text-gray-900">
                    {biz.revenue}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Customers */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-sm font-semibold text-gray-900 mb-1">
            Recent Customers
          </h3>
          <p className="text-xs text-gray-500 mb-6">
            Latest customer registrations and status
          </p>

          <div className="space-y-0">
            {recentCustomers.map((customer, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between py-4 border-b border-gray-100 last:border-0"
              >
                {/* Customer Info */}
                <div className="flex items-center gap-3 flex-1">
                  <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                    <span className="text-xs font-semibold text-gray-700">
                      {customer.name.charAt(0)}
                      {customer.name.charAt(
                        customer.name.lastIndexOf(" ") + 1
                      )}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {customer.name}
                    </p>
                    <div className="flex items-center gap-4 mt-1">
                      <span className="text-xs text-gray-500">
                        {customer.views}
                      </span>
                      <span className="text-xs text-gray-500">
                        {customer.time}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Badge and Actions */}
                <div className="flex items-center gap-3">
                  {/* Badge */}
                  <span
                    className={`text-xs font-semibold px-3 py-1 rounded-full ${
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
                        className={`text-xs font-semibold px-3 py-1 rounded transition ${
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
