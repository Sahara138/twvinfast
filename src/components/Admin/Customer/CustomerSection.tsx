// import type { Customer } from "../../../types/Admin/Customer";
// export default function CustomerSection() {


//     const customerData: Customer[] = [
//         { name: 'Mike Jones', email: 'mike@example.com', contact: '+1 (555) 123-4567', status: 'New', leadScore: 85, value: '$500', lastContact: '2024-01-15' },
//         { name: 'Aka Johnson', email: 'aka@example.com', contact: '+1 (555) 123-4567', status: 'Opened', leadScore: 85, value: '$700', lastContact: '2024-01-15' },
//         { name: 'Mike Chen', email: 'mike.chen@example.com', contact: '+1 (555) 123-4567', status: 'Won', leadScore: 85, value: '$820', lastContact: '2024-01-15' },
//         { name: 'Lisa Wang', email: 'lisa@example.com', contact: '+1 (555) 123-4567', status: 'Lead', leadScore: 85, value: '$820', lastContact: '2024-01-15' },
//         { name: 'David Miller', email: 'david@example.com', contact: '+1 (555) 123-4567', status: 'Active', leadScore: 85, value: '$840', lastContact: '2024-01-15' },
//         { name: 'George Eliot', email: 'george@example.com', contact: '+1 (555) 123-4567', status: 'Lost', leadScore: 85, value: '$600', lastContact: '2024-01-15' },
//     ];
//     return (
// <div className="min-h-screen main-container min-w-0">
//             <div className="block md:flex justify-between gap-x-10 items-center mb-6">
//                 <input
//                     type="text"
//                     placeholder="Search Customers..."
//                     className="w-[80%] md:w-[100%] p-2 border border-[#C4CDD5] rounded-lg bg-[#F4F6F8]"
//                 />
//                 <select className="p-2 mt-3 md:mt-0 border rounded border-[#C4CDD5]">
//                     <option>All Status</option>
//                 </select>
//             </div>
//             <h2 className="text-2xl font-semibold">Customer Directory</h2>
//             <p className="text-gray-600 mt-2 mb-4">Manage your customer relationships and profiles</p>
//            {/* <div className="relative border border-gray-200 rounded-lg">
//                 <div className="overflow-x-auto md:overflow-x-visible scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
//                 <table className="min-w-[900px] w-full bg-white">
//                 <thead>
//                     <tr className="bg-[#F4F6F8] text-[#6B7280]">
//                     <th className="py-4 px-4 text-left border-b border-[#C4CDD5]">Customer</th>
//                     <th className="py-4 px-4 text-left border-b border-[#C4CDD5]">Contact</th>
//                     <th className="py-4 px-4 text-left border-b border-[#C4CDD5]">Status</th>
//                     <th className="py-4 px-4 text-left border-b border-[#C4CDD5]">Lead Score</th>
//                     <th className="py-4 px-4 text-left border-b border-[#C4CDD5]">Value</th>
//                     <th className="py-4 px-4 text-left border-b border-[#C4CDD5]">Last Contact</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {customerData.map((customer, index) => (
//                     <tr key={index} className="hover:bg-gray-50">
//                         <td className="py-3 px-4 border-b border-[#C4CDD5]">
//                         <div className="flex items-center">
//                             <img
//                             src={`https://i.pravatar.cc/40?img=${index + 1}`}
//                             alt={customer.name}
//                             className="w-8 h-8 rounded-full mr-2"
//                             />
//                             <div>
//                             <p className="font-medium text-lg text-[#161C24]">{customer.name}</p>
//                             <p className="text-sm text-[#454F5B]">{customer.email}</p>
//                             </div>
//                         </div>
//                         </td>
//                         <td className="py-3 px-4 border-b border-[#C4CDD5]">{customer.contact}</td>
//                         <td className="py-3 px-4 border-b border-[#C4CDD5]">{customer.status}</td>
//                         <td className="py-3 px-4 border-b border-[#C4CDD5]">{customer.leadScore}</td>
//                         <td className="py-3 px-4 border-b border-[#C4CDD5]">{customer.value}</td>
//                         <td className="py-3 px-4 border-b border-[#C4CDD5]">{customer.lastContact}</td>
//                     </tr>
//                     ))}
//                 </tbody>
//                 </table>
//             </div>
//             </div> */}
//             <div className="relative border border-gray-200 rounded-lg">
//   <table className="min-w-[900px] w-full bg-white">
//     <thead className="bg-[#F4F6F8] text-[#6B7280] sticky top-0 z-10">
//       <tr>
//         <th className="py-4 px-4 border-b border-[#C4CDD5] text-left">Customer</th>
//         <th className="py-4 px-4 border-b border-[#C4CDD5] text-left">Contact</th>
//         <th className="py-4 px-4 border-b border-[#C4CDD5] text-left">Status</th>
//         <th className="py-4 px-4 border-b border-[#C4CDD5] text-left">Lead Score</th>
//         <th className="py-4 px-4 border-b border-[#C4CDD5] text-left">Value</th>
//         <th className="py-4 px-4 border-b border-[#C4CDD5] text-left">Last Contact</th>
//       </tr>
//     </thead>
//   </table>

//   <div className="max-h-[400px] overflow-y-auto">
//     <table className="min-w-[900px] w-full bg-white">
//       <tbody>
//         {customerData.map((customer, index) => (
//           <tr key={index} className="hover:bg-gray-50">
//             <td className="py-3 px-4 border-b border-[#C4CDD5]">
//               <div className="flex items-center">
//                 <img
//                   src={`https://i.pravatar.cc/40?img=${index + 1}`}
//                   alt={customer.name}
//                   className="w-8 h-8 rounded-full mr-2"
//                 />
//                 <div>
//                   <p className="font-medium text-lg text-[#161C24]">{customer.name}</p>
//                   <p className="text-sm text-[#454F5B]">{customer.email}</p>
//                 </div>
//               </div>
//             </td>
//             <td className="py-3 px-4 border-b border-[#C4CDD5]">{customer.contact}</td>
//             <td className="py-3 px-4 border-b border-[#C4CDD5]">{customer.status}</td>
//             <td className="py-3 px-4 border-b border-[#C4CDD5]">{customer.leadScore}</td>
//             <td className="py-3 px-4 border-b border-[#C4CDD5]">{customer.value}</td>
//             <td className="py-3 px-4 border-b border-[#C4CDD5]">{customer.lastContact}</td>
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   </div>
// </div>



//         </div>
//     )
// }

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
    <div className="w-[35%] sm:w-[50%] md:w-[84%] lg:w-[92%] xl:w-[100%]">
      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
        <input
          type="text"
          placeholder="Search Customers..."
          className="flex-1 p-2 border border-[#C4CDD5] rounded-lg bg-[#F4F6F8]"
        />
        <select className="p-2 border rounded border-[#C4CDD5] w-full sm:w-[150px]">
          <option>All Status</option>
        </select>
      </div>

      <h2 className="text-2xl font-semibold mb-1">Customer Directory</h2>
      <p className="text-gray-600 mb-4">Manage your customer relationships and profiles</p>

      <div className="overflow-auto border border-gray-200 rounded-lg max-h-[500px]">
  <table className="min-w-[900px] w-full border-collapse">
    <thead className="bg-[#F4F6F8] sticky top-0 z-10">
      <tr>
        <th className="py-3 px-4 text-left border-b border-[#C4CDD5]">Customer</th>
        <th className="py-3 px-4 text-left border-b border-[#C4CDD5]">Contact</th>
        <th className="py-3 px-4 text-left border-b border-[#C4CDD5]">Status</th>
        <th className="py-3 px-4 text-left border-b border-[#C4CDD5]">Lead Score</th>
        <th className="py-3 px-4 text-left border-b border-[#C4CDD5]">Value</th>
        <th className="py-3 px-4 text-left border-b border-[#C4CDD5]">Last Contact</th>
      </tr>
    </thead>
    <tbody>
      {customerData.map((customer, index) => (
        <tr key={index} className="hover:bg-gray-50">
          <td className="py-2 px-4 border-b border-[#C4CDD5] flex items-center gap-2 min-w-[150px]">
            <img
              src={`https://i.pravatar.cc/40?img=${index + 1}`}
              alt={customer.name}
              className="w-8 h-8 rounded-full"
            />
            <div className="truncate">
              <p className="font-medium text-sm truncate">{customer.name}</p>
              <p className="text-xs text-gray-500 truncate">{customer.email}</p>
            </div>
          </td>
          <td className="py-2 px-4 border-b border-[#C4CDD5] text-sm truncate min-w-[120px]">{customer.contact}</td>
          <td className="py-2 px-4 border-b border-[#C4CDD5] text-sm truncate min-w-[100px]">{customer.status}</td>
          <td className="py-2 px-4 border-b border-[#C4CDD5] text-sm truncate min-w-[80px]">{customer.leadScore}</td>
          <td className="py-2 px-4 border-b border-[#C4CDD5] text-sm truncate min-w-[80px]">{customer.value}</td>
          <td className="py-2 px-4 border-b border-[#C4CDD5] text-sm truncate min-w-[120px]">{customer.lastContact}</td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

    </div>
  );
}
