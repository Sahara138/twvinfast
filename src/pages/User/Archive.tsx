import {
  ArchiveIcon,
  ChevronLeft,
  ChevronRight,
  Mail,
  Star,
  Tag,
  Trash2,
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";
import {  useGetArchivedMailByMailboxIdQuery, useGetMailboxInfoQuery, useUnArchiveMailMutation } from "../../redux/dashboardApi/user/mail/mailApi";

type UIStatus = "New" | "Opened" | "Won" | "Replied" | "Lost";
type Tag = string;

export interface ThreadLabel {
  thread_id: number;
  label_id: number;
  label: LabelType;
}

export interface LabelType {
  id: number;
  name: string;
  count: number;
  icon?: React.ReactNode;
  color?: string;
  created_at: string;
}

export interface UIMail {
  id: number;
  name: string;
  message: string;
  status: UIStatus;
  // labels: ThreadLabel[];
  labels: LabelType[]; // <-- just array of LabelType
  time: string;
  replies: number;
  avatar: string;
  starred: boolean;
  customer: {
    name: string;
  };
}


export function formatMailTime(dateString: string): string {
  const now = new Date();
  const date = new Date(dateString);

  const diffMs = now.getTime() - date.getTime();
  const diffMinutes = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMinutes / 60);

  const isToday = now.toDateString() === date.toDateString();

  const yesterday = new Date();
  yesterday.setDate(now.getDate() - 1);
  const isYesterday = yesterday.toDateString() === date.toDateString();

  if (diffMinutes < 1) {
    return "Just now";
  }

  if (isToday) {
    if (diffMinutes < 60) {
      return `${diffMinutes} min ago`;
    }
    return `${diffHours} hr ago`;
  }

  if (isYesterday) {
    return "Yesterday";
  }

  return date.toLocaleDateString(undefined, {
    day: "2-digit",
    month: "short",
  });
}


export default function Archive() {
  const [starOverrides, setStarOverrides] = useState<Record<number, boolean>>({});
  const [currentPage, setCurrentPage] = useState(1);

    const { data: mailbox } = useGetMailboxInfoQuery();
      const mailboxId = mailbox?.id;
      console.log(mailboxId);


    const { data, isLoading } = useGetArchivedMailByMailboxIdQuery(
      { mailboxId: mailboxId!, page: currentPage, folder: "archived" }, 
      { skip: !mailboxId }
    );

  const [unArchiveMailMutation] = useUnArchiveMailMutation();


  

    const mails = data?.data ?? [];
    const pagination = data?.pagination;
    console.log(mails)
    console.log(pagination);

    // const uiMails: UIMail[] = mails.map((mail) => ({
    //   id: mail.id,
    //   mailboxId: mail.mailbox_id,
    //   name: mail.customer.name,
    //   message: mail.subject,
    //   status: "New", // map backend later
    //   labels: mail.labels.map((l) => l.name),
    //   time: formatMailTime(mail.last_message_at),
    //   replies: 0, // backend doesn’t send yet
    //   avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(
    //     mail.customer.name
    //   )}`,
    //   starred: mail.is_starred,
    // }));
    const uiMails: UIMail[] = mails.map((mail) => ({
      id: mail.id,
      name: mail.customer?.name || "Unknown",
      message: mail.subject || "",
      status: "New",
      // labels: Array.isArray(mail.labels)
      //   ? mail.labels.map((l) => ({
      //       thread_id: l.thread_id,
      //       label_id: l.label_id,
      //       label: l.label || { id: 0, mailbox_id: 0, name: "None", created_at: "" },
      //     }))
      //   : [],
      labels: mail.labels || [],
      time: mail.last_message_at ? formatMailTime(mail.last_message_at) : "",
      replies: 0,
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(mail.customer?.name || "Unknown")}`,
      starred: !!mail.is_starred,
      customer: { name: mail.customer?.name || "Unknown" }, // ✅ Add this
    }));


  const [selectedEmails, setSelectedEmails] = useState<Set<number>>(new Set());

  const toggleEmailSelect = (id: number) => {
    const newSelected = new Set(selectedEmails);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedEmails(newSelected);
  };
  console.log(selectedEmails)

//   const [toggleStarMutation] = useToggleStarMutation();

// const toggleStar = (id: number) => {
//   toggleStarMutation({ threadId: id });
// };

    const toggleStar = (id: number) => {
      setStarOverrides((prev) => ({
        ...prev,
        [id]: !prev[id],
      }));
    };

    const unarchiveSelectedEmails = () => {
      selectedEmails.forEach((id) => {
        unArchiveMailMutation({ threadId: id });
      });
      setSelectedEmails(new Set()); // clear selection after
    };




  const toggleAllSelect = () => {
    if (selectedEmails.size === uiMails.length) {
      setSelectedEmails(new Set());
    } else {
      setSelectedEmails(new Set(uiMails.map((e) => e.id)));
    }
  };

  const getStatusColor = (status: UIStatus) => {
    const colors: Record<UIStatus, string> = {
      New: "bg-blue-100 text-blue-700",
      Opened: "bg-gray-100 text-gray-700",
      Won: "bg-green-100 text-green-700",
      Replied: "bg-purple-100 text-purple-700",
      Lost: "bg-red-100 text-red-700",
    };
    return colors[status];
  };

  const getTagColor = (tag: Tag) => {
    const colors: Record<Tag, string> = {
      None: "bg-gray-100 text-gray-700",
      Urgent: "bg-orange-100 text-orange-700",
      Demo: "bg-blue-100 text-blue-700",
      Billing: "bg-yellow-100 text-yellow-700",
      sales: "bg-teal-100 text-teal-700",
      "253": "bg-teal-100 text-teal-700",
    };
    return colors[tag];
  };
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
    <div className="min-h-screen bg-white overflow-hidden">
      {/* Top Bar */}
      <header className="sticky top-0 z-20 lg:h-22 bg-white border-b border-gray-200">
        <div className="px-6 pt-6 flex flex-wrap items-center  gap-3">
          <div className="md:flex md:items-center gap-3 block lg:flex-1">
            <div className="relative w-[180px] lg:w-[650px]">
              <svg
                className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <input
                type="text"
                placeholder="Search Emails..."
                className="w-full pl-9 pr-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-teal-500 bg-gray-50"
              />
            </div>
            <select className="px-3 py-2 my-3 lg:my-0 border border-gray-200 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-teal-500 bg-white">
              <option>All Status</option>
              <option>New</option>
              <option>Opened</option>
              <option>Won</option>
              <option>Replied</option>
              <option>Lost</option>
            </select>
          </div>
          <div className="hidden md:block md:ml-auto">

            <div className="w-8 h-8  rounded-full bg-teal-500 text-white flex items-center justify-center text-xs font-medium mb-5 md:mb-0">
              D
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="p-6">
        {/* Sort Bar */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center w-1/2 gap-3">
            <input
              type="checkbox"
              checked={
                selectedEmails.size === uiMails.length && uiMails.length > 0
              }
              onChange={toggleAllSelect}
              className="w-4 h-4 accent-teal-500 cursor-pointer"
            />
            <select className="text-sm text-gray-700 border border-gray-200 rounded-lg px-2 py-1 focus:outline-none focus:ring-1 focus:ring-teal-500 bg-white">
              <option>Sort: Newest</option>
              <option>Sort: Oldest</option>
            </select>
          </div>
          {/* <div className="flex justify-end "> */}
            <div className="text-sm w-1/2  flex justify-center   text-gray-400 md:space-x-20 lg:space-x-24 mt-10 hidden lg:block">
              <span>STATUS</span>
              <span>TAGS</span>
              <span className="flex justify-end items-center -mt-5 mr-4">ACTIVITY</span>
            </div>
          {/* </div> */}
        </div>

        {/* Action Bar */}
        {selectedEmails.size > 0 && (
          <div className="mb-4 flex  gap-x-10 items-center gap-3 text-sm text-gray-700 bg-gray-50 p-4 rounded-md border border-gray-200">
            <span className="font-medium">
              {selectedEmails.size} email selected
            </span>
            <div className="flex items-center gap-2 ">
              <button
              onClick={unarchiveSelectedEmails}
               className="flex items-center gap-1 gap-x-2 px-3 py-2 bg-white border border-[#0000001A] rounded-lg transition text-gray-700">
                <span>
                  <ArchiveIcon size={18}/>
                </span>
                <span>UnArchive</span>
              </button>
              <button className="flex items-center gap-1 gap-x-2 px-3 py-2 bg-white border border-[#0000001A] rounded-lg transition text-gray-700">
                <span>
                  <Trash2 size={18} />
                </span>
                <span>Delete</span>
              </button>
              <button className="flex items-center gap-1 gap-x-2 px-3 py-2 bg-white border border-[#0000001A] rounded-lg transition text-gray-700">
                <span>
                  <Mail size={18} />
                </span>
                <span>Mark as Read</span>
              </button>
              <button className="flex items-center gap-1 gap-x-2 px-3 py-2 bg-white border border-[#0000001A] rounded-lg transition text-gray-700">
                <span>
                  <Tag size={18} />
                </span>
                <span>Tag</span>
              </button>
              <button className="flex items-center gap-1 gap-x-2 px-3 py-2 bg-white border border-[#0000001A] rounded-lg transition text-gray-700">
                <span>Won</span>
              </button>
              <button className="flex items-center gap-1 gap-x-2 px-3 py-2 bg-white border border-[#0000001A] rounded-lg transition text-gray-700">
                <span>Lost</span>
              </button>
            </div>
          </div>
        )}

        {/* Emails List */}
        <div className="space-y-2 overflow-x-auto ">
          {uiMails.map((email) =>{ 
            const isStarred =
              starOverrides[email.id] ?? email.starred;
            return(
            <div
              key={email.id}
              className="lg:flex justify-between items-center p-6 lg:p-4 hover:bg-gray-50 rounded-lg-lg border-b border-gray-100 transition"
            >
              <div className="flex items-center gap-3 w-1/2">
                <input
                  type="checkbox"
                  checked={selectedEmails.has(email.id)}
                  onChange={() => toggleEmailSelect(email.id)}
                  className="w-4 h-4 accent-teal-500 cursor-pointer"
                />

                <button
                  onClick={() => toggleStar(email.id)}
                  className="text-gray-400 hover:text-teal-500 transition flex-shrink-0"
                >
                  {/* {email.starred ? (
                    <span className="text-lg">
                      <Star size={18} className="text-teal-400" />
                    </span>
                  ) : (
                    <span className="text-lg">
                      <Star size={18} className="text-gray-400" />
                    </span>
                  )} */}
                  <Star
                    size={18}
                    className={isStarred ? "text-teal-400" : "text-gray-400"}
                  />
                </button>

                <img
                  src={email.avatar}
                  alt={email.name}
                  className="w-10 h-10 rounded-full flex-shrink-0"
                />

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-gray-900 ">
                      {email.name}
                    </span>
                    <span className="text-xs text-gray-400 bg-gray-50 px-6 py-2 md:px-3 rounded-xl">
                      {email.replies} replies
                    </span>
                  </div>
                  <Link
                    to={`view-email/${email.id}`}
                    className="text-sm text-gray-400 truncate"
                  >
                    {email.message}
                  </Link>
                </div>
              </div>

              <div className=" flex w-1/2  items-center gap-x-16 lg:gap-x-24 mt-5 lg:mt-0">
                <div className="">
                  <span
                    className={`px-2 py-1 rounded-xl text-xs font-medium whitespace-nowrap ${getStatusColor(
                      email.status
                    )}`}
                  >
                    {email.status}
                  </span>
                </div>

               <div className="flex flex-wrap gap-1 items-center w-full capitalize">
                    {/* {(email.labels.length > 0 ? email.labels : ["None"]).map((label, i) => (
                      <span key={i} className={`px-2 py-1 rounded-xl text-xs font-medium whitespace-nowrap  ${label === "None" ? "bg-gray-200 text-gray-500" : getTagColor(label)}`}>
                        {label}
                      </span>
                    ))} */}
                    {(email.labels.length > 0 ? email.labels : [{ name: "None" }]).map((label, i) => (
                      <span key={i} className={getTagColor(label.name)}>
                        {label.name}
                      </span>
                    ))}


                  </div>


                <span className="text-xs text-gray-500 whitespace-nowrap w-16 text-right">
                  {email.time}
                </span>
              </div>
            </div>
          )})}
        </div>
        {/* Pagination */}
<div className="flex w-fit ml-auto items-center justify-between my-6 gap-x-2 lg:gap-x-3 text-sm text-gray-600">
  <span className="px-2 py-1">
    Page {currentPage} of {pagination?.totalPages || 1}
  </span>

  {/* Previous Button */}
  <button
    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
    disabled={currentPage === 1}
    className={`flex items-center gap-2 p-2 lg:px-4 lg:py-3 bg-white border border-[#0000001A] rounded-lg transition ${
      currentPage === 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-50"
    }`}
  >
    <ChevronLeft className="w-3 h-3 lg:w-4 lg:h-4" />
    <span>Previous</span>
  </button>

  {/* Next Button */}
  <button
    onClick={() =>
      setCurrentPage((prev) =>
        Math.min(prev + 1, pagination?.totalPages || 1)
      )
    }
    disabled={currentPage === pagination?.totalPages}
    className={`flex items-center gap-2 p-2 lg:px-4 lg:py-3 bg-white border border-[#0000001A] rounded-lg transition ${
      currentPage === pagination?.totalPages
        ? "opacity-50 cursor-not-allowed"
        : "hover:bg-gray-50"
    }`}
  >
    <span>Next</span>
    <ChevronRight className="w-3 h-3 lg:w-4 lg:h-4" />
  </button>
</div>


        <div className="w-fit ml-auto">
          <Link
            to={"compose"}
            className="flex items-center text-end justify-end gap-1 gap-x-2 p-2 lg:px-4 lg:py-3 bg-primary2 border border-[#0000001A] rounded-lg transition text-white lg:mt-16 ml-auto "
          >
            <span>
              <Mail size={18} />
            </span>
            <span className="text-sm lg:text-base">New Email</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

