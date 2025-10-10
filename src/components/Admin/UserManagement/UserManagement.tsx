import { useState } from 'react';
import { Search } from 'lucide-react';
import AddUserModal from './AddUserModal';
import type { TeamMember, UserFormData } from '../../../types/Admin/UserManagement';
import Heading from '../Heading';

const initialTeamMembers: TeamMember[] = [
    {
        id: '1',
        full_name: 'John Smith',
        email: 'john.smith@techcorp.com',
        phone_number: '+1-555-0101',
        company: 'TechCorp Inc.',
        role: 'Admin',
        status: 'Active',
        location: 'New York, US',
        last_login: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    },
    {
        id: '2',
        full_name: 'Sarah Johnson',
        email: 'sarah@startupxyz.com',
        phone_number: '+1-555-0102',
        company: 'StartupXYZ',
        role: 'User',
        status: 'Active',
        location: 'San Francisco, US',
        last_login: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
    },
    {
        id: '3',
        full_name: 'Mike Chen',
        email: 'mike.chen@globaltech.com',
        phone_number: '+1-555-0103',
        company: 'GlobalTech',
        role: 'User',
        status: 'Suspended',
        location: 'London, UK',
        last_login: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
    },
    {
        id: '4',
        full_name: 'Lisa Wang',
        email: 'lisa.wang@innovate.com',
        phone_number: '+1-555-0104',
        company: 'InnovateNow',
        role: 'User',
        status: 'Active',
        location: 'Sydney, AU',
        last_login: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
    },
    {
        id: '5',
        full_name: 'David Miller',
        email: 'david@techcorp.com',
        phone_number: '+1-555-0105',
        company: 'TechCorp Inc.',
        role: 'Admin',
        status: 'Active',
        location: 'New York, US',
        last_login: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    },
];

const recentActivities = [
    { id: 1, text: 'Sarah Johnson Uploaded new FAQ document', time: '3 hours ago' },
    { id: 2, text: 'Alex Thompson Added new user: Lisa Wang', time: '5 hours ago' },
    { id: 3, text: 'Michael Chen approved 3 AI response suggestions', time: '7 hours ago' },
    { id: 4, text: 'Lisa Wang Logged in to dashboard', time: '8 hours ago' },
    { id: 5, text: 'Alex Thompson Added new user: Lisa Wang', time: '10 hours ago' },
];

export default function UserManagement() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [teamMembers, setTeamMembers] = useState<TeamMember[]>(initialTeamMembers);
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [roleFilter, setRoleFilter] = useState('all');

    const handleAddUser = async (userData: UserFormData): Promise<void> => {
        const newUser: TeamMember = {
            id: Date.now().toString(),
            ...userData,
            status: 'Active',
            last_login: new Date().toISOString(),
        };
        setTeamMembers([newUser, ...teamMembers]);
    };

    const getTimeAgo = (dateString: string | undefined) => {
        if (!dateString) return 'Never';
        const date = new Date(dateString);
        const now = new Date();
        const diffMs = now.getTime() - date.getTime();
        const diffHours = Math.floor(diffMs / (1000 * 60 * 60));

        if (diffHours < 1) return 'Just now';
        if (diffHours === 1) return '1 hour ago';
        if (diffHours < 24) return `${diffHours} hours ago`;
        const diffDays = Math.floor(diffHours / 24);
        return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
    };

    const filteredMembers = teamMembers.filter((member) => {
        const matchesSearch =
            member.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            member.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
            member.company?.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesStatus = statusFilter === 'all' || member.status === statusFilter;
        const matchesRole = roleFilter === 'all' || member.role === roleFilter;

        return matchesSearch && matchesStatus && matchesRole;
    });

    return (
        <div className="min-h-screen ">
            <main className=' main-container'>
 <div className="flex items-start justify-between mb-8 border-b border-[#C4CDD5] ">
                   
                   <Heading heading1="User Management" heading2="Manage team members, roles, and permissions" />
                
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="px-5 py-2 text-sm font-medium text-white bg-[#ED990B] rounded-lg hover:bg-orange-500 transition-colors"
                >
                    Add User
                </button>
            </div>

            <div className="flex gap-3 mb-6 ">
                <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                        type="text"
                        placeholder="Search user..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-orange-200 focus:border-transparent outline-none transition-all"
                    />
                </div>
                <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-orange-200 focus:border-transparent outline-none transition-all bg-white"
                >
                    <option value="all">All Status</option>
                    <option value="Active">Active</option>
                    <option value="Suspended">Suspended</option>
                    <option value="Inactive">Inactive</option>
                </select>
                <select
                    value={roleFilter}
                    onChange={(e) => setRoleFilter(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-orange-200 focus:border-transparent outline-none transition-all bg-white"
                >
                    <option value="all">All Roles</option>
                    <option value="Admin">Admin</option>
                    <option value="User">User</option>
                    <option value="Manager">Manager</option>
                    <option value="Developer">Developer</option>
                </select>
            </div>

            <div className="mb-6">
                <h3 className="text-base font-semibold text-gray-900 mb-1">Team Members</h3>
                <p className="text-sm text-gray-600 mb-4">Manage your team members and their access levels</p>

                <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th className="text-left px-4 py-3 text-xs font-medium text-gray-600 uppercase tracking-wider">
                                    User
                                </th>
                                <th className="text-left px-4 py-3 text-xs font-medium text-gray-600 uppercase tracking-wider">
                                    Company
                                </th>
                                <th className="text-left px-4 py-3 text-xs font-medium text-gray-600 uppercase tracking-wider">
                                    Role
                                </th>
                                <th className="text-left px-4 py-3 text-xs font-medium text-gray-600 uppercase tracking-wider">
                                    Status
                                </th>
                                <th className="text-left px-4 py-3 text-xs font-medium text-gray-600 uppercase tracking-wider">
                                    Last Login
                                </th>
                                <th className="text-left px-4 py-3 text-xs font-medium text-gray-600 uppercase tracking-wider">
                                    Location
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {filteredMembers.map((member) => (
                                <tr key={member.id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-4 py-3">
                                        <div className="flex items-center gap-3">
                                            <img
                                                alt='image'
                                                src="https://i.pravatar.cc/40?img=7" className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 font-semibold text-sm" />


                                            <div>
                                                <p className="text-sm font-medium text-gray-900">{member.full_name}</p>
                                                <p className="text-xs text-gray-500">{member.email}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-4 py-3 text-sm text-gray-700">{member.company || '-'}</td>
                                    <td className="px-4 py-3 text-sm text-gray-700">{member.role}</td>
                                    <td className="px-4 py-3">
                                        <span
                                            className={`inline-flex px-2.5 py-1 text-xs font-medium rounded-full ${member.status === 'Active'
                                                    ? 'bg-gray-900 text-white'
                                                    : 'bg-red-100 text-red-700'
                                                }`}
                                        >
                                            {member.status}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3 text-sm text-gray-700">
                                        {getTimeAgo(member.last_login)}
                                    </td>
                                    <td className="px-4 py-3 text-sm text-gray-700">{member.location || '-'}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="mt-8 bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-base font-semibold text-gray-900 mb-4">Recent Activity</h3>
                <div className=" divide-y space-y-2 divide-gray-200 ">
                    {recentActivities.map((activity) => (
                        <div key={activity.id} className="px-4 py-3 flex items-center rounded-lg justify-between bg-gray-50 transition-colors hover:bg-[#FDF5E7]">
                            <div className="flex items-center gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-orange-400"></div>
                                <p className="text-sm text-gray-700">{activity.text}</p>
                            </div>
                            <span className="text-xs text-gray-500">{activity.time}</span>
                        </div>
                    ))}
                </div>
            </div>
            </main>
           

            <AddUserModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleAddUser}
            />
        </div>
    );
}
