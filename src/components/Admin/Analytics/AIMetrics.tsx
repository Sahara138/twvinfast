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

export default function AIMetrics() {
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
            "Product Inquiries",
            "Technical Support",
            "Billing Questions",
            "General Info",
          ],
          datasets: [
            {
              data: [40, 25, 20, 15],
              backgroundColor: ["#60A5FA", "#A78BFA", "#34D399", "#F87171"],
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
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Response Categories
          </h3>
          <p className="text-sm text-gray-500 mb-6">
            Distribution of response types
          </p>
          <div className="flex items-center justify-center mb-6">
            <div className="w-64 h-64">
              <canvas ref={doughnutRef}></canvas>
            </div>
          </div>
          <div className="space-y-3">
            {[
              { label: "Product Inquiries 40%", color: "bg-blue-400" },
              { label: "Technical Support 25%", color: "bg-purple-400" },
              { label: "Billing Questions 20%", color: "bg-green-400" },
              { label: "General Info 15%", color: "bg-red-400" },
            ].map((item, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full ${item.color}`}></div>
                <span className="text-sm text-gray-700">{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            AI Accuracy Over Time
          </h3>
          <p className="text-sm text-gray-500 mb-6">
            Monthly accuracy improvements
          </p>
          <div className="h-80">
            <canvas ref={accuracyLineRef}></canvas>
          </div>
        </div>
      </div>
    </div>
  );
}
