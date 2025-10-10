import { Edit2, Trash2 } from "lucide-react";
import ToggleSwitch from "./ToggleSwitch";
import Heading from "../Heading";
import type { PermissionsProps } from "../../../types/Admin/AdminSetting";

const PermissionsSection: React.FC<PermissionsProps> = ({
  roles,
  securitySettings,
  onSecurityToggle,
}) => (
  <div className="space-y-8">
    {/* Role-based Access Control */}
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <Heading
        heading1="Role-based Access Control"
        heading2="Manage user roles and permissions"
      />

      <div className=" space-y-6">
        {roles.map((role) => (
          <div
            key={role.id}
            className="border-b border-gray-200 last:border-b-0 pb-6 last:pb-0"
          >
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="text-base font-medium text-[#000000]">
                  {role.name}
                </h3>
                <p className="text-xs text-gray-500 mt-0.5">
                  {role.users} users assigned
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
                  <Edit2 size={14} />
                  Edit
                </button>
                <button className="p-1.5 text-gray-400 hover:text-red-600 transition-colors">
                  <Trash2 size={18} />
                </button>
              </div>
            </div>

            <div>
              <p className="text-[#000000] mb-2">Permissions</p>
              <div className="flex flex-wrap gap-2">
                {role.permissions.map((permission, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 text-xs font-medium text-gray-700 bg-gray-100 border border-gray-200 rounded-full"
                  >
                    {permission}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* Security Settings */}
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <Heading
        heading1="Security Settings"
        heading2="Configure security and access policies"
      />

      <div className="">
        <div className="space-y-5 mb-6">
          {[
            {
              key: "twoFactor" as const,
              label: "Two-Factor Authentication",
              description: "Require 2FA for all admin users",
            },
            {
              key: "sessionTimeout" as const,
              label: "Session Timeout",
              description: "Automatically log out inactive users",
            },
            {
              key: "ipWhitelist" as const,
              label: "IP Whitelist",
              description: "Restrict access to specific IP addresses",
            },
            {
              key: "auditLogging" as const,
              label: "Audit Logging",
              description: "Log all user actions and system events",
            },
          ].map(({ key, label, description }) => (
            <div key={key} className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-lg font-medium text-[#000000]">{label}</p>
                <p className="text-xs text-gray-500 mt-1">{description}</p>
              </div>
              <ToggleSwitch
                checked={!!securitySettings[key]}
                onChange={() => onSecurityToggle(key)}
              />
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-4 pt-5 border-t border-gray-200">
          <div className="flex flex-col">
            <label className="label">Session Time Out (minutes)</label>
            <select
              value={securitySettings.sessionTimeoutMinutes}
              className="border border-gray-300 rounded-md px-3 py-2 text-sm bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent appearance-none cursor-pointer"
            >
              <option value="1 hour">1 hour</option>
              <option value="30 minutes">30 minutes</option>
              <option value="2 hours">2 hours</option>
            </select>
          </div>
          <div className="flex flex-col">
            <label className="label">Password Policy</label>
            <select
              value={securitySettings.passwordPolicy}
              className="border border-gray-300 rounded-md px-3 py-2 text-sm bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent appearance-none cursor-pointer"
            >
              <option value="Strong (8+ chars, mixed case, numbers)">
                Strong (8+ chars, mixed case, numbers)
              </option>
              <option value="Medium (8+ chars)">Medium (8+ chars)</option>
              <option value="Complex (12+ chars, symbols)">
                Complex (12+ chars, symbols)
              </option>
            </select>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default PermissionsSection;
