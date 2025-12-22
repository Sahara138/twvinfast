
import { SendHorizontal } from 'lucide-react';
import { RxCross2 } from "react-icons/rx";
import { TfiBackRight } from "react-icons/tfi";
import { useForawrdEmailMutation, useGetMailboxInfoQuery, useGetThreadByTreadIdQuery } from '../../redux/dashboardApi/user/mail/mailApi';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useParams } from 'react-router';
import { skipToken } from "@reduxjs/toolkit/query/react";
import DOMPurify from "dompurify";

export const formatEmailDateTime = (dateString: string): string => {
    const date = new Date(dateString);

    return date.toLocaleString("en-US", {
        weekday: "short",   // Fri
        month: "short",     // Sep
        day: "2-digit",     // 19
        year: "numeric",    // 2025
        hour: "numeric",    // 2
        minute: "2-digit",  // 56
        hour12: true,       // PM
    }).replace(",", " at");
};

interface ForwardSectionProps {
    onClose: () => void;
}
export function ForwardSection({ onClose }: ForwardSectionProps) {
    const id = useParams();
    console.log(id)
    const [isLoading, setIsLoading] = useState(false);
    const { data: mailbox } = useGetMailboxInfoQuery();
    const mailboxId = mailbox?.id;
    console.log(mailboxId);
    console.log(mailbox);

    const forwardId = useParams();
    const forwardIdNumber = forwardId ? Number(forwardId.id) : undefined;
    console.log(forwardIdNumber);
    // if(mailbox)

    const { data } = useGetThreadByTreadIdQuery(
        forwardIdNumber !== undefined ? { threadId: forwardIdNumber } : skipToken
    );
    console.log("Forwarded Message", data)
    const createdDate = data;
    const sendingDate = data?.created_at
        ? formatEmailDateTime(data.created_at)
        : "";

    console.log(createdDate)
    // const emailBodyHtml = data?.emails?.[0]?.body_html || "";
    const senderName = "Mike Johnson"; // You can replace with dynamic if you have sender info
    const senderEmail = data?.emails?.[0]?.from_address ?? "";
    // Replace with dynamic if available
    const recipientEmail =
        data?.emails?.[0]?.to_addresses?.join(", ") ?? "";
    const emailBodyHtml = DOMPurify.sanitize(data?.emails?.[0]?.body_html || "");

    const [forwardMail] = useForawrdEmailMutation();
    const [files, setFiles] = useState<File[]>([]);
    const [formData, setFormData] = useState({
        to: "",
        // text: "",
    })

    const handleForwardEmail = async () => {
        if (!mailboxId) return alert("Mailbox not loaded yet");
        if (!formData.to.trim()) return alert("Recipient is required");
        console.log(formData);
        try {
            setIsLoading(true);
            const payload = new FormData();
            const data = {
                mailbox_id: mailboxId,
                to: formData.to.split(",").map(s => s.trim()).filter(Boolean),
                forward_message_Id: forwardIdNumber,
                // text: formData.text,
            };
            payload.append("data", JSON.stringify(data));
            files.forEach(file => payload.append("files", file));

            await forwardMail(payload).unwrap();
            toast.success("Reply Email sent successfully!");
            setFormData({ to: "" });
            setFiles([]);
            onClose()
            // navigate()
        } catch (error) {
            console.error("SEND ERROR:", error);
            toast.error("Failed to send email");
        } finally {
            setIsLoading(false);
        }
    }
    return (
        <div className='mt-12 px-[15px] md:px-[28px] pb-6 border border-[#DFE3E8] rounded-lg shadow-sm'>
            <div className='flex justify-between items-center'>
                <div className='flex items-center gap-x-2'>
                    <TfiBackRight size={24} className='hidden md:block' />
                    <div className='flex items-center'>
                        <h6 className="font-medium text-sm md:text-lg text-black01">To:</h6>
                        <input
                            type='email'
                            value={formData.to}
                            onChange={(e) => setFormData({ ...formData, to: e.target.value })}
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
                <p>From: {senderName} &lt;{senderEmail}&gt;</p>
                <p>Date: {sendingDate}</p>
                <p>To: {recipientEmail}</p>
            </div>
            <div className="email-body-container rounded shadow-sm w-full h-[600px]">
                <iframe
                    srcDoc={emailBodyHtml}
                    className="w-full h-full"
                    style={{
                        border: "none",
                        width: "100%",
                        height: "100%",
                        overflow: "hidden",
                        zoom: 0.8, // optional, scale down content if it's too wide
                    }}
                    sandbox="allow-same-origin allow-scripts allow-popups"
                    title="Email Content"
                />
            </div>
            <div className='flex gap-x-4 mt-4'>
                <button onClick={handleForwardEmail} className='bg-primary2 px-6 py-2 text-white rounded-lg hover:bg-[#D88009] transition-colors flex items-center gap-x-2'>
                    <div className="flex items-center gap-x-[10px] ">
                        <SendHorizontal size={14} />
                        <p className="text-sm md:text-base font-normal">{isLoading ? "Sending..." : "Send"}</p>
                    </div>
                </button>

            </div>
        </div>
    );
}
