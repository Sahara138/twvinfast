export interface Role {
  id: number;
  name: string;
  description: string;
}

export interface Business {
  id: number;
  name: string;
  website: string;
  phone: string;
  description: string;
  status: "ACTIVE" | "INACTIVE";
  created_at: string;
  updated_at: string;
  email: string;
  stripe_customer_id: string;
  logo_url: string;
}

export interface Mailbox {
  id: number;
  business_id: number;
  user_id: number;
  provider: string;
  email_address: string;
  imap_host: string;
  smtp_host: string ;
  smtp_port: string | number;
  is_ssl: boolean;
  imap_port: string | number;
  imap_password: string;
  smtp_password: string;
  created_at: string;
}

export interface NotificationSetting {
  id: number;
  user_id: number;
  email_alert_enabled: boolean;
  login_alert_enabled: boolean;
  created_at: string;
  updated_at: string;
}

// export type TUser = {
//   id: string;
//   name: string;
//   email: string;
//   phone_number: string;
//   password: string;
//   confirm_password: string;
//   area: string;
//   city: string;
//   role: "USER" | "ADMIN" | "SUPER_ADMIN";
//   isVerified: boolean;
//   isActive: boolean;
//   isDeleted: boolean;
//   createdAt: string;
//   updatedAt: string;
//   deletedAt: string | null;
//   profilePhoto: string;
// };

export interface TUser {
  id: number;
  email: string;
  name: string;
  phone: string;
  location: string;
  status: "ACTIVE" | "INACTIVE";
  role_id: number;
  business_id: number;

  created_at: string;
  updated_at: string;
  last_login_at: string | null;

  twoFAEnabled: boolean;
  twoFASecret: string;

  email_signature: string;
  refreshToken: string;

  role: "USER" | "ADMIN" | "SUPER_ADMIN";
  business: Business;
  mailboxes: Mailbox[];
  notificationSetting: NotificationSetting;
}
// types/auth.types.ts
export interface ChangePasswordPayload {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface ChangePasswordResponse {
  message: string;
}

export interface NotificationPayload {
  email_alert_enabled: boolean | undefined ;
  login_alert_enabled: boolean | undefined ;
}

export interface NotificationResponse {
  message: string;
}

// types/credentials.types.ts
export interface UpdateCredentialsPayload {
  provider: string;
  email_address: string;
  smtp_host: string;
  smtp_port: number;
  smtp_password?: string;
  imap_host: string;
  imap_port:  number;
  imap_password?: string;
  is_ssl: boolean;
}


export interface UpdateCredentialsResponse {
  message: string;
}


export interface UpdateUserProfilePayload {
  name?: string;
  phone?: string;
  location?: string;
  email_signature?: string;
}
