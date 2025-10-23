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
        </div>
    );
}
