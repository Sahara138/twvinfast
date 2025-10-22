import { useState } from "react";
import WhiteLabelingTab from "../../../components/SuperAdmin/PlatformSettings/WhiteLabelingTab";


export default function PlatformSettings() {
  const [whiteLabels, setWhiteLabels] = useState([])
  const [activeTab, setActiveTab] = useState<'White-labeling' | 'API Management' | 'Security' | 'Compliance' | 'System'>('White-labeling');
  
  return (
    <div>
      {/* Header */}
      <div className="flex justify-between flex-start items-center">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Platform Settings</h1>
          <p className="text-gray-600">Manage your platform with complete administrative control</p>
        </div>
      </div>
      <hr className="my-[28px] border-[#C4CDD5]" />
      

      {/* Tabs */}
      <div className="flex flex-wrap gap-3 mb-6">
        {["White-labeling", "API Management", "Security", "Compliance", "System"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab as any)}
            className={`px-5 py-2 rounded-lg font-medium transition-colors ${activeTab === tab
                ? "bg-primary text-white"
                : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
              }`}
          >
            {tab}
          </button>
        ))}
      </div>
      
        


      {/* White-labeling Tab */}
      {activeTab === 'White-labeling' && (
        <WhiteLabelingTab whiteLabels={whiteLabels} />
      )}

      {/* Subscriptions Plan Tab */}
      {/* {activeTab === 'Subscription Plans' && (
        <SubscriptionPlanTab pricingPlans={pricingPlans} />
          )} */}

      {/* Invoices Tab */}
      {/* {activeTab === 'Invoices' && (
            <InvoicesTab
              invoices={invoices}
              statusFilter={statusFilter}
              setStatusFilter={setStatusFilter}
            />
          )}  */}
      {/* Payment Tab */}
      {/* {activeTab === 'Payment Processing' && (
            <PaymentTab  payment={payment} setPayment={setPayment} />
          )} */}
    </div>
  )
}
