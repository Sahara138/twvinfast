import type { Invoice } from "../../../types/SuperAdmin/Billing&Subscription";
import InvoiceManagementStatsCards from "./InvoiceManagementStatsCards";

// SuperaccountManagement/AllaccountsTab.tsx


interface AllInvoiceTabProps {
  invoices: Invoice[];
    statusFilter: string;
    setStatusFilter: (v: string) => void;
}


export default function InvoicesTab({
  invoices,
  statusFilter,
  setStatusFilter
}: AllInvoiceTabProps) {
   
    
  const getStatusColor = (status: string) =>
    status === 'Paid'
      ? 'bg-gray-900 text-white'
      : status === 'Pending'
      ? 'bg-red-500 text-white'
      : 'bg-gray-100 text-gray-700';


  return (
    <div className="w-[42%] sm:w-[50%] md:w-[84%] lg:w-[95%] xl:w-[100%]">
            

      {/* Table */}
      <div className='border border-[#DFE3E8] p-6 rounded-lg md:w-full '>
        <div className="headerBox mb-5">
            <div className="md:flex justify-between items-center gap-2">
                <div >
                    <h6 className='text-lg font-normal mt-1'>Invoice Datasets</h6>
                    <p className='text-sm font-normal text-gray-500'>Manage and monitor all invoice datasets</p>
                </div>
                {/* Filters */}
                <div className="flex flex-col md:flex-row gap-3 mb-6 mt-4 md:mt-0">
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 bg-white"
                    >
                        <option>Paid</option>
                        <option>Pending</option>
                        <option>Overdue</option>
                    </select>
                </div>
            </div>
        </div>

        <InvoiceManagementStatsCards />

        <div className="w-full overflow-x-auto rounded-lg">
        <table className="w-full  rounded-lg ">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              <th className="text-left px-6 py-4 text-[#6B7280]">Invoice ID</th>
              <th className="text-left px-6 py-4 text-[#6B7280]">Business</th>
              <th className="text-left px-6 py-4 text-[#6B7280]">Amount</th>
              <th className="text-left px-6 py-4 text-[#6B7280]">Status</th>
              <th className="text-left px-6 py-4 text-[#6B7280]">Issue Date</th>
              <th className="text-left px-6 py-4 text-[#6B7280]">Due Date</th>
              <th className="text-left px-6 py-4 text-[#6B7280]">Payment</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((invoice) => (
              <tr key={invoice.id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="px-6 py-4 text-sm text-gray-900">{invoice.invoiceNumber}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{invoice.company}</td>
                <td className="px-6 py-4 text-sm">${invoice.amount}</td>
                <td className="px-6 py-4">
                  <span className={`px-[11px] py-[6px] rounded-lg text-sm font-medium ${getStatusColor(invoice.status)}`}>
                    {invoice.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm">{invoice.createdAt}</td>
                <td className="px-6 py-4 text-sm">{invoice.dueDate}</td>
                <td className="px-6 py-4 text-sm">{invoice.paymentType}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      </div>
    
    </div>
  );
}
