import { useState } from "react";

interface AddPlanModalProps {
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
}

export default function AddPlanModal({ isModalOpen, setIsModalOpen }: AddPlanModalProps) {
  const [planName, setPlanName] = useState("");
  const [monthlyPrice, setMonthlyPrice] = useState("");
  const [features, setFeatures] = useState<string[]>([""]);
  const [visibleToCustomer, setVisibleToCustomer] = useState(true);


  const handleCreate = () => {
    console.log({
      planName,
      monthlyPrice,
      features,
      visibleToCustomer,
    });
    setIsModalOpen(false);
  };

  if (!isModalOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center p-4 z-[9999] transition-all duration-300">
      <div className=" bg-white rounded-lg p-6 w-[70%] shadow-lg">
        <h2 className="text-[24px] font-normal mb-[14px]">Create Subscription Plan</h2>
        <hr className="w-full h-[1px] border-[#C4CDD5]"/>
        <p className="text-[16px] font-normal text-gray-700 mt-[18px] mb-6">Define a new subscription tier with pricing and features.</p>

        {/* Plan Name */}
        <label className="block mb-2 text-sm font-medium">Plan Name</label>
        <input
          type="text"
          value={planName}
          onChange={(e) => setPlanName(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2 mb-4 placeholder:text-gray-400 placeholder:text-sm
          placeholder:font-normal focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          placeholder="Enter plan name"
        />

        {/* Monthly Price */}
        <label className="block mb-2 text-sm font-medium">Monthly Price ($)</label>
        <input
          type="number"
          value={monthlyPrice}
          onChange={(e) => setMonthlyPrice(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2 mb-4 placeholder:text-gray-400 placeholder:text-sm
          placeholder:font-normal focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          placeholder="99"
        />

        {/* Features */}
        <label className="block mb-2 text-sm font-medium">Features (One per line)</label>
        <textarea
          value={features.join("\n")}
          onChange={(e) => {
            const lines = e.target.value.split("\n");
            setFeatures(lines);
          }}
          className="w-full border border-gray-300 rounded px-3 py-2 mb-4 placeholder:text-gray-400 placeholder:text-sm
          placeholder:font-normal focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent h-[150px]"
          placeholder="• Up to 50 users
• 10,000 AI credits/month
• Priority support"
        ></textarea>

        {/* Switch */}
        <div className="flex items-center mb-6">
          <button
            onClick={() => setVisibleToCustomer(!visibleToCustomer)}
            className={`relative w-12 h-6 rounded-full transition-colors mr-3 ${
              visibleToCustomer ? "bg-primary" : "bg-gray-300"
            }`}
          >
            <div
              className={`absolute w-5 h-5 bg-white rounded-full top-0.5 transition-transform ${
                visibleToCustomer ? "translate-x-6" : "translate-x-0.5"
              }`}
            ></div>
          </button>
          <label className="text-sm font-medium">Visible to Customer</label>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3">
          <button
            onClick={() => setIsModalOpen(false)}
            className="px-[28px] py-[6px] bg-[#F9DFB3] rounded transition text-sm font-medium hover:bg-[#F9E4C4]"
          >
            Cancel
          </button>
          <button
            onClick={handleCreate}
            className="px-[28px] py-[6px] bg-primary text-white rounded hover:bg-primary-dark transition text-sm font-medium"
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
}
