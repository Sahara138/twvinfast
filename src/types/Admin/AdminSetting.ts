export interface BrandingData {
  companyName: string;
  website: string;
  tagline: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
}

 export interface ThemeSettings {
  showLogo: boolean;
  compactMode: boolean;
  showMetrics: boolean;
}

export interface BrandingProps {
  data: BrandingData;
  themeSettings: ThemeSettings;
  onBrandingChange: (field: keyof BrandingData, value: string) => void;
  onThemeToggle: (field: keyof ThemeSettings) => void;
  onSaveChanges?: () => void;
  onResetToDefault?: () => void;
}

export interface NotificationRule {
   id: number;
   name: string;
   description: string;
   trigger: string;
   action: string;
   enabled: boolean;
 }
 
export interface GlobalNotifications {
   email: boolean;
   push: boolean;
   slack: boolean;
   sms: boolean;
   adminEmail: string;
   slackWebhook: string;
 }
 
 export interface NotificationsProps {
   notificationRules: NotificationRule[];
   globalNotifications: GlobalNotifications;
   onRuleToggle: (id: number) => void;
   onGlobalToggle: (field: keyof GlobalNotifications) => void;
 }

 export interface Role {
  id: number;
  name: string;
  users: number;
  permissions: string[];
}

export interface SecuritySettings {
  twoFactor: boolean;
  sessionTimeout: boolean;
  ipWhitelist: boolean;
  auditLogging: boolean;
  sessionTimeoutMinutes: string;
  passwordPolicy: string;
}

export interface PermissionsProps {
  roles: Role[];
  securitySettings: SecuritySettings;
  onSecurityToggle: (field: keyof SecuritySettings) => void;
}