import { useState } from "react";

interface GenerateApiModalProps {
  isModalOpen: boolean;
  setIsModalOpen: (open: boolean) => void;
}

export default function GenerateApiModal({
  isModalOpen,
  setIsModalOpen,
}: GenerateApiModalProps) {
  const [keyName, setKeyName] = useState("");
  const [permissions, setPermissions] = useState("");
  const [expiryDate, setExpiryDate] = useState("");

  const handleCreate = () => {
    console.log({
      keyName,
      permissions,
      expiryDate: expiryDate || "No expiry date set",
    });
    setIsModalOpen(false);
  };

  if (!isModalOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center p-4 z-[9999] transition-all duration-300">
      <div className="bg-white rounded-lg p-6 w-[70%] shadow-lg animate-fadeIn">
        {/* Header */}
        <h2 className="text-[24px] font-normal mb-[14px]">Generate New API Key</h2>
        <hr className="w-full h-[1px] border-[#C4CDD5]" />
        <p className="text-[16px] font-normal text-gray-700 mt-[18px] mb-6">
          Create a new API key for platform integration
        </p>

        {/* Key Name */}
        <label className="block mb-2 text-lg font-normal">Key Name</label>
        <input
          type="text"
          value={keyName}
          onChange={(e) => setKeyName(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2 mb-4 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="Enter Key name"
        />

        {/* Permissions */}
        <label className="block mb-2 text-lg font-normal">Permissions</label>
        <select
          value={permissions}
          onChange={(e) => setPermissions(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="">Select Permission</option>
          <option value="read">Read</option>
          <option value="write">Write</option>
          <option value="admin">Admin</option>
        </select>

        {/* Expiry Date */}
        <label className="block mb-2 text-lg font-normal">
          Expiry Date <span className="text-sm text-gray-500">(Optional)</span>
        </label>
        <input
          type="date"
          value={expiryDate}
          onChange={(e) => setExpiryDate(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2 mb-4 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary"
          min={new Date().toISOString().split("T")[0]}
        />

        {/* Buttons */}
        <div className="flex justify-end gap-3 mt-6">
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
            Generate API Key
          </button>
        </div>
      </div>
    </div>
  );
}
