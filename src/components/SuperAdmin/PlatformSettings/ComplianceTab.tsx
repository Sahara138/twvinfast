import React from "react";
import ToggleSwitch from "../../Admin/AdminSettings/ToggleSwitch";
import type { ComplianceProps, ComplianceSettings } from "../../../types/SuperAdmin/PlatformSettings";

const ComplianceTab: React.FC<ComplianceProps> = ({
  complianceData,
  complianceSettings,
  onComplianceToggle,
  onComplianceChange,
}) => {

  const getFieldLabel = (key: string) => {
    const labels: Record<string, string> = {
      privacyPolicyUrl: "Privacy Policy URL",
      serviceUrl: "Terms of service URL",
      dataRetentionPeriod: "Data Retention Period"
    };
    return labels[key] || key;
  };
  const getComplianceSettingLabel = (key: string) => {
    const labels: Record<string, string> = {
      gdprMode: "GDPR Compliance",
      cgpaMode: "CCPA Compliance",
      hipaaMode: "HIPAA Compliance",
      soxMode: "SOX Compliance",
    };
    return labels[key] || key;
  };

  const getComplianceSettingDescription = (key: string) => {
    const descriptions: Record<string, string> = {
      gdprMode: "European data protection regulation compliance",
      cgpaMode: "California Consumer Privacy Act compliance HIPAA Compliance",
      hipaaMode: "Healthcare data protection compliance",
      soxMode: "Sarbanes-Oxley financial compliance",
    };
    return descriptions[key] || "";
  };

  return (
    <div className="mx-auto">
      <div className="bg-white rounded-lg border border-gray-200 mt-6">
        <div className="p-5">
          <h2 className="text-lg font-medium text-black">Compliance & Privacy</h2>
          <p className="text-sm text-gray-400 mt-1">
            Manage regulatory compliance and privacy settings
          </p>
        </div>

        <div className="p-5 pt-0">
          <div className="space-y-5">
            {Object.entries(complianceSettings).map(([key, value]) => (
              <div key={key} className="flex items-start justify-between py-2">
                <div className="flex-1">
                  <h3 className="text-sm font-medium text-black">
                    {getComplianceSettingLabel(key)}
                  </h3>
                  <p className="text-sm text-gray-400 mt-1">
                    {getComplianceSettingDescription(key)}
                  </p>
                </div>
                  <ToggleSwitch
                    checked={value}
                    onChange={() => onComplianceToggle(key as keyof ComplianceSettings)}
                  />

              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Brand Identity Section */}
      <div className="bg-white rounded-lg border border-gray-200 mt-12">
        <div className="px-8 pb-9 pt-5">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left Column - Form Fields */}
            <div className="space-y-4">
              <div>
                <label className="label text-[18px] font-normal">
                  {getFieldLabel("privacyPolicyUrl")}
                </label>
                <input
                  type="text"
                  value={complianceData.privacyPolicyUrl}
                  onChange={(e) => onComplianceChange("privacyPolicyUrl", e.target.value)}
                  placeholder="http://platform.com/privacy"
                  className="w-full border border-gray-300 rounded-md px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-[#919EAB] text-[16px] font-normal"
                />
              </div>

              <div>
                <label className="label text-[18px] font-normal">
                  {getFieldLabel("serviceUrl")}
                </label>
                <input
                  type="text"
                  value={complianceData.serviceUrl}
                  onChange={(e) => onComplianceChange("serviceUrl", e.target.value)}
                  placeholder="https://platform.com/terms"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-[#919EAB] text-[16px] font-normal"
                />
              </div>

              <div>
                <label className="label text-[18px] font-normal">
                  {getFieldLabel("dataRetentionPeriod")}
                </label>
                <div className="relative block">
                  <select
                        value={complianceData.dataRetentionPeriod}
                        onChange={(e) => onComplianceChange("dataRetentionPeriod", e.target.value)}
                        className="w-full pl-6 pr-2 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary text-[#919EAB] appearance-none"
                    >
                        <option value="3 months">3 months</option>
                        <option value="6 months">6 months</option>
                        <option value="8 months">8 months</option>
                        <option value="1 year">1 year</option>
                        <option value="1.5 year">1.5 year</option>
                    </select>
                  <svg
                        className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComplianceTab;
