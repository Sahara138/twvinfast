// SuperUserManagement/LoginHistoryTab.tsx
import type{ LoginRecord } from '../../../types/SuperAdmin/SuperUserManagement';

interface Props {
  records: LoginRecord[];
  onSelect: (record: LoginRecord) => void;
}

export default function LoginHistoryTab({ records, onSelect }: Props) {
  const getStatusClass = (status: string) =>
    status === 'Success' ? 'text-green-600 font-medium' : 'text-red-600 font-medium';

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900 mb-2">Login History</h2>
        <p className="text-gray-600 text-sm">Recent login attempts across the platform</p>
      </div>

      <div className="w-full overflow-x-auto">
        <table className="w-full min-w-max">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              <th className="text-left px-6 py-4 font-semibold text-gray-700">User</th>
              <th className="text-left px-6 py-4 font-semibold text-gray-700">Timestamp</th>
              <th className="text-left px-6 py-4 font-semibold text-gray-700">Location</th>
              <th className="text-left px-6 py-4 font-semibold text-gray-700">IP Address</th>
              <th className="text-left px-6 py-4 font-semibold text-gray-700">Status</th>
            </tr>
          </thead>
          <tbody>
            {records.map((record) => (
              <tr
                key={record.id}
                className="border-b border-gray-100 hover:bg-gray-50 cursor-pointer"
                onClick={() => onSelect(record)}
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <img src={`https://i.pravatar.cc/40?u=${record.id}`} className="w-8 h-8 rounded-full" />
                    <div>
                      <p className="font-medium text-gray-900">{record.user}</p>
                      <p className="text-xs text-gray-500">{record.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm">{record.timestamp}</td>
                <td className="px-6 py-4 text-sm">{record.location}</td>
                <td className="px-6 py-4 text-sm">{record.ipAddress}</td>
                <td className={`px-6 py-4 text-sm ${getStatusClass(record.status)}`}>{record.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
