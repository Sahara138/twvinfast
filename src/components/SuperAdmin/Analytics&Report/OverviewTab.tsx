import { useEffect, useRef } from "react";
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
import type { Performance } from "../../../types/SuperAdmin/AnalyticsReports";
import OverviewStatsCard from "./component/OverviewStatsCard";


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

export default function OverviewTab() {
    const doughnutRef = useRef<HTMLCanvasElement | null>(null);
    const accuracyLineRef = useRef<HTMLCanvasElement | null>(null);
    const accuracyChartInstance = useRef<ChartJS | null>(null);
    const doughnutChartInstance = useRef<ChartJS | null>(null);

    // --- Doughnut Chart ---
    useEffect(() => {
        if (!doughnutRef.current) return;

        if (doughnutChartInstance.current) {
            doughnutChartInstance.current.destroy();
        }

        const ctx = doughnutRef.current.getContext("2d");
        if (ctx) {
            doughnutChartInstance.current = new ChartJS(ctx, {
                type: "doughnut",
                data: {
                    labels: [
                        "Pro",
                        "Enterprise",
                        "Basic",

                    ],
                    datasets: [
                        {
                            data: [40, 25, 20, 15],
                            backgroundColor: ["#60A5FA", "#34D399", "#F87171"],
                            borderWidth: 0,
                        },
                    ],
                },
                options: {
                    cutout: "70%",
                    plugins: { legend: { display: false } },
                },
            });
        }

        return () => {
            doughnutChartInstance.current?.destroy();
        };
    }, []);
    const topPerformingbusiness: Performance[] = [
        { id: '1', company: 'TechCorp Inc.', subTitle: "145 users", revenue: "$3,990", rate: '+12.5%' },
        { id: '2', company: 'GlobalTech', subTitle: "114 Users", revenue: "$3,290", rate: '+12.2%' },
        { id: '3', company: 'InnovateLabs', subTitle: "95 users", revenue: "$2,870", rate: '+09.5%' },
        { id: '4', company: 'StartupXYZ', subTitle: "78 users", revenue: "$2,710", rate: '+10.2%' },
        { id: '5', company: 'DataCorp', subTitle: "65 users", revenue: "$2,590", rate: '+10.8%' }
    ];

    // --- Line Chart ---
    useEffect(() => {
        if (!accuracyLineRef.current) return;

        if (accuracyChartInstance.current) {
            accuracyChartInstance.current.destroy();
        }

        const ctx = accuracyLineRef.current.getContext("2d");
        if (ctx) {
            accuracyChartInstance.current = new ChartJS(ctx, {
                type: "line",
                data: {
                    labels: ["Jan", "Feb", "Mar", "Apr", "May", "June"],
                    datasets: [
                        {
                            data: [50, 65, 70, 80, 75, 85],
                            fill: true,
                            backgroundColor: (context) => {
                                const chart = context.chart;
                                const { ctx, chartArea } = chart;
                                if (!chartArea) return "rgba(0,0,0,0)";
                                const gradient = ctx.createLinearGradient(
                                    0,
                                    chartArea.top,
                                    0,
                                    chartArea.bottom
                                );
                                gradient.addColorStop(0, "rgba(96, 165, 250, 0.5)");
                                gradient.addColorStop(0.5, "rgba(251, 191, 36, 0.3)");
                                gradient.addColorStop(1, "rgba(248, 113, 113, 0.2)");
                                return gradient;
                            },
                            borderColor: "#3B82F6",
                            borderWidth: 2,
                            tension: 0.4,
                            pointBackgroundColor: "#3B82F6",
                            pointRadius: 4,
                            pointHoverRadius: 6,
                        },
                    ],
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: { legend: { display: false } },
                    scales: {
                        y: {
                            min: 0,
                            max: 100,
                            ticks: {
                                callback: (value) => `${value}%`,
                            },
                            grid: { color: "#E5E7EB" },
                        },
                        x: { grid: { display: false } },
                    },
                },
            });
        }

        return () => {
            accuracyChartInstance.current?.destroy();
        };
    }, []);

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

            <OverviewStatsCard />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                    <h3 className="text-2xl font-semibold text-gray-900 mb-1">
                        Customer Segments
                    </h3>
                    <p className="text-sm text-gray-700 mb-4">
                        Distribution by subscription plan
                    </p>
                    <div className="flex items-center justify-center mb-6">
                        <div className="w-64 h-64">
                            <canvas ref={doughnutRef}></canvas>
                        </div>
                    </div>
                    <div className="space-y-3">
                        {[
                            { label: "Pro 40%", color: "bg-blue-400" },
                            { label: "Enterprise 17%", color: "bg-purple-400" },
                            { label: "Basic 36%%", color: "bg-green-400" },
                        ].map((item, idx) => (
                            <div key={idx} className="flex items-center gap-3">
                                <div className={`w-3 h-3 rounded-full ${item.color}`}></div>
                                <span className="text-sm text-[#484848] font-normal">{item.label}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            AI Accuracy Over Time
          </h3>
          <p className="text-sm text-gray-500 mb-6">
            Monthly accuracy improvements
          </p>
          <div className="h-80">
            <canvas ref={accuracyLineRef}></canvas>
          </div>
        </div> */}
                {/* Recent Activity */}
                <div className="bg-white rounded-xl px-6 py-5 border border-gray-200">

                    <h3 className="text-2xl font-medium text-gray-900 mb-1">Top Performing Businesses</h3>
                    <p className="text-sm font-normal text-gray-500 mb-5">Highest revenue generating customers</p>
                    <div className="space-y-4">
                        {topPerformingbusiness.map((performance) => (
                            <div
                                key={performance.id}
                                className="flex justify-between items-center gap-4 px-4 py-[6px] bg-[#F9FAFB] rounded-[8px] hover:bg-[#FDF5E7] transition-colors"
                            >
                                <div className="flex  items-center gap-4">
                                    <div className="w-12 h-12 bg-gray-200 rounded-[8px] flex items-center justify-center text-xl font-semibold">{performance.id}</div>
                                    <div className="">
                                        <h5 className="font-medium text-lg text-gray-900 mb-[2px]">{performance.company}</h5>
                                        <p className="text-sm text-gray-500 font-normal">{performance.subTitle}
                                        </p>
                                    </div>
                                </div>

                                <div className="">
                                    <p className="text-base font-medium text-black ">{performance.revenue}</p>
                                    <span className="text-sm font-normal text-primary ">{performance.rate}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
