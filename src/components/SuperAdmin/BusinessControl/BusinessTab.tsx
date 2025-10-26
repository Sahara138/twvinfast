// SuperaccountManagement/AllaccountsTab.tsx
import { Search } from 'lucide-react';
interface Account {
  id: number;
  name: string;
  email: string;
  company: string;
  admin: string;
  users: number;
  datasets: number;
  inputs: number;
  datasize: number;
}

interface AllAccountsTabProps {
  accounts: Account[];
  searchQuery: string;
  setSearchQuery: (v: string) => void;
}

export default function AllaccountsTab({
  accounts,
  searchQuery,
  setSearchQuery,
  
}: AllAccountsTabProps) {
 
  const filteredaccounts = accounts.filter((account) => {
    const matchesSearch =
      account.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      account.email.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesSearch;
  });

  return (
    <div className=" overflow-hidden">
       {/* Filters */}
        <div className="flex flex-col md:flex-row gap-3 mb-6">
          <div className="flex-1 relative ">
            <Search size={18} className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Search Business Account..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full xl:w-lg input-field bg-[#F4F6F8]" 
            />
          </div>
        </div>      

      {/* Table */}
      <div className='border border-[#DFE3E8] p-6 rounded-lg '>
        <div className="headerBox mb-5">
            <h6 className='text-lg font-normal mt-1'>Business Account Control</h6>
            <p className='text-sm font-normal text-gray-500'>Access and manage all business admin dashboards</p>
        </div>
        <div className="w-full overflow-x-auto rounded-lg ">
        <table className="w-full  rounded-lg ">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              <th className="text-left px-6 py-4 text-[#6B7280]">Company</th>
              <th className="text-left px-6 py-4 text-[#6B7280]">Admin</th>
              <th className="text-left px-6 py-4 text-[#6B7280]">Users</th>
              <th className="text-left px-6 py-4 text-[#6B7280]">Datasets</th>
              <th className="text-left px-6 py-4 text-[#6B7280]">AI Inputs</th>
              <th className="text-left px-6 py-4 text-[#6B7280]">Data Size</th>
            </tr>
          </thead>
          <tbody>
            {filteredaccounts.map((account) => (
              <tr key={account.id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <img src={`https://i.pravatar.cc/40?u=${account.id}`} alt={account.name} className="w-8 h-8 rounded-full" />
                    <div>
                      <p className="font-medium text-gray-900">{account.company}</p>
                      <p className="text-xs text-gray-500">{account.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">{account.admin}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{account.users} users</td>
                <td className="px-6 py-4 text-sm text-gray-900">{account.datasets} users</td>
                <td className="px-6 py-4 text-sm">{account.inputs}</td>
                <td className="px-6 py-4 text-sm">{account.datasize}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      </div>
    
    </div>
  );
}
