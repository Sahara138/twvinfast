
import { CircleSlash, SendHorizontal, X } from 'lucide-react';
import { useGetMailboxInfoQuery, useGetThreadByTreadIdQuery, useReplyEmailMutation, useSaveDraftMutation } from '../../redux/dashboardApi/user/mail/mailApi';
import { useState } from 'react';
import { skipToken } from "@reduxjs/toolkit/query/react";
import { useParams } from 'react-router';
import { toast } from 'react-toastify';

export function ReplySection({ onClose }: { onClose: () => void }) {
    const [isLoading, setIsLoading] = useState(false);
    const [isSavingLoading, setIsSavingLoading] = useState(false);
    
    // const navigate = useNavigate();
    const { data: mailbox} =useGetMailboxInfoQuery();
    const mailboxId = mailbox?.id;
    console.log(mailboxId);

    const threadId = useParams();
    const threadIdNumber = threadId ? Number(threadId.id) : undefined;
    console.log(threadIdNumber);

    const { data } = useGetThreadByTreadIdQuery(
        threadIdNumber !== undefined ? { threadId: threadIdNumber } : skipToken
      );
    const toEmail: string = data?.emails?.[0]?.from_address ?? "";

//   const { data, isLoading } = useGetThreadByTreadIdQuery(
//     threadIdNumber !== undefined ? { threadId: threadIdNumber } : skipToken
//   );
    const [saveReplyMail] = useSaveDraftMutation();
    
    const [ replyMail ] = useReplyEmailMutation();
    const [files,setFiles] = useState<File[]>([]);
    const [formData, setFormData] = useState({
        to: "",
        text: "",
    })

    const handleReplyEmail = async () => {
        if (!mailboxId) return alert("Mailbox not loaded yet");
        if (!toEmail.trim()) return alert("Recipient is required");
        console.log(formData);
        try{
            setIsLoading(true);
            const payload = new FormData();
            const data = {
                mailbox_id: mailboxId,
                to: toEmail.split(",").map(s => s.trim()).filter(Boolean),
                reply_message_Id: threadIdNumber,
                text: formData.text,
            };
            payload.append("data", JSON.stringify(data));
            files.forEach(file => payload.append("files",file));

            await replyMail(payload).unwrap();
            toast.success("Reply Email sent successfully!");
            setFormData({ to: "", text: "" });
            setFiles([]);
            onClose();
            // navigate()
        }catch (error) {
        console.error("SEND ERROR:", error);
        toast.error("Failed to send email");
        }finally{
            setIsLoading(false);
        }
    }
    const handleSaveDraft = async () => {
  if (!mailboxId) return alert("Mailbox not loaded yet");

  try {
    setIsSavingLoading(true);
    const payload = new FormData();

    const data = {
      mailbox_id: mailboxId,
    to: toEmail.split(",").map(s => s.trim()).filter(Boolean),
    reply_message_Id: threadIdNumber,
    text: formData.text,
      draft: true, // flag for draft
    };

    payload.append("data", JSON.stringify(data));

    files.forEach(file => payload.append("files", file));

    await saveReplyMail(payload).unwrap(); // same mutation can be used

    toast.success("Draft saved successfully!");
    onClose();

  } catch (error) {
    console.error("SAVE DRAFT ERROR:", error);
    alert("Failed to save draft");
  }
  finally{
    setIsSavingLoading(false);
  }
};
    return (
        <div className='mt-6 p-6 border border-[#DFE3E8] rounded-lg shadow-sm'>
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
                className='w-full h-40 bg-gray-100 p-4  rounded-lg focus:outline-none focus:ring-2 focus:ring-primary2 focus:border-transparent resize-none'
                placeholder='Type your reply...'
            />
            <div className='md:flex gap-x-4 mt-4'>
                <button className='bg-primary2 cursor-pointer px-6 mb-2 md:mb-0 py-2 text-white rounded-lg hover:bg-primary2 transition-colors flex items-center gap-x-2 '>
                    <div onClick={handleReplyEmail} className="flex items-center gap-x-[10px] ">
                        <SendHorizontal size={14} /> 
                        <p className="text-sm md:text-base font-normal">{isLoading? "Sending..." : "Send" }</p>
                    </div>
                </button>
                <button onClick={handleSaveDraft} className='px-6 py-2 text-gray-700 border border-[#DFE3E8] rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-x-2'>
                    <div className="flex items-center gap-x-[10px] ">
                        <CircleSlash size={18} /> 
                        <p className="text-sm md:text-base font-normal">{isSavingLoading? "Saving..." : "Save Draft" }</p>
                    </div>
                </button>
            </div>
        </div>
    );
}