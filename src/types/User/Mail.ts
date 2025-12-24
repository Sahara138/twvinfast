import type { LabelType } from "./Label";

export interface MailboxType {
  id: number;              // mailboxId
  business_id: number;
  user_id: number;
  provider: "Gmail" | "Outlook" | string;
  email_address: string;

  imap_host: string;
  imap_port: number;
  imap_password: string;

  smtp_host: string;
  smtp_port: number;
  smtp_password: string;

  is_ssl: boolean;
  created_at: string;      // ISO date string
}

export interface Customer {
  id: number;
  business_id: number;

  name: string;
  email: string;

  phone: string | null;
  company: string | null;

  status: string | null;
  lead_score: number | null;
  value_estimate: number | null;

  source: "INBOUND_EMAIL" | "MANUAL" | string;
  preferred_language: string | null;

  notes: string | null;
  tags: string[] | null;

  last_contact_at: string;
  created_at: string;
  updated_at: string;
}

export interface CustomerMailboxInfo {
  id: number;
  business_id: number;
  mailbox_id: number;
  customer_id: number;

  subject: string;
  status: "NEW" | "OPENED" | "WON" | "REPLIED" | "LOST" | string;

  last_message_at: string;
  created_at: string;
  updated_at: string;

  last_message_id: string;
  references: string | null;

  is_archived: boolean;
  is_deleted: boolean;
  is_starred: boolean;
  is_read: boolean;

  deleted_at: string | null;
  opportunity_stage: string | null;

  labels: LabelType[];
  emails: Email[];

  customer: Customer;
}

export interface Pagination {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface MailboxThreadsResponse {
  data: CustomerMailboxInfo[];
  pagination: Pagination;
}

export interface Email {
  id: number;
  business_id: number;
  thread_id: number;
  mailbox_id: number;
  user_id: number | null;

  in_reply_to: string | null;

  from_address: string;
  to_addresses: string[] | null;
  cc_addresses: string[] | null;
  bcc_addresses: string[] | null;

  subject: string;

  body_html: string;
  body_text: string;

  folder: "INBOX" | "SENT" | "DRAFT" | "TRASH" | "SPAM";
  direction: "INCOMING" | "OUTGOING" | null;

  is_read: boolean;

  imap_uid: number;
  message_id: string;
  references: string | null;

  received_at: string | null;
  sent_at: string | null;
  created_at: string;
}

export interface Thread {
  id: number;
  business_id: number;
  mailbox_id: number;
  customer_id: number;
  subject: string;

  last_message_at: string;
  created_at: string;
  updated_at: string;

  is_archived: boolean;
  is_starred: boolean;
  is_deleted: boolean;

  status: "NEW" | "OPENED" | "REPLIED" | "WON" | "LOST";

  last_message_id: string;
  references: string | null;

  deleted_at: string | null;
  opportunity_stage: string | null;

  emails: Email[];
  labels: LabelType[];
}
 export interface EmailResonse {
  mailbox_id: number;
  to: string[];
  cc: string[];
  bcc: string[];
  subject: string;
  text: string;
  } 



