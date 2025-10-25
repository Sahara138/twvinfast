import { useEffect, useRef } from "react";
import { Chart as ChartJS } from "chart.js";
export default function ResponseTimes() {
  const responseTimeRef = useRef<HTMLCanvasElement | null>(null);
  const responseTimeChartInstance = useRef<ChartJS | null>(null);

  useEffect(() => {
    // Response Time Chart
    if (responseTimeRef.current) {
      if (responseTimeChartInstance.current)
        responseTimeChartInstance.current.destroy();

      const ctx = responseTimeRef.current.getContext("2d");
      if (ctx) {
        responseTimeChartInstance.current = new ChartJS(ctx, {
          type: "line",
          data: {
            labels: ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"],
            datasets: [
              {
                data: [0, 1.0, 1.8, 2.3, 2.0, 2.0, 2.4],
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
                max: 3,
                ticks: {
                  callback: (value) => Number(value).toFixed(2),
                },
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
      responseTimeChartInstance.current?.destroy();
    };
  }, []);

  return (
    <div className="bg-white rounded-lg border border-gray-200 w-[99%] md:w-[100%] p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-2">
        Average Response Times
      </h3>
      <p className="text-sm text-gray-500 mb-6">
        Daily response time performance
      </p>
      <div className="h-96">
        <canvas ref={responseTimeRef}></canvas>
      </div>
    </div>
  );
}
