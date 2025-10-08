import React, { useState, useEffect, useRef } from 'react';
import { TrendingUp, CheckCircle, MessageSquare, Clock } from 'lucide-react';
import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';

const Analytic = () => {
  const [activeTab, setActiveTab] = useState<'ai-metrics' | 'response-times' | 'email-volume' | 'team-productivity'>('ai-metrics');
  const doughnutRef = useRef<HTMLCanvasElement | null>(null);
  const accuracyLineRef = useRef<HTMLCanvasElement | null>(null);
  const responseTimeRef = useRef<HTMLCanvasElement | null>(null);
  const emailVolumeRef = useRef<HTMLCanvasElement | null>(null);

  const doughnutChartInstance = useRef<ChartJS | null>(null);
  const accuracyChartInstance = useRef<ChartJS | null>(null);
  const responseTimeChartInstance = useRef<ChartJS | null>(null);
  const emailVolumeChartInstance = useRef<ChartJS | null>(null);

  const tabs = [
    { id: 'ai-metrics', label: 'AI Metrics' },
    { id: 'response-times', label: 'Response Times' },
    { id: 'email-volume', label: 'Email Volume' },
    { id: 'team-productivity', label: 'Team Productivity' }
  ];

  const metricCards = [
    {
      title: 'AI Accuracy',
      value: '94.2%',
      change: '+2.1% from last month',
      icon: TrendingUp,
      positive: true
    },
    {
      title: 'Success Rate',
      value: '91.8%',
      change: '+1.3% improvement',
      icon: CheckCircle,
      positive: true
    },
    {
      title: 'AI Responses',
      value: '1,247',
      change: '+15% this week',
      icon: MessageSquare,
      positive: true
    },
    {
      title: 'Avg Response Time',
      value: '1.3s',
      change: '-0.2s faster',
      icon: Clock,
      positive: true
    }
  ];

  const teamMembers = [
    { name: 'Sarah J.', responses: 45, accuracy: 96, status: 'Active' },
    { name: 'Michael C.', responses: 41, accuracy: 93, status: 'Active' },
    { name: 'Alex T.', responses: 38, accuracy: 70, status: 'Inactive' },
    { name: 'Emily R.', responses: 28, accuracy: 91, status: 'Active' },
    { name: 'Lisa W.', responses: 17, accuracy: 88, status: 'Active' },
    { name: 'Sarah J.', responses: 16, accuracy: 92, status: 'Active' }
  ];

  // Register Chart.js components
  useEffect(() => {
    ChartJS.register(
      ArcElement,
      CategoryScale,
      LinearScale,
      PointElement,
      LineElement,
      BarElement,
      Tooltip,
      Legend,
      Filler
    );
  }, []);

  useEffect(() => {
    if (activeTab === 'ai-metrics') {
      // Doughnut Chart
      if (doughnutRef.current) {
        if (doughnutChartInstance.current) doughnutChartInstance.current.destroy();

        const ctx = doughnutRef.current.getContext('2d');
        if (ctx) {
          doughnutChartInstance.current = new ChartJS(ctx, {
            type: 'doughnut',
            data: {
              labels: ['Product Inquiries', 'Technical Support', 'Billing Questions', 'General Info'],
              datasets: [
                {
                  data: [40, 25, 20, 15],
                  backgroundColor: ['#60A5FA', '#A78BFA', '#34D399', '#F87171'],
                  borderWidth: 0
                }
              ]
            },
            options: {
              cutout: '70%',
              plugins: { legend: { display: false } }
            }
          });
        }
      }

      // Accuracy Line Chart
      if (accuracyLineRef.current) {
        if (accuracyChartInstance.current) accuracyChartInstance.current.destroy();

        const ctx = accuracyLineRef.current.getContext('2d');
        if (ctx) {
          accuracyChartInstance.current = new ChartJS(ctx, {
            type: 'line',
            data: {
              labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June'],
              datasets: [
                {
                  data: [50, 65, 70, 80, 75, 85],
                  fill: true,
                  backgroundColor: (context) => {
                    const chart = context.chart;
                    const { ctx, chartArea } = chart;
                    if (!chartArea) return 'rgba(0,0,0,0)';
                    const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
                    gradient.addColorStop(0, 'rgba(96, 165, 250, 0.5)');
                    gradient.addColorStop(0.5, 'rgba(251, 191, 36, 0.3)');
                    gradient.addColorStop(1, 'rgba(248, 113, 113, 0.2)');
                    return gradient;
                  },
                  borderColor: '#3B82F6',
                  borderWidth: 2,
                  tension: 0.4,
                  pointBackgroundColor: '#3B82F6',
                  pointRadius: 4,
                  pointHoverRadius: 6
                }
              ]
            },
            options: {
              responsive: true,
              maintainAspectRatio: false,
              plugins: { legend: { display: false } },
              scales: {
                y: {
                  min: 0,
                  max: 100,
                  ticks: { callback: (value) => `${value}%` },
                  grid: { color: '#E5E7EB' }
                },
                x: { grid: { display: false } }
              }
            }
          });
        }
      }
    }

    // Response Time Chart
    if (activeTab === 'response-times' && responseTimeRef.current) {
      if (responseTimeChartInstance.current) responseTimeChartInstance.current.destroy();

      const ctx = responseTimeRef.current.getContext('2d');
      if (ctx) {
        responseTimeChartInstance.current = new ChartJS(ctx, {
          type: 'line',
          data: {
            labels: ['Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
            datasets: [
              {
                data: [0, 1.0, 1.8, 2.3, 2.0, 2.0, 2.4],
                fill: true,
                backgroundColor: (context) => {
                  const chart = context.chart;
                  const { ctx, chartArea } = chart;
                  if (!chartArea) return 'rgba(0,0,0,0)';
                  const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
                  gradient.addColorStop(0, 'rgba(96, 165, 250, 0.5)');
                  gradient.addColorStop(0.5, 'rgba(251, 191, 36, 0.3)');
                  gradient.addColorStop(1, 'rgba(248, 113, 113, 0.2)');
                  return gradient;
                },
                borderColor: '#3B82F6',
                borderWidth: 2,
                tension: 0.4,
                pointBackgroundColor: '#3B82F6',
                pointRadius: 4,
                pointHoverRadius: 6
              }
            ]
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
                  callback: (value) => (Number(value)).toFixed(2)
                },
                grid: { color: '#E5E7EB' }
              },
              x: { grid: { display: false } }
            }
          }
        });
      }
    }

    // Email Volume Chart
    if (activeTab === 'email-volume' && emailVolumeRef.current) {
      if (emailVolumeChartInstance.current) emailVolumeChartInstance.current.destroy();

      const ctx = emailVolumeRef.current.getContext('2d');
      if (ctx) {
        emailVolumeChartInstance.current = new ChartJS(ctx, {
          type: 'bar',
          data: {
            labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
            datasets: [
              {
                label: 'Received',
                data: [230, 250, 220, 280],
                backgroundColor: '#3B82F6',
                barThickness: 40
              },
              {
                label: 'Replied',
                data: [195, 214, 190, 255],
                backgroundColor: '#10B981',
                barThickness: 40
              }
            ]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
              y: {
                beginAtZero: true,
                max: 300,
                grid: { color: '#E5E7EB' }
              },
              x: { grid: { display: false } }
            }
          }
        });
      }
    }

    // Cleanup
    return () => {
      doughnutChartInstance.current?.destroy();
      accuracyChartInstance.current?.destroy();
      responseTimeChartInstance.current?.destroy();
      emailVolumeChartInstance.current?.destroy();
    };
  }, [activeTab]);

  // ============ Render Functions (Unchanged) ============
  const renderAIMetrics = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Response Categories</h3>
          <p className="text-sm text-gray-500 mb-6">Distribution of response types</p>
          <div className="flex items-center justify-center mb-6">
            <div className="w-64 h-64">
              <canvas ref={doughnutRef}></canvas>
            </div>
          </div>
          <div className="space-y-3">
            {[
              { label: 'Product Inquiries 40%', color: 'bg-blue-400' },
              { label: 'Technical Support 25%', color: 'bg-purple-400' },
              { label: 'Billing Questions 20%', color: 'bg-green-400' },
              { label: 'General Info 15%', color: 'bg-red-400' }
            ].map((item, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full ${item.color}`}></div>
                <span className="text-sm text-gray-700">{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">AI Accuracy Over Time</h3>
          <p className="text-sm text-gray-500 mb-6">Monthly accuracy improvements</p>
          <div className="h-80">
            <canvas ref={accuracyLineRef}></canvas>
          </div>
        </div>
      </div>
    </div>
  );

  const renderResponseTimes = () => (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-2">Average Response Times</h3>
      <p className="text-sm text-gray-500 mb-6">Daily response time performance</p>
      <div className="h-96">
        <canvas ref={responseTimeRef}></canvas>
      </div>
    </div>
  );

  const renderEmailVolume = () => (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-2">Email Volume Trends</h3>
      <p className="text-sm text-gray-500 mb-6">Weekly email processing statistics</p>
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

  const renderTeamProductivity = () => (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-2">Team Productivity Comparison</h3>
      <p className="text-sm text-gray-500 mb-6">Individual performance metrics</p>
      <div className="space-y-4">
        {teamMembers.map((member, idx) => (
          <div key={idx} className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg">
            <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center text-gray-600 font-semibold">
              {member.name.charAt(0)}
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-gray-900">{member.name}</h4>
              <p className="text-sm text-gray-500">{member.responses} responses this week</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-700">{member.accuracy}% accuracy</p>
                <div className="w-48 h-2 bg-gray-200 rounded-full mt-1">
                  <div
                    className="h-full bg-gray-700 rounded-full"
                    style={{ width: `${member.accuracy}%` }}
                  ></div>
                </div>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium ${
                  member.status === 'Active'
                    ? 'bg-gray-900 text-white'
                    : 'bg-red-500 text-white'
                }`}
              >
                {member.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'ai-metrics':
        return renderAIMetrics();
      case 'response-times':
        return renderResponseTimes();
      case 'email-volume':
        return renderEmailVolume();
      case 'team-productivity':
        return renderTeamProductivity();
      default:
        return renderAIMetrics();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Analytics & Reports</h1>
            <p className="text-sm text-gray-600 mt-1">
              Monitor AI performance, response metrics, and team productivity
            </p>
          </div>
          <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center">
            <div className="w-3 h-3 bg-white rounded-full"></div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {metricCards.map((card, idx) => (
            <div key={idx} className="bg-white rounded-lg border border-gray-200 p-5">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-gray-600">{card.title}</span>
                <card.icon className="w-5 h-5 text-gray-400" />
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">{card.value}</div>
              <div
                className={`text-xs ${
                  card.positive ? 'text-green-600' : 'text-red-600'
                }`}
              >
                {card.change}
              </div>
            </div>
          ))}
        </div>

        <div className="flex gap-2 mb-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? 'bg-orange-500 text-white'
                  : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {renderContent()}
      </div>
    </div>
  );
};

export default Analytic;
