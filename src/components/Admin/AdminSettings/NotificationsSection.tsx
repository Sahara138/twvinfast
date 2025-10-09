import React from "react";
import ToggleSwitch from "./ToggleSwitch";

interface NotificationRule {
  id: number;
  name: string;
  description: string;
  trigger: string;
  action: string;
  enabled: boolean;
}

interface GlobalNotifications {
  email: boolean;
  push: boolean;
  slack: boolean;
  sms: boolean;
  adminEmail: string;
  slackWebhook: string;
}

interface NotificationsSectionProps {
  notificationRules: NotificationRule[];
  globalNotifications: GlobalNotifications;
  onRuleToggle: (id: number) => void;
  onGlobalToggle: (field: keyof GlobalNotifications) => void;
}

const NotificationsSection: React.FC<NotificationsSectionProps> = ({
  notificationRules,
  globalNotifications,
  onRuleToggle,
  onGlobalToggle,
}) => (
  <div className="grid md:grid-cols-2 gap-6">
    {/* Notification Rules */}
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Notification Rules</h2>
      {notificationRules.map((rule) => (
        <div key={rule.id} className="border-b py-3 flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold text-gray-800">{rule.name}</p>
            <p className="text-xs text-gray-500">{rule.description}</p>
          </div>
          <ToggleSwitch checked={rule.enabled} onChange={() => onRuleToggle(rule.id)} />
        </div>
      ))}
    </div>

    {/* Global Notifications */}
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Global Notification Settings</h2>
      {(["email", "push", "slack", "sms"] as (keyof GlobalNotifications)[]).map((key) => (
        <div key={key} className="flex items-center justify-between py-2">
          <span className="capitalize text-sm text-gray-700">{key}</span>
          <ToggleSwitch checked={!!globalNotifications[key]} onChange={() => onGlobalToggle(key)} />
        </div>
      ))}
    </div>
  </div>
);

export default NotificationsSection;
