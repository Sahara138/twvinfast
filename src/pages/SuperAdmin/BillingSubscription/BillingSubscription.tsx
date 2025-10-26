import { useState } from "react";
import Heading2 from "../../../components/shared/Heading2";
import RevenueGrowthTab from "../../../components/SuperAdmin/BillingManagement/component/RevenueGrowthChart";
import AllSubscriptionTab from "../../../components/SuperAdmin/BillingManagement/SubscriptionsTab";
import type { Payment, Subscription } from "../../../types/SuperAdmin/Billing&Subscription";
import SubscriptionPlanTab from "../../../components/SuperAdmin/BillingManagement/SubscriptionPlanTab";
import { pricingPlans } from "../../../components/SuperAdmin/BillingManagement/component/pricingData";
import PaymentTab from "../../../components/SuperAdmin/BillingManagement/PaymentTab";
import { mockPayments } from "../../../components/SuperAdmin/BillingManagement/component/paymentData";
import InvoicesTab from "../../../components/SuperAdmin/BillingManagement/InvoicesTab";
import AddPlanModal from "../../../components/SuperAdmin/BillingManagement/component/AddPlan";

export default function BillingSubscription() {
  const segmentData = [
    { label: "Pro 47%", value: 47, color: "#3b82f6" }, // Tailwind blue-500
    { label: "Enterprise 37%", value: 37, color: "#10b981" }, // Tailwind green-500
    { label: "Starter 16%", value: 16, color: "#ef4444" }, // Tailwind red-500
  ];
   const [subscriptions] = useState<Subscription[]>([
  {
    id: 1,
    company: "TechNova Solutions",
    email: "billing@technova.com",
    plan: "Premium",
    status: "Active",
    amount: 199.99,
    billing: "Monthly",
    nextBilling: "2025-11-01",
    paymentType: "Stripe"
  },
  {
    id: 2,
    company: "Apcorn Innovation",
    email: "accounts@apcorn.com",
    plan: "Basic",
    status: "Active",
    amount: 49.99,
    billing: "Monthly",
    nextBilling: "2025-10-25",
    paymentType: "PayPal"
  },
  {
    id: 3,
    company: "Softvence Agency",
    email: "finance@softvence.com",
    plan: "Enterprise",
    status: "Suspended",
    amount: 499.00,
    billing: "Yearly",
    nextBilling: "2026-01-05",
    paymentType: "Stripe"
  },
  {
    id: 4,
    company: "Cloudify IT",
    email: "info@cloudifyit.io",
    plan: "Standard",
    status: "Active",
    amount: 99.99,
    billing: "Monthly",
    nextBilling: "2025-11-02",
    paymentType: "Credit Card"
  },
  {
    id: 5,
    company: "NextGen Studios",
    email: "contact@nextgenstudios.com",
    plan: "Premium",
    status: "Active",
    amount: 199.99,
    billing: "Yearly",
    nextBilling: "2026-09-12",
    paymentType: "Stripe"
  },
  {
    id: 6,
    company: "DataMinds Analytics",
    email: "accounts@dataminds.ai",
    plan: "Basic",
    status: "Suspended",
    amount: 59.00,
    billing: "Monthly",
    nextBilling: "2025-10-28",
    paymentType: "Debit Card"
  },
  {
    id: 7,
    company: "GreenLeaf Corp",
    email: "support@greenleaf.com",
    plan: "Standard",
    status: "Active",
    amount: 120.00,
    billing: "Monthly",
    nextBilling: "2025-11-04",
    paymentType: "Stripe"
  },
  {
    id: 8,
    company: "EduVerse Academy",
    email: "billing@eduverse.org",
    plan: "Enterprise",
    status: "Active",
    amount: 399.99,
    billing: "Yearly",
    nextBilling: "2026-02-18",
    paymentType: "Bank Transfer"
  },
  {
    id: 9,
    company: "FinEdge Finance",
    email: "accounts@finedge.com",
    plan: "Premium",
    status: "Suspended",
    amount: 220.00,
    billing: "Monthly",
    nextBilling: "2025-10-23",
    paymentType: "Stripe"
  },
  {
    id: 10,
    company: "PixelCraft Media",
    email: "hello@pixelcraft.co",
    plan: "Standard",
    status: "Active",
    amount: 89.00,
    billing: "Monthly",
    nextBilling: "2025-11-07",
    paymentType: "PayPal"
  }
]);
const invoices:any=[]
  const [activeTab, setActiveTab] = useState<'Revenue Overview' | 'Subscriptions' | 'Subscription Plans' | 'Invoices' | 'Payment Processing'>('Revenue Overview');
const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [payment, setPayment] = useState<Payment[]>(mockPayments);
  const [isModalOpen, setIsModalOpen] = useState(false);
  // const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  interface SegmentPath {
    color: string;
    dasharray: number;
    offset: number;
  }
  const getDoughnutPath = (): SegmentPath[] => {
    const radius = 60;
    const circumference = 2 * Math.PI * radius;
    let offset = 0;

    const segments: SegmentPath[] = [];

    segmentData.forEach((seg) => {
      const dasharray = (seg.value / 100) * circumference;
      segments.push({
        color: seg.color,
        dasharray,
        offset,
      });
      offset += dasharray;
    });

    return segments;
  };

  const doughnutSegments = getDoughnutPath();

  return (
    // <div className="w-[100%]">
    <div className="w-[100%] sm:w-[99%] md:w-[100%] xl:w-[100%]">
      {/* Header */}
      <div className="md:flex justify-between flex-start items-center ">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Billing & Subscription</h1>
          <p className="text-gray-600">Manage your platform with complete administrative control</p>
        </div>
        <button onClick={() => setIsModalOpen(true)} className="px-[28px] py-[9px] bg-primary text-base text-white rounded-[8px] hover:bg-primary-dark transition-colors">
          Add Plan
        </button>

      </div>
      <hr className="my-[28px] border-[#C4CDD5]" />
      

      {/* Tabs */}
      <div className="md:flex flex-wrap gap-3 mb-6">
        {["Revenue Overview", "Subscriptions", "Subscription Plans", "Invoices", "Payment Processing"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab as any)}
            className={`block mb-3 md:mb-0 px-5 py-2 rounded-lg font-medium transition-colors ${activeTab === tab
                ? "bg-primary text-white"
                : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
              }`}
          >
            {tab}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
        {
          activeTab === "Revenue Overview" &&
          (
            <div className="">
              {/* Charts Row */}
              <div className="gap-6 mb-8">
                {/* Plan Segments */}
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <Heading2
                    heading1="Plan Distribution"
                    heading2="Revenue breakdown by subscription plan"
                  />

                  <div className="flex justify-center mb-6">
                    <svg
                      width="160"
                      height="160"
                      viewBox="0 0 160 160"
                      className="drop-shadow-sm"
                    >
                      <circle
                        cx="80"
                        cy="80"
                        r="60"
                        fill="none"
                        stroke="#e5e7eb"
                        strokeWidth="24"
                      />

                      {/* Dynamic Segments */}
                      {doughnutSegments.map((seg, i) => (
                        <circle
                          key={i}
                          cx="80"
                          cy="80"
                          r="60"
                          fill="none"
                          stroke={seg.color}
                          strokeWidth="24"
                          strokeDasharray={`${seg.dasharray} ${2 * Math.PI * 60 - seg.dasharray
                            }`}
                          strokeDashoffset={-seg.offset}
                          strokeLinecap="round"
                          transform="rotate(-90 80 80)"
                        />
                      ))}
                    </svg>
                  </div>

                  {/* Legend */}
                  <div className="space-y-3">
                    {segmentData.map((seg, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: seg.color }}
                        ></div>
                        <span className="text-xs text-gray-700">{seg.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )
        }
        {
          activeTab === "Revenue Overview" &&
          (
            <div className="bg-white rounded-lg border border-gray-200 p-2">
                <RevenueGrowthTab />
              </div>
          )
        }
      </div>
        


      {/* Subscriptions Tab */}
      {activeTab === 'Subscriptions' && (
            <AllSubscriptionTab subscriptions={subscriptions} searchQuery={searchQuery} setSearchQuery={setSearchQuery} statusFilter={statusFilter} setStatusFilter={setStatusFilter}/>
          )}

      {/* Subscriptions Plan Tab */}
      {activeTab === 'Subscription Plans' && (
        <SubscriptionPlanTab pricingPlans={pricingPlans} />
          )}

      {/* Invoices Tab */}
      {activeTab === 'Invoices' && (
            <InvoicesTab
              invoices={invoices}
              statusFilter={statusFilter}
              setStatusFilter={setStatusFilter}
            />
          )} 
      {/* Payment Tab */}
      {activeTab === 'Payment Processing' && (
            <PaymentTab  payment={payment} setPayment={setPayment} />
          )}
          {/* Add Subscription Plan Model */}
    <AddPlanModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}  />
    </div>
  )
}
