import { useState } from "react";
import { Trash2 } from "lucide-react";
import type { ForbiddenWord } from "../../../types/SuperAdmin/AiModelManagement";

export default function ContentFiltering({ forbiddenWords: initialWords }: { forbiddenWords: ForbiddenWord[] }) {
  const [forbiddenWords, setForbiddenWords] = useState(initialWords);
  const [newWord, setNewWord] = useState("");
  const [contentFilterEnabled, setContentFilterEnabled] = useState(true);
  const [strictMode, setStrictMode] = useState(false);
  const [logFilteredRequests, setLogFilteredRequests] = useState(true);

  const handleAddWord = () => {
    if (newWord.trim()) {
      setForbiddenWords([
        ...forbiddenWords,
        { id: forbiddenWords.length + 1, word: newWord.trim() },
      ]);
      setNewWord("");
    }
  };

  const handleDeleteWord = (id: number) => {
    setForbiddenWords(forbiddenWords.filter((w) => w.id !== id));
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-6">Content Filtering</h2>
      <p className="text-gray-600 text-sm mb-8">
        Manage forbidden words and phrases across all AI interactions
      </p>

      {/* Forbidden Words */}
      <div className="mb-8">
        <h3 className="text-base font-semibold text-gray-900 mb-4">
          Forbidden Words ({forbiddenWords.length})
        </h3>
        <div className="flex gap-3 mb-4">
          <input
            type="text"
            placeholder="Enter word to block"
            value={newWord}
            onChange={(e) => setNewWord(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAddWord()}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          <button
            onClick={handleAddWord}
            className="px-6 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-medium transition-colors"
          >
            Add
          </button>
        </div>

        <div className="flex flex-wrap gap-3">
          {forbiddenWords.map((word) => (
            <div key={word.id} className="flex items-center gap-3 px-4 py-2 bg-gray-100 rounded-lg">
              <span className="text-sm text-gray-900">{word.word}</span>
              <button
                onClick={() => handleDeleteWord(word.id)}
                className="text-gray-500 hover:text-red-600 transition-colors"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Settings */}
      <div className="space-y-6 pt-8 border-t border-gray-200">
        {/* Enable Content Filtering */}
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-semibold text-gray-900">Enable Content Filtering</h3>
            <p className="text-sm text-gray-600 mt-1">
              Apply content filtering to all AI model responses
            </p>
          </div>
          <button
            onClick={() => setContentFilterEnabled(!contentFilterEnabled)}
            className={`relative w-14 h-8 rounded-full transition-colors ${
              contentFilterEnabled ? "bg-orange-500" : "bg-gray-300"
            }`}
          >
            <div
              className={`absolute w-6 h-6 bg-white rounded-full top-1 transition-transform ${
                contentFilterEnabled ? "translate-x-7" : "translate-x-1"
              }`}
            ></div>
          </button>
        </div>

        {/* Strict Mode */}
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-semibold text-gray-900">Strict Mode</h3>
            <p className="text-sm text-gray-600 mt-1">
              Block responses containing any filtered content
            </p>
          </div>
          <button
            onClick={() => setStrictMode(!strictMode)}
            className={`relative w-14 h-8 rounded-full transition-colors ${
              strictMode ? "bg-orange-500" : "bg-gray-300"
            }`}
          >
            <div
              className={`absolute w-6 h-6 bg-white rounded-full top-1 transition-transform ${
                strictMode ? "translate-x-7" : "translate-x-1"
              }`}
            ></div>
          </button>
        </div>

        {/* Log Filtered Requests */}
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-semibold text-gray-900">Log filtered requests</h3>
            <p className="text-sm text-gray-600 mt-1">
              Keep logs of filtered requests for audit purposes
            </p>
          </div>
          <button
            onClick={() => setLogFilteredRequests(!logFilteredRequests)}
            className={`relative w-14 h-8 rounded-full transition-colors ${
              logFilteredRequests ? "bg-orange-500" : "bg-gray-300"
            }`}
          >
            <div
              className={`absolute w-6 h-6 bg-white rounded-full top-1 transition-transform ${
                logFilteredRequests ? "translate-x-7" : "translate-x-1"
              }`}
            ></div>
          </button>
        </div>
      </div>
    </div>
  );
}
