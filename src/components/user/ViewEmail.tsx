// import { useState } from "react";
// import {
//   Star,
//   Archive,
//   Trash2,
//   MoveLeft,
//   EllipsisVertical,
//   Sparkles,
//   CalendarDays,
//   CornerUpLeft,
//   CornerUpRight,
//   Bot,
// } from "lucide-react";
// import { skipToken } from '@reduxjs/toolkit/query/react';
// import { ReplySection } from "./ReplaySection";
// import { ForwardSection } from "./ForwardSection";
// import { AiReplySection } from "./AiReplaySection";
// import { AISidebar } from "./AISidebarSection";
// import { Link, useParams} from "react-router-dom";
// import { useGetThreadByTreadIdQuery } from "../../redux/dashboardApi/user/mail/mailApi";

// export default function ViewEmail() {
// // const threadId = useParams();
// // const threadIdNumber = threadId?.id;
//   const threadId = useParams();
//   const threadIdNumber = threadId ? Number(threadId.id) : undefined;
//   console.log(threadIdNumber)


//   const [activeSection, setActiveSection] = useState<string | null>(null);
//   const [showAISidebar, setShowAISidebar] = useState(false);
//   const { data, isLoading } = useGetThreadByTreadIdQuery(
//   threadIdNumber !== undefined ? { threadId: threadIdNumber } : skipToken
// );


//   console.log(data);

//   const handleSectionToggle = (section: string) => {
//     setActiveSection(activeSection === section ? null : section);
//   };

//   // if (isLoading) {
//   //   return <div className="p-6">Loading...</div>;
//   // }

//   return (
//     <div className="min-h-screen bg-gray-50 relative">
//       {/* Header */}
//       <header className="bg-white h-32 md:h-22 sticky top-0 z-10 px-6 shadow-sm border-b border-gray-200">
//         <div className="md:flex items-center justify-between pt-6">
//           <div className="flex items-center space-x-4">
//             <Link
//               to={"/user"}
//               className="hover:bg-gray-100 rounded-lg transition-colors"
//             >
//               <MoveLeft className="w-5 h-5 text-gray-600" />
//             </Link>
//             <div>
//               <h1 className="text-base md:text-lg font-medium text-[#212B36]">
//                 {data?.subject}
//               </h1>
//             </div>
//           </div>

//           <div className="flex items-center space-x-0 md:space-x-2 mt-3 md:mt-0">
//             <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
//               {
//                 data?.is_starred === true ?
//                 <Star fill="#3BB515" className="w-5 h-5 text-[#3BB515]" />
//                 :
//                 <Star  className="w-5 h-5 text-[#3BB515]" />
//               }
//             </button>

//             <button
//               onClick={() => setShowAISidebar(true)}
//               className="md:hidden flex items-center gap-x-2 hover:bg-gray-100 px-3 py-1 rounded-lg transition-colors"
//             >
//               <Sparkles size={18} />
//             </button>

//             <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
//               <Archive className="w-5 h-5" />
//             </button>

//             <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
//               <Trash2 className="w-5 h-5" />
//             </button>

//             <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
//               <EllipsisVertical className="w-5 h-5" />
//             </button>
//           </div>
//         </div>
//       </header>

//       {/* Main Content */}
//       <div className="p-6 px-8 lg:px-12 xl:px-14 mx-auto">
//         {/* Email Header */}
//         <div className="flex items-center justify-between mb-6 p-4">
//           <div className="flex gap-x-4">
//             <img
//               src="https://i.pravatar.cc/40?img=7"
//               className="h-12 w-12 rounded-full"
//               alt=""
//             />
//             <div className="space-y-1 text-black">
//               <h3 className="font-medium text-base md:text-lg">Mike Johnson</h3>
//               <p className="text-xs md:text-sm text-black01">
//                 sarah@company.com
//               </p>
//               <p className="text-xs md:text-sm text-black01">
//                 To: {data?.emails?.from_address}
//               </p>
//             </div>
//           </div>

//           <button
//             onClick={() => setShowAISidebar(true)}
//             className="hidden md:flex items-center gap-x-2 hover:bg-gray-100 px-3 py-1 rounded-lg transition-colors"
//           >
//             <Sparkles size={18} /> <p>AI Assistant</p>
//           </button>
//         </div>

//         <div className="flex items-center gap-2 text-gray-500 text-xs md:text-sm mt-4 mb-6">
//           <CalendarDays size={22} />
//           <p>{data?.emails?.created_at}</p>
//           {/* <p>Sep 7, 2025 3:17 PM</p> */}
//         </div>

//         {/* Email Section */}
//         <div className="p-4 border border-[#DFE3E8] rounded-lg shadow-sm space-y-4">
//           <p className="text-xs md:text-sm text-black leading-7">Hi Team,</p>

//           <p className="text-xs md:text-sm text-black leading-7 mt-4">
//             I hope this email finds you well. As we approach the end of Q3, it's
//             crucial that we start preparing for our Q4 marketing strategy review.
//           </p>

//           <p className="text-xs md:text-sm text-black leading-7 mt-4">
//             Please come prepared with insights on your respective campaigns.
//           </p>

//           <p className="text-xs md:text-sm text-black leading-7 mt-4">
//             Best regards,
//           </p>

//           <p className="text-xs md:text-sm text-black leading-7 mt-2">
//             Mike Johnson
//           </p>

//           <div className="md:flex gap-x-6 mt-6">
//             <button
//               onClick={() => handleSectionToggle("reply")}
//               className={`mb-2 md:mb-0 px-4 py-2 flex gap-x-2 rounded-lg transition-colors ${
//                 activeSection === "reply"
//                   ? "bg-primary2 text-white"
//                   : "text-black border border-[#DFE3E8]"
//               }`}
//             >
//               <CornerUpLeft size={24} />
//               <p className="text-sm md:text-lg">Write a reply</p>
//             </button>

//             <button
//               onClick={() => handleSectionToggle("forward")}
//               className={`mb-2 md:mb-0 px-4 py-3 flex gap-x-2 rounded-lg transition-colors ${
//                 activeSection === "forward"
//                   ? "bg-primary2 text-white"
//                   : "text-black border border-[#DFE3E8]"
//               }`}
//             >
//               <CornerUpRight size={24} />
//               <p className="text-sm md:text-lg">Forward a reply</p>
//             </button>

//             <button
//               onClick={() => handleSectionToggle("ai")}
//               className={`px-4 py-3 flex gap-x-2 rounded-lg transition-colors ${
//                 activeSection === "ai"
//                   ? "bg-primary2 text-white"
//                   : "text-black border border-[#DFE3E8]"
//               }`}
//             >
//               <Bot size={24} />
//               <p className="text-sm md:text-lg">AI reply</p>
//             </button>
//           </div>
//         </div>

//         {activeSection === "reply" && (
//           <ReplySection onClose={() => setActiveSection(null)} />
//         )}
//         {activeSection === "forward" && (
//           <ForwardSection onClose={() => setActiveSection(null)} />
//         )}
//         {activeSection === "ai" && (
//           <AiReplySection onClose={() => setActiveSection(null)} />
//         )}
//       </div>

//       <AISidebar
//         isOpen={showAISidebar}
//         onClose={() => setShowAISidebar(false)}
//       />
//     </div>
//   );
// }
import { useState } from "react";
import {
  Star,
  Archive,
  Trash2,
  MoveLeft,
  EllipsisVertical,
  Sparkles,
  CalendarDays,
  CornerUpLeft,
  CornerUpRight,
  Bot,
} from "lucide-react";
import DOMPurify from "dompurify";
import { skipToken } from "@reduxjs/toolkit/query/react";
import { ReplySection } from "./ReplaySection";
import { ForwardSection } from "./ForwardSection";
import { AiReplySection } from "./AiReplaySection";
import { AISidebar } from "./AISidebarSection";
import { Link, useParams } from "react-router-dom";
import {  useGetThreadByTreadIdQuery } from "../../redux/dashboardApi/user/mail/mailApi";
// import { toast } from "react-toastify";

export default function ViewEmail() {
  const threadId = useParams();
  const threadIdNumber = threadId ? Number(threadId.id) : undefined;
  console.log(threadIdNumber);

   
   

  const { data, isLoading } = useGetThreadByTreadIdQuery(
    threadIdNumber !== undefined ? { threadId: threadIdNumber } : skipToken
  );

  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [showAISidebar, setShowAISidebar] = useState(false);

  const handleSectionToggle = (section: string) => {
    setActiveSection(activeSection === section ? null : section);
  };
  console.log(data);


  const subject = data?.subject || "UnKnown";
  const createdDate = data;
  console.log(createdDate)
  // const emailBodyHtml = data?.emails?.[0]?.body_html || "";
  const senderName = "Mike Johnson"; // You can replace with dynamic if you have sender info
  const senderEmail = "sarah@company.com"; // Replace with dynamic if available
  const recipientEmail = data?.emails?.[0]?.from_address
    || "you@company.com"; // Replace with dynamic if available
  const emailBodyHtml = DOMPurify.sanitize(data?.emails?.[0]?.body_html || "");

if (isLoading) {
    // Show loader while data is loading
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <div className="loader"></div>
        <p>Loading...</p>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-gray-50 relative">
      {/* Header */}
      <header className="bg-white h-32 md:h-22 sticky top-0 z-10 px-6 shadow-sm border-b border-gray-200">
        <div className="md:flex items-center justify-between pt-6">
          <div className="flex items-center space-x-4 ">
            <Link
              to={"/user"}
              className="hover:bg-gray-100 rounded-lg transition-colors"
            >
              <MoveLeft className="w-5 h-5 text-gray-600" />
            </Link>
            <div>
              <h1 className=" text-base md:text-lg font-medium text-[#212B36]">
                {subject}
              </h1>
            </div>
          </div>

          <div className="flex items-center space-x-0 md:space-x-2 mt-3 md:mt-0">
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <Star fill="#3BB515" className="w-5 h-5 text-[#3BB515]" />
            </button>

            <button
              onClick={() => setShowAISidebar(true)}
              className="md:hidden flex items-center gap-x-2 hover:bg-gray-100 px-3 py-1 rounded-lg transition-colors"
            >
              <Sparkles size={18} />
            </button>

            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <Archive className="w-5 h-5" />
            </button>

            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <Trash2 className="w-5 h-5" />
            </button>

            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <EllipsisVertical className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="p-6 px-8 lg:px-12 xl:px-14 mx-auto">
        {/* Email Header */}
        <div className="flex items-center justify-between mb-6 p-4">
          <div className="flex gap-x-4">
            <img
              src="https://i.pravatar.cc/40?img=7"
              className="h-12 w-12 rounded-full"
              alt=""
            />
            <div className="space-y-1 text-black">
              <h3 className="font-medium text-base md:text-lg">{senderName}</h3>
              <p className="text-xs md:text-sm text-black01">{senderEmail}</p>
              <p className="text-xs md:text-sm text-black01">To: {recipientEmail}</p>
            </div>
          </div>

          <button
            onClick={() => setShowAISidebar(true)}
            className="hidden md:flex items-center gap-x-2 hover:bg-gray-100 px-3 py-1 rounded-lg transition-colors"
          >
            <Sparkles size={18} /> <p>AI Assistant</p>
          </button>
        </div>

        <div className="flex items-center gap-2 text-gray-500 text-xs md:text-sm mt-4 mb-6">
          <CalendarDays size={22} />
          <p>{data?.emails?.[0]?.created_at ? new Date(data.last_message_at).toLocaleString() : ""}</p>
        </div>

        {/* Email Section */}
        <div className="p-4 border border-[#DFE3E8] rounded-lg shadow-sm space-y-4">


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



          <div className="md:flex gap-x-6 mt-6">
            <button
              onClick={() => handleSectionToggle("reply")}
              className={`mb-2 md:mb-0 px-4 py-2 flex gap-x-2 rounded-lg transition-colors ${activeSection === "reply"
                  ? "bg-primary2 text-white"
                  : "text-black border border-[#DFE3E8]"
                }`}
            >
              <CornerUpLeft size={24} />
              <p className="text-sm md:text-lg">Write a reply</p>
            </button>

            <button
              onClick={() => handleSectionToggle("forward")}
              className={`mb-2 md:mb-0 px-4 py-3 flex gap-x-2 rounded-lg transition-colors ${activeSection === "forward"
                  ? "bg-primary2 text-white"
                  : "text-black border border-[#DFE3E8]"
                }`}
            >
              <CornerUpRight size={24} />
              <p className="text-sm md:text-lg">Forward a reply</p>
            </button>

            <button
              onClick={() => handleSectionToggle("ai")}
              className={`px-4 py-3 flex gap-x-2 rounded-lg transition-colors ${activeSection === "ai"
                  ? "bg-primary2 text-white"
                  : "text-black border border-[#DFE3E8]"
                }`}
            >
              <Bot size={24} />
              <p className="text-sm md:text-lg">AI reply</p>
            </button>
          </div>
        </div>

        {activeSection === "reply" && <ReplySection onClose={() => setActiveSection(null)} />}
        {activeSection === "forward" && <ForwardSection onClose={() => setActiveSection(null)} />}
        {activeSection === "ai" && <AiReplySection onClose={() => setActiveSection(null)} />}
      </div>

      <AISidebar isOpen={showAISidebar} onClose={() => setShowAISidebar(false)} />
    </div>
  );
}
