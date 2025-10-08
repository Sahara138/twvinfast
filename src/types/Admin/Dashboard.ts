export interface StatCard {
  label: string;
  value: string | number;
  change: string;
  icon: string;
}

export interface ResponseCategory {
  label: string;
  percentage: number;
  color: string;
}

export interface KnowledgeBaseItem {
  label: string;
  percentage: number;
}

export interface Activity {
  id: string;
  user: string;
  action: string;
  timestamp: string;
}
