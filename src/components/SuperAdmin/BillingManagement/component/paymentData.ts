import type { Payment } from "../../../../types/SuperAdmin/Billing&Subscription";

/** Mock Payment Data */
export const mockPayments: Payment[] = [
  {
    id: 1,
    name: "Payment Processing Settings",
    description: "Configure payment providers and processing options",
    enabled: true,
    retryDelay: 15,
  },
  {
    id: 2,
    name: "Stripe Integration",
    description: "Primary payment processor for subscriptions",
    enabled: true,
    retryDelay: 10,
  },
  {
    id: 3,
    name: "Paypal Integration",
    description: "Alternative payment option for customers.",
    enabled: true,
    retryDelay: 5,
  },
  {
    id: 4,
    name: "Automatic Renewals",
    description: "Automatically renew subscriptions on billing cycle",
    enabled: false,
    retryDelay: 60,
  },
  {
    id: 5,
    name: "Failed Payment Retry",
    description: "Automatically retry failed payments after a specified delay.",
    enabled: false,
    retryDelay: 30,
  },
  {
    id: 6,
    name: "Invoice Remainders",
    description: "Send email reminders for upcoming payments.",
    enabled: false,
    retryDelay: 30,
  },
];
