import type { LogDetails } from "../../../types/SuperAdmin/SuperUserManagement";
import ModalLayout from "../../../components/shared/ModalLayout";

interface Props {
  detail: LogDetails;
  onClose: () => void;
}

export default function LogDetailModal({ detail, onClose }: Props) {
  return (
    <ModalLayout
      isOpen={!!detail}
      onClose={onClose}
      title={`Log Details: ${detail.status} Login`}
      subtitle="Review login attempt information"
      maxWidth="max-w-2xl"
    >
      {/* Overview */}
      <div className="space-y-6">
        {/* Overview */}
        <div>
          <h4 className="font-medium text-[20px] mb-3">Overview</h4>
          <div className="grid grid-cols-2 gap-y-4  divide-y divide-[#DFE3E8] text-[18px]">
            <span className="text-gray-600">Timestamp</span>
            <span className="text-right">{detail.timestamp}</span>

            <span className="text-gray-600">User</span>
            <span className="text-right">{detail.user}</span>

            <span className="text-gray-600">Email</span>
            <span className="text-right">{detail.email}</span>

            <span className="text-gray-600">Status</span>
            <span
              className={`${
                detail.status === "Success" ? "text-green-600 " : "text-red-600"
              } border-b border-[#DFE3E8] text-right`}
            >
              {detail.status}
            </span>
          </div>
        </div>

        {/* Technical Information */}
        <div>
          <h4 className="font-medium text-[20px]  mb-3">
            Technical Information
          </h4>
          <div className="grid grid-cols-2 gap-y-4 divide-y divide-[#DFE3E8] text-[18px]">
            <span className="text-gray-600">IP Address:</span>
            <span className="text-right">{detail.ipAddress}</span>

            <span className="text-gray-600">Location:</span>
            <span className="text-right border-b border-[#DFE3E8]">
              {detail.location}
            </span>
          </div>
        </div>

        {/* Details */}
        <div>
          <h4 className="font-medium text-[20px] mb-2">Details</h4>
          <p className="text-[#454F5B] ">{detail.details}</p>
        </div>
      </div>
    </ModalLayout>
  );
}
