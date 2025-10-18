// SuperaccountManagement/AllaccountsTab.tsx
interface Dataset {
  id: number;
  dataset: string;
  business: string;
  type: string;
  size: number;
  records: number;
  status: "Active" | "Inactive";
}

interface AllDatasetsTabProps {
  datasets: Dataset[];
}

export default function AllDatasetTab({
  datasets
}: AllDatasetsTabProps) {


  return (
    <div className=" overflow-hidden">
      {/* Table */}
      <div className='border border-[#DFE3E8] p-6 rounded-lg '>
        <div className="headerBox mb-5">
            <h6 className='text-lg font-normal mt-1'>Business Datasets</h6>
            <p className='text-sm font-normal text-gray-500'>Manage and monitor all business training datasets</p>
        </div>
  <div className="w-full overflow-x-auto rounded-lg ">
        <table className="w-full  rounded-lg ">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              <th className="text-left px-6 py-4 text-[#6B7280]">Dataset</th>
              <th className="text-left px-6 py-4 text-[#6B7280]">Business</th>
              <th className="text-left px-6 py-4 text-[#6B7280]">Type</th>
              <th className="text-left px-6 py-4 text-[#6B7280]">Size</th>
              <th className="text-left px-6 py-4 text-[#6B7280]">Records</th>
              <th className="text-left px-6 py-4 text-[#6B7280]">Status</th>
            </tr>
          </thead>
          <tbody>
            {datasets.map((dataset) => (
              <tr key={dataset.id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <img src={`https://i.pravatar.cc/40?u=${dataset.id}`} alt={dataset.dataset} className="w-8 h-8 rounded-full" />
                    <div>
                      <p className="font-medium text-gray-900">{dataset.dataset}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">{dataset.business}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{dataset.type} users</td>
                
                <td className="px-6 py-4 text-sm">{dataset.size} GB</td>
                <td className="px-6 py-4 text-sm">{dataset.records}</td>
                <td className="px-6 py-4 text-sm">{dataset.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      </div>
    
    </div>
  );
}
