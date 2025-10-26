import { Sparkles, X } from "lucide-react";

export function AiReplySection({ onClose }: { onClose: () => void }) {
    return (
        <div className='mt-6 p-6 border border-[#DFE3E8] rounded-lg shadow-sm'>
            <div className='flex items-center justify-between mb-4'>
                <h3 className='text-base md:text-lg font-medium text-gray-900'> Reply to Johnson</h3>
                <button
                    onClick={onClose}
                    className='p-1 hover:bg-gray-100 rounded transition-colors'
                >
                    <X size={20} className='text-gray-500' />
                </button>
            </div>

            <div className='bg-gray-50 p-5 rounded-lg mb-4 bg-gray-100'>
                <div className='flex items-center gap-2 mb-3'>
                    <Sparkles size={18} className='text-primary2' />
                    <span className='text-xs md:text-sm  font-medium text-gray-700'>AI Assistant</span>
                </div>
                <div className='space-y-3 text-gray-700 font-normal text-xs md:text-sm  leading-relaxed'>
                    <p>Hello Mike Johnson,</p>
                    <p>Thank you for your email about "Q4 Marketing Strategy Review". I have noted your concerns and will address them accordingly.</p>
                    <p>I will get back to you with a detailed response within the next 24 hours.</p>
                    <p>Regards,</p>
                </div>
            </div>


            <div className='md:flex gap-x-4 mt-6'>
                <button className='bg-primary2 mr-2 md:mr-0 mb-2 md:mb-0 px-2 md:px-6 py-2 text-white rounded-lg hover:bg-[#D88009] transition-colors'>
                    <p className="text-sm md:text-base font-normal">Use This Reply</p>
                </button>
                <button className='px-2 md:px-6 py-2 text-gray-700 border border-[#DFE3E8] rounded-lg hover:bg-gray-50 transition-colors'>
                    <p className="text-sm md:text-base font-normal">Regenerate</p>
                </button>
            </div>
        </div>
    );
}
