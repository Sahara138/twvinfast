import { useState } from 'react';
import { Edit, Trash2, Plus, X } from 'lucide-react';
import type { SystemPrompt } from '../../../types/SuperAdmin/AiModelManagement';

export default function SystemPromptTab({
  prompts,
  setPrompts,
}: {
  prompts: SystemPrompt[];
  setPrompts: React.Dispatch<React.SetStateAction<SystemPrompt[]>>;
}) {
  const [isPromptModalOpen, setIsPromptModalOpen] = useState(false);
  const [editingPrompt, setEditingPrompt] = useState<SystemPrompt | null>(null);
  const [promptForm, setPromptForm] = useState({
    name: '',
    description: '',
    content: '',
    applicableModels: '',
  });

  const handleTogglePrompt = (id: number) => {
    setPrompts((prev) =>
      prev.map((prompt) =>
        prompt.id === id ? { ...prompt, enabled: !prompt.enabled } : prompt
      )
    );
  };

  const handleOpenPromptModal = (prompt?: SystemPrompt) => {
    if (prompt) {
      setEditingPrompt(prompt);
      setPromptForm({
        name: prompt.name,
        description: prompt.description,
        content: prompt.content,
        applicableModels: prompt.applicableModels.join(', '),
      });
    } else {
      setEditingPrompt(null);
      setPromptForm({ name: '', description: '', content: '', applicableModels: '' });
    }
    setIsPromptModalOpen(true);
  };

  const handleSavePrompt = () => {
    if (editingPrompt) {
      setPrompts((prev) =>
        prev.map((p) =>
          p.id === editingPrompt.id
            ? {
                ...p,
                name: promptForm.name,
                description: promptForm.description,
                content: promptForm.content,
                applicableModels: promptForm.applicableModels.split(',').map((m) => m.trim()),
              }
            : p
        )
      );
    } else {
      const newPrompt: SystemPrompt = {
        id: Date.now(),
        name: promptForm.name,
        description: promptForm.description,
        content: promptForm.content,
        applicableModels: promptForm.applicableModels.split(',').map((m) => m.trim()),
        enabled: true,
      };
      setPrompts((prev) => [...prev, newPrompt]);
    }
    setIsPromptModalOpen(false);
  };

  const handleDeletePrompt = (id: number) => {
    setPrompts((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <>
      <div className="space-y-6">
        <button
          onClick={() => handleOpenPromptModal()}
          className="px-6 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-medium transition-colors flex items-center gap-2"
        >
          <Plus size={20} />
          Create System Prompt
        </button>

        {prompts.map((prompt) => (
          <div key={prompt.id} className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">{prompt.name}</h3>
                  <button
                    onClick={() => handleTogglePrompt(prompt.id)}
                    className={`relative w-12 h-6 rounded-full transition-colors ${
                      prompt.enabled ? 'bg-orange-500' : 'bg-gray-300'
                    }`}
                  >
                    <div
                      className={`absolute w-5 h-5 bg-white rounded-full top-0.5 transition-transform ${
                        prompt.enabled ? 'translate-x-6' : 'translate-x-0.5'
                      }`}
                    ></div>
                  </button>
                </div>
                <p className="text-sm text-gray-600 mb-3">{prompt.description}</p>
              </div>
            </div>

            <div className="bg-gray-50 rounded p-4 mb-4">
              <p className="text-sm text-gray-700">{prompt.content}</p>
            </div>

            <div className="mb-4">
              <p className="text-sm font-medium text-gray-900 mb-2">Applied to models:</p>
              <div className="flex flex-wrap gap-2">
                {prompt.applicableModels.map((model) => (
                  <span
                    key={model}
                    className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
                  >
                    {model}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => handleOpenPromptModal(prompt)}
                className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50"
              >
                <Edit size={16} />
                Edit
              </button>
              <button
                onClick={() => handleDeletePrompt(prompt.id)}
                className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50"
              >
                <Trash2 size={16} />
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Create/Edit Prompt Modal */}
      {isPromptModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex justify-between items-center p-6 border-b border-gray-200 sticky top-0 bg-white">
              <h2 className="text-2xl font-bold text-gray-900">
                {editingPrompt ? 'Edit System Prompt' : 'Create System Prompt'}
              </h2>
              <button
                onClick={() => setIsPromptModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6">
              <p className="text-gray-600">
                {editingPrompt ? 'Update' : 'Define a new'} system prompt for AI model interactions
              </p>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Prompt Name</label>
                <input
                  type="text"
                  placeholder="Enter Prompt name"
                  value={promptForm.name}
                  onChange={(e) => setPromptForm({ ...promptForm, name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Description</label>
                <input
                  type="text"
                  placeholder="Brief description"
                  value={promptForm.description}
                  onChange={(e) => setPromptForm({ ...promptForm, description: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Prompt Content</label>
                <textarea
                  placeholder="enter the system prompt content....."
                  value={promptForm.content}
                  onChange={(e) => setPromptForm({ ...promptForm, content: e.target.value })}
                  rows={8}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">Applicable Models</label>
                <input
                  type="text"
                  placeholder="gpt-4"
                  value={promptForm.applicableModels}
                  onChange={(e) => setPromptForm({ ...promptForm, applicableModels: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
                <p className="text-xs text-gray-600 mt-1">Separate multiple models with commas (e.g., gpt-4, claude-3)</p>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex justify-end gap-4 p-6 border-t border-gray-200 bg-gray-50 sticky bottom-0">
              <button
                onClick={() => setIsPromptModalOpen(false)}
                className="px-6 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSavePrompt}
                className="px-6 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-medium transition-colors"
              >
                {editingPrompt ? 'Update' : 'Create'} Prompt
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}