import { useState } from 'react';

import CompanyProfile from '../../../components/Admin/BusinessInfo/CompanyProfile';
import KnowledgeBase from '../../../components/Admin/BusinessInfo/KnowledgeBase';
import Policies from '../../../components/Admin/BusinessInfo/Policies';
import Products from '../../../components/Admin/BusinessInfo/Products';

type TabType = 'company-profile' | 'knowledge-base' | 'policies' | 'products';

export default function BusinessInfo() {
    const [activeTab, setActiveTab] = useState<TabType>('company-profile');

    const tabs = [
        { id: 'company-profile' as TabType, label: 'Company Profile' },
        { id: 'knowledge-base' as TabType, label: 'Knowledge Base' },
        { id: 'policies' as TabType, label: 'Policies' },
        { id: 'products' as TabType, label: 'Products' },
    ];

    const renderContent = () => {
        switch (activeTab) {
            case 'company-profile':
                return <CompanyProfile />;
            case 'knowledge-base':
                return <KnowledgeBase />;
            case 'policies':
                return <Policies />;
            case 'products':
                return <Products />;
            default:
                return <CompanyProfile />;
        }
    };

    return (
        <div className="min-h-screen ">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <div className="flex items-start justify-between mb-6">
                    <div>
                        <h1 className="text-2xl font-semibold text-gray-900 mb-1">Business Information</h1>
                        <p className="text-sm text-gray-600">
                            Manage your company profile, knowledge base, and product catalogue Company Profile
                        </p>
                    </div>

                </div>

                <div className='border-b my-8 border-[#C4CDD5]' />

                {/* Tabs */}
                <div className="flex gap-2 mb-6 ">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`px-4 py-2.5 text-sm font-medium transition-all relative ${activeTab === tab.id
                                ? 'text-gray-900 bg-[#ED990B] rounded-lg'
                                : 'text-gray-600 hover:text-gray-900 border-[#DFE3E8] hover:bg-gray-100 rounded-lg border'
                                }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Content */}
                <div className="bg-white rounded-lg shadow-sm">
                    {renderContent()}
                </div>
            </div>
        </div>
    );
}


