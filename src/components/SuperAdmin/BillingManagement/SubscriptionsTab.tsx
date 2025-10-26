// SuperaccountManagement/AllaccountsTab.tsx
import { Search } from 'lucide-react';
import { BsThreeDotsVertical } from 'react-icons/bs';
interface Subscription {
  id: number;
  company: string;
  email: string;
  plan: string;
  status: 'Active' | 'Suspended';
  amount: number;
  billing: string;
  nextBilling: string;
  paymentType: string ;
}

interface AllSubscriptionTabProps {
  subscriptions: Subscription[];
  searchQuery: string;
  setSearchQuery: (v: string) => void;
  statusFilter: string;
  setStatusFilter: (v: string) => void;
}

export default function AllSubscriptionTab({
  subscriptions,
  searchQuery,
  setSearchQuery,
  statusFilter,
  setStatusFilter,
  
}: AllSubscriptionTabProps) {
   
    
  const getStatusColor = (status: string) =>
    status === 'Active'
      ? 'bg-gray-900 text-white'
      : status === 'Suspended'
      ? 'bg-red-500 text-white'
      : 'bg-gray-100 text-gray-700';

  const filteredsubscriptions = subscriptions.filter((subscription) => {
    const matchesSearch =
      subscription.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      subscription.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'All Status' || subscription.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="w-[33%] sm:w-[70%] md:w-[95%] lg:w-[100%]">
       {/* Filters */}
        <div className="flex flex-col md:flex-row w-[100%] gap-3 mb-6">
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
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 bg-white"
          >
            <option>All Status</option>
            <option>Active</option>
            <option>Suspended</option>
          </select>
        </div>      

      {/* Table */}
      <div className='border border-[#DFE3E8] p-6 rounded-lg w-[100%]'>
        <div className="w-full overflow-x-auto rounded-lg ">
        <table className="w-full rounded-lg ">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              <th className="text-left px-6 py-4 text-[#6B7280]">Company</th>
              <th className="text-left px-6 py-4 text-[#6B7280]">Plan</th>
              <th className="text-left px-6 py-4 text-[#6B7280]">Status</th>
              <th className="text-left px-6 py-4 text-[#6B7280]">Amount</th>
              <th className="text-left px-6 py-4 text-[#6B7280]">Billing</th>
              <th className="text-left px-6 py-4 text-[#6B7280]">Next Billing</th>
              <th className="text-left px-6 py-4 text-[#6B7280]">Payment </th>
            </tr>
          </thead>
          <tbody>
            {filteredsubscriptions.map((subscription) => (
              <tr key={subscription.id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <img src={`https://i.pravatar.cc/40?u=${subscription.id}`} alt={subscription.company} className="w-8 h-8 rounded-full" />
                    <div>
                      <p className="font-medium text-gray-900">{subscription.company}</p>
                      <p className="text-xs text-gray-500">{subscription.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(subscription.plan)}`}>
                    {subscription.plan}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-[11px] py-[6px] rounded-lg text-sm font-medium ${getStatusColor(subscription.status)}`}>
                    {subscription.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">${subscription.amount}</td>
                <td className="px-6 py-4 text-sm">{subscription.billing}</td>
                <td className="px-6 py-4 text-sm">{subscription.nextBilling}</td>
                <td className="px-6 py-4 text-sm flex justify-between items-center">{subscription.paymentType} 
                    <BsThreeDotsVertical size={20}/></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      </div>
    
    </div>
  );
}
