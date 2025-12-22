import { useState, useEffect } from "react";
import { useUpdateLabelMutation } from "../../redux/dashboardApi/user/label/labelApi";
import type { LabelType } from "../../types/User/Label";
import { toast } from "react-toastify";

type UpdateLabelModalProps = {
  isOpen: boolean;
  onClose: () => void;
  label: LabelType | null;
  existingLabels: LabelType[]; // pass current labels for duplicate check
};

export default function UpdateLabelModal({
  isOpen,
  onClose,
  label,
  // existingLabels,
}: UpdateLabelModalProps) {
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [updateLabel] = useUpdateLabelMutation();

  useEffect(() => {
    if (label) setName(label.name);
  }, [label]);
  console.log(label)

  const handleUpdate = async () => {
    if (!label) return;

    const trimmedName = name.trim();
    if (!trimmedName) {
      toast.error("Label name cannot be empty");
      return;
    }

    // Check for duplicates (ignore the current label itself)
    // const duplicate = existingLabels.find(
    //   (l) =>
    //     l.name.toLowerCase() === trimmedName.toLowerCase()
    // );
    // console.log(duplicate)

    // if (duplicate) {
    //   toast.error(`Label "${trimmedName}" already exists`);
    //   return;
    // }
    console.log("labelId:", label.id)
    try {
      setIsLoading(true);
      await updateLabel({ labelId: label.id, data: { name: trimmedName } }).unwrap();
      toast.success(`Label "${trimmedName}" updated successfully!`);
      onClose();
    } catch {
      toast.error("Failed to update label");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen || !label) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-lg w-full max-w-md p-6 relative shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Update Label</h2>

        <input
          type="text"
          placeholder="Label name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleUpdate()}
          className="w-full border border-gray-300 rounded-lg p-2 mb-4"
          disabled={isLoading}
        />

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded-lg hover:bg-gray-100 transition"
            disabled={isLoading}
          >
            Cancel
          </button>
          <button
            onClick={handleUpdate}
            className={`px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition ${
              isLoading ? "opacity-70 cursor-not-allowed" : ""
            }`}
            disabled={isLoading}
          >
            {isLoading ? "Updating..." : "Update"}
          </button>
        </div>
      </div>
    </div>
  );
}
