import React from "react";
import ToggleSwitch from "./ToggleSwitch";

interface Role {
  id: number;
  name: string;
  users: number;
  permissions: string[];
}

interface SecuritySettings {
  twoFactor: boolean;
  sessionTimeout: boolean;
  ipWhitelist: boolean;
  auditLogging: boolean;
  sessionTimeoutMinutes: string;
  passwordPolicy: string;
}

interface PermissionsSectionProps {
  roles: Role[];
  securitySettings: SecuritySettings;
  onSecurityToggle: (field: keyof SecuritySettings) => void;
}

const PermissionsSection: React.FC<PermissionsSectionProps> = ({
  roles,
  securitySettings,
  onSecurityToggle,
}) => (
  <div className="grid md:grid-cols-2 gap-6">
    {/* Roles */}
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">User Roles</h2>
      <ul className="space-y-3">
        {roles.map((role) => (
          <li key={role.id} className="border p-3 rounded-md hover:shadow-sm transition">
            <div className="flex justify-between items-center">
              <p className="font-medium text-gray-800">{role.name}</p>
              <span className="text-xs text-gray-500">{role.users} users</span>
            </div>
            <p className="text-xs text-gray-500 mt-1">{role.permissions.join(", ")}</p>
          </li>
        ))}
      </ul>
    </div>

    {/* Security */}
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Security Settings</h2>
      {(["twoFactor", "sessionTimeout", "ipWhitelist", "auditLogging"] as (keyof SecuritySettings)[]).map(
        (key) => (
          <div key={key} className="flex items-center justify-between py-2">
            <span className="capitalize text-sm text-gray-700">
              {key.replace(/([A-Z])/g, " $1")}
            </span>
            <ToggleSwitch checked={!!securitySettings[key]} onChange={() => onSecurityToggle(key)} />
          </div>
        )
      )}
    </div>
  </div>
);

export default PermissionsSection;
