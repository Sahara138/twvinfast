import { X } from "lucide-react";
import type { ReactNode } from "react";

import Heading2 from "./Heading2";

interface ModalLayoutProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  subtitle?: string;
  children: ReactNode;

  maxWidth?: string;
}

export default function ModalLayout({
  isOpen,
  onClose,
  title,
  subtitle,
  children,

  maxWidth = "max-w-2xl",
}: ModalLayoutProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center p-4 z-[9999] transition-all duration-300">
      <div
        className={`bg-white rounded-2xl shadow-xl w-full ${maxWidth} max-h-[90vh] overflow-hidden flex flex-col animate-fadeIn`}
      >
        {/* Header */}
        <div className="flex justify-between items-start px-6 pt-4 border-b border-gray-200 sticky top-0 z-10 bg-white/90 backdrop-blur-sm">
          <Heading2 heading1={`${title}`} heading2={`${subtitle}`} />
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={22} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto flex-1">{children}</div>
      </div>
    </div>
  );
}
