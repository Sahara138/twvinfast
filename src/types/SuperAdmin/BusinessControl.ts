export interface Account {
  id: number;
  name: string;
  email: string;
  company: string;
  admin: string;
  users: number;
  datasets: number;
  inputs: number;
  datasize: number;
}
export interface Dataset {
  id: number;
  dataset: string;
  business: string;
  type: string;
  size: number;
  records: number;
  status: "Active" | "Inactive";
}
export interface AuditLog {
  id: number;
  company: string;
  email: string;
  action: string;
  admin: string;
  dataType: string;
  details: string;
  timestamp: string;
  status: "Under Review" | "Approved" | "Rejected";
}
