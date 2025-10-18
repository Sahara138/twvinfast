
interface AuditLog {
  id: number;
  company: string;
  email: string;
  action: string;
  admin: string;
  dataType: string;
  details: string;
  timestamp: string;
  status: "Under Review" | "Approved" | "Rejected";
}

interface AllAuditLogTabProps {
  auditLogs: AuditLog[];
}

export default function RevenueTab({
  auditLogs
}: AllAuditLogTabProps) {

  return (
    <div className=" overflow-hidden">    

      {/* Table */}
      <div className='border border-[#DFE3E8] p-6 rounded-lg '>
        <div className="headerBox mb-5">
            <h6 className='text-lg font-normal mt-1'>AI Learning Audit Logs</h6>
            <p className='text-sm font-normal text-gray-500'>Track all AI training inputs and model updates across businesses</p>
        </div>
        <div className="w-full overflow-x-auto rounded-lg ">
        <table className="w-full  rounded-lg ">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              <th className="text-left px-6 py-4 text-[#6B7280]">Company</th>
              <th className="text-left px-6 py-4 text-[#6B7280]">Action</th>
              <th className="text-left px-6 py-4 text-[#6B7280]">Admin</th>
              <th className="text-left px-6 py-4 text-[#6B7280]">Data Type</th>
              <th className="text-left px-6 py-4 text-[#6B7280]">Details</th><th className="text-left px-6 py-4 text-[#6B7280]">Timestamp</th><th className="text-left px-6 py-4 text-[#6B7280]">Status</th>
            </tr>
          </thead>
          <tbody>
            {auditLogs.map((auditLog) => (
              <tr key={auditLog.id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <img src={`https://i.pravatar.cc/40?u=${auditLog.id}`} alt={auditLog.company} className="w-8 h-8 rounded-full" />
                    <div>
                      <p className="font-medium text-gray-900">{auditLog.company}</p>
                      <p className="text-xs text-gray-500">{auditLog.email}</p>
                      
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">{auditLog.action}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{auditLog.admin} users</td>
                <td className="px-6 py-4 text-sm">{auditLog.dataType}</td>
                <td className="px-6 py-4 text-sm text-gray-900 truncate min-w-[150px] max-w-[200px]">
                {auditLog.details}
                </td>
                <td className="px-6 py-4 text-sm">{auditLog.timestamp}</td>
                <td className="px-6 py-4 text-sm truncate">{auditLog.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      </div>
    
    </div>
  );
}
