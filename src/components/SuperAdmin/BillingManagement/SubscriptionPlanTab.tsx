// SuperaccountManagement/AllaccountsTab.tsx
import PriceCard from './component/PriceCard';

/** Small helpers */
type BillingCycle = "month" | "year";
type CurrencyCode = string;

/** Plan interface */
interface PricingPlan {
  id?: number;
  name: string;
  description?: string;
  price: {
    amount: number;
    currency: CurrencyCode;
    cycle: BillingCycle;
  };
  limits?: {
    maxUsers?: number | "unlimited";
    creditsPerCycle?: number;
  };
  features?: string[];
  metrics?: {
    customers?: number;
    revenue?: {
      amount: number;
      currency?: CurrencyCode;
    };
  };
  createdAt?: string;
  updatedAt?: string;
}

interface SubscriptionPlanTabProps {
  pricingPlans: PricingPlan[];
}

export default function SubscriptionPlanTab({
  pricingPlans,
}: SubscriptionPlanTabProps) {
   
  return (
    <div className="overflow-hidden ">
       {/* Filters */}
        <div className="flex flex-col md:flex-row gap-3 mb-6">      

            {/* Price Card */}
            <div className=''>
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-[22px] w-full overflow-x-auto rounded-lg ">
                    {
                        pricingPlans.map((plan) => (
                            <PriceCard 
                                key={plan.id}
                                name={plan.name}
                                price={plan.price.amount}
                                billingCycle={plan.price.cycle}
                                features={plan.features || []}
                                customers={plan.metrics?.customers || 0}
                                revenue={plan.metrics?.revenue?.amount || 0}
                                currency={plan.metrics?.revenue?.currency || ''}
                            />
                        ))
                    }
                </div>
            </div>
        </div>
    </div>
  );
}
