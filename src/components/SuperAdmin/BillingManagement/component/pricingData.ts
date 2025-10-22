import type { PricingPlan } from "../../../../types/SuperAdmin/Billing&Subscription";


export const pricingPlans: PricingPlan[] = [
  {
    id: 1,
    name: "Basic",
    description: "$49/month · Up to 10 users · 1,000 AI credits/month",
    price: {
      amount: 49,
      currency: "USD",
      cycle: "month",
    },
    limits: {
      maxUsers: 10,
      creditsPerCycle: 1000,
    },
    features: ["Email support", "Basic analytics"],
    metrics: {
      customers: 45,
      revenue: {
        amount: 2205,
        currency: "$",
      },
    },
    createdAt: new Date().toISOString(),
  },
  {
    id: 2,
    name: "Pro",
    description: "$99/month · Up to 50 users · 10,000 AI credits/month",
    price: {
      amount: 99,
      currency: "$",
      cycle: "month",
    },
    limits: {
      maxUsers: 50,
      creditsPerCycle: 10000,
    },
    features: ["Priority email support", "Advanced analytics", "Custom integrations"],
    metrics: {
      customers: 120,
      revenue: {
        amount: 11880,
        currency: "$",
      },
    },
    createdAt: new Date().toISOString(),
  },
  {
    id: 3,
    name: "Enterprise",
    description: "Custom pricing · Unlimited users · 100,000+ AI credits/month",
    price: {
      amount: 499,
      currency: "USD",
      cycle: "month",
    },
    limits: {
      maxUsers: "unlimited",
      creditsPerCycle: 100000,
    },
    features: [
      "Dedicated account manager",
      "24/7 support",
      "Custom integrations",
      "Advanced security",
    ],
    metrics: {
      customers: 25,
      revenue: {
        amount: 12475,
        currency: "$",
      },
    },
    createdAt: new Date().toISOString(),
  },
];
