import {
  Archive,
  ChevronLeft,
  ChevronRight,
  LogOut,
  Mail,
  Star,
  // Tag,
  Trash2,
} from "lucide-react";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { useArchiveMailMutation, useGetArchivedMailByMailboxIdQuery, useGetMailboxInfoQuery, useReadMailMutation, useStarThreadBulkMutation, useTrashMailMutation, useUnReadMailMutation, useUnstarThreadBulkMutation } from "../../redux/dashboardApi/user/mail/mailApi";
import { useAppDispatch } from "../../redux/hooks";
import { logout } from "../../redux/featuresAPI/auth/auth.slice";
import LogoutModal from "../Admin/Logout/LogoutModal";
import { useGetLabelByMailboxQuery } from "../../redux/dashboardApi/user/label/labelApi";
import ActionBarTagButton from "../../components/user/ActionBarTagButton";
import { toast } from "react-toastify";
// import { skipToken } from "@reduxjs/toolkit/query/react";


type UIStatus = "New" | "Opened" | "Won" | "Replied" | "Lost";
// type Tag = string;

export interface ThreadLabel {
  thread_id: number;
  label_id: number;
  label: LabelType;
}

export interface LabelType {
  id: number;
  name: string;
  label:string;
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
  is_read: boolean;
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

export default function Starred() {
  const [starOverrides, setStarOverrides] = useState<Record<number, boolean>>({});
  const [currentPage, setCurrentPage] = useState(1);
  const [logoutOpen, setLogoutOpen] = useState(false);
    const [readOverrides, setReadOverrides] = useState<Record<number, boolean>>({});

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState<UIStatus | "ALL">("ALL");

 const { data: mailbox } = useGetMailboxInfoQuery();
       const mailboxId = mailbox?.id;
       console.log(mailboxId);
 
 
     const { data, isLoading } = useGetArchivedMailByMailboxIdQuery(
       { mailboxId: mailboxId!, page: currentPage, folder: "starred" }, 
       { skip: !mailboxId }
     );
 
     const { data: allLabels } = useGetLabelByMailboxQuery(mailboxId!, { skip: !mailboxId });
   
     const [archiveMailMutation] = useArchiveMailMutation();
     const [trashMailMutation] = useTrashMailMutation();

  // const [assignThreadLabel] = useAssignThreadLabelMutation();
  const threadId = useParams();
  const threadIdNumber = threadId ? Number(threadId.id) : undefined;
  console.log(threadIdNumber);

  const mails = data?.data ?? [];
  const pagination = data?.pagination;
  console.log(mails)
  console.log(pagination);

  // const uiMails: UIMail[] = mails.map((mail) => ({
  //   id: mail.id,
  //   name: mail.customer.name,
  //   message: mail.subject,
  //   status: "New",
  //   labels: mail.labels.map((l) => l.label.name), // ✅ FIX
  //   time: formatMailTime(mail.last_message_at),
  //   replies: 0,
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
      labels: mail.labels?.map((l) => l.label) ?? [],

      // labels: mail.labels?.map((l) => l.label) || [],
      time: mail.last_message_at ? formatMailTime(mail.last_message_at) : "",
      replies: 0,
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(mail.customer?.name || "Unknown")}`,
      starred: !!mail.is_starred,
      is_read: readOverrides[mail.id] ?? !!mail.is_read,
      customer: { name: mail.customer?.name || "Unknown" }, // ✅ Add this
    }))

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

  const archiveSelectedEmails = () => {
    selectedEmails.forEach((id) => {
      archiveMailMutation({ threadId: id });
    });
    setSelectedEmails(new Set()); 
  };

  const trashSelectedEmails = () => {
    selectedEmails.forEach((id) => {
      trashMailMutation({ threadId: id });
    });
    setSelectedEmails(new Set());
  };

  const toggleAllSelect = () => {
    if (selectedEmails.size === uiMails.length) {
      setSelectedEmails(new Set());
    } else {
      setSelectedEmails(new Set(uiMails.map((e) => e.id)));
    }
  };


  const TAG_COLORS = [
    "bg-blue-100 text-blue-700",
    "bg-green-100 text-green-700",
    "bg-orange-100 text-orange-700",
    "bg-purple-100 text-purple-700",
    "bg-teal-100 text-teal-700",
    "bg-pink-100 text-pink-700",
    "bg-yellow-100 text-yellow-700",
    "bg-red-100 text-red-700",
    "bg-indigo-100 text-indigo-700",
  ];

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

  const [markAsRead] = useReadMailMutation();
  const [markAsUnread] = useUnReadMailMutation();
  const [starThreadBulk] = useStarThreadBulkMutation();
  const [unstarThreadBulk] = useUnstarThreadBulkMutation();
  const selectedMailObjects = uiMails.filter((mail) =>
    selectedEmails.has(mail.id)
  );

  const allRead = selectedMailObjects.length > 0 && selectedMailObjects.every((mail) => mail.is_read);

  const handleToggleRead = () => {
  const ids = Array.from(selectedEmails);
  if (ids.length === 0) return;

  // Optimistic UI update
  setReadOverrides((prev) => {
    const updated = { ...prev };
    ids.forEach((id) => {
      updated[id] = !allRead; // mark read or unread
    });
    return updated;
  });

  // API call
  if (allRead) {
    markAsUnread({ threadId: ids });
    toast.success("Marked as Unread");
  } else {
    markAsRead({ threadId: ids });
    toast.success("Marked as Read");
  }

  setSelectedEmails(new Set());
};

  const toggleStar = (id: number) => {
    const nextValue =
      !(starOverrides[id] ?? uiMails.find(m => m.id === id)?.starred);
    console.log(nextValue)

    // Optimistic UI update
    setStarOverrides((prev) => ({
      ...prev,
      [id]: nextValue,
    }));

    // API call
    // Call correct API
    if (nextValue) {
      starThreadBulk({ ids: [id] });
    } else {
      unstarThreadBulk({ ids: [id] });
    }

  };

 
    // const handleMarkThreadAsUnread = () => {
    //   selectedEmails.forEach((id) => {
    //     markAsUnread({ threadId:[ id ]})
    //   });
    //   setSelectedEmails(new Set());
    //   toast.success("Mark as Read");
    // };

  const getTagColor = (tag?: string) => {
    if (!tag) {
      return "bg-gray-100 text-gray-600 px-2 py-1 rounded-xl text-xs";
    }

    let hash = 0;
    for (let i = 0; i < tag.length; i++) {
      hash = tag.charCodeAt(i) + ((hash << 5) - hash);
    }

    const index = Math.abs(hash) % TAG_COLORS.length;
    return `${TAG_COLORS[index]} px-2 py-1 rounded-xl text-xs`;
  };

  const filteredMails = uiMails.filter((mail) => {
  // Search filter
  const matchesSearch =
    mail.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    mail.message.toLowerCase().includes(searchQuery.toLowerCase());

  // Status filter
  const matchesStatus =
    statusFilter === "ALL" || mail.status === statusFilter;

  return matchesSearch && matchesStatus;
});

  const handleLogout = () => {
    dispatch(logout())
    // localStorage.clear(); // or remove token only
    navigate("/", { replace: true });
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
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-teal-500 bg-gray-50"
              />
            </div>
            <select
                value={statusFilter}
                onChange={(e) =>
                  setStatusFilter(e.target.value as UIStatus | "ALL")
                }
                className="px-3 py-2 my-3 lg:my-0 border border-gray-200 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-teal-500 bg-white"
              >
                <option value="ALL">All Status</option>
                <option value="New">New</option>
                <option value="Opened">Opened</option>
                <option value="Won">Won</option>
                <option value="Replied">Replied</option>
                <option value="Lost">Lost</option>
</select>
          </div>
          <div className="hidden md:block md:ml-auto">

            <div onClick={() => setLogoutOpen(true)} className="w-8 h-8  rounded-full bg-teal-500 text-white flex items-center justify-center text-xs font-medium mb-5 md:mb-0 cursor-pointer">
              <LogOut size={18} color="#000000" />
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
          <div className="text-sm w-1/2  flex items-center text-gray-400 md:space-x-20 lg:space-x-24 mt-10 hidden lg:block">
            <span>STATUS</span>
            <span>TAGS</span>
            <span className="flex justify-end items-center -mt-5 mr-4">ACTIVITY</span>
          </div>
          {/* </div> */}
        </div>

        {/* Action Bar */}
        {selectedEmails.size > 0 && (
          <div className="mb-4 flex flex-wrap gap-x-10 items-center gap-3 text-sm text-gray-700 bg-gray-50 p-4 rounded-md border border-gray-200">
            <span className="font-medium">
              {selectedEmails.size} email selected
            </span>
            <div className="flex flex-wrap items-center gap-2 ">
              <button
                onClick={archiveSelectedEmails}
                className="flex items-center gap-1 gap-x-2 px-3 py-2 bg-white border border-[#0000001A] rounded-lg transition text-gray-700">
                <span>
                  <Archive size={18} />
                </span>
                <span>Archive</span>
              </button>
              <button onClick={trashSelectedEmails} className="flex items-center gap-1 gap-x-2 px-3 py-2 bg-white border border-[#0000001A] rounded-lg transition text-gray-700">
                <span>
                  <Trash2 size={18} />
                </span>
                <span>Delete</span>
              </button>
             
              <button
                onClick={handleToggleRead}
                className="flex items-center gap-2 px-3 py-2 bg-white border border-[#0000001A] rounded-lg transition text-gray-700"
              >
                <Mail size={18} />
                <span>{allRead ? "Mark as Unread" : "Mark as Read"}</span>
              </button>
              <ActionBarTagButton
                selectedEmails={Array.from(selectedEmails)}
                allLabels={allLabels}
              />


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
          {filteredMails.map((email) => {

            const isStarred =
              starOverrides[email.id] ?? email.starred;
            return (
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
                    className="transition flex-shrink-0"
                  >
                    <Star
                      size={18}
                      className={
                        isStarred
                          ? "text-teal-500 fill-teal-500"
                          : "text-gray-400"
                      }
                    />
                  </button>

                  <img
                    src={email.avatar}
                    alt={email.name}
                    className="w-10 h-10 rounded-full flex-shrink-0"
                  />

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      {/* <span className="font-medium text-gray-900 ">
                        {email.name}
                      </span> */}
                      <span
                        className={`${
                          email.is_read ? "font-bold text-gray-900" : "font-normal text-gray-700"
                        }`}
                      >
                        {email.name}
                      </span>

                      <span className=" text-xs text-gray-400 bg-gray-50 px-6 py-2 md:px-3 rounded-xl">
                        {email.replies} replies
                      </span>
                    </div>
                    {/* <Link
                      to={`view-email/${email.id}`}
                      className=" text-sm text-gray-400 truncate"
                    >
                      {email.message}
                    </Link> */}
                    <Link
                      to={`view-email/${email.id}`}
                      className={`truncate ${
                        email.is_read ? "font-bold text-gray-900" : "text-gray-400"
                      }`}
                    >
                      {email.message}
                    </Link>

                  </div>
                </div>

                <div className=" flex w-1/2 items-center gap-x-16 lg:gap-x-24 mt-5 lg:mt-0">
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

                  <span className="flex justify-end items-center text-xs text-gray-500 whitespace-nowrap w-16 text-right">
                    {email.time}
                  </span>
                </div>
              </div>
            )
          })}
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
            className={`flex items-center gap-2 p-2 lg:px-4 lg:py-3 bg-white border border-[#0000001A] rounded-lg transition ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-50"
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
            className={`flex items-center gap-2 p-2 lg:px-4 lg:py-3 bg-white border border-[#0000001A] rounded-lg transition ${currentPage === pagination?.totalPages
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
      <LogoutModal
        open={logoutOpen}
        onClose={() => setLogoutOpen(false)}
        onConfirm={handleLogout}
      />
    </div>
  );
}
