//User Management Types
export interface TeamMember {
  id: string;
  full_name: string;
  email: string;
  phone_number?: string;
  company?: string;
  role: string;
  status: string;
  location?: string;
  last_login_at: string | undefined;
}

export interface UserFormData {
  // name: string;
  email: string;
  password: string;
  // role: string;
};

//Get User Response Types
export interface Mailbox {
  id: number;
  business_id: number;
  user_id: number;
  provider: string;
  email_address: string;
  created_at: string;
}

export interface Role {
  id: number;
  name: "SUPER_ADMIN" | "ADMIN" | "USER";
  description: string;
}


export interface GetUserResponse {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  status: "ACTIVE" | "INACTIVE";
  two_factor_enabled: boolean;
  role_id: number;
  business_id: number;
  created_at: string;
  updated_at: string;
  last_login_at: string | undefined;
  
  role: Role;
  mailboxes: Mailbox[];
}
