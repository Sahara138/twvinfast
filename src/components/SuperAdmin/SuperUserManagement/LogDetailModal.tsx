// SuperUserManagement/LogDetailModal.tsx
import { X } from 'lucide-react';
import type{ LogDetails } from '../../../types/SuperAdmin/SuperUserManagement';

interface Props {
  detail: LogDetails;
  onClose: () => void;
}

export default function LogDetailModal({ detail, onClose }: Props) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full">
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h3 className="text-lg font-bold text-gray-900">Log Details: {detail.status} Login</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X size={24} />
          </button>
        </div>
        <div className="p-6 space-y-6">
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Overview</h4>
            <div className="text-sm space-y-2">
              <p><strong>Timestamp:</strong> {detail.timestamp}</p>
              <p><strong>User:</strong> {detail.user}</p>
              <p><strong>Email:</strong> {detail.email}</p>
              <p><strong>Status:</strong> {detail.status}</p>
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Technical Information</h4>
            <p><strong>IP:</strong> {detail.ipAddress}</p>
            <p><strong>Location:</strong> {detail.location}</p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Details</h4>
            <p className="text-gray-600 text-sm">{detail.details}</p>
          </div>
        </div>
        <div className="p-6 border-t border-gray-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-medium"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
