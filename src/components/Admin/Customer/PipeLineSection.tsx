import { Users, WalletCards } from "lucide-react";

export default function PipeLineSection() {
    const pipelineData = {
        lead: { count: 25, value: '$2042' },
        proposal: { count: 8, value: '$5042' },
        negotiation: { count: 4, value: '$2042' },
        closedWon: { count: 15, value: '$10042' },
        totalValue: '$25340',
        conversionRate: '23.7%',
        wonThisMonth: 15,
        lostThisMonth: 3,
        activeLeads: 25,
    };
    return (
        <div className="p-4">

            <div className="grid grid-cols-4 gap-4 mb-4">
                <div className="bg-white p-4 space-y-2 rounded-lg border border-[#DFE3E8] ">
                    <h3 className="font-medium">Lead</h3>
                    <p className="text-2xl font-semibold flex items-center gap-x-2"><Users className="w-4 h-4" />  {pipelineData.lead.count}</p>
                    <p className="text-gray-600 font-semibold flex items-center gap-x-2"><WalletCards className="w-4 h-4" />  {pipelineData.lead.value}</p>
                </div>
                <div className="bg-white p-4 space-y-2 rounded-lg border border-[#DFE3E8]">
                    <h3 className="font-medium">Proposal</h3>
                    <p className="text-2xl font-semibold flex items-center gap-x-2"><Users className="w-4 h-4" /> {pipelineData.proposal.count}</p>
                    <p className="text-gray-600 font-semibold flex items-center gap-x-2"> <WalletCards className="w-4 h-4" /> {pipelineData.proposal.value}</p>
                </div>
                <div className="bg-white p-4 space-y-2 rounded-lg border border-[#DFE3E8]">
                    <h3 className="font-medium">Negotiation</h3>
                    <p className="text-2xl font-semibold flex items-center gap-x-2"> <Users className="w-4 h-4" /> {pipelineData.negotiation.count}</p>
                    <p className="text-gray-600 font-semibold flex items-center gap-x-2"> <WalletCards className="w-4 h-4" /> {pipelineData.negotiation.value}</p>
                </div>
                <div className="bg-white p-4 space-y-2 rounded-lg border border-[#DFE3E8]">
                    <h3 className="font-medium">Closed Won</h3>
                    <p className="text-2xl font-semibold flex items-center gap-x-2"> <Users className="w-4 h-4" /> {pipelineData.closedWon.count}</p>
                    <p className="text-gray-600 font-semibold flex items-center gap-x-2"> <WalletCards className="w-4 h-4" /> {pipelineData.closedWon.value}</p>
                </div>
            </div>


            <div className="bg-white p-6 rounded-lg border border-[#DFE3E8]">

                <div className="mb-8">
                    <h3 className="font-medium text-xl ">Pipeline Details</h3>
                    <p className="text-[#454F5B]">Track leads through your sales process</p>
                </div>


                <div className=" flex justify-between">
                    <p className="font-medium text-xl ">Total Pipeline Value</p>
                    <p className="text-2xl font-semibold">{pipelineData.totalValue}</p>
                </div>
                <div className="mt-4 space-y-2 ">
                    <p>Conversion Rate</p>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div className="bg-[#757982] h-2.5 rounded-full" style={{ width: `${pipelineData.conversionRate}` }}></div>
                    </div>
                    <p className="text-sm text-gray-600">{pipelineData.conversionRate}</p>
                </div>
                <div className="flex justify-between mt-4 p-6 border-t border-[#C4CDD5] pt-12">
                    <div className="flex flex-col gap-y-1 items-center"> <span className="text-[#2F80ED] text-3xl font-bold">{pipelineData.wonThisMonth}</span>Won This Month </div>
                    <div className="flex flex-col gap-y-1 items-center"><span className="text-[#ED990B] text-3xl font-bold">{pipelineData.lostThisMonth}</span> Lost This Month </div>
                    <div className="flex flex-col gap-y-1 items-center"><span className="text-[#3BB515] text-3xl font-bold">{pipelineData.activeLeads}</span> Active Leads </div>
                </div>
                
            </div>

        </div>
    )
}
