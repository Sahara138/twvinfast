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
import { CiServer } from "react-icons/ci";
import GrowthAnalysisStatsCard from "./component/GrowthAnalysisStatsCard";


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

export default function GrowthAnalysisTab() {
    const growthData = {
        title: "Growth Projections",
        subtitle: "Forecasted growth based on current trends",
        metrics: {
            customerProjection: {
                year: 2024,
                label: "2024 Customer Projection",
                value: "225 customers",
                progress: 75,
            },
            revenueProjection: {
                year: 2024,
                label: "2024 Revenue Projection",
                value: "$142K",
                progress: 68,
            },
        },
        keyDrivers: [
            "Enterprise plan adoption increasing by 15% monthly",
            "AI usage growing 20% month-over-month",
            "Customer retention improving with new features",
        ],
    };


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

            <GrowthAnalysisStatsCard />


            <div className="bg-white p-6 rounded-lg border border-[#DFE3E8]">
                <div className="mb-[22px]">
                    <h3 className="font-semibold text-xl">{growthData.title}</h3>
                    <p className="font-normal text-base text-[#454F5B]">
                        {growthData.subtitle}
                    </p>
                </div>

                <div className="block lg:grid lg:grid-cols-[1fr_1fr] gap-x-[42px] border-b border-[#C4CDD5]">
                    {/* Customer Projection */}
                    <div className="mb-5 lg:mb-0">
                        <div className="mb-2 flex justify-between items-center">
                            <p className="font-normal text-[#454F5B] text-sm">
                                {growthData.metrics.customerProjection.label}
                            </p>
                            <p className="text-lg font-semibold text-black">
                                {growthData.metrics.customerProjection.value}
                            </p>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div
                                className="bg-[#757982] h-2.5 rounded-full mt-[2px]"
                                style={{
                                    width: `${growthData.metrics.customerProjection.progress}%`,
                                }}
                            ></div>
                        </div>
                    </div>

                    {/* Revenue Projection */}
                    <div className="mb-4 lg:mb-9">
                        <div className="mb-2 flex justify-between items-center">
                            <p className="font-normal text-[#454F5B] text-sm">
                                {growthData.metrics.revenueProjection.label}
                            </p>
                            <p className="text-lg font-semibold text-black">
                                {growthData.metrics.revenueProjection.value}
                            </p>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                            <div
                                className="bg-[#757982] h-2.5 rounded-full mt-[2px]"
                                style={{
                                    width: `${growthData.metrics.revenueProjection.progress}%`,
                                }}
                            ></div>
                        </div>
                    </div>
                </div>

                <div>
                    <h4 className="text-base font-semibold mt-5 mb-[10px]">Key Growth Drivers</h4>
                    <ul className="list-disc ml-4">
                        {growthData.keyDrivers.map((driver, index) => (
                            <li key={index} className="font-normal text-base text-[#454F5B] mb-2">
                                {driver}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}
