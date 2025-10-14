import { useState } from "react";
import ModalLayout from "../../../components/shared/ModalLayout";
interface CreateAccountFormData {
  organizationName: string;
  websiteUrl: string;
  address: string;
  adminEmail: string;
  subscriptionPlan: "Basic" | "Pro" | "Enterprise";
  initialCredits: number;
  startWithTrial: boolean;
}
interface ModalProps {
  isModalOpen: boolean;
  setIsModalOpen: (value: boolean) => void;
}
export default function CreateAccountModal({
  isModalOpen,
  setIsModalOpen,
}: ModalProps) {
  const [formData, setFormData] = useState<CreateAccountFormData>({
    organizationName: "",
    websiteUrl: "",
    address: "",
    adminEmail: "",
    subscriptionPlan: "Basic",
    initialCredits: 20000,
    startWithTrial: false,
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setFormData({
      organizationName: "",
      websiteUrl: "",
      address: "",
      adminEmail: "",
      subscriptionPlan: "Basic",
      initialCredits: 20000,
      startWithTrial: false,
    });
    setIsModalOpen(false);
  };
  return (
    <div>
      <ModalLayout
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Create Company Account"
        subtitle="Set up a new business account with admin credentials"
      >
        <div className="p-3 lg:p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Organization Name
              </label>
              <input
                type="text"
                name="organizationName"
                placeholder="My Space"
                value={formData.organizationName}
                onChange={handleInputChange}
                className="input-field"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Website URL
              </label>
              <input
                type="text"
                name="websiteUrl"
                placeholder="www.myspace.com"
                value={formData.websiteUrl}
                onChange={handleInputChange}
                className="input-field"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Address
              </label>
              <input
                type="text"
                name="address"
                placeholder="Type company address..."
                value={formData.address}
                onChange={handleInputChange}
                className="input-field"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Admin Email
              </label>
              <input
                type="email"
                name="adminEmail"
                placeholder="Type your company admin email..."
                value={formData.adminEmail}
                onChange={handleInputChange}
                className="input-field"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Subscription Plan
              </label>
              <select
                name="subscriptionPlan"
                value={formData.subscriptionPlan}
                onChange={handleInputChange}
                className="input-field bg-white"
              >
                <option value="Basic">Basic</option>
                <option value="Pro">Pro</option>
                <option value="Enterprise">Enterprise</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Initial AI Credits
              </label>
              <select
                name="initialCredits"
                value={formData.initialCredits}
                onChange={handleInputChange}
                className="input-field bg-white"
              >
                <option value={20000}>20,000</option>
                <option value={50000}>50,000</option>
                <option value={100000}>100,000</option>
              </select>
            </div>
          </div>

          <div className="mb-2">
            <label className="label">
              <input
                type="checkbox"
                name="startWithTrial"
                checked={formData.startWithTrial}
                onChange={handleInputChange}
                className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-primary"
              />
              <span className="text-sm text-gray-700">
                Start with Trial period
              </span>
            </label>
          </div>
        </div>
        <div className="flex justify-end gap-4">
          <button
            onClick={() => setIsModalOpen(false)}
            className="px-6 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-6 py-2 bg-primary hover:bg-orange-400 text-white rounded-lg font-medium transition-colors"
          >
            Create Account
          </button>
        </div>
      </ModalLayout>
    </div>
  );
}
