import { CircleAlert, Clock, Mars, NotepadTextDashed, Tag } from "lucide-react";
import { useState } from "react";
type MyModalProps = {
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
};
export default function ManageModal({
  isModalOpen,
  setIsModalOpen,
}: MyModalProps) {
  const [labels, setLabels] = useState([
    {
      id: 1,
      name: "General",
      count: 12,
      icon: <Mars size={18} />,
      color: "bg-blue-100 text-blue-600",
    },
    {
      id: 2,
      name: "Follow Up",
      count: 23,
      icon: <Clock size={18} />,
      color: "bg-green-100 text-green-600",
    },
    {
      id: 3,
      name: "Urgent",
      count: 12,
      icon: <CircleAlert size={18} />,
      color: "bg-red-100 text-red-600",
    },
    {
      id: 4,
      name: "Draft",
      count: 23,
      icon: <NotepadTextDashed size={18} />,
      color: "bg-teal-100 text-teal-600",
    },
  ]);

  const [searchQuery, setSearchQuery] = useState("");

  const filteredLabels = labels.filter((label) =>
    label.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = (id: Number) => {
    setLabels(labels.filter((label) => label.id !== id));
  };

  if (!isModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-lg w-full max-w-xl p-6 relative shadow-lg">
        {/* Header */}
        <div className="flex items-center gap-2 mb-6">
          <Tag className="w-5 h-5 text-primary2" />
          <h2 className="text-xl font-semibold text-gray-900">Manage Labels</h2>
        </div>

        {/* Close Button */}
        <button
          onClick={() => setIsModalOpen(false)}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Search Box */}
        <div className="mb-5">
          <div className="relative">
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              type="text"
              placeholder="Search labels..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-teal-500 bg-gray-50"
            />
          </div>
        </div>

        {/* Create New Label Button */}
        <button className="w-full mb-6 px-4 py-2.5 border-2  border-gray-300 rounded-lg text-gray-700 font-medium hover:border-gray-400 hover:bg-gray-50 transition flex items-center justify-center gap-2">
          <span className="text-lg">+</span>
          Create New Label
        </button>

        {/* Labels Count */}
        <div className="mb-4">
          <p className=" font-medium text-gray-900">
            Your Labels ({labels.length})
          </p>
        </div>

        {/* Labels List */}
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {filteredLabels.length > 0 ? (
            filteredLabels.map((label) => (
              <div
                key={label.id}
                className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition"
              >
                <div className="flex items-center gap-3 flex-1">
                  <div
                    className={`w-8 h-8 rounded flex items-center justify-center text-lg `}
                  >
                    {label.icon}
                  </div>
                  <div>
                    <span
                      className={`inline-block px-2.5 py-1 rounded-full text-xs font-medium ${label.color}`}
                    >
                      {label.name}
                    </span>
                  </div>
                  <span className="text-sm text-gray-600 ml-auto mr-4">
                    {label.count} emails
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button className="p-1.5 text-gray-400 hover:text-gray-600 transition hover:bg-gray-200 rounded">
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                      />
                    </svg>
                  </button>
                  <button
                    onClick={() => handleDelete(label.id)}
                    className="p-1.5 text-gray-400 hover:text-red-600 transition hover:bg-red-50 rounded"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-6 text-gray-500">
              <p className="text-sm">No labels found</p>
            </div>
          )}
        </div>

        {/* Done Button */}
        <div className="mt-6 flex justify-end">
          <button
            onClick={() => setIsModalOpen(false)}
            className="px-6 py-2 bg-white border border-gray-300 text-gray-900 rounded-lg font-medium hover:bg-gray-50 transition"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
