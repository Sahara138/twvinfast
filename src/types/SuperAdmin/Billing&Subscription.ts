type BillingCycle = "month" | "year";
type CurrencyCode = string;
export interface Subscription {
  id: number;
  company: string;
  email: string;
  plan: string;
  status: 'Active' | 'Suspended';
  amount: number;
  billing: string;
  nextBilling: string;
  paymentType: string ;
}
export interface PricingPlan {
  id?: number;                // optional internal id
  name: string;               // e.g. "Basic"
  description?: string;       // short blurb
  price: {
    amount: number;           // numeric value, e.g. 49
    currency: CurrencyCode;   // e.g. "USD"
    cycle: BillingCycle;      // "month" or "year"
  };
  limits?: {
    maxUsers?: number | "unlimited"; // e.g. 10
    creditsPerCycle?: number;        // e.g. 1000
  };
  features?: string[];        // list of bullet features (email support, basic analytics...)
  metrics?: {
    customers?: number;       // e.g. 45
    revenue?: {
      amount: number;         // numeric revenue, e.g. 2205
      currency?: CurrencyCode;
    };
  };
  createdAt?: string;         // ISO date
  updatedAt?: string;         // ISO date
}
export interface Invoice {
  id: number;
  invoiceNumber: string;
  company: string;
  amount: number;
  plan: string;
  status: "Paid" | "Pending" | "Overdue";
  createdAt?: string;
  dueDate?: string;
  paymentType: string;
}
export interface Payment {
  id: number;
  name: string;
  description: string;
  enabled: boolean;
  retryDelay: number;
}
