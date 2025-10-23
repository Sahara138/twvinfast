
import React from "react";
import ToggleSwitch from "../../Admin/AdminSettings/ToggleSwitch";
import type { SystemTabProps } from "../../../types/SuperAdmin/PlatformSettings";
import { VscDebugRestart } from "react-icons/vsc";
import { SiAmazonelasticache } from "react-icons/si";
import { TbFileExport } from "react-icons/tb";



const SystemTab: React.FC<SystemTabProps> = ({
  systemSettings,
  systemData,
  onSystemToggle,
  onSystemChange,
}) => {
  return (
    <div className="mx-auto">
      {/* System Configuration */}
      <div className="bg-white rounded-lg border border-gray-200 mt-6 px-8 pt-6 pb-[38px]">
        {/* Header */}
        <div className="pb-6">
          <h2 className="text-xl font-medium text-black">System Configuration</h2>
          <p className="text-base text-gray-700 font-normal mt-1">
            Manage platform infrastructure and system settings
          </p>
        </div>

        {/* Body */}
        <div className=" grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column - Dropdowns */}
          <div className="space-y-5 ">
            {/* Server Region */}
            <div>
              <label className="block text-lg font-normal text-black mb-3">
                Server Region
              </label>
              <div className="relative">
                <select
                  value={systemData.serverRegion}
                  onChange={(e) => onSystemChange("serverRegion", e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-4 py-2 text-base text-gray-700 focus:ring-2 focus:ring-primary focus:outline-none appearance-none"
                >
                  <option value="US East">US East</option>
                  <option value="US West">US West</option>
                  <option value="Europe">Europe</option>
                  <option value="Asia">Asia</option>
                </select>
                <svg
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>

            {/* Backup Frequency */}
            <div>
              <label className="block text-lg font-normal text-black mb-3">
                Database Backup Frequency
              </label>
              <div className="relative">
                <select
                  value={systemData.backupFrequency}
                  onChange={(e) => onSystemChange("backupFrequency", e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-4 py-2 text-base text-gray-700 focus:ring-2 focus:ring-primary focus:outline-none appearance-none"
                >
                  <option value="Daily">Daily</option>
                  <option value="Weekly">Weekly</option>
                  <option value="Monthly">Monthly</option>
                </select>
                <svg
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>

            {/* Log Retention */}
            <div>
              <label className="block text-lg font-normal text-black mb-3">
                Log Retention
              </label>
              <div className="relative">
                <select
                  value={systemData.logRetention}
                  onChange={(e) => onSystemChange("logRetention", e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-4 py-2 text-base text-gray-700 focus:ring-2 focus:ring-primary focus:outline-none appearance-none"
                >
                  <option value="30 Days">30 Days</option>
                  <option value="60 Days">60 Days</option>
                  <option value="90 Days">90 Days</option>
                  <option value="1 Year">1 Year</option>
                </select>
                <svg
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none"
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

          {/* Right Column - Toggles */}
          <div className="space-y-5 mt-4">
            {/* Maintenance Mode */}
            <div className="flex items-start justify-between pt-5">
              <div >
                <h3 className="text-lg font-medium text-black">Maintenance Mode</h3>
                <p className="text-sm text-gray-700 mt-1">
                  Enable maintenance mode for updates
                </p>
              </div>
              <ToggleSwitch
                checked={systemSettings.maintenanceMode}
                onChange={() => onSystemToggle("maintenanceMode")}
              />
            </div>

            {/* Auto Scaling */}
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-medium text-black">Auto Scaling</h3>
                <p className="text-sm text-gray-700">
                  Automatically scale resources based on load
                </p>
              </div>
              <ToggleSwitch
                checked={systemSettings.autoScaling}
                onChange={() => onSystemToggle("autoScaling")}
              />
            </div>

            {/* Error Reporting */}
            <div className="flex items-start justify-between pb-5">
              <div>
                <h3 className="text-lg font-medium text-black">Error Reporting</h3>
                <p className="text-sm text-gray-700 mt-1">
                  Send error reports to monitoring service
                </p>
              </div>
              <ToggleSwitch
                checked={systemSettings.errorReporting}
                onChange={() => onSystemToggle("errorReporting")}
              />
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-[#C4CDD5] mt-12"></div>

        {/* Payment Statistics */}
        <div className="mt-8">
          <h3 className="text-xl font-medium text-black mb-4">Payment Statistics</h3>
          <div className="flex flex-wrap gap-3">
            <button className="flex items-center gap-x-[10px] px-5 py-[6px] border border-[#C4CDD5] rounded-[8px] text-lg text-black hover:bg-gray-100">
              <VscDebugRestart size={24}/>
              Restart Services
            </button>
            <button className="flex items-center gap-x-[10px] px-5 py-[6px] border border-[#C4CDD5] rounded-[8px] text-lg text-black hover:bg-gray-100">
              <SiAmazonelasticache size={24} />
              Clear Cache
            </button>
            <button className="flex items-center gap-x-[10px] px-5 py-[6px] border border-[#C4CDD5] rounded-[8px] text-lg text-black hover:bg-gray-100">
              <TbFileExport size={24}/>
              Export Logs
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemTab;
