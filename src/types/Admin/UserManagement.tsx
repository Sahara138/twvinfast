export interface TeamMember {
  id: string;
  full_name: string;
  email: string;
  phone_number?: string;
  company?: string;
  role: string;
  status: string;
  location?: string;
  last_login?: string;
}

export interface UserFormData {
  full_name: string;
  email: string;
  phone_number: string;
  role: string;
}