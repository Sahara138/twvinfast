
import { useState } from "react";
import { Sparkles, CalendarDays, CornerUpLeft, CornerUpRight, Bot } from 'lucide-react';


import { CustomerReplySection } from "./CustomerReplaySection";
import { CustomerForwardSection } from "./CustomerForwardSection";
import { CustomerAiReplySection } from "./CustomerAiReplaySection";
import { CustomerAISidebar } from "./CustomerAISidebarSection";
export default function CustomerViewEmail() {
    const [activeSection, setActiveSection] = useState<string | null>(null);
    const [showAISidebar, setShowAISidebar] = useState(false);

    const handleSectionToggle = (section: string) => {
        setActiveSection(activeSection === section ? null : section);
    };

    return (
        <div className="min-h-screen bg-gray-50 relative">


            {/* Main Content */}
            <div className="p-6 px-8 lg:px-12 xl:px-14 mx-auto">

                {/* Email Header */}
                <div className='flex items-center justify-between mb-6 p-4'>
                    <div className='flex gap-x-4'>
                        <div>
                            <img src="https://i.pravatar.cc/40?img=7" className='h-12 w-12 rounded-full' alt="" />
                        </div>
                        <div className='space-y-1 text-black'>
                            <h3 className='font-medium text-lg'>Mike Johnson</h3>
                            <p className='text-sm'>sarah@company.com</p>
                            <p className='text-sm'>To: you@company.com</p>
                        </div>
                    </div>
                    <div className='flex gap-x-4'>
                        <button
                            onClick={() => setShowAISidebar(true)}
                            className='flex items-center gap-x-2 hover:bg-gray-100 px-3 py-1 rounded-lg transition-colors'
                        >
                            <Sparkles size={18} /> <p>AI Assistant</p>
                        </button>
                    </div>
                </div>

                {/* Divider */}
                <div className="flex items-center justify-between mt-4 pt-6 border-t border-[#DFE3E8]" />

                <div className='flex items-center gap-2 text-gray-500 text-sm mt-4 mb-6 justify-start'>
                    <CalendarDays size={22} />
                    <p>Sep 7, 2025 3:17 PM</p>
                </div>

                {/* Email Section */}
                <div className='p-4 border border-[#DFE3E8] rounded-lg shadow-sm space-y-4'>
                    <p className='text-gray-700 leading-7'>Hi Team,</p>
                    <p className='text-gray-700 leading-7 mt-4'>I hope this email finds you well. As we approach the end of Q3, it's crucial that we start preparing for our Q4 marketing strategy review. This review will help us assess our current strategies and make necessary adjustments to ensure we meet our year-end goals.</p>
                    <p className='text-gray-700 leading-7 mt-4'>Please come prepared with insights on your respective campaigns, including performance metrics, challenges faced, and opportunities for improvement. We will also discuss new initiatives and ideas to enhance our marketing efforts in the upcoming quarter.</p>
                    <p className='text-gray-700 leading-7 mt-4'>Looking forward to a productive discussion.</p>
                    <p className='text-gray-700 leading-7 mt-4'>Best regards,</p>
                    <p className='text-gray-700 leading-7 mt-2'>Mike Johnson</p>

                    <div className='flex gap-x-6 mt-6'>
                        <button
                            onClick={() => handleSectionToggle('reply')}
                            className={`px-4 py-3 flex gap-x-2  rounded-lg transition-colors ${activeSection === 'reply' ? 'bg-[#ED990B] text-white ' : 'text-black border border-[#DFE3E8] hover:bg-gray-50'
                                }`}
                        >
                            <CornerUpLeft size={20} /> <p>Write a reply</p>
                        </button>
                        <button
                            onClick={() => handleSectionToggle('forward')}
                            className={`px-4 py-3 flex gap-x-2 rounded-lg transition-colors ${activeSection === 'forward'
                                    ? 'bg-[#ED990B] text-white '
                                    : 'text-black border border-[#DFE3E8] hover:bg-gray-50'
                                }`}
                        >
                            <CornerUpRight size={20} /> <p>Forward a reply</p>
                        </button>
                        <button
                            onClick={() => handleSectionToggle('ai')}
                            className={`px-4 py-3 flex gap-x-2 rounded-lg transition-colors ${activeSection === 'ai'
                                    ? 'bg-[#ED990B] text-white '
                                    : 'text-black border border-[#DFE3E8] hover:bg-gray-50'
                                }`}
                        >
                            <Bot size={20} /> <p>AI reply</p>
                        </button>
                    </div>
                </div>

                {/* Render Active Section */}
                {activeSection === 'reply' && <CustomerReplySection onClose={() => setActiveSection(null)} />}
                {activeSection === 'forward' && <CustomerForwardSection onClose={() => setActiveSection(null)} />}
                {activeSection === 'ai' && <CustomerAiReplySection onClose={() => setActiveSection(null)} />}
            </div>

            {/* AI Assistant Sidebar */}
            <CustomerAISidebar isOpen={showAISidebar} onClose={() => setShowAISidebar(false)} />
        </div>
    );
}