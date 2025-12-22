import React, { useState } from "react";
import { useCreateLabelByMailboxMutation } from "../../redux/dashboardApi/user/label/labelApi";
import type { LabelType } from "../../types/User/Label";
import { toast } from "react-toastify";

type CreateLabelModalProps = {
  isOpen: boolean;
  onClose: () => void;
  mailboxId: number;
  existingLabels: LabelType[]; // pass current labels for duplicate check
};

const CreateLabelModal: React.FC<CreateLabelModalProps> = ({
  isOpen,
  onClose,
  mailboxId,
  existingLabels,
}) => {
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [createLabel] = useCreateLabelByMailboxMutation();
  // console.log(existingLabels)
  console.log
  const handleCreate = async () => {
  const trimmedName = name.trim();

  if (!trimmedName) {
    toast.error("Label name cannot be empty");
    return;
  }

  // Use existingLabels from props
  const duplicate = existingLabels.find(
    (label) => label.name.toLowerCase() === trimmedName.toLowerCase()
  );

  if (duplicate) {
    toast.error(`Label "${trimmedName}" already exists`);
    return;
  }

  try {
    setIsLoading(true);
    await createLabel({ mailboxId, data: { name: trimmedName } }).unwrap();
    toast.success(`Label "${trimmedName}" created successfully!`);
    setName("");
    onClose();
  } catch {
    toast.error("Failed to create label");
  } finally {
    setIsLoading(false);
  }
};

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-lg w-full max-w-md p-6 relative shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Create New Label</h2>
        <input
          type="text"
          placeholder="Label name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleCreate()}
          className="w-full border border-gray-300 rounded-lg p-2 mb-4"
          disabled={isLoading}
        />
        {/* <p className="text-red-500">{existingLabels}</p> */}
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded-lg hover:bg-gray-100 transition"
            disabled={isLoading}
          >
            Cancel
          </button>
          <button
            onClick={handleCreate}
            className={`px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition ${
              isLoading ? "opacity-70 cursor-not-allowed" : ""
            }`}
            disabled={isLoading}
          >
            {isLoading ? "Creating..." : "Create"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateLabelModal;

