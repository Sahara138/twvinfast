
import {  SendHorizontal} from 'lucide-react';
import { RxCross2 } from "react-icons/rx";
import { TfiBackRight } from "react-icons/tfi";


export function ForwardSection({ onClose }: { onClose: () => void }) {
    return (
        <div className='mt-12 px-[15px] md:px-[28px] pb-6 border border-[#DFE3E8] rounded-lg shadow-sm'>
            <div className='flex justify-between items-center'>
                <div className='flex items-center gap-x-2'>
                    <TfiBackRight size={24} className='hidden md:block'/>
                    <div className='flex items-center'>
                        <h6 className="font-medium text-sm md:text-lg text-black01">To:</h6>
                        <input 
                            type='email' 
                            className='w-[500px] p-2 mb-4 rounded-lg focus:outline-none focus:border-transparent mt-4 text-xs md:text-sm font-normal'
                            placeholder='demo@gmail.com'
                        />
                    </div>
                </div>
    
                    <button 
                        onClick={onClose}
                        className=' hover:bg-gray-100 rounded transition-colors'
                    >
                        <RxCross2 size={24} className='text-gray-500' />
                    </button>
                
            </div>
            
            <div className='p-0 md:p-4 rounded-lg mb-4 text-xs md:text-sm font-normal text-gray-500'>
                <p className='mb-5 '>---------- Forwarded message ----------</p>
                <p>From: Mike Johnson &lt;sarah@company.com&gt;</p>
                <p>Date: Sep 7, 2025 at 3:17 PM</p>
                <p>To: you@company.com</p>
            </div>
            <textarea 
                className='w-full h-32 p-4  bg-gray-100  rounded-lg focus:outline-none focus:border-transparent resize-none text-sm font-normal text-black01'
                placeholder='Add a message...'
            />
            <div className='flex gap-x-4 mt-4'>
               <button className='bg-primary2 px-6 py-2 text-white rounded-lg hover:bg-[#D88009] transition-colors flex items-center gap-x-2'>
                    <div className="flex items-center gap-x-[10px] ">
                        <SendHorizontal size={14} /> 
                        <p className="text-sm md:text-base font-normal">Send</p>
                    </div>
                </button>
                
            </div>
        </div>
    );
}
