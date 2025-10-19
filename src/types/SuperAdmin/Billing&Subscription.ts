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