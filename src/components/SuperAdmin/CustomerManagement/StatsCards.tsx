
import { Users, User, Briefcase, AlertCircle} from 'lucide-react';
export default function StatsCards() {
  return (
      <div className="grid grid-cols-1 md:grid-cols-2  xl:grid-cols-3 2xl:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg border border-[#DFE3E8]">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600 text-sm font-medium">Total Customer</span>
              <Users size={20} className="text-gray-400" />
            </div>
            <p className="text-2xl mt-4 mb-2 font-bold text-blue-600">25</p>
            <p className="text-gray-500 text-xs mt-1">+8 from last month</p>
          </div>

          <div className="bg-white p-6 rounded-lg border border-[#DFE3E8]">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600 text-sm font-medium">Total User</span>
              <User size={20} className="text-gray-400" />
            </div>
            <p className="text-2xl mt-4 mb-2 font-bold text-red-500">364</p>
            <p className="text-gray-500 text-xs mt-1">+54 from last month</p>
          </div>

          <div className="bg-white p-6 rounded-lg border border-[#DFE3E8]">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600 text-sm font-medium">Trial Accounts</span>
              <Briefcase size={20} className="text-gray-400" />
            </div>
            <p className="text-2xl mt-4 mb-2 font-bold text-green-600">12</p>
            <p className="text-gray-500 text-xs mt-1">11% from last month</p>
          </div>

          <div className="bg-white p-6 rounded-lg border border-[#DFE3E8]">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600 text-sm font-medium">Suspended Accounts</span>
              <AlertCircle size={20} className="text-gray-400" />
            </div>
            <p className="text-2xl mt-4 mb-2 font-bold text-yellow-500">17</p>
            <p className="text-gray-500 text-xs mt-1">+2.1% from last month</p>
          </div>
        </div>
  )
}
