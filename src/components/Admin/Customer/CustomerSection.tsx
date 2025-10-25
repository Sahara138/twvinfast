import type { Customer } from "../../../types/Admin/Customer";
export default function CustomerSection() {


    const customerData: Customer[] = [
        { name: 'Mike Jones', email: 'mike@example.com', contact: '+1 (555) 123-4567', status: 'New', leadScore: 85, value: '$500', lastContact: '2024-01-15' },
        { name: 'Aka Johnson', email: 'aka@example.com', contact: '+1 (555) 123-4567', status: 'Opened', leadScore: 85, value: '$700', lastContact: '2024-01-15' },
        { name: 'Mike Chen', email: 'mike.chen@example.com', contact: '+1 (555) 123-4567', status: 'Won', leadScore: 85, value: '$820', lastContact: '2024-01-15' },
        { name: 'Lisa Wang', email: 'lisa@example.com', contact: '+1 (555) 123-4567', status: 'Lead', leadScore: 85, value: '$820', lastContact: '2024-01-15' },
        { name: 'David Miller', email: 'david@example.com', contact: '+1 (555) 123-4567', status: 'Active', leadScore: 85, value: '$840', lastContact: '2024-01-15' },
        { name: 'George Eliot', email: 'george@example.com', contact: '+1 (555) 123-4567', status: 'Lost', leadScore: 85, value: '$600', lastContact: '2024-01-15' },
    ];
    return (
        <div className="">
            <div className="md:flex justify-between gap-x-10 items-center mb-6">
                <input
                    type="text"
                    placeholder="Search Customers..."
                    className=" p-2 border border-[#C4CDD5] rounded-lg bg-[#F4F6F8]"
                />
                <select className="p-2 border rounded border-[#C4CDD5] mt-2 md:mt-0 ">
                    <option>All Status</option>
                </select>
            </div>
            <h2 className="text-2xl font-semibold">Customer Directory</h2>
            <p className="text-gray-600 mt-2 mb-4">Manage your customer relationships and profiles</p>
            <div className="overflow-x-auto rounded-lg  border  border-gray-200 overflow-x-auto">
                <table className="min-w-full bg-white">
                    <thead className="">
                        <tr className="bg-[#F4F6F8] text-[#6B7280]">
                            <th className="py-4 px-4 border-b border-[#C4CDD5] text-left">Customer</th>
                            <th className="py-2 px-4 border-b border-[#C4CDD5] text-left">Contact</th>
                            <th className="py-2 px-4 border-b border-[#C4CDD5] text-left">Status</th>
                            <th className="py-2 px-4 border-b border-[#C4CDD5] text-left">Lead Score</th>
                            <th className="py-2 px-4 border-b border-[#C4CDD5] text-left">Value</th>
                            <th className="py-2 px-4 border-b border-[#C4CDD5] text-left">Last Contact</th>

                        </tr>
                    </thead>
                    <tbody>
                        {customerData.map((customer, index) => (
                            <tr key={index} className="hover:bg-gray-50">
                                <td className="py-2 px-4 border-b border-[#C4CDD5] ">
                                    <div className="flex items-center">
                                        <img src={`https://i.pravatar.cc/40?img=${index + 1}`} alt={customer.name} className="w-8 h-8 rounded-full mr-2" />
                                        <span className="flex flex-col ml-2  "> <span className="font-medium text-lg text-[#161C24]">{customer.name}</span> <span className="text-sm text-[#454F5B] ">{customer.email}</span></span>
                                    </div>
                                </td>
                                <td className="py-2 px-4 border-b border-[#C4CDD5] ">{customer.contact}</td>
                                <td className="py-2 px-4 border-b border-[#C4CDD5] ">{customer.status}</td>
                                <td className="py-2 px-4 border-b border-[#C4CDD5] ">{customer.leadScore}</td>
                                <td className="py-2 px-4 border-b border-[#C4CDD5] ">{customer.value}</td>
                                <td className="py-2 px-4 border-b border-[#C4CDD5] ">{customer.lastContact}</td>

                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
