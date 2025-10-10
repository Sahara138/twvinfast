export interface Integration {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  status: "connected" | "not-connected";
  lastSync?: string;
  autoSync: boolean;
  syncedCalendars?: string[];
  showConfigure?: boolean;
}