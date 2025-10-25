import { useState } from 'react';
import Calendar from '../../../components/Admin/Intrgrations/Calender';
import Internal from '../../../components/Admin/Intrgrations/Internal';
import Heading from '../../../components/Admin/Heading';


export default function Integrations() {
  const [activeTab, setActiveTab] = useState<'internal' | 'calendar'>('internal');


  return (
    <div className="min-h-screen ">
      <div className="main-container mx-auto">
        <Heading heading1="Integrations" heading2="Manage your integrations and connected tools" />
    

        <div className="md:flex md:gap-3 mb-6 pt-8 border-t border-[#DFE3E8]">
          <button
            onClick={() => setActiveTab('internal')}
            className={`px-4 py-2 mr-2 mb-2 md:mb-0 text-sm font-medium rounded-md transition-colors ${
              activeTab === 'internal'
                ? 'bg-primary text-white'
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
            }`}
          >
            Internal Tools
          </button>
          <button
            onClick={() => setActiveTab('calendar')}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
              activeTab === 'calendar'
                ? 'bg-primary text-white'
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
            }`}
          >
            Calendar
          </button>
        </div>

        {activeTab === 'calendar' && (
          <Calendar />
        )}

        {activeTab === 'internal' && (
          <Internal />
        )}
      </div>
    </div>
  );
}
