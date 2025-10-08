
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
    <div className=" ">
      {/* Header */}
       <div className="flex justify-between gap-x-10 items-center mb-6">
                <input
                    type="text"
                    placeholder="Search Customers..."
                    className="w-full p-2 border border-[#C4CDD5] rounded-lg bg-[#F4F6F8]"
                />
                <select className="p-2 border rounded border-[#C4CDD5]">
                    <option>All Status</option>
                </select>
            </div>
            <h2 className="text-2xl font-semibold">Customer Directory</h2>
            <p className="text-gray-600 mt-2 mb-4">Manage your customer relationships and profiles</p>
      <div className="">
       
      {/* Table */}
      <div className="overflow-x-auto  rounded-2xl ">
        <table className="min-w-full bg-white">
          <thead className="">
            <tr className="text-left  text-[#454F5B] bg-[#F9FAFB]">
              <th className="w-4"></th>
              <th className="py-4 font-normal text-sm">CONTACT</th>
              <th className="py-2 font-normal text-sm">LAST MESSAGE</th>
              <th className="py-2 font-normal text-sm">STATUS</th>
              <th className="py-2 font-normal text-sm">TAGS</th>
              <th className="py-2 font-normal text-sm">ACTIVITY</th>
              <th className="py-2"></th>
            </tr>
          </thead>
          <tbody>
            {emails.map((email, index) => (
              <tr
                key={index}
                className="bg-gray-50 hover:bg-gray-100 transition rounded-lg border-b border-gray-200 py-8"
              >
                <td className="px-3">
                  <input type="checkbox" className="accent-teal-500" />
                </td>
                <td className="py-3 flex items-center gap-3">
                  <img
                    src={email.avatar}
                    alt={email.name}
                    className="w-10 h-10 rounded-full"
                  />
                  <span className="text-sm font-medium text-gray-900">
                    {email.name}
                  </span>
                </td>
                <td className="text-sm text-gray-700">
                  <Link to={`view-email/${index}`} className="hover:underline">
                  {email.message}
                  <div className="flex items-center gap-1 text-gray-400 text-xs mt-1">
                    <MessageSquare size={12} /> {email.messages}
                  </div></Link>
                </td>
                <td>
                  <span
                    className={`text-xs font-medium px-2 py-1 rounded ${email.status === "New"
                        ? "bg-[#D9F2FD] text-black"
                        : email.status === "Opened"
                          ? "bg-gray-200 text-gray-700"
                          : email.status === "Won"
                            ? "bg-[#E7ECFA] text-[#0C45C8]"
                            : email.status === "Replied"
                              ? "bg-[#DBFCE7] text-black"
                              : "bg-[#FF4842] text-[#FFFFFF]"
                      }`}
                  >
                    {email.status}
                  </span>
                </td>
                <td className="flex gap-2 text-xs mt-2">
                  {email.tags.map((tag, i) => (
                    <span
                      key={i}
                      className={`px-2 py-1 rounded ${tag === "Urgent"
                          ? "bg-yellow-100 text-yellow-700"
                          : tag === "Demo"
                            ? "bg-orange-100 text-orange-700"
                            : tag === "Pricing"
                              ? "bg-amber-100 text-amber-700"
                              : tag === "billing"
                                ? "bg-green-100 text-green-700"
                                : "bg-gray-100 text-gray-600"
                        }`}
                    >
                      {tag}
                    </span>
                  ))}
                </td>
                <td className="text-xs text-gray-500">{email.time}</td>
                <td className="relative">
                  <button
                    ref={(el) => { buttonRefs.current[index] = el; }}
                    onClick={(e) => {
                      e.stopPropagation();
                      setOpenMenuIndex((prev) => (prev === index ? null : index));
                    }}
                    className="text-[#000000] w-6 h-6 cursor-pointer"
                    aria-haspopup="true"
                    aria-expanded={openMenuIndex === index}
                    aria-label="Open menu"
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
      <div className="flex justify-end items-center text-sm text-gray-600 mt-4 gap-4">
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
