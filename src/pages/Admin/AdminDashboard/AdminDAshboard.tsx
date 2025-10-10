import { Users, MessageSquare, Clock, Shield } from 'lucide-react';
import { Doughnut } from 'react-chartjs-2';
import type {ResponseCategory, KnowledgeBaseItem, Activity } from '../../../types/Admin/Dashboard';
import Heading from '../../../components/Admin/Heading';

export default function AdminDashboard() {
  

    const responseCategories: ResponseCategory[] = [
        { label: 'Product Inquiries', percentage: 40, color: '#3B82F6' },
        { label: 'Technical Support', percentage: 25, color: '#8B5CF6' },
        { label: 'Billing Questions', percentage: 20, color: '#10B981' },
        { label: 'General Info', percentage: 15, color: '#EF4444' }
    ];

    const knowledgeBase: KnowledgeBaseItem[] = [
        { label: 'Product Documentation', percentage: 85 },
        { label: 'FAQ Coverage', percentage: 92 },
        { label: 'Policy Documents', percentage: 78 },
        { label: 'Training Scripts', percentage: 67 }
    ];

    const recentActivities: Activity[] = [
        { id: '1', user: 'Sarah Johnson', action: 'Uploaded new FAQ document', timestamp: '3 hours ago' },
        { id: '2', user: 'Alex Thompson', action: 'Added new user: Lisa Wang', timestamp: '5 hours ago' },
        { id: '3', user: 'Michael Chen', action: 'approved 3 AI response suggestions', timestamp: '7 hours ago' },
        { id: '4', user: 'Lisa Wang', action: 'Logged in to dashboard', timestamp: '8 hours ago' },
        { id: '5', user: 'Alex Thompson', action: 'Added new user: Lisa Wang', timestamp: '10 hours ago' }
    ];

    const chartData = {
        labels: responseCategories.map(cat => cat.label),
        datasets: [
            {
                data: responseCategories.map(cat => cat.percentage),
                backgroundColor: responseCategories.map(cat => cat.color),
                borderWidth: 0,
                cutout: '70%'
            }
        ]
    };

    const chartOptions = {
        plugins: {
            legend: {
                display: false
            },
            tooltip: {
                callbacks: {
                    label: function (context: any) {
                        return `${context.label}: ${context.parsed}%`;
                    }
                }
            }
        },
        maintainAspectRatio: false
    };


    return (
        <div className="min-h-screen ">
           
           

            {/* Main Content */}
            <main className=" main-container">
                {/* Title Section */}
                <Heading heading1="Global Overview" heading2="Manage your platform with complete administrative control"/>
              

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">

                    <div className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-sm text-gray-600 font-medium">Total Users</span>
                            <Users className="text-gray-400 w-5 h-5" />
                        </div>
                        <div className="mb-2">
                            <span className="text-3xl font-bold text-[#2F80ED]">25</span>
                        </div>
                        <div className="text-xs text-gray-500">+3 from last month</div>
                    </div>


                    <div className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-sm text-gray-600 font-medium">Admin Count</span>
                            <Shield className="text-gray-400 w-5 h-5" />
                        </div>
                        <div className="mb-2">
                            <span className="text-3xl font-bold text-[#FF9484]">5</span>
                        </div>
                        <div className="text-xs text-gray-500">+1 from last month</div>
                    </div>


                    <div className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-sm text-gray-600 font-medium">AI Responses</span>
                            <MessageSquare className="text-gray-400 w-5 h-5" />
                        </div>
                        <div className="mb-2">
                            <span className="text-3xl font-bold text-[#3BAE5A]">1,247</span>
                        </div>
                        <div className="text-xs text-gray-500">+91% this week</div>
                    </div>


                    <div className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-sm text-gray-600 font-medium">Avg Response Time</span>
                            <Clock className="text-gray-400 w-5 h-5" />
                        </div>
                        <div className="mb-2">
                            <span className="text-3xl font-bold text-[#FFBB33]">1.3s</span>
                        </div>
                        <div className="text-xs text-gray-500">-0.2s faster</div>
                    </div>
                </div>

                {/* Charts and Lists Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                    {/* Response Categories - Donut Chart */}
                    <div className="bg-white rounded-xl p-6 border border-gray-200">
                        <h3 className="text-2xl font-medium text-gray-900 mb-1">Response Categories</h3>
                        <p className="text-sm text-gray-500 mb-6">Distribution of response types</p>

                        <div className="flex flex-col px-4 gap-8">
                            <div className="w-56 h-56 ml-0 justify-center lg:ml-6 relative">
                                <Doughnut data={chartData} options={chartOptions} />
                            </div>

                            <div className="flex-1 space-y-3">
                                {responseCategories.map((category, index) => (
                                    <div key={index} className="flex items-center gap-3">
                                        <div
                                            className="w-5 h-5 rounded-full"
                                            style={{ backgroundColor: category.color }}
                                        ></div>
                                        <span className="text-sm text-gray-600 flex gap-x-3">{category.label}</span>
                                        <span className="text-sm font-semibold text-gray500">{category.percentage}%</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Knowledge Base Status */}
                    <div className="bg-white rounded-xl p-6 border border-gray-200">
                        <h3 className="text-2xl font-medium text-gray-900 mb-1">Knowledge Base Status</h3>
                        <p className="text-sm text-gray-500 mb-6">Training progress and document coverage</p>

                        <div className="space-y-6">
                            {knowledgeBase.map((item, index) => (
                                <div key={index}>
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-sm font-medium text-gray-700">{item.label}</span>
                                        <span className="text-sm font-semibold text-gray-600">{item.percentage}%</span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                                        <div
                                            className="bg-gray-600 h-full rounded-full transition-all duration-500"
                                            style={{ width: `${item.percentage}%` }}
                                        ></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-white rounded-xl p-6 border border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900 mb-6">Recent Activity</h3>

                    <div className="space-y-4">
                        {recentActivities.map((activity) => (
                            <div
                                key={activity.id}
                                className="flex items-center gap-4 p-4 bg-[#F9FAFB] rounded-lg hover:bg-[#FDF5E7] transition-colors"
                            >
                                <div className="w-2 h-2 bg-gray-400 rounded-full flex-shrink-0"></div>
                                <div className="flex-1">
                                    <p className="text-sm text-gray-900">
                                        <span className="font-semibold">{activity.user}</span> {activity.action}
                                    </p>
                                </div>
                                <span className="text-xs text-gray-500 whitespace-nowrap">{activity.timestamp}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
}
