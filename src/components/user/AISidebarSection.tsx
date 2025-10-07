import { Sparkles, X } from "lucide-react";
interface AISidebarProps {
    isOpen: boolean;
    onClose: () => void;
}
export function AISidebar({ isOpen, onClose }: AISidebarProps) {
    return (
        <div className={`fixed inset-0 z-40 transition-opacity duration-300 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
            {/* Overlay */}
            <div
                className='absolute inset-0 '
                onClick={onClose}
            />        
            <div className={`fixed inset-y-0 top-22 right-0 w-80 bg-white shadow-2xl max-h-screen overflow-y-auto transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
               
                <div className='flex items-center justify-between p-4 border-b border-gray-200'>
                    <div className='flex items-center gap-2'>
                        <Sparkles size={18} className='text-gray-700' />
                        <h2 className='text-lg font-semibold text-gray-900'>AI Assistant</h2>
                    </div>
                    <button
                        onClick={onClose}
                        className='p-1 hover:bg-gray-100 rounded transition-colors'
                    >
                        <X size={20} className='text-gray-500' />
                    </button>
                </div>

                {/* Sidebar Content */}
                <div className='p-4'>
                    {/* Summary Section */}
                    <div className='mb-6 shadow-sm border border-[#DFE3E8] p-4 rounded-lg'>
                        <h3 className='text-sm font-semibold text-gray-900 mb-2'>Summary</h3>
                        <p className='text-sm text-gray-600 mb-3'>
                            Client George Lane has requested specific information for clarification.
                        </p>
                        <ul className='space-y-2 text-sm text-gray-600'>
                            <li className='flex items-start gap-2'>
                                <span className='text-gray-400 mt-1'>•</span>
                                <span>Asked for details regarding [specific topic: e.g., project timeline, application process, or required documents]</span>
                            </li>
                            <li className='flex items-start gap-2'>
                                <span className='text-gray-400 mt-1'>•</span>
                                <span>Willing to provide additional details if required</span>
                            </li>
                            <li className='flex items-start gap-2'>
                                <span className='text-gray-400 mt-1'>•</span>
                                <span>Message is polite and indicates genuine interest</span>
                            </li>
                        </ul>
                    </div>


                    {/* Suggested Actions */}
                    <div className='mb-6 shadow-sm border border-[#DFE3E8] p-4 rounded-lg'>
                        <h3 className='text-sm font-semibold text-gray-900 mb-2'>Suggested Actions</h3>
                        <ul className='space-y-2 text-sm text-gray-600'>
                            <li className='flex items-start gap-2'>
                                <span className='text-gray-400 mt-1'>•</span>
                                <span>Share requested information in detail with supporting documents</span>
                            </li>
                            <li className='flex items-start gap-2'>
                                <span className='text-gray-400 mt-1'>•</span>
                                <span>Offer a follow-up call or meeting for clarification</span>
                            </li>
                            <li className='flex items-start gap-2'>
                                <span className='text-gray-400 mt-1'>•</span>
                                <span>Provide alternate point of contact if necessary</span>
                            </li>
                        </ul>
                    </div>

                    {/* Lead Score */}
                    <div className='mb-6 shadow-sm border border-[#DFE3E8] p-4 rounded-lg'>
                        <h3 className='text-sm font-semibold text-gray-900 mb-3'>Lead Score</h3>
                        <div className='flex items-center gap-3 mb-2'>
                            <span className='text-3xl font-bold text-gray-900'>75</span>
                            <div className='flex-1'>
                                <div className='w-full bg-gray-200 rounded-full h-2'>
                                    <div className='bg-gradient-to-r from-orange-400 to-orange-500 h-2 rounded-full' style={{ width: '75%' }}></div>
                                </div>
                            </div>
                        </div>
                        <p className='text-xs text-gray-600'>Good potential, requires timely follow-up</p>
                    </div>

                    {/* Contact Information */}
                    <div className="shadow-sm border border-[#DFE3E8] p-4 rounded-lg">
                        <h3 className='text-sm font-semibold text-gray-900 mb-2'>Contact Information</h3>
                        <div className='text-sm text-gray-600'>
                            <p className='mb-1'>Email:</p>
                            <p className='text-gray-900'>lanegorge5242gmail.com</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
