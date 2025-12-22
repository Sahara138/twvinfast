import { useState } from "react";
import { Tag } from "lucide-react";

export default function TagButton({ allLabels }: { allLabels: { name: string }[] }) {
  const [isHovered, setIsHovered] = useState(false);

  const tooltipText =
    allLabels && allLabels.length > 0
      ? allLabels.map((label) => label.name).join(", ")
      : "No labels available";

  return (
    <div className="relative inline-block">
      <button
        className="flex items-center gap-1 gap-x-2 px-3 py-2 bg-white border border-[#0000001A] rounded-lg transition text-gray-700"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Tag size={18} />
        <span>Tag</span>
      </button>

      {isHovered && (
        <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 p-3 bg-white border border-gray-300 rounded-lg shadow-lg z-10 whitespace-nowrap text-sm">
          {tooltipText}
        </div>
      )}
    </div>
  );
}
