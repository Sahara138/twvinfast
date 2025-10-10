import { useState } from "react";
import { Settings as SettingsIcon } from "lucide-react";
import ToggleSwitch from "../AdminSettings/ToggleSwitch";
import type { Integration } from "../../../types/Admin/Integrations";

export default function Internal() {
  const [internalTools, setInternalTools] = useState<Integration[]>([
    {
      id: "google-drive",
      name: "Google Drive",
      description: "Access documents and files from Google Drive",
      icon: <img src="/images/drive.png" alt="image" className="h-8 w-9" />,
      status: "connected",
      lastSync: "2 minutes ago",
      autoSync: true,
    },
    {
      id: "trello",
      name: "Trello",
      description: "Create and manage tasks in Trello boards",
      icon: <img src="/images/trello.png" alt="image" className="h-8 w-9" />,
      status: "connected",
      lastSync: "1 hour ago",
      autoSync: true,
    },
  ]);

  const toggleAutoSync = (id: string) => {
    setInternalTools((tools) =>
      tools.map((tool) =>
        tool.id === id ? { ...tool, autoSync: !tool.autoSync } : tool
      )
    );
  };

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {internalTools.map((tool) => (
        <div
          key={tool.id}
          className="bg-white rounded-lg border border-[#DFE3E8] p-6"
        >
          <div className="flex  items-center gap-3 mb-4 px-4">
            <div className="">{tool.icon}</div>
            <div className="flex flex-col min-w-0">
              <h3 className="text-lg font-semibold text-[#161C24]">
                {tool.name}
              </h3>
              <p className="text-sm text-[#454F5B] mt-1">{tool.description}</p>
            </div>
          </div>

          {tool.status === "connected" && (
            <>
              <div className="space-y-4 mb-4 text-xs">
                <div className="flex justify-between">
                  <span className="text-gray-600">Status</span>
                  <span className="font-medium text-gray-900 bg-[#F9DFB3] py-1 px-1.5 rounded-full">
                    Connected
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Last sync</span>
                  <span className="font-medium text-gray-900">
                    {tool.lastSync}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Auto-sync</span>
                  <ToggleSwitch
                    checked={tool.autoSync}
                    onChange={() => toggleAutoSync(tool.id)}
                  />
                </div>
              </div>

              <div className="flex gap-2 mt-4">
                <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gray-700 bg-white border border-gray-300 rounded hover:bg-gray-50 transition-colors">
                  <SettingsIcon size={14} />
                  Configure
                </button>
                <button className="px-3 py-1.5 text-xs font-medium text-gray-700 bg-white border border-gray-300 rounded hover:bg-gray-50 transition-colors">
                  Disconnect
                </button>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
}
