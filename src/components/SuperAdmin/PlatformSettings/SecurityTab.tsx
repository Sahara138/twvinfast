import React, { useState } from "react";
import type { PlatformSecuritySettings, SecurityProps } from "../../../types/SuperAdmin/PlatformSettings";
import ToggleSwitch from "../../Admin/AdminSettings/ToggleSwitch";

const SecurityTab: React.FC<SecurityProps> = ({
  securitySettings,
  onPlatformToggle,
}) => {
  const [rateLimit, setRateLimit] = useState("1 hour");

  const getPlatformSettingLabel = (key: string) => {
    const labels: Record<string, string> = {
      httpMode: "Enforce HTTPS",
      ratelimiting: "Rate Limiting",
      ipWhitelisting: "IP Whitelisting",
      ddoSProtection: "DDoS Protection",
      firewallMode: "WAF (Web Application Firewall)",
    };
    return labels[key] || key;
  };

  const getPlatformSettingDescription = (key: string) => {
    const descriptions: Record<string, string> = {
      httpMode: "Redirect all HTTP traffic to HTTPS.",
      ratelimiting: "Limit API requests per user per minute.",
      ipWhitelisting: "Allow access only from specified IP ranges.",
      ddoSProtection: "Enable advanced DDoS protection.",
      firewallMode: "Filter malicious web traffic.",
    };
    return descriptions[key] || "";
  };

  return (
    <div className="mx-auto">
      <div className="bg-white rounded-lg border border-gray-200 mt-6">
        <div className="p-5">
          <h2 className="text-lg font-medium text-black">Security Settings</h2>
          <p className="text-sm text-gray-400 mt-1">
            Configure platform-wide security policies
          </p>
        </div>

        <div className="p-5 pt-0">
          <div className="space-y-5">
            {Object.entries(securitySettings).map(([key, value]) => (
              <div key={key} className="flex items-start justify-between py-2">
                <div className="flex-1">
                  <h3 className="text-sm font-medium text-black">
                    {getPlatformSettingLabel(key)}
                  </h3>
                  <p className="text-sm text-gray-400 mt-1">
                    {getPlatformSettingDescription(key)}
                  </p>
                </div>

                {key === "ratelimiting" ? (
                <div className="relative inline-block">

                  <select
                        value={rateLimit}
                        onChange={(e) => setRateLimit(e.target.value)}
                        className="w-[104px] pl-6 pr-2 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary bg-gray-200 text-black appearance-none"
                    >
                        <option value="100">100</option>
                        <option value="200">200</option>
                        <option value="400">400</option>
                        <option value="800">800</option>
                        <option value="1000">1000</option>
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
                ) : (
                  <ToggleSwitch
                    checked={value}
                    onChange={() => onPlatformToggle(key as keyof PlatformSecuritySettings)}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecurityTab;
