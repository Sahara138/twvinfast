import React from "react";
import ToggleSwitch from "./ToggleSwitch";

interface BrandingData {
  companyName: string;
  website: string;
  tagline: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
}

interface ThemeSettings {
  showLogo: boolean;
  compactMode: boolean;
  showMetrics: boolean;
}

interface BrandingSectionProps {
  brandingData: BrandingData;
  themeSettings: ThemeSettings;
  onBrandingChange: (field: keyof BrandingData, value: string) => void;
  onThemeToggle: (field: keyof ThemeSettings) => void;
}

const BrandingSection: React.FC<BrandingSectionProps> = ({
  brandingData,
  themeSettings,
  onBrandingChange,
  onThemeToggle,
}) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Company Branding</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Object.entries(brandingData).map(([key, value]) => (
          <div key={key} className="flex flex-col">
            <label className="text-sm font-medium text-gray-600 mb-1 capitalize">{key}</label>
            <input
              type="text"
              value={value}
              onChange={(e) => onBrandingChange(key as keyof BrandingData, e.target.value)}
              className="border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        ))}
      </div>

      <div className="mt-6 flex items-center gap-4">
        {Object.entries(themeSettings).map(([key, val]) => (
          <div key={key} className="flex items-center gap-2">
            <ToggleSwitch checked={val} onChange={() => onThemeToggle(key as keyof ThemeSettings)} />
            <span className="text-sm text-gray-700 capitalize">{key.replace(/([A-Z])/g, " $1")}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BrandingSection;
