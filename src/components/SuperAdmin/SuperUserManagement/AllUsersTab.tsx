// SuperUserManagement/AllUsersTab.tsx
import { Search } from 'lucide-react';
import Heading2 from '../../shared/Heading2';
interface User {
  id: number;
  name: string;
  email: string;
  company: string;
  role: 'Admin' | 'User';
  status: 'Active' | 'Suspended';
  twoFa: boolean;
  lastLogin: string;
  location: string;
}

interface AllUsersTabProps {
  users: User[];
  searchQuery: string;
  setSearchQuery: (v: string) => void;
  statusFilter: string;
  setStatusFilter: (v: string) => void;
  roleFilter: string;
  setRoleFilter: (v: string) => void;
}

export default function AllUsersTab({
  users,
  searchQuery,
  setSearchQuery,
  statusFilter,
  setStatusFilter,
  roleFilter,
  setRoleFilter,
}: AllUsersTabProps) {
  const getStatusColor = (status: string) =>
    status === 'Active'
      ? 'bg-gray-900 text-white'
      : status === 'Suspended'
      ? 'bg-red-500 text-white'
      : 'bg-gray-100 text-gray-700';

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'All Status' || user.status === statusFilter;
    const matchesRole = roleFilter === 'All Roles' || user.role === roleFilter;
    return matchesSearch && matchesStatus && matchesRole;
  });

  return (
    <div className=" overflow-hidden">
       {/* Filters */}
        <div className="flex flex-col md:flex-row gap-3 mb-6">
          <div className="flex-1 relative ">
            <Search size={18} className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Search Customer..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full xl:w-lg input-field bg-[#F4F6F8]" 
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border min-w-sm border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 bg-white"
          >
            <option>All Status</option>
            <option>Active</option>
            <option>Suspended</option>
          </select>
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="px-4 py-2 border min-w-sm border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 bg-white"
          >
            <option>All Roles</option>
            <option>Admin</option>
            <option>User</option>
          </select>
        </div>

        <Heading2 heading1='Platform Users' heading2='All users across all business accounts'/>
      

      {/* Table */}
      <div className='border border-[#DFE3E8] p-6 rounded-lg '>
  <div className="w-full overflow-x-auto rounded-lg ">
        <table className="w-full  rounded-lg ">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              <th className="text-left px-6 py-4 text-[#6B7280]">User</th>
              <th className="text-left px-6 py-4 text-[#6B7280]">Company</th>
              <th className="text-left px-6 py-4 text-[#6B7280]">Role</th>
              <th className="text-left px-6 py-4 text-[#6B7280]">Status</th>
              <th className="text-left px-6 py-4 text-[#6B7280]">2FA</th>
              <th className="text-left px-6 py-4 text-[#6B7280]">Last Login</th>
              <th className="text-left px-6 py-4 text-[#6B7280]">Location</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <img src={`https://i.pravatar.cc/40?u=${user.id}`} alt={user.name} className="w-8 h-8 rounded-full" />
                    <div>
                      <p className="font-medium text-gray-900">{user.name}</p>
                      <p className="text-xs text-gray-500">{user.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">{user.company}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{user.role}</td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(user.status)}`}>
                    {user.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm">{user.twoFa ? 'Yes' : 'No'}</td>
                <td className="px-6 py-4 text-sm">{user.lastLogin}</td>
                <td className="px-6 py-4 text-sm">{user.location}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      </div>
    
    </div>
  );
}
