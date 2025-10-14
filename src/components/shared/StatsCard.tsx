
import type { LucideIcon } from "lucide-react";

interface StatsCardProps {
  label: string;
  value: string | number;
  subtext?: string;
  icon: LucideIcon;
  color?: string; 
  borderColor?: string; 
}

export default function StatsCard({
  label,
  value,
  subtext,
  icon: Icon,
  color = "#2F80ED",
  borderColor = "#DFE3E8",
}: StatsCardProps) {
  return (
    <div
      className={`bg-white p-4 md:p-6 rounded-lg border`}
      style={{ borderColor }}
    >
      <div className="flex items-center justify-between mb-2">
        <span className="text-gray-600 text-xs md:text-sm font-medium">
          {label}
        </span>
        <Icon size={22} className="text-[#454F5B]" />
      </div>

      <p
        className="text-2xl mt-6 mb-3 font-bold"
        style={{ color }}
      >
        {value}
      </p>

      {subtext && (
        <p className="text-gray-500 text-xs mt-1">{subtext}</p>
      )}
    </div>
  );
}
