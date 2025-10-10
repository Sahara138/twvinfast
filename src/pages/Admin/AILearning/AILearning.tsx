import { UploadCloud, Eye, MoreVertical, FileText, Trash2 } from "lucide-react";
import type { DocumentItem } from "../../../types/Admin/AILearning";
import Heading from "../../../components/Admin/Heading";
export default function AILearning() {
  const documents: DocumentItem[] = [
    {
      name: "Customer_Service_Scripts.pdf",
      date: "2024-01-15",
      category: "Scripts",
      tags: ["Customer service", "support"],
    },
    {
      name: "Product_Knowledge_Base.docx",
      date: "2024-01-15",
      category: "Knowledge",
      tags: ["products", "features", "pitches"],
    },
    {
      name: "Sales_Training_Material.txt",
      date: "2024-01-15",
      category: "Sales",
      tags: ["specifications", "pitches"],
    },
    {
      name: "Technical_Documentation.pdf",
      date: "2024-01-15",
      category: "Technical",
      tags: ["objections", "support", "sales"],
    },
    {
      name: "Customer_Service_Scripts.pdf",
      date: "2024-01-15",
      category: "Sales",
      tags: ["Customer service", "setup"],
    },
  ];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      console.log("Selected file:", file.name);
    }
  };

  return (
    <div className="main-container space-y-8 ">
      {/* Header */}
      <Heading
        heading1="AI Learning Control"
        heading2="Manage training documents, review AI suggestions, and control learning processes"
      />

      <div className="border-[#C4CDD5] border-t pb-6 " />

      {/* Upload Section */}
      <div className="border border-gray-200 rounded-xl p-6">
        <h2 className="text-lg font-medium text-gray-800 mb-4">
          Upload Training Documents
        </h2>
        <p className="text-sm text-gray-500 mb-6">
          Add new training materials to improve AI responses
        </p>

        <label
          htmlFor="file-upload"
          className="border-2 border-dashed border-gray-300 rounded-lg p-10 text-center hover:border-orange-400 transition-colors cursor-pointer block"
        >
          <input
            id="file-upload"
            type="file"
            accept=".pdf,.doc,.docx,.txt"
            className="hidden"
            onChange={handleFileChange}
          />
          <UploadCloud className="mx-auto mb-3 text-gray-900 w-10 h-10" />
          <p className="font-medium text-gray-700">Upload Training Materials</p>
          <p className="text-sm text-gray-400">
            Support for PDF, DOCX, TXT files up to 10MB
          </p>
        </label>
      </div>

      {/* Training Documents */}
      <div className="">
        <h2 className="text-lg font-medium text-gray-800 mb-4">
          Training Documents
        </h2>
        <p className="text-sm text-gray-500 mb-6">
          Manage and categorize your training materials
        </p>

        <div className="overflow-x-auto  border border-gray-200 rounded-xl p-6">
          <table className="min-w-full text-sm text-left border-collapse">
            <thead className="">
              <tr className="text-gray-700 text-base border-b border-[#C4CDD5] ">
                <th className="pb-3 font-medium">Document</th>
                <th className="pb-3 font-medium">Category</th>
                <th className="pb-3 font-medium">Tags</th>
                <th className="pb-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#C4CDD5]">
              {documents.map((doc, idx) => (
                <tr key={idx} className="hover:bg-orange-50">
                  <td className="py-4 flex items-center gap-3">
                    <FileText className=" w-6 h-8" />
                    <div>
                      <p className="font-medium text-gray-800">{doc.name}</p>
                      <p className="text-xs text-gray-400">
                        Uploaded {doc.date}
                      </p>
                    </div>
                  </td>
                  <td>
                    <span className="px-3 py-1 text-xs font-medium  border rounded-full">
                      {doc.category}
                    </span>
                  </td>
                  <td className="space-x-2">
                    {doc.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="inline-block px-3 py-1 text-xs font-medium bg-gray-200 text-gray-600 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </td>
                  <td className="flex items-center gap-4 py-4 text-[#454F5B]">
                    <Eye className="w-5 h-5 hover:text-orange-400 cursor-pointer" />
                    <Trash2 className="w-5 h-5 hover:text-orange-400 cursor-pointer" />
                    <MoreVertical className="w-5 h-5 hover:text-orange-400 cursor-pointer" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
