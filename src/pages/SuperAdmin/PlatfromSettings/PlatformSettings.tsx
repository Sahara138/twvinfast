import { useState } from "react";
import WhiteLabelingTab from "../../../components/SuperAdmin/PlatformSettings/WhiteLabelingTab";
import ApiManagementTab from "../../../components/SuperAdmin/PlatformSettings/ApiManagementTab";
import type { APIKey, ComplianceData, ComplianceProps, ComplianceSettings, PlatformSecuritySettings, SystemData, SystemSettings } from "../../../types/SuperAdmin/PlatformSettings";
import SecurityTab from "../../../components/SuperAdmin/PlatformSettings/SecurityTab";
import ComplianceTab from "../../../components/SuperAdmin/PlatformSettings/ComplianceTab";
import SystemTab from "../../../components/SuperAdmin/PlatformSettings/SystemTab";
import GenerateApiModal from "../../../components/SuperAdmin/PlatformSettings/GenerateApiModal";


export default function PlatformSettings() {
  const [activeTab, setActiveTab] = useState<'White-labeling' | 'API Management' | 'Security' | 'Compliance' | 'System'>('White-labeling');
  const [whiteLabels, setWhiteLabels] = useState([])
    const [isModalOpen, setIsModalOpen] = useState(false);


  const [compliancedata, setComplianceData] = useState<ComplianceData>({
        privacyPolicyUrl: "http://platform.com/privacy",
        serviceUrl: "https://platform.com/terms",
        dataRetentionPeriod: "1 Year"
  })

  const [securitySettings, setSecuritySettings] = useState<PlatformSecuritySettings>({
      httpMode: true,
      ratelimiting: "1 hr",
      ipWhitelisting: true,
      ddoSProtection: false,
      firewallMode: false,
    });
    const handlePlatformSecurityToggle = (field: keyof PlatformSecuritySettings) => {
        setSecuritySettings((prev) => ({ ...prev, [field]: !prev[field] }));
      };

    const [complianceSettings, setComplianceSettings] = useState<ComplianceSettings>({
      gdprMode: true,
      cgpaMode: true,
      hipaaMode: false,
      soxMode: false,
    });

    const handleComplianceToggle = (field: keyof ComplianceSettings) => {
        setComplianceSettings((prev) => ({ ...prev, [field]: !prev[field] }));
      };

      const handleComplianceChange = (field: keyof ComplianceData, value: string) => {
          setComplianceData((prev) => ({ ...prev, [field]: value }));
        };
        const [systemSettings, setSystemSettings] = useState({
  maintenanceMode: true,
  autoScaling: true,
  errorReporting: true,
});

const [systemData, setSystemData] = useState({
  serverRegion: "US East",
  backupFrequency: "Daily",
  logRetention: "90 Days",
});

const handleSystemToggle = (field: keyof SystemSettings) => {
  setSystemSettings((prev) => ({ ...prev, [field]: !prev[field] }));
};

const handleSystemChange = (field: keyof SystemData, value: string) => {
  setSystemData((prev) => ({ ...prev, [field]: value }));
};

  
  
      const [apikeys] = useState<APIKey[]>([
  {
    id: 1,
    name: "Production Admin Key",
    apiKey: "pk_live***************",
    permissions: "Write",
    created: "2024-12-15",
    lastUsed: "2025-10-21",
    status: "Active",
  },
  {
    id: 2,
    name: "Development API Key",
    apiKey: "pk_live***************",
    permissions: "Read",
    created: "2025-01-20",
    lastUsed: "2025-10-19",
    status: "Active",
  },
  {
    id: 3,
    name: "Mobile App Key",
    apiKey: "pk_live***************",
    permissions: "Read", 
    created: "2025-03-05",
    lastUsed: "2025-09-28",
    status: "Inactive",
  },
  {
    id: 4,
    name: "Production API Key",
    apiKey: "pk_live***************",
    permissions: "Admin",
    created: "2025-02-14",
    lastUsed: "2025-05-30",
    status: "Revoked",
  },
  {
    id: 5,
    name: "Legacy Integration",
    apiKey: "pk_live***************",
    permissions: "Update",
    created: "2025-05-02",
    lastUsed: "2025-10-20",
    status: "Active",
  },
]);
  
  
  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Platform Settings</h1>
          <p className="text-gray-600">Manage your platform with complete administrative control</p>
        </div>
        {
          activeTab !== "White-labeling" && (
              <button
              onClick={() => setIsModalOpen(true)}
              className="px-[28px] py-[9px] bg-primary text-white rounded hover:bg-primary-dark transition text-xl font-medium"
            >
              Generate API Keys
            </button>
          )
        } 
      </div>
      <hr className="my-[28px] border-[#C4CDD5]" />
    
      {/* Tabs */}
      <div className="flex flex-wrap gap-3 mb-6">
        {["White-labeling", "API Management", "Security", "Compliance", "System"].map((tab) => (
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
      
        


      {/* White-labeling Tab */}
      {activeTab === 'White-labeling' && (
        <WhiteLabelingTab whiteLabels={whiteLabels} />
      )}

      {/* API Key Management Tab */}
      {activeTab === 'API Management' && (
        <ApiManagementTab apikeys={apikeys} />
          )}

      {/* Security Tab */}
      {activeTab === 'Security' && (
            <SecurityTab
            securitySettings ={securitySettings}
            onPlatformToggle={handlePlatformSecurityToggle}
              
            />
          )} 
      {/* Compliance Tab */}
      {activeTab === 'Compliance' && (
            <ComplianceTab
            complianceData={compliancedata}
            complianceSettings={complianceSettings}
            onComplianceChange={handleComplianceChange}
            onComplianceToggle={handleComplianceToggle}/>
          )}
      {/* Payment Tab */}
      {activeTab === 'System' && (
            <SystemTab
            systemData={systemData}
            systemSettings={systemSettings}
            onSystemChange={handleSystemChange}
            onSystemToggle={handleSystemToggle}/>
          )}
        <GenerateApiModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}  />

    </div>
  )
}
