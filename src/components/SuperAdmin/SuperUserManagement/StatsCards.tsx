import { Users, CircleStop, ShieldCheck, ShieldUser } from "lucide-react";
export default function StatsCards() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      <div className="bg-white p-4 md:p-6 rounded-lg border border-[#DFE3E8]">
        <div className="flex items-center justify-between mb-2">
          <span className="text-gray-600 text-xs md:text-sm font-medium">
            Total Users
          </span>
          <Users size={22} className="text-[#454F5B]" />
        </div>
        <p className="text-2xl mt-6 mb-3 font-bold text-blue-600">50</p>
        <p className="text-gray-500 text-xs mt-1">Across all accounts</p>
      </div>

      <div className="bg-white p-4 md:p-6 rounded-lg border border-[#DFE3E8]">
        <div className="flex items-center justify-between mb-2">
          <span className="text-gray-600 text-xs md:text-sm font-medium">
            Active Users
          </span>
          <CircleStop size={22} className="text-[#454F5B]" />
        </div>
        <p className="text-2xl mt-6 mb-3 font-bold text-red-500">25</p>
        <p className="text-gray-500 text-xs mt-1">Currently online</p>
      </div>

      <div className="bg-white p-4 md:p-6 rounded-lg border border-[#DFE3E8]">
        <div className="flex items-center justify-between mb-2">
          <span className="text-gray-600 text-xs md:text-sm font-medium">
            2FA Enabled
          </span>
          <ShieldCheck size={22} className="text-[#454F5B]" />
        </div>
        <p className="text-2xl  font-bold mt-6 mb-3 text-green-600">34</p>
        <p className="text-gray-500 text-xs mt-1">Security compliant</p>
      </div>

      <div className="bg-white p-4 md:p-6 rounded-lg border border-[#DFE3E8]">
        <div className="flex items-center justify-between mb-2">
          <span className="text-gray-600 text-xs md:text-sm font-medium">
            Admins
          </span>
          <ShieldUser size={22} className="text-[#454F5B]" />
        </div>
        <p className="text-2xl  font-bold mt-6 mb-3 text-[#FFBB33]">18</p>
        <p className="text-gray-500 text-xs mt-1">Administrative access</p>
      </div>
    </div>
  );
}
