
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
           <div className="bg-white p-4 rounded shadow">
             <h3 className="text-lg font-semibold">Lead</h3>
             <p className="text-2xl">{pipelineData.lead.count}</p>
             <p className="text-gray-600">{pipelineData.lead.value}</p>
           </div>
           <div className="bg-white p-4 rounded shadow">
             <h3 className="text-lg font-semibold">Proposal</h3>
             <p className="text-2xl">{pipelineData.proposal.count}</p>
             <p className="text-gray-600">{pipelineData.proposal.value}</p>
           </div>
           <div className="bg-white p-4 rounded shadow">
             <h3 className="text-lg font-semibold">Negotiation</h3>
             <p className="text-2xl">{pipelineData.negotiation.count}</p>
             <p className="text-gray-600">{pipelineData.negotiation.value}</p>
           </div>
           <div className="bg-white p-4 rounded shadow">
             <h3 className="text-lg font-semibold">Closed Won</h3>
             <p className="text-2xl">{pipelineData.closedWon.count}</p>
             <p className="text-gray-600">{pipelineData.closedWon.value}</p>
           </div>
         </div>
         <div className="bg-white p-4 rounded shadow mb-4">
           <p>Total Pipeline Value</p>
           <p className="text-2xl font-semibold">{pipelineData.totalValue}</p>
         </div>
         <div className="bg-white p-4 rounded shadow">
           <p>Conversion Rate</p>
           <div className="w-full bg-gray-200 rounded-full h-2.5">
             <div className="bg-green-500 h-2.5 rounded-full" style={{ width: `${pipelineData.conversionRate}` }}></div>
           </div>
           <p className="text-sm text-gray-600">{pipelineData.conversionRate}</p>
         </div>
         <div className="flex justify-between mt-4">
           <div>Won This Month: {pipelineData.wonThisMonth}</div>
           <div>Lost This Month: {pipelineData.lostThisMonth}</div>
           <div>Active Leads: {pipelineData.activeLeads}</div>
         </div>
       </div>
  )
}
