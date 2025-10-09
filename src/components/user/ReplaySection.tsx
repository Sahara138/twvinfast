
import { CircleSlash, SendHorizontal, X } from 'lucide-react';
export function ReplySection({ onClose }: { onClose: () => void }) {
    return (
        <div className='mt-6 p-6 border border-[#DFE3E8] rounded-lg shadow-sm bg-white'>
            <div className='flex items-center justify-between mb-4'>
                <h3 className='text-lg font-medium text-gray-900'>Reply to Mike Johnson</h3>
                <button
                    onClick={onClose}
                    className='p-1 hover:bg-gray-100 rounded transition-colors'
                >
                    <X size={20} className='text-gray-500' />
                </button>
            </div>
            <textarea
                className='w-full h-40 p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary2 focus:border-transparent resize-none'
                placeholder='Type your reply...'
            />
            <div className='flex gap-x-4 mt-4'>
                <button className='bg-primary2 px-6 py-2 text-white rounded-lg hover:bg-primary2 transition-colors flex items-center gap-x-2'>
                    <SendHorizontal size={20} /> Send
                </button>
                <button className='px-6 py-2 text-gray-700 border border-[#DFE3E8] rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-x-2'>
                    <CircleSlash size={20} /> Save Draft
                </button>
            </div>
        </div>
    );
}