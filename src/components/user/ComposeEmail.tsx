import { ArrowLeft, Send, Image, Smile, Sparkles, Save, Loader } from 'lucide-react';
import { Link, useNavigate } from 'react-router';
import { useRef, useState } from 'react';
import { useComposeEmailMutation, useGetMailboxInfoQuery, useSaveDraftMutation } from '../../redux/dashboardApi/user/mail/mailApi';
import { toast } from 'react-toastify';
// import type { EmailResonse } from '../../types/User/Mail';

export default function ComposeEmail() {
    const [isAiOpen, setIsAiOpen] = useState(false);
    console.log(isAiOpen)
        const [isLoading, setIsLoading] = useState(false);
        const [isSavingLoading, setIsSavingLoading] = useState(false);

    const navigate = useNavigate();
    const { data: mailbox } = useGetMailboxInfoQuery();
    const mailboxId = mailbox?.id;
    const fileInputRef = useRef<HTMLInputElement | null>(null);


    const [createMail] = useComposeEmailMutation();
    const [saveEmail] = useSaveDraftMutation();
    const [files, setFiles] = useState<File[]>([]);
    const [formData, setFormData] = useState({
        to: "",
        cc: "",
        bcc: "",
        subject: "",
        text: "",
    });

    const handleSendEmail = async () => {
    if (!mailboxId) return alert("Mailbox not loaded yet");
    if (!formData.to.trim()) return alert("Recipient is required");
    console.log(formData)

    try {
        setIsLoading(true)
        const payload = new FormData();

        // Backend expects JSON in 'data' key
        const data = {
            mailbox_id: mailboxId,
            subject: formData.subject,
            text: formData.text,
            to: formData.to.split(",").map(s => s.trim()).filter(Boolean),
            cc: formData.cc.split(",").map(s => s.trim()).filter(Boolean),
            bcc: formData.bcc.split(",").map(s => s.trim()).filter(Boolean),
        };

        payload.append("data", JSON.stringify(data));

        // Append files separately
        files.forEach(file => payload.append("files", file));

        await createMail(payload).unwrap();

        toast.success("Email sent successfully!");
        setFormData({ to: "", cc: "", bcc: "", subject: "", text: "" });
        setFiles([]);
        navigate("/user");
    } catch (error) {
        console.error("SEND ERROR:", error);
        alert("Failed to send email");
    } finally {
        setIsLoading(false)
    }
};
const handleSaveDraft = async () => {
  if (!mailboxId) return alert("Mailbox not loaded yet");

  try {
    setIsSavingLoading(true);
    const payload = new FormData();

    const data = {
      mailbox_id: mailboxId,
      subject: formData.subject,
      text: formData.text,
      to: formData.to.split(",").map(s => s.trim()).filter(Boolean),
      cc: formData.cc.split(",").map(s => s.trim()).filter(Boolean),
      bcc: formData.bcc.split(",").map(s => s.trim()).filter(Boolean),
      draft: true, // flag for draft
    };

    payload.append("data", JSON.stringify(data));

    files.forEach(file => payload.append("files", file));

    await saveEmail(payload).unwrap(); // same mutation can be used

    toast.success("Draft saved successfully!");
  } catch (error) {
    console.error("SAVE DRAFT ERROR:", error);
    alert("Failed to save draft");
  } finally{
    setIsSavingLoading(false);
  }
};



    return (
        <div>
            {/* Header */}
            <header className="bg-white h-22 sticky top-0 z-10 lg:px-6 border-b border-gray-200">
                <div className='flex items-center justify-between h-full'>
                    <div className="flex items-center lg:gap-3">
                        <Link to={'/user'} className="p-1 hover:bg-gray-100 rounded-full">
                            <ArrowLeft className="w-5 h-5 text-gray-700" />
                        </Link>
                        <h1 className="text-sm md:text-lg text-gray-900">Compose Email</h1>
                    </div>
                    <div className="hidden md:flex items-center gap-3">
                        <button onClick={() => setIsAiOpen(true)} className="flex items-center border border-[#C4CDD5] gap-2 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg">
                            <Sparkles className="w-4 h-4" /> AI Composer
                        </button>
                        <button onClick={handleSaveDraft} className="flex items-center border border-[#C4CDD5] gap-2 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg">
                            <Save className="w-4 h-4" />{isSavingLoading ? "Saving" : "Save Draft" } 
                        </button>
                        <button onClick={handleSendEmail} className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-white bg-primary2 hover:bg-teal-400 rounded-lg shadow-sm">
                            <Send className="w-4 h-4" /> {isLoading ? "Sending" : "Send" } 
                        </button>
                    </div>
                    <div className="flex md:hidden items-center gap-0 md:gap-3">
                        <button onClick={() => setIsAiOpen(true)} className="px-2 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg">
                            <Sparkles className="w-4 h-4" />
                        </button>
                        <button onClick={handleSaveDraft} className="px-2 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg">
                            { isSavingLoading ? <Loader className="w-4 h-4" /> :
                                <Save className="w-4 h-4" />
                            }
                        </button>
                        <button onClick={handleSendEmail} className="px-2 py-2 text-sm font-medium text-white bg-primary2 hover:bg-teal-400 rounded-lg shadow-sm">
                            { isLoading ? <Loader className="w-4 h-4" /> :
                                <Send className="w-4 h-4" />
                            }
                        </button>
                    </div>
                </div>
            </header>

            {/* Email Form */}
            <div className="p-6 lg:p-14 xl:p-18 mx-auto max-w-7xl">
                <div className="w-full md:flex items-center md:gap-4 md:pb-4 border-b border-gray-100">
                    <div>
                        <label className="font-medium w-20 mr-8 md:mr-5">To:</label>
                        <input
                            type="email"
                            placeholder="Recipients"
                            value={formData.to}
                            onChange={(e) => setFormData({ ...formData, to: e.target.value })}
                            className="flex-1 w-[80%] px-3 py-2 text-sm md:mt-0 mt-2 text-gray-900 placeholder:text-gray-400 bg-gray-50 border border-transparent rounded-lg focus:outline-none focus:bg-white focus:border-gray-300 transition-colors"
                        />
                    </div>
                    <div className="flex items-center gap-2 mt-2 md:mt-0 justify-end">
                        <input
                            type="email"
                            placeholder="BCC"
                            value={formData.bcc}
                            onChange={(e) => setFormData({ ...formData, bcc: e.target.value })}
                            className="flex-1 w-[80%] px-3 py-2 text-sm md:mt-0 mt-2 text-gray-900 placeholder:text-gray-400 bg-gray-50 border border-transparent rounded-lg focus:outline-none focus:bg-white focus:border-gray-300 transition-colors"
                        />
                        <input
                            type="email"
                            placeholder="CC"
                            value={formData.cc}
                            onChange={(e) => setFormData({ ...formData, cc: e.target.value })}
                            className="flex-1 w-[80%] px-3 py-2 text-sm md:mt-0 mt-2 text-gray-900 placeholder:text-gray-400 bg-gray-50 border border-transparent rounded-lg focus:outline-none focus:bg-white focus:border-gray-300 transition-colors"
                        />
                    </div>
                </div>

                {/* Subject */}
                <div className="flex items-center gap-2 md:gap-2 md:py-4 border-b border-gray-100">
                    <label className="font-medium w-20">Subject:</label>
                    <input
                        type="text"
                        placeholder="Email Subject"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="flex-1 px-3 py-2 text-sm md:mt-0 mt-2 text-gray-900 placeholder:text-gray-400 bg-gray-50 border border-transparent rounded-lg focus:outline-none focus:bg-white focus:border-gray-300 transition-colors"
                    />
                </div>

                {/* Message */}
                <div className="relative mt-6">
                    <textarea
                        value={formData.text}
                        onChange={(e) => setFormData({ ...formData, text: e.target.value })}
                        placeholder="Type Your Message here..."
                        className="w-full h-96 px-4 py-4 text-sm text-gray-900 placeholder:text-gray-400 bg-gray-50 border border-gray-200 rounded-lg resize-none focus:outline-none focus:bg-white focus:border-gray-300 transition-colors"
                    />
                </div>

                {/* Footer */}
                <div className='border border-[#C4CDD5] mt-6' />
                <div className="md:flex items-center justify-between mt-6">
                    <div className="md:flex items-center gap-3">
                        <button onClick={() => fileInputRef.current?.click()} className="flex items-center gap-2 border border-[#C4CDD5] px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                            <Image className="w-4 h-4" /> Attach Media
                        </button>
                        <input
                            type="file"
                            multiple
                            hidden
                            ref={fileInputRef}
                            onChange={(e) => e.target.files && setFiles(Array.from(e.target.files))}
                        />
                        <button     
  className="my-3 md:my-0 flex items-center gap-2 border border-[#C4CDD5] px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                            <Smile className="w-4 h-4" /> Emoji
                        </button>
                    </div>
                    <p className="text-xs text-gray-500">Auto-save enabled • Signature will be added automatically</p>
                </div>
            </div>
        </div>
    );
}
