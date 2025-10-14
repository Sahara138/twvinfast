
import { RotateCcw, Settings } from "lucide-react";
import type { AIModel } from "../../../types/SuperAdmin/AiModelManagement";

export default function AIModelsTab({
  models,
  setModels,
}: {
  models: AIModel[];
  setModels: React.Dispatch<React.SetStateAction<AIModel[]>>;
}) {
  const handleToggleModel = (id: number) => {
    setModels((prev) =>
      prev.map((m) => (m.id === id ? { ...m, enabled: !m.enabled } : m))
    );
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {models.map((model) => (
        <div key={model.id} className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{model.name}</h3>
              <p className="text-sm text-gray-600">{model.provider}</p>
            </div>
            <button
              onClick={() => handleToggleModel(model.id)}
              className={`relative w-12 h-6 rounded-full transition-colors ${
                model.enabled ? "bg-orange-500" : "bg-gray-300"
              }`}
            >
              <div
                className={`absolute w-5 h-5 bg-white rounded-full top-0.5 transition-transform ${
                  model.enabled ? "translate-x-6" : "translate-x-0.5"
                }`}
              ></div>
            </button>
          </div>

          {/* Usage */}
          <div className="mb-4">
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium text-gray-900">Usage</span>
              <span className="text-sm text-gray-600">{model.usage}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-gray-800 h-2 rounded-full" style={{ width: `${model.usage}%` }}></div>
            </div>
          </div>

          {/* Uptime */}
          <div className="mb-6">
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium text-gray-900">Uptime</span>
              <span className="text-sm text-gray-600">{model.uptime}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-gray-800 h-2 rounded-full" style={{ width: `${model.uptime}%` }}></div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4 mb-6 pb-6 border-b border-gray-200">
            <div>
              <p className="text-xs text-gray-600 mb-1">Request</p>
              <p className="text-lg font-semibold text-gray-900">{model.requestCount}</p>
            </div>
            <div>
              <p className="text-xs text-gray-600 mb-1">Avg Response</p>
              <p className="text-lg font-semibold text-gray-900">{model.avgResponse}s</p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <button className="flex-1 px-4 py-2 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 flex items-center justify-center gap-2">
              <Settings size={16} /> Configure
            </button>
            <button className="flex-1 px-4 py-2 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 flex items-center justify-center gap-2">
              <RotateCcw size={16} /> Restart
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
