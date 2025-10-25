import { useState} from "react";
import { TrendingUp, CheckCircle, MessageSquare, Clock } from "lucide-react";

import AIMetrics from "../../../components/Admin/Analytics/AIMetrics";
import ResponseTimes from "../../../components/Admin/Analytics/ResponseTimes";
import EmailVolume from "../../../components/Admin/Analytics/EmailVolume";
import TeamProductivity from "../../../components/Admin/Analytics/TeamProductivity";
import Heading from "../../../components/Admin/Heading";
const Analytic = () => {
  const [activeTab, setActiveTab] = useState<
    "ai-metrics" | "response-times" | "email-volume" | "team-productivity"
  >("ai-metrics");
  const tabs = [
    { id: "ai-metrics", label: "AI Metrics" },
    { id: "response-times", label: "Response Times" },
    { id: "email-volume", label: "Email Volume" },
    { id: "team-productivity", label: "Team Productivity" },
  ];

  const metricCards = [
    {
      title: "AI Accuracy",
      value: "94.2%",
      change: "+2.1% from last month",
      icon: TrendingUp,
      positive: true,
    },
    {
      title: "Success Rate",
      value: "91.8%",
      change: "+1.3% improvement",
      icon: CheckCircle,
      positive: true,
    },
    {
      title: "AI Responses",
      value: "1,247",
      change: "+15% this week",
      icon: MessageSquare,
      positive: true,
    },
    {
      title: "Avg Response Time",
      value: "1.3s",
      change: "-0.2s faster",
      icon: Clock,
      positive: true,
    },
  ];


 
  
  const renderContent = () => {
    switch (activeTab) {
      case "ai-metrics":
        return <AIMetrics />;
      case "response-times":
        return <ResponseTimes />;
      case "email-volume":
        return <EmailVolume />;
      case "team-productivity":
        return <TeamProductivity />;
      default:
        return <AIMetrics />;
    }
  };

  return (
    <div className="min-h-screen ">
      <div className="main-container">
        <div className="flex items-center justify-between mb-6">
          <Heading
            heading1="Analytics & Reports"
            heading2="Monitor AI performance, response metrics, and team productivity"
          />
         
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 w-[99%] md:w-[100%] gap-4 mb-6 mr-4 md:mr-0">
          {metricCards.map((card, idx) => (
            <div
              key={idx}
              className="bg-white rounded-lg border border-gray-200 p-5"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-gray-600">{card.title}</span>
                <card.icon className="w-5 h-5 text-gray-400" />
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">
                {card.value}
              </div>
              <div
                className={`text-xs ${
                  card.positive ? "text-green-600" : "text-red-600"
                }`}
              >
                {card.change}
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? "bg-primary text-white"
                  : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50"
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
