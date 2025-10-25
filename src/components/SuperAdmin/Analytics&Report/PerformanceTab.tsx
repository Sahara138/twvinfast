import {
    Chart as ChartJS,
    ArcElement,
    LineController,
    LineElement,
    PointElement,
    CategoryScale,
    LinearScale,
    Filler,
    Tooltip,
    Legend,
} from "chart.js";
import RevenueStatsCard from "./component/RevenueReportsStatsCard";
import { CiServer } from "react-icons/ci";


ChartJS.register(
    ArcElement,
    LineController,
    LineElement,
    PointElement,
    CategoryScale,
    LinearScale,
    Filler,
    Tooltip,
    Legend
);

export default function PerformanceTab() {
    const performanceData = [
  {
    "id": 1,
    "model": "GPT-4",
    "requests": 121352,
    "accuracy": 94.5,
    "avgResponse": "2.1s",
    "costEfficiency": "$67.13/1K"
  },
  {
    "id": 2,
    "model": "GPT-4 Turbo",
    "requests": 189420,
    "accuracy": 96.2,
    "avgResponse": "1.8s",
    "costEfficiency": "$59.85/1K"
  },
  {
    "id": 3,
    "model": "GPT-3.5",
    "requests": 224571,
    "accuracy": 89.7,
    "avgResponse": "3.5s",
    "costEfficiency": "$35.40/1K"
  },
  {
    "id": 4,
    "model": "GPT-5",
    "requests": 99542,
    "accuracy": 98.1,
    "avgResponse": "1.3s",
    "costEfficiency": "$92.00/1K"
  },
  {
    "id": 5,
    "model": "Claude 3 Opus",
    "requests": 84710,
    "accuracy": 95.4,
    "avgResponse": "2.0s",
    "costEfficiency": "$78.60/1K"
  },
  {
    "id": 6,
    "model": "Gemini 1.5 Pro",
    "requests": 112430,
    "accuracy": 93.8,
    "avgResponse": "2.4s",
    "costEfficiency": "$71.25/1K"
  }
]

    
    return (
        <div className="space-y-6">
            <div className="headerBox mb-5">
                <div className="flex justify-between items-center gap-2">
                    <div >
                        <h6 className='text-xl font-medium mt-1'>Platform Analytics</h6>
                        <p className='text-base font-normal text-gray-700'>Comprehensive overview of platform performance</p>
                    </div>
                </div>
            </div>

            <RevenueStatsCard />
            

                    <div  className="bg-white p-6 rounded-lg border border-[#DFE3E8]">

                        <div className="mb-8">
                            <h3 className="font-medium text-xl ">AI Model Performance</h3>
                            <p className="font-normal text-base text-[#454F5B]">Comparative analysis of AI model efficiency</p>
                        </div>
            {
                performanceData?.map((performance)=>(

                        <div key={performance.id} className="bg-white p-6 rounded-lg border border-[#DFE3E8] mb-[28px]">
                            <div className="mb-[11px]">
                                <div className="flex items-center gap-x-2">
                                    <span><CiServer size={18}/></span>
                                    <h3 className="font-medium text-base mt-2">{performance.model}</h3>
                                </div>
                                <p className="font-normal text-sm text-[#454F5B]">{performance.requests} Request</p>
                            </div>
                            <div className="block lg:grid lg:grid-cols-[3fr_1fr_1fr] gap-8 ">
                                <div className="mb-5 lg:mb-0">
                                    <p className="font-normal text-[#454F5B] text-sm ">Accuracy</p>
                                    <p className="text-lg font-medium text-black">{performance.accuracy}%</p>
                                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                                        <div className="bg-[#757982] h-2.5 rounded-full w-full mt-[2px]" style={{ width: `${performance.accuracy}%` }}></div>
                                    </div>
                                </div>
                                <div className="mb-5 lg:mb-0">
                                    <p className="font-normal text-[#454F5B] text-sm">Avg Response</p>
                                    <p className="text-lg font-medium text-black">{performance.avgResponse}</p>
                                </div>
                                <div>
                                    <p className="font-normal text-[#454F5B] text-sm">Cost Efficiency</p>
                                    <p className="text-lg font-medium text-black">{performance.costEfficiency}</p>
                                </div>
                            </div>
                        
                        </div >
                        
                        
                    ))
                }
                    </div>
        </div>
    );
}
