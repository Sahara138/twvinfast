"use client";
import React, { useState } from "react";


// -------------------- Interfaces --------------------

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

// -------------------- Main Component --------------------

const AdminSettings: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("branding");

  const [brandingData, setBrandingData] = useState<BrandingData>({
    companyName: "TechFlow Solution",
    website: "http://techflow.com",
    tagline: "Powering Business with AI",
    primaryColor: "#ED9908",
    secondaryColor: "#000000",
    accentColor: "#C4CDDS",
  });

  const [themeSettings, setThemeSettings] = useState<ThemeSettings>({
    showLogo: true,
    compactMode: true,
    showMetrics: false,
  });

  const [notificationRules, setNotificationRules] = useState<NotificationRule[]>([
    {
      id: 1,
      name: "Urgent Email Alert",
      description: "Send alert when high-priority emails are received",
      trigger: "High priority email",
      action: "Slack notification + Email",
      enabled: true,
    },
    {
      id: 2,
      name: "AI Accuracy Drop",
      description: "Alert when AI Accuracy drops below 90%",
      trigger: "Accuracy < 90%",
      action: "Email to admin",
      enabled: true,
    },
    {
      id: 3,
      name: "Response Time Alert",
      description: "Alert when response time exceeds 5 seconds",
      trigger: "Response time > 5s",
      action: "Dashboard notification",
      enabled: false,
    },
    {
      id: 4,
      name: "Weekly Report",
      description: "Send weekly performance summary",
      trigger: "Every Monday 9am",
      action: "Email report",
      enabled: true,
    },
  ]);

  const [globalNotifications, setGlobalNotifications] = useState<GlobalNotifications>({
    email: true,
    push: true,
    slack: false,
    sms: false,
    adminEmail: "admin@techflow.com",
    slackWebhook: "www.slack.com",
  });

  const [roles] = useState<Role[]>([
    {
      id: 1,
      name: "Admin",
      users: 3,
      permissions: ["Full Access", "User Management", "AI Training", "Analytics", "Settings"],
    },
    {
      id: 2,
      name: "Manager",
      users: 5,
      permissions: ["Customer Management", "AI Suggestions", "Analytics", "Reports"],
    },
    {
      id: 3,
      name: "Agent",
      users: 3,
      permissions: ["Customer View", "Email Responses", "Basic Analytics"],
    },
  ]);

  const [securitySettings, setSecuritySettings] = useState<SecuritySettings>({
    twoFactor: true,
    sessionTimeout: true,
    ipWhitelist: false,
    auditLogging: false,
    sessionTimeoutMinutes: "1 hour",
    passwordPolicy: "Strong (8+ chars, mixed case, numbers)",
  });

  // -------------------- Reusable UI --------------------

  const ToggleSwitch: React.FC<{ checked: boolean; onChange: () => void }> = ({
    checked,
    onChange,
  }) => (
    <button
      onClick={onChange}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
        checked ? "bg-primary" : "bg-gray-300"
      }`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
          checked ? "translate-x-6" : "translate-x-1"
        }`}
      />
    </button>
  );

  // -------------------- Handlers --------------------

  const handleBrandingChange = (field: keyof BrandingData, value: string) => {
    setBrandingData((prev) => ({ ...prev, [field]: value }));
  };

  const handleThemeToggle = (field: keyof ThemeSettings) => {
    setThemeSettings((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleNotificationToggle = (id: number) => {
    setNotificationRules((prev) =>
      prev.map((rule) => (rule.id === id ? { ...rule, enabled: !rule.enabled } : rule))
    );
  };

  const handleGlobalNotificationToggle = (field: keyof GlobalNotifications) => {
    setGlobalNotifications((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleSecurityToggle = (field: keyof SecuritySettings) => {
    setSecuritySettings((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  // -------------------- Tabs --------------------

  const tabs = [
    { id: "branding", label: "Branding" },
    { id: "notifications", label: "Notifications" },
    { id: "permissions", label: "Permissions" },
  ];

  // -------------------- Branding Section --------------------

  const renderBranding = () => (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Company Branding</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Object.entries(brandingData).map(([key, value]) => (
          <div key={key} className="flex flex-col">
            <label className="text-sm font-medium text-gray-600 mb-1 capitalize">{key}</label>
            <input
              type="text"
              value={value}
              onChange={(e) => handleBrandingChange(key as keyof BrandingData, e.target.value)}
              className="border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        ))}
      </div>

      <div className="mt-6 flex items-center gap-4">
        {Object.entries(themeSettings).map(([key, val]) => (
          <div key={key} className="flex items-center gap-2">
            <ToggleSwitch checked={val} onChange={() => handleThemeToggle(key as keyof ThemeSettings)} />
            <span className="text-sm text-gray-700 capitalize">{key.replace(/([A-Z])/g, " $1")}</span>
          </div>
        ))}
      </div>
    </div>
  );

  // -------------------- Notifications Section --------------------

  const renderNotifications = () => (
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
            <ToggleSwitch checked={rule.enabled} onChange={() => handleNotificationToggle(rule.id)} />
          </div>
        ))}
      </div>

      {/* Global Notifications */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Global Notification Settings</h2>
        {(["email", "push", "slack", "sms"] as (keyof GlobalNotifications)[]).map((key) => (
          <div key={key} className="flex items-center justify-between py-2">
            <span className="capitalize text-sm text-gray-700">{key}</span>
            <ToggleSwitch checked={!!globalNotifications[key]} onChange={() => handleGlobalNotificationToggle(key)} />
          </div>
        ))}
      </div>
    </div>
  );

  // -------------------- Permissions Section --------------------

  const renderPermissions = () => (
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
        {(["twoFactor", "sessionTimeout", "ipWhitelist", "auditLogging"] as (keyof SecuritySettings)[]).map((key) => (
          <div key={key} className="flex items-center justify-between py-2">
            <span className="capitalize text-sm text-gray-700">{key.replace(/([A-Z])/g, " $1")}</span>
            <ToggleSwitch checked={!!securitySettings[key]} onChange={() => handleSecurityToggle(key)} />
          </div>
        ))}
      </div>
    </div>
  );

  // -------------------- Render --------------------

  const renderContent = () => {
    switch (activeTab) {
      case "branding":
        return renderBranding();
      case "notifications":
        return renderNotifications();
      case "permissions":
        return renderPermissions();
      default:
        return renderBranding();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Admin Settings</h1>
            <p className="text-sm text-gray-600 mt-1">
              Configure system settings, branding, notifications, and access permissions
            </p>
          </div>
      
        </div>

        <div className="flex gap-2 mb-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? "bg-primary text-white"
                  : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {renderContent()}
      </div>
    </div>
  );
};

export default AdminSettings;
