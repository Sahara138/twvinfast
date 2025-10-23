import { BsThreeDotsVertical } from "react-icons/bs";


// SuperaccountManagement/AllaccountsTab.tsx
interface APIKey {
  id: number;
  name: string;
  apiKey: string;
  permissions: string;
  created: string;
  lastUsed: string;
  status: string;
}

interface ApiKeyManagementTabProps {
  apikeys: APIKey[];
}


export default function ApiManagementTab({
  apikeys
}: ApiKeyManagementTabProps) {

    // const [loading, setLoading] = useState(false);
const getStatusColor = (status: string) =>
    status === 'Active'
      ? 'bg-gray-900 text-white'
      : status === 'Inactive'
      ? 'bg-red-500 text-white'
      : 'bg-gray-100 text-gray-700';



  return (
    <div className=" overflow-hidden">    

      {/* API Key Management */}

      <div className='border border-[#DFE3E8] p-6 rounded-lg '>
        <div className="headerBox mb-5">
            <h6 className='text-lg font-normal mt-1'>API Key Management</h6>
            <p className='text-sm font-normal text-gray-500'>Manage API keys for platform integrations</p>
        </div>
        {/* Table */}
              <div className='border border-[#DFE3E8] p-6 rounded-lg '>
                <div className="w-full overflow-x-auto rounded-lg ">
                <table className="w-full rounded-lg ">
                  <thead>
                    <tr className="border-b border-gray-200 bg-gray-50">
                      <th className="text-left px-6 py-4 text-[#6B7280]">Name</th>
                      <th className="text-left px-6 py-4 text-[#6B7280]">API Key</th>
                      <th className="text-left px-6 py-4 text-[#6B7280]">Permissions</th>
                      <th className="text-left px-6 py-4 text-[#6B7280]">Created</th>
                      <th className="text-left px-6 py-4 text-[#6B7280]">Last Used</th>
                      <th className="text-left px-6 py-4 text-[#6B7280]">Status </th>
                    </tr>
                  </thead>
                  <tbody>
                    {apikeys.map((apiKey) => (
                      <tr key={apiKey.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="px-6 py-4 text-sm text-gray-900">{apiKey.name}</td>
                        <td className="px-6 py-4 text-sm">{apiKey.apiKey}</td>
                        <td className="px-6 py-4 text-sm">{apiKey.permissions}</td>
                        <td className="px-6 py-4 text-sm">{apiKey.created}</td>
                        <td className="px-6 py-4 text-sm">{apiKey.lastUsed}</td>
                        
                        <td className="px-6 py-4">
                            <div className="flex justify-between items-center">
                            <span className={`px-[11px] py-[6px] rounded-[12px]  text-sm font-medium ${getStatusColor(apiKey.status)}`}>
                                {apiKey.status}
                            </span>

                             <BsThreeDotsVertical size={20}/>
                            </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              </div>
            

      </div>
    </div>
  );
}
