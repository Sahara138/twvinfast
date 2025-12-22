import { useState } from "react";
import { Tag } from "lucide-react";
import { useAssignThreadLabelMutation } from "../../redux/dashboardApi/user/mail/mailApi";
import { toast } from "react-toastify";

interface ActionBarTagButtonProps {
  selectedEmails: number[];
  allLabels: { id: number; name: string }[] | undefined;
}

export default function ActionBarTagButton({ selectedEmails, allLabels }: ActionBarTagButtonProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [assignThreadLabel] = useAssignThreadLabelMutation();

  // Assign a label to all selected emails
  const handleAssignLabel = async (labelId: number, labelName: string) => {
    for (const threadId of selectedEmails) {
      try {
        await assignThreadLabel({ thread_id: threadId, label_id: labelId }).unwrap();
        toast.success(`Assigned in "${labelName}"`);
        console.log(`Assigned "${labelName}" to thread ${threadId}`);
      } catch (err) {
        console.error("Failed to assign label", err);
      }
    }
  };


  return (
    <div
    className="relative inline-block"
    onMouseEnter={() => setIsHovered(true)}
    onMouseLeave={() => setIsHovered(false)}
    >
    <button
        className="flex items-center gap-1 gap-x-2 px-3 py-2 bg-white border border-[#0000001A] rounded-lg transition text-gray-700"
    >
        <Tag size={18} />
        <span>Tag</span>
    </button>

    {isHovered && allLabels && allLabels.length > 0 && (
        <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 p-2 bg-white border border-gray-300 rounded-lg shadow-lg z-10 min-w-[150px]">
        {allLabels.map((label) => (
            <button
            key={label.id}
            onClick={() => handleAssignLabel(label.id, label.name)}
            className="w-full text-left px-2 py-1 hover:bg-gray-100 rounded text-sm capitalize text-gray-700"
            >
            {label.name}
            </button>
        ))}
        </div>
    )}

    {isHovered && (!allLabels || allLabels.length === 0) && (
        <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 p-2 bg-white border border-gray-300 rounded-lg shadow-lg z-10 text-sm text-gray-500">
        No labels available
        </div>
    )}
    </div>

    );
}
