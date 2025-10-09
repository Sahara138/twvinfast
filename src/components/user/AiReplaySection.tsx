import { Sparkles, X } from "lucide-react";

export function AiReplySection({ onClose }: { onClose: () => void }) {
    return (
        <div className='mt-6 p-6 border border-[#DFE3E8] rounded-lg shadow-sm bg-white'>
            <div className='flex items-center justify-between mb-4'>
                <h3 className='text-lg font-medium text-gray-900'> Reply to Johnson</h3>
                <button
                    onClick={onClose}
                    className='p-1 hover:bg-gray-100 rounded transition-colors'
                >
                    <X size={20} className='text-gray-500' />
                </button>
            </div>

            <div className='bg-gray-50 p-4 rounded-lg mb-4'>
                <div className='flex items-center gap-2 mb-3'>
                    <Sparkles size={18} className='text-primary2' />
                    <span className='text-sm font-medium text-gray-700'>AI Assistant</span>
                </div>
                <div className='space-y-3 text-gray-700 text-sm leading-relaxed'>
                    <p>Hello Mike Johnson,</p>
                    <p>Thank you for your email about "Q4 Marketing Strategy Review". I have noted your concerns and will address them accordingly.</p>
                    <p>I will get back to you with a detailed response within the next 24 hours.</p>
                    <p>Regards,</p>
                </div>
            </div>


            <div className='flex gap-x-4'>
                <button className='bg-primary2 px-6 py-2 text-white rounded-lg hover:bg-[#D88009] transition-colors'>
                    Use This Reply
                </button>
                <button className='px-6 py-2 text-gray-700 border border-[#DFE3E8] rounded-lg hover:bg-gray-50 transition-colors'>
                    Regenerate
                </button>
            </div>
        </div>
    );
}
