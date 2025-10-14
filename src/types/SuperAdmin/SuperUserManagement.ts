
export interface User {
  id: number;
  name: string;
  email: string;
  company: string;
  role: 'Admin' | 'User';
  status: 'Active' | 'Suspended';
  twoFa: boolean;
  lastLogin: string;
  location: string;
}

export interface LoginRecord {
  id: number;
  user: string;
  email: string;
  timestamp: string;
  location: string;
  ipAddress: string;
  status: 'Success' | 'Failed';
}

export interface LogDetails {
  timestamp: string;
  user: string;
  email: string;
  status: string;
  ipAddress: string;
  location: string;
  details: string;
}
