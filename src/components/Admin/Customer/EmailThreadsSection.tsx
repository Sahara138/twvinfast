
import {  MoreVertical, MessageSquare, ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";


export default function EmailThreadsSection() {
  const [emails, setEmails] = useState(() => [
    { name: "Mike Jonson", message: "I hope this email finds you well. My.....", status: "New", tags: ["None"], time: "Just Now", messages: 1, avatar: "https://i.pravatar.cc/40?img=1" },
    { name: "Aka Johnson", message: "Hi, I'm trying to integrate our s....", status: "Opened", tags: ["Urgent"], time: "1h ago", messages: 3, avatar: "https://i.pravatar.cc/40?img=2" },
    { name: "Mike Chen", message: "Thank you for reaching out....", status: "Won", tags: ["253", "sales"], time: "2h ago", messages: 8, avatar: "https://i.pravatar.cc/40?img=3" },
    { name: "David Kim", message: "I hope this email finds you well. My.....", status: "New", tags: ["Demo"], time: "4h ago", messages: 3, avatar: "https://i.pravatar.cc/40?img=4" },
    { name: "David Kim", message: "This is urgent as we have a client de..", status: "Replied", tags: ["billing"], time: "7h ago", messages: 2, avatar: "https://i.pravatar.cc/40?img=5" },
    { name: "Lisa Rodri", message: "Let me connect you directly with our...", status: "Lost", tags: ["Urgent"], time: "1d ago", messages: 9, avatar: "https://i.pravatar.cc/40?img=6" },
    { name: "George lane", message: "I hope this email finds you well. My.....", status: "New", tags: ["Pricing"], time: "1d ago", messages: 5, avatar: "https://i.pravatar.cc/40?img=7" },
    { name: "George lane", message: "I hope this email finds you well. My.....", status: "New", tags: ["Pricing"], time: "1d ago", messages: 5, avatar: "https://i.pravatar.cc/40?img=7" },
    { name: "George lane", message: "I hope this email finds you well. My.....", status: "New", tags: ["Pricing"], time: "1d ago", messages: 5, avatar: "https://i.pravatar.cc/40?img=7" },
    { name: "George lane", message: "I hope this email finds you well. My.....", status: "New", tags: ["Pricing"], time: "1d ago", messages: 5, avatar: "https://i.pravatar.cc/40?img=7" },
    { name: "George lane", message: "I hope this email finds you well. My.....", status: "New", tags: ["Pricing"], time: "1d ago", messages: 5, avatar: "https://i.pravatar.cc/40?img=7" },
  ]);

  const [openMenuIndex, setOpenMenuIndex] = useState<number | null>(null);
  const rowRefs = useRef<Record<number, HTMLDivElement | null>>({});
  const buttonRefs = useRef<Record<number, HTMLButtonElement | null>>({});

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (openMenuIndex !== null) {
        const menuEl = rowRefs.current[openMenuIndex];
        const btnEl = buttonRefs.current[openMenuIndex];
        const target = e.target as Node;
        // ignore clicks inside the menu or the toggle button itself
        if (menuEl && menuEl.contains(target)) return;
        if (btnEl && btnEl.contains(target)) return;
        setOpenMenuIndex(null);
      }
    }
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, [openMenuIndex]);

  const markAs = (index: number, status: string) => {
    setEmails((prev) => prev.map((em, i) => (i === index ? { ...em, status } : em)));
    setOpenMenuIndex(null);
  };

  const addTag = (index: number) => {
    const tag = prompt("Enter tag to add:");
    if (!tag) return;
    setEmails((prev) => prev.map((em, i) => (i === index ? { ...em, tags: [...em.tags, tag] } : em)));
    setOpenMenuIndex(null);
  };

  const deleteEmail = (index: number) => {
    if (!confirm("Delete this email?")) return;
    setEmails((prev) => prev.filter((_, i) => i !== index));
    setOpenMenuIndex(null);
  };

  return (
    <div className="w-[87%] md:w-[100%] overflow-hidden">
      {/* Header */}
       <div className="md:flex justify-between gap-x-10 items-center mb-6 w-[40%] sm:w-[50%] md:w-[84%] lg:w-[93%] xl:w-[100%]">
                <input
                    type="text"
                    placeholder="Search Customers..."
                    className=" w-full p-2 border border-[#C4CDD5] rounded-lg bg-[#F4F6F8]"
                />
                <select className="block p-2 mt-3 md:mt-0 border rounded border-[#C4CDD5]">
                    <option>All Status</option>
                </select>
            </div>
            <h2 className="text-2xl font-semibold">Customer Directory</h2>
            <p className="w-[40%] sm:w-[50%] md:w-[84%] lg:w-[93%] xl:w-[100%] text-gray-600 mt-2 mb-4">Manage your customer relationships and profiles</p>
      <div className="">
       
      {/* Table */}
      <div className="overflow-x-auto rounded-2xl border border-gray-200 w-[40%] sm:w-[50%] md:w-[84%] lg:w-[92%] xl:w-[100%]">
  <table className="min-w-[900px] w-full bg-white border-collapse">
    <thead className="bg-[#F9FAFB] text-[#454F5B]">
      <tr>
        <th className="w-4"></th>
        <th className="py-4 px-2 font-normal text-sm">CONTACT</th>
        <th className="py-2 px-2 font-normal text-sm">LAST MESSAGE</th>
        <th className="py-2 px-2 font-normal text-sm">STATUS</th>
        <th className="py-2 px-2 font-normal text-sm">TAGS</th>
        <th className="py-2 px-2 font-normal text-sm">ACTIVITY</th>
        <th className="py-2 px-2"></th>
      </tr>
    </thead>
    <tbody>
      {emails.map((email, index) => (
        <tr
          key={index}
          className="bg-gray-50 hover:bg-gray-100 transition border-b border-gray-200"
        >
          <td className="px-3 py-2">
            <input type="checkbox" className="accent-teal-500" />
          </td>
          <td className="py-3 px-2 flex items-center gap-3 min-w-[150px]">
            <img
              src={email.avatar}
              alt={email.name}
              className="w-10 h-10 rounded-full"
            />
            <span className="text-sm font-medium text-gray-900 truncate">{email.name}</span>
          </td>
          <td className="text-sm text-gray-700 px-2 min-w-[200px]">
            <Link to={`view-email/${index}`} className="hover:underline block">
              {email.message}
              <div className="flex items-center gap-1 text-gray-400 text-xs mt-1">
                <MessageSquare size={12} /> {email.messages}
              </div>
            </Link>
          </td>
          <td className="px-2 min-w-[100px]">
            <span className={`text-xs font-medium px-2 py-1 rounded ${
              email.status === "New" ? "bg-[#D9F2FD] text-black" :
              email.status === "Opened" ? "bg-gray-200 text-gray-700" :
              email.status === "Won" ? "bg-[#E7ECFA] text-[#0C45C8]" :
              email.status === "Replied" ? "bg-[#DBFCE7] text-black" :
              "bg-[#FF4842] text-white"
            }`}>
              {email.status}
            </span>
          </td>
          <td className="flex gap-2 text-xs mt-2 px-2 min-w-[150px]">
            {email.tags.map((tag, i) => (
              <span
                key={i}
                className={`px-2 py-1 rounded ${
                  tag === "Urgent" ? "bg-yellow-100 text-yellow-700" :
                  tag === "Demo" ? "bg-orange-100 text-orange-700" :
                  tag === "Pricing" ? "bg-amber-100 text-amber-700" :
                  tag === "Billing" ? "bg-green-100 text-green-700" :
                  "bg-gray-100 text-gray-600"
                }`}
              >
                {tag}
              </span>
            ))}
          </td>
          <td className="text-xs text-gray-500 px-2 min-w-[80px]">{email.time}</td>
          <td className="relative px-2 min-w-[40px]">
            <button
              ref={(el) => { buttonRefs.current[index] = el; }}
              onClick={(e) => {
                e.stopPropagation();
                setOpenMenuIndex((prev) => (prev === index ? null : index));
              }}
              className="text-[#000000] w-6 h-6 cursor-pointer"
            >
              <MoreVertical />
            </button>
            {openMenuIndex === index && (
              <div ref={(el) => { rowRefs.current[index] = el; }} className="absolute right-0 top-full mt-2 w-40 bg-white border rounded-md shadow-lg z-50">
                <button onClick={() => markAs(index, "Won")} className="block w-full text-left px-3 py-2 text-sm hover:bg-gray-100">Mark as Won</button>
                <button onClick={() => markAs(index, "Lost")} className="block w-full text-left px-3 py-2 text-sm hover:bg-gray-100">Mark as Lost</button>
                <button onClick={() => addTag(index)} className="block w-full text-left px-3 py-2 text-sm hover:bg-gray-100">Add Tag</button>
                <button onClick={() => deleteEmail(index)} className="block w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-gray-100">Delete</button>
              </div>
            )}
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>


      {/* Pagination */}
      <div className="flex justify-end items-center text-sm text-gray-600 mt-4 gap-4 w-[40%] sm:w-[50%] md:w-[84%] lg:w-[95%] xl:w-[100%]">
        <button className="p-1 border rounded-full hover:bg-gray-100">
          <ChevronLeft size={14} />
        </button>
        <span>1 of 2</span>
        <button className="p-1 border rounded-full hover:bg-gray-100">
          <ChevronRight size={14} />
        </button>
      </div>
      </div>
    </div>
  );
}
