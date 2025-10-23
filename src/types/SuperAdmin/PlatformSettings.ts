export interface APIKey {
  id: number;
  name: string;
  apiKey: string;
  permissions: string;
  created: string;
  lastUsed: string;
  status: string;
}
export interface PlatformSecuritySettings {
  httpMode: boolean;
  ratelimiting: string;
  ipWhitelisting: boolean;
  ddoSProtection: boolean;
  firewallMode: boolean;
}
export interface SecurityProps {
  securitySettings: PlatformSecuritySettings;
  onPlatformToggle: (field: keyof PlatformSecuritySettings) => void;
}

export interface ComplianceData {
  privacyPolicyUrl: string;
  serviceUrl: string;
  dataRetentionPeriod: string;
}
export interface ComplianceSettings {
  gdprMode: boolean;
  cgpaMode: boolean;
  hipaaMode: boolean;
  soxMode: boolean;
}
export interface ComplianceProps {
  complianceData: ComplianceData;
  complianceSettings: ComplianceSettings;
  onComplianceChange: (field: keyof ComplianceData, value: string) => void;
  onComplianceToggle: (field: keyof ComplianceSettings) => void;
}

export interface SystemSettings {
  maintenanceMode: boolean;
  autoScaling: boolean;
  errorReporting: boolean;
}

export interface SystemData {
  serverRegion: string;
  backupFrequency: string;
  logRetention: string;
}

export interface SystemTabProps {
  systemSettings: SystemSettings;
  systemData: SystemData;
  onSystemToggle: (field: keyof SystemSettings) => void;
  onSystemChange: (field: keyof SystemData, value: string) => void;
}
