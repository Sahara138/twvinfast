import { Upload } from "lucide-react";
import ToggleSwitch from "./ToggleSwitch";
import Heading from "../Heading";
import type{ BrandingData, ThemeSettings,BrandingProps   } from '../../../types/Admin/AdminSetting';

const BrandingSection: React.FC<BrandingProps> = ({
  data,
  themeSettings,
  onBrandingChange,
  onThemeToggle,
  onSaveChanges,
  onResetToDefault,
}) => {
  const getFieldLabel = (key: string) => {
    const labels: Record<string, string> = {
      companyName: "Company Name",
      website: "Website",
      tagline: "Tagline",
      primaryColor: "Primary Colour",
      secondaryColor: "Secondary Colour",
      accentColor: "Accent Colour",
    };
    return labels[key] || key;
  };

  const getThemeSettingLabel = (key: string) => {
    const labels: Record<string, string> = {
      showLogo: "Show Company Logo in Sidebar",
      compactMode: "Compact Mode",
      showMetrics: "Show Performance Metrics",
    };
    return labels[key] || key;
  };

  const getThemeSettingDescription = (key: string) => {
    const descriptions: Record<string, string> = {
      showLogo: "Display your company logo in the navigation sidebar",
      compactMode: "Reduce spacing and padding for more content visibility",
      showMetrics: "Display real-time performance indicators in the header",
    };
    return descriptions[key] || "";
  };

  return (
    <div className="mx-auto ">
      {/* Brand Identity Section */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className=" pl-6 pt-6">
               <Heading heading1="Brand Identity" heading2="Customize your company's visual identity" />

        </div>

        <div className="px-6 pb-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left Column - Form Fields */}
            <div className="space-y-4">
              <div>
                <label className="label">
                  {getFieldLabel("companyName")}
                </label>
                <input
                  type="text"
                  value={data.companyName}
                  onChange={(e) => onBrandingChange("companyName", e.target.value)}
                  placeholder="TechFlow Solution"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>

              <div>
                <label className="label">
                  {getFieldLabel("website")}
                </label>
                <input
                  type="text"
                  value={data.website}
                  onChange={(e) => onBrandingChange("website", e.target.value)}
                  placeholder="http://techflow.com"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>

              <div>
                <label className="label">
                  {getFieldLabel("tagline")}
                </label>
                <input
                  type="text"
                  value={data.tagline}
                  onChange={(e) => onBrandingChange("tagline", e.target.value)}
                  placeholder="Powering Business with AI"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>

           
            </div>

            {/* Right Column - Logo Upload */}
            <div>
              <label className="label">
                Platform Logo
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 flex flex-col items-center justify-center h-[230px] bg-gray-50 hover:border-gray-400 transition-colors cursor-pointer">
                <Upload className="w-12 h-12 text-gray-400 mb-3" />
                <p className="text-sm text-gray-600 font-medium">Upload Your File</p>
              </div>
            </div>
          </div>
             {/* Color Inputs Row */}
              <div className="grid grid-cols-3 gap-4 gap-x-8 xl:gap-x-20 w-full mt-6">
                {["primaryColor", "secondaryColor", "accentColor"].map((colorKey) => (
                  <div className="" key={colorKey}>
                    <label className="label">
                      {getFieldLabel(colorKey)}
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={data[colorKey as keyof BrandingData]}
                        onChange={(e) => onBrandingChange(colorKey as keyof BrandingData, e.target.value)}
                        placeholder="#ED990B"
                        className="flex-1 border border-gray-300 rounded-md px-3 py-2 text-xs font-mono focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                      <input
                        type="color"
                        value={data[colorKey as keyof BrandingData]}
                        onChange={(e) => onBrandingChange(colorKey as keyof BrandingData, e.target.value)}
                        className="w-10 h-10 border border-gray-300 rounded cursor-pointer"
                      />
                    </div>
                  </div>
                ))}
              </div>

          {/* Action Buttons */}
          <div className="flex gap-3 mt-6 pt-6 border-t border-gray-200">
            <button
              onClick={onSaveChanges}
              className="px-5 py-2 bg-primary hover:bg-orange-400 text-white text-sm font-medium rounded-md transition-colors"
            >
              Save Changes
            </button>
            <button
              onClick={onResetToDefault}
              className="px-5 py-2 bg-orange-50 hover:bg-orange-100 text-orange-400 text-sm font-medium rounded-md transition-colors"
            >
              Reset to Default
            </button>
          </div>
        </div>
      </div>

      {/* Theme Settings Section */}
      <div className="bg-white rounded-lg border border-gray-200 mt-6">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Theme Settings</h2>
          <p className="text-sm text-gray-500 mt-1">Configure the visual appearance of your dashboard</p>
        </div>

        <div className="p-6">
          <div className="space-y-6">
            {Object.entries(themeSettings).map(([key, value]) => (
              <div key={key} className="flex items-start justify-between py-2">
                <div className="flex-1">
                  <h3 className="text-sm font-medium text-gray-900">
                    {getThemeSettingLabel(key)}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    {getThemeSettingDescription(key)}
                  </p>
                </div>
                <ToggleSwitch
                  checked={value}
                  onChange={() => onThemeToggle(key as keyof ThemeSettings)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrandingSection;
