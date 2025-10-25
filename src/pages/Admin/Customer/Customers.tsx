import { useState } from "react";
import { Bell, Mail, Users } from "lucide-react";
import CustomerSection from "../../../components/Admin/Customer/CustomerSection";
import EmailThreadsSection from "../../../components/Admin/Customer/EmailThreadsSection";
import PipeLineSection from "../../../components/Admin/Customer/PipeLineSection";
import Heading from "../../../components/Admin/Heading";

const Customers = () => {
  const [activeTab, setActiveTab] = useState("customers");

  const tabs = [
    {
      id: "customers",
      label: "Customers",
      icon: <Users className="w-5 h-5" />,
    },
    {
      id: "emailThreads",
      label: "Email Threads",
      icon: <Mail className="w-5 h-5" />,
    },
    {
      id: "leadPipeline",
      label: "Lead Pipeline",
      icon: <Bell className="w-5 h-5" />,
    },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "customers":
        return <CustomerSection />;
      case "emailThreads":
        return <EmailThreadsSection />;
      case "leadPipeline":
        return <PipeLineSection />;
      default:
        return <CustomerSection />;
    }
  };

  return (
    <div className="min-h-screen main-container overflow-hidden">
      <div className="flex items-start justify-between mb-6">
        <Heading
          heading1="Customer Management"
          heading2="Manage customer relationships, email threads, and lead pipeline"
        />
      </div>

      <div className="border-b my-8 border-[#C4CDD5]" />
      <div className="md:flex  space-x-4 my-10">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center space-x-2 mb-3 md:mb-0 px-4 py-2 rounded ${
              activeTab === tab.id
                ? "text-gray-900 bg-[#ED990B] rounded-lg"
                : "text-gray-600 hover:text-gray-900 border-[#DFE3E8] hover:bg-gray-100 rounded-lg border"
            }`}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>
      <div className="mt-4">{renderContent()}</div>
    </div>
  );
};

export default Customers;
