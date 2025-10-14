import { useState } from 'react';
import { Settings } from 'lucide-react';
import type { AIModel,SystemPrompt,ForbiddenWord } from '../../../types/SuperAdmin/AiModelManagement';
import AIModelsTab from '../../../components/SuperAdmin/AiModelManagement/AIModelsTab';
import SystemPromptTab from '../../../components/SuperAdmin/AiModelManagement/SystemPrompt';
import ContentFiltering from '../../../components/SuperAdmin/AiModelManagement/ContentFiltering';

const mockModels: AIModel[] = [
  {
    id: 1,
    name: 'GPT-4',
    provider: 'OpenAI',
    usage: 45,
    uptime: 98.9,
    enabled: true,
    requestCount: 11362,
    avgResponse: 2.1,
  },
  {
    id: 2,
    name: 'Claude-3 Sonnet',
    provider: 'Anthropic',
    usage: 32,
    uptime: 97.5,
    enabled: true,
    requestCount: 10052,
    avgResponse: 2.5,
  },
  {
    id: 3,
    name: 'Mistral Large',
    provider: 'Mistral AI',
    usage: 65,
    uptime: 98.3,
    enabled: false,
    requestCount: 8352,
    avgResponse: 1.8,
  },
  {
    id: 4,
    name: 'Gemini Pro',
    provider: 'Google',
    usage: 52,
    uptime: 98.8,
    enabled: true,
    requestCount: 10352,
    avgResponse: 2.2,
  },
];
const mockPrompts: SystemPrompt[] = [
  {
    id: 1,
    name: 'Customer Service Assistant',
    description: 'Default prompt for customer service interactions',
    content: 'You are a helpful customer service assistant. Always be polite, professional, and provide accurate information....',
    applicableModels: ['gpt-4'],
    enabled: true,
  },
  {
    id: 2,
    name: 'Technical Support',
    description: 'Specialized prompt for technical support queries',
    content: 'You are a technical support specialist with expertise in troubleshooting and problem solving....',
    applicableModels: ['gpt-4', 'claude-3'],
    enabled: true,
  },
  {
    id: 3,
    name: 'Sales Assistant',
    description: 'Prompt for sales and lead qualification',
    content: 'You are a sales assistant focused on understanding customer needs and providing relevant solutions....',
    applicableModels: ['mistral-large'],
    enabled: true,
  },
];
const mockForbiddenWords: ForbiddenWord[] = [
  { id: 1, word: 'inappropriate_term_1' },
  { id: 2, word: 'spam_keyword' },
  { id: 3, word: 'prohibited_content' },
  { id: 4, word: 'harmful_language' },
  { id: 5, word: 'offensive_word' },
];
export default function AIModelManagement() {
  const [activeTab, setActiveTab] = useState<'models' | 'prompts' | 'filtering'>('models');
  const [models, setModels] = useState(mockModels);
  const [prompts, setPrompts] = useState(mockPrompts);
  const [forbiddenWords] = useState(mockForbiddenWords);

  return (
    <div >
      <div >
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">AI Model Management</h1>
          <p className="text-gray-600">Manage your platform with complete administrative control</p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600 text-xs md:text-sm font-medium">Active Models</span>
              <Settings size={18} className="text-gray-400" />
            </div>
            <p className="text-2xl md:text-3xl font-bold text-blue-600">4</p>
            <p className="text-gray-500 text-xs mt-1">Currently operational</p>
          </div>

          <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600 text-xs md:text-sm font-medium">Total Requests</span>
              <Settings size={18} className="text-gray-400" />
            </div>
            <p className="text-2xl md:text-3xl font-bold text-red-500">17</p>
            <p className="text-gray-500 text-xs mt-1">This month</p>
          </div>

          <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600 text-xs md:text-sm font-medium">Avg Response Time</span>
              <Settings size={18} className="text-gray-400" />
            </div>
            <p className="text-2xl md:text-3xl font-bold text-green-600">1.9s</p>
            <p className="text-gray-500 text-xs mt-1">Across all models</p>
          </div>

          <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600 text-xs md:text-sm font-medium">Overall Accuracy</span>
              <Settings size={18} className="text-gray-400" />
            </div>
            <p className="text-2xl md:text-3xl font-bold text-orange-500">94.1%</p>
            <p className="text-gray-500 text-xs mt-1">+0.2% from last week</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          <button
            onClick={() => setActiveTab('models')}
            className={`px-4 py-2 font-medium rounded-lg transition-colors ${
              activeTab === 'models'
                ? 'bg-orange-500 text-white'
                : 'bg-white text-gray-600 hover:text-gray-900'
            }`}
          >
            AI Models
          </button>
          <button
            onClick={() => setActiveTab('prompts')}
            className={`px-4 py-2 font-medium rounded-lg transition-colors ${
              activeTab === 'prompts'
                ? 'bg-orange-500 text-white'
                : 'bg-white text-gray-600 hover:text-gray-900'
            }`}
          >
            System Prompts
          </button>
          <button
            onClick={() => setActiveTab('filtering')}
            className={`px-4 py-2 font-medium rounded-lg transition-colors ${
              activeTab === 'filtering'
                ? 'bg-orange-500 text-white'
                : 'bg-white text-gray-600 hover:text-gray-900'
            }`}
          >
            Content Filtering
          </button>
        </div>

        {/* AI Models Tab */}
        {activeTab === 'models' && (
         <AIModelsTab models={models} setModels={setModels} />
        )} 

        {/* System Prompts Tab */}
        {activeTab === 'prompts' && (
         <SystemPromptTab prompts={prompts} setPrompts={setPrompts} />
     
        )}

        {/* Content Filtering Tab */}
        {activeTab === 'filtering' && (
        
          <ContentFiltering forbiddenWords={forbiddenWords} />
        )}
      </div>

     
    </div>
  );
}