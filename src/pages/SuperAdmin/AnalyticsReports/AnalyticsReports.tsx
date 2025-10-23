import { useState } from "react";
import OverviewTab from "../../../components/SuperAdmin/Analytics&Report/OverviewTab";
import RevenueGrowthTab from "../../../components/SuperAdmin/BillingManagement/component/RevenueGrowthChart";
import RevenueTab from "../../../components/SuperAdmin/Analytics&Report/RevenueReports";
import RevenueReports from "../../../components/SuperAdmin/Analytics&Report/RevenueReports";

export default function AnalyticsReports() {
  const [activeTab, setActiveTab] = useState<'Platform Overview' | 'AI Performance' | 'Revenue Reports' | 'Growth Analysis'>('Platform Overview');

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Analytics & Reports</h1>
          <p className="text-gray-600">Manage your platform with complete administrative control</p>
        </div>
      </div>
      {/* Tabs */}
      <div className="flex flex-wrap gap-3 mb-10 mt-[28px]">
        {["Platform Overview", "AI Performance", "Revenue Reports", "Compliance", "Growth Analysis"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab as any)}
            className={`px-5 py-2 rounded-lg font-medium transition-colors ${activeTab === tab
                ? "bg-primary text-white"
                : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
              }`}
          >
            {tab}
          </button>
        ))}
      </div>
      <hr className="my-[28px] border-[#C4CDD5] " />
    
      
        


      {/* White-labeling Tab */}
      {activeTab === 'Platform Overview' && (
        <OverviewTab />
      )}

      {/* API Key Management Tab */}
      {/* {activeTab === 'API Management' && (
        <ApiManagementTab apikeys={apikeys} />
          )} */}

      {/* Security Tab */}
      {activeTab === 'Revenue Reports' && (
            <RevenueReports
            />
          )} 
      {/* Compliance Tab */}
      {/* {activeTab === 'Compliance' && (
            <ComplianceTab
            complianceData={compliancedata}
            complianceSettings={complianceSettings}
            onComplianceChange={handleComplianceChange}
            onComplianceToggle={handleComplianceToggle}/>
          )} */}
      {/* Payment Tab */}
      {/* {activeTab === 'System' && (
            <SystemTab
            systemData={systemData}
            systemSettings={systemSettings}
            onSystemChange={handleSystemChange}
            onSystemToggle={handleSystemToggle}/>
          )} */}
    </div>
  )
}
