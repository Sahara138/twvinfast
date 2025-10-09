
import {  SendHorizontal, X } from 'lucide-react';
export function ForwardSection({ onClose }: { onClose: () => void }) {
    return (
        <div className='mt-6 p-6 border border-[#DFE3E8] rounded-lg shadow-sm bg-white'>
            <div className='flex items-center justify-end mb-4'>
                <button 
                    onClick={onClose}
                    className='p-1 hover:bg-gray-100 rounded transition-colors'
                >
                    <X size={20} className='text-gray-500' />
                </button>
            </div>
            <input 
                type='email' 
                className='w-full p-3 mb-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary2 focus:border-transparent'
                placeholder='To: demo@gmail.com'
            />
            <div className='p-4 rounded-lg mb-4 text-sm text-gray-600'>
                <p className='mb-2'>---------- Forwarded message ----------</p>
                <p>From: Mike Johnson &lt;sarah@company.com&gt;</p>
                <p>Date: Sep 7, 2025 at 3:17 PM</p>
                <p>To: you@company.com</p>
            </div>
            <textarea 
                className='w-full h-32 p-4  bg-gray-50  rounded-lg focus:outline-none focus:ring-2 focus:ring-primary2 focus:border-transparent resize-none'
                placeholder='Add a message...'
            />
            <div className='flex gap-x-4 mt-4'>
               <button className='bg-primary2 px-6 py-2 text-white rounded-lg hover:bg-[#D88009] transition-colors flex items-center gap-x-2'>
                    <SendHorizontal size={20} /> Send
                </button>
                
            </div>
        </div>
    );
}
