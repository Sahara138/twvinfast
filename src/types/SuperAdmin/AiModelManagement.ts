export interface AIModel {
  id: number;
  name: string;
  provider: string;
  usage: number;
  uptime: number;
  enabled: boolean;
  requestCount: number;
  avgResponse: number;
}

export interface SystemPrompt {
  id: number;
  name: string;
  description: string;
  content: string;
  applicableModels: string[];
  enabled: boolean;
}

export interface ForbiddenWord {
  id: number;
  word: string;
}