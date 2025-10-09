
import { ArrowLeft, Send, Image, Smile, Sparkles, Save, X } from 'lucide-react';
import { Link } from 'react-router';
import { useState } from 'react';
export default function ComposeEmail() {
    const [isAiOpen, setIsAiOpen] = useState(false);
    return (
        <div className="">
            {/* Header */}
            <header className="bg-white h-22 sticky top-0 z-10 px-6  border-b border-gray-200">
                <div className='flex items-center justify-between h-full'>
                    <div className="flex items-center gap-3">
                        <Link to={'/user'}
                            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                            aria-label="Go back"
                        >
                            <ArrowLeft className="w-5 h-5 text-gray-700" />
                        </Link>
                        <h1 className="text-lg  text-gray-900">Compose Email</h1>
                    </div>

                    <div className="flex items-center gap-3">
                        <button onClick={() => setIsAiOpen(true)} className="flex items-center border border-[#C4CDD5]  gap-2 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                            <Sparkles className="w-4 h-4" />
                            AI Composer
                        </button>
                        <button className="flex items-center border border-[#C4CDD5]  gap-2 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                            <Save className="w-4 h-4" />
                            Save Draft
                        </button>
                        <button className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-white bg-primary2 hover:bg-teal-400 rounded-lg transition-colors shadow-sm">
                            <Send className="w-4 h-4" />
                            Send
                        </button>
                    </div>
                </div>
            </header>

            {/* Email Form */}
            <div className="p-6 lg:p-14 xl:p-18 mx-auto max-w-7xl">
                <div className="flex items-center gap-4 pb-4 border-b border-gray-100">
                    <label className=" font-medium  w-20">To:</label>
                    <input
                        type="text"
                        placeholder="Recipients"
                        className="flex-1 px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 bg-gray-50 border border-transparent rounded-lg focus:outline-none focus:bg-white focus:border-gray-300 transition-colors"
                    />
                    <div className="flex items-center gap-2">
                        <button className=" transition-colors">
                            Cc
                        </button>
                        <button className=" transition-colors">
                            Bcc
                        </button>
                    </div>
                    {/* AI Composer Sidebar */}
                    <div className={`fixed inset-0 z-50 pointer-events-none ${isAiOpen ? '' : 'pointer-events-none'}`} aria-hidden={!isAiOpen}>
                        {/* overlay */}
                        <div
                            onClick={() => setIsAiOpen(false)}
                            className={`absolute inset-0 bg-black/30 transition-opacity duration-500 ease-in-out ${isAiOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
                        />

                        {/* panel wrapper */}
                        <div className={`absolute inset-y-0 top-22 right-0 w-full md:w-1/2 lg:w-1/4 h-fit flex justify-center transition-transform duration-500 ease-in-out ${isAiOpen ? 'translate-x-0 pointer-events-auto' : 'translate-x-full pointer-events-none'}`}>
                            <div className="bg-[#F9FAFB] rounded-xl shadow-2xl w-full max-w-md  transform will-change-transform">
                                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                                    <div className="flex items-center gap-2">
                                        <Sparkles className="w-5 h-5 text-primary2" />
                                        <h2 className="text-lg font-semibold text-gray-900">AI Composer</h2>
                                    </div>
                                    <button onClick={() => setIsAiOpen(false)} className="text-gray-400 hover:text-gray-600 transition-colors">
                                        <X className="w-5 h-5" />
                                    </button>
                                </div>

                                <div className="p-6 space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">What do you want to write about?</label>
                                        <textarea placeholder="I want to write a formal..." className="w-full h-24 px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-transparent" />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Email Tone</label>
                                        <select className="w-full px-3 py-2 text-sm text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-transparent">
                                            <option>Formal</option>
                                            <option>Casual</option>
                                            <option>Friendly</option>
                                            <option>Professional</option>
                                            <option>Persuasive</option>
                                        </select>
                                    </div>

                                    <button className="w-full bg-primary2 hover:bg-teal-300 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-medium py-3 rounded-lg transition-colors flex items-center justify-center gap-2">
                                        <Sparkles className="w-4 h-4" />
                                        Generate Email
                                    </button>

                                    <div className="border-t border-gray-200 pt-4">
                                        <p className="text-xs text-gray-500 text-center">The AI will generate a complete email with subject and body based on your prompt and selected tone.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Subject Field */}
                <div className="flex items-center gap-4 py-4 border-b border-gray-100">
                    <label className="font-medium w-20">Subject:</label>
                    <input
                        type="text"
                        placeholder="Email Subject"
                        className="flex-1 px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 bg-gray-50 border border-transparent rounded-lg focus:outline-none focus:bg-white focus:border-gray-300 transition-colors"
                    />
                </div>

                {/* Message Area */}
                <div className="relative mt-6">
                    <textarea
                        placeholder="Type Your Message here..."
                        className="w-full h-96 px-4 py-4 text-sm text-gray-900 placeholder:text-gray-400 bg-gray-50 border border-gray-200 rounded-lg resize-none focus:outline-none focus:bg-white focus:border-gray-300 transition-colors"
                    />

                </div>

                {/* Footer Actions */}
                <div className='border border-[#C4CDD5] mt-6' />
                <div className="flex items-center justify-between mt-6">
                    <div className="flex items-center gap-3">
                        <button className="flex items-center gap-2 border border-[#C4CDD5]  px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                            <Image className="w-4 h-4" />
                            Attach Media
                        </button>
                        <button className="flex items-center  border border-[#C4CDD5]  gap-2 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                            <Smile className="w-4 h-4" />
                            Emoji
                        </button>
                    </div>

                    <p className="text-xs text-gray-500">
                        Auto-save enabled • Signature will be added automatically
                    </p>
                </div>
            </div>

        </div>
    );
}