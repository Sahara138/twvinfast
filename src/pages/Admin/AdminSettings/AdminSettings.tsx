import React, { useState } from "react";
import Heading from "../../../components/Admin/Heading";
import PermissionsSection from "../../../components/Admin/AdminSettings/PermissionsSection";
import NotificationsSection from "../../../components/Admin/AdminSettings/NotificationsSection";
import BrandingSection from "../../../components/Admin/AdminSettings/BrandingSection";
import type {
  BrandingData,
  ThemeSettings,
  NotificationRule,
  GlobalNotifications,
  Role,
  SecuritySettings,
} from "../../../types/Admin/AdminSetting";

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

  const [notificationRules, setNotificationRules] = useState<
    NotificationRule[]
  >([
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

  const [globalNotifications, setGlobalNotifications] =
    useState<GlobalNotifications>({
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
      permissions: [
        "Full Access",
        "User Management",
        "AI Training",
        "Analytics",
        "Settings",
      ],
    },
    {
      id: 2,
      name: "Manager",
      users: 5,
      permissions: [
        "Customer Management",
        "AI Suggestions",
        "Analytics",
        "Reports",
      ],
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

  // Handlers
  const handleBrandingChange = (field: keyof BrandingData, value: string) => {
    setBrandingData((prev) => ({ ...prev, [field]: value }));
  };

  const handleThemeToggle = (field: keyof ThemeSettings) => {
    setThemeSettings((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleNotificationToggle = (id: number) => {
    setNotificationRules((prev) =>
      prev.map((rule) =>
        rule.id === id ? { ...rule, enabled: !rule.enabled } : rule
      )
    );
  };

  const handleGlobalNotificationToggle = (field: keyof GlobalNotifications) => {
    setGlobalNotifications((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleSecurityToggle = (field: keyof SecuritySettings) => {
    setSecuritySettings((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  // Tabs Configuration
  const tabs = [
    { id: "branding", label: "Branding" },
    { id: "notifications", label: "Notifications" },
    { id: "permissions", label: "Permissions" },
  ];

  // Render Content Based on Active Tab
  const renderContent = () => {
    switch (activeTab) {
      case "branding":
        return (
          <BrandingSection
            data={brandingData}
            themeSettings={themeSettings}
            onBrandingChange={handleBrandingChange}
            onThemeToggle={handleThemeToggle}
          />
        );
      case "notifications":
        return (
          <NotificationsSection
            notificationRules={notificationRules}
            globalNotifications={globalNotifications}
            onRuleToggle={handleNotificationToggle}
            onGlobalToggle={handleGlobalNotificationToggle}
          />
        );
      case "permissions":
        return (
          <PermissionsSection
            roles={roles}
            securitySettings={securitySettings}
            onSecurityToggle={handleSecurityToggle}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="main-container">
        <div className="mb-6">
          <Heading
            heading1="Admin Settings"
            heading2="Configure system settings, branding, notifications, and access permissions"
          />
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 border-b border-gray-200">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-3 text-sm font-medium transition-colors border-b-2 ${
                activeTab === tab.id
                  ? "text-orange-600 border-orange-600"
                  : "text-gray-600 border-transparent hover:text-gray-800"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        {renderContent()}
      </div>
    </div>
  );
};

export default AdminSettings;
