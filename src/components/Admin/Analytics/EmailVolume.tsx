import { useEffect, useRef } from "react";
import { Chart as ChartJS } from "chart.js";
export default function EmailVolume() {
  const emailVolumeRef = useRef<HTMLCanvasElement | null>(null);
  const emailVolumeChartInstance = useRef<ChartJS | null>(null);
  useEffect(() => {
    // Email Volume Chart
    if (emailVolumeRef.current) {
      if (emailVolumeChartInstance.current)
        emailVolumeChartInstance.current.destroy();

      const ctx = emailVolumeRef.current.getContext("2d");
      if (ctx) {
        emailVolumeChartInstance.current = new ChartJS(ctx, {
          type: "bar",
          data: {
            labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
            datasets: [
              {
                label: "Received",
                data: [230, 250, 220, 280],
                backgroundColor: "#3B82F6",
                barThickness: 40,
              },
              {
                label: "Replied",
                data: [195, 214, 190, 255],
                backgroundColor: "#10B981",
                barThickness: 40,
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
              y: {
                beginAtZero: true,
                max: 300,
                grid: { color: "#E5E7EB" },
              },
              x: { grid: { display: false } },
            },
          },
        });
      }
    }

    // Cleanup
    return () => {
      emailVolumeChartInstance.current?.destroy();
    };
  }, []);

  return (
    <div className="bg-white w-[99%] md:w-[100%] rounded-lg border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-2">
        Email Volume Trends
      </h3>
      <p className="text-sm text-gray-500 mb-6">
        Weekly email processing statistics
      </p>
      <div className="h-96">
        <canvas ref={emailVolumeRef}></canvas>
      </div>
      <div className="flex items-center gap-6 mt-6 justify-center">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-blue-500 rounded"></div>
          <span className="text-sm text-gray-700">Received</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-green-500 rounded"></div>
          <span className="text-sm text-gray-700">Replied</span>
        </div>
      </div>
    </div>
  );
}
