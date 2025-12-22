import { Clock, FileTextIcon, Loader, Mars, PenTool, Tag, TriangleAlert } from "lucide-react";
import { useState } from "react";
import {  useDeleteLabelMutation, useGetLabelByMailboxQuery } from "../redux/dashboardApi/user/label/labelApi";
import type { LabelType } from "../types/User/Label";
import CreateLabelModal from "./user/CreateLabelModal";
import UpdateLabelModal from "./user/UpdateLabelModal";
import { useGetMailboxInfoQuery } from "../redux/dashboardApi/user/mail/mailApi";
type MyModalProps = {
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
};

const ICONS = [<PenTool size={18} />, <Clock size={18} />, <TriangleAlert size={18} />, <FileTextIcon size={18} />, <Tag size={18} />,<Mars size={18}/>];

const COLORS = [
  "bg-blue-100 border-blue-300 text-blue-600",
  "bg-green-100 border-green-300 text-green-600",
  "bg-red-100 border-red-300 text-red-600",
  "bg-teal-100 border-teal-300 text-teal-600",
  "bg-purple-100 border-purple-300 text-purple-600",
];

export const getRandomIcon = (labelName: string) => {
  const index = labelName.length % ICONS.length;
  return ICONS[index];
};

export const getRandomColor = (labelName: string) => {
  const index = labelName.length % COLORS.length;
  return COLORS[index];
};
export default function ManageModal({
  isModalOpen,
  setIsModalOpen,
}: MyModalProps) {
  const [isLoading, setIsLoading] = useState(false);

  
  const { data: mailbox } = useGetMailboxInfoQuery();
  const mailboxId = mailbox?.id;
  // console.log(mailboxId);

  // Labels //
  const { data: labels = [], isLoading: isLabelsLoading } = useGetLabelByMailboxQuery(mailboxId!, {
  skip: !mailboxId,
}) as { data: LabelType[], isLoading: boolean };


  const [deleteLabel] = useDeleteLabelMutation();
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const [selectedLabel, setSelectedLabel] = useState<LabelType | null>(null);

  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [labelToDelete, setLabelToDelete] = useState<LabelType | null>(null);

  const handleDeleteClick = (label: LabelType) => {
    setLabelToDelete(label);
    setDeleteConfirmOpen(true);
  };

  const confirmDelete = async () => {
    if (labelToDelete) {
      try {
        setIsLoading(true);
        await deleteLabel(labelToDelete.id).unwrap();
        setDeleteConfirmOpen(false);
        setLabelToDelete(null);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
  };
}

  // Search Query //
  const [searchQuery, setSearchQuery] = useState("");

  const filteredLabels = (labels ?? []).filter(label =>
    label.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  if (!isModalOpen) return null;

  if (isLabelsLoading) {
  return <Loader />;
}

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-lg w-full max-w-xl p-6 relative shadow-lg">
        {/* Header */}
        <div className="flex items-center gap-2 mb-6">
          <Tag className="w-5 h-5 text-primary2" />
          <h2 className="text-xl font-semibold text-gray-900">Manage Labels</h2>
        </div>

        {/* Close Button */}
        <button
          onClick={() => setIsModalOpen(false)}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Search Box */}
        <div className="mb-5">
          <div className="relative">
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
              placeholder="Search labels..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-teal-500 bg-gray-50"
            />
          </div>
        </div>

        {/* Create New Label Button */}
        <button
        onClick={() => setIsCreateOpen(true)}
        className="w-full mb-6 px-4 py-2.5 border-2  border-gray-300 rounded-lg text-gray-700 font-medium hover:border-gray-400 hover:bg-gray-50 transition flex items-center justify-center gap-2">
          <span className="text-lg">+</span>
          Create New Label
        </button>

        {/* Labels Count */}
        <div className="mb-4">
          <p className=" font-medium text-gray-900">
            Your Labels ({labels?.length})
          </p>
        </div>

        {/* Labels List */}
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {filteredLabels?.length > 0 ? (
            filteredLabels.map((label: LabelType) =>{
                const icon = label.icon || getRandomIcon(label.name);
                const color = label.color || getRandomColor(label.name);

             return(
              <div
                key={label.id}
                className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition"
              >
                <div className="flex items-center gap-3 flex-1">
                  <div
                    className={`w-8 h-8 rounded flex items-center justify-center text-lg `}
                  >
                    {/* {label.icon} */}
                    {icon}
                  </div>
                  <div>
                    <span
                      className={`inline-block px-2.5 py-1 rounded-full text-xs font-medium capitalize border  ${color}`}
                    >
                      {label.name}
                    </span>
                  </div>
                  <div>
                  {/* {
                    label?.count && */}
                      <span className="text-sm text-gray-600 ml-auto mr-4">
                        12 {label.count} emails
                      </span>
                      

                  {/* } */}

                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                  onClick={() => { setSelectedLabel(label); setIsUpdateOpen(true); }}
                   className="p-1.5 text-gray-400 hover:text-gray-600 transition hover:bg-gray-200 rounded">
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                      />
                    </svg>
                  </button>
                  <button
                    onClick={() => handleDeleteClick(label)}
                    className="p-1.5 text-gray-400 hover:text-red-600 transition hover:bg-red-50 rounded cursor-pointer"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            )})
          ) : (
            <div className="text-center py-6 text-gray-500">
              <p className="text-sm">No labels found</p>
            </div>
          )}
        </div>
        {deleteConfirmOpen && (
          
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">

          <div className="bg-white rounded-lg w-96 p-6 shadow-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Delete Label</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete <span className="capitalize">"{labelToDelete?.name}"</span>? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setDeleteConfirmOpen(false)}
                className="px-4 py-2 bg-gray-200 rounded-lg cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-lg cursor-pointer"
                disabled={isLoading}
              >
                {isLoading ? "Deleting..." : "Delete"}
              </button>

            </div>
          </div>
        </div>
      )}


        {/* Done Button */}
        <div className="mt-6 flex justify-end">
          <button
            onClick={() => setIsModalOpen(false)}
            className="px-6 py-2 bg-white border border-gray-300 text-gray-900 rounded-lg font-medium hover:bg-gray-50 transition"
          >
            Done
          </button>
        </div>
      </div>
      <CreateLabelModal isOpen={isCreateOpen} onClose={() => setIsCreateOpen(false)} mailboxId={mailboxId!} existingLabels={labels}/>
      <UpdateLabelModal isOpen={isUpdateOpen} onClose={() => setIsUpdateOpen(false)} label={selectedLabel} existingLabels={labels} />
    </div>
  );
}
