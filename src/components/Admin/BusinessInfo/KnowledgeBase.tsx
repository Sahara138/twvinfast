import { Cloud, FileText, Eye, Trash2 } from 'lucide-react';
import type { Document } from '../../../types/Admin/BusinessInfo';

const documents: Document[] = [
    { id: '1', name: 'FAQ_General.pdf', size: '2.3 MB', uploadDate: '2024-01-15' },
    { id: '2', name: 'Product_Guide.docx', size: '4.1 MB', uploadDate: '2024-01-14' },
    { id: '3', name: 'Company_Policies.pdf', size: '1.8 MB', uploadDate: '2024-01-13' },
    { id: '4', name: 'Training_Scripts.txt', size: '856 KB', uploadDate: '2024-01-12' },
];

export default function KnowledgeBase() {
    return (
        <div className="p-6">
            <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-1">Knowledge Base Documents</h2>
                <p className="text-sm text-gray-600">Upload and manage training documents for your AI</p>
            </div>

            <div className="border-2 border-dashed border-gray-300 rounded-lg p-16 text-center mb-6 hover:border-orange-400 transition-colors cursor-pointer">
                <Cloud className="mx-auto mb-4 text-gray-400" size={64} />
                <h3 className="text-base font-semibold text-gray-900 mb-1">Upload Documents</h3>
                <p className="text-sm text-gray-600">Drag and drop files here, or click to browse</p>
            </div>

            <div className="space-y-3">
                {documents.map((doc) => (
                    <div
                        key={doc.id}
                        className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-gray-300 hover:shadow-sm transition-all"
                    >
                        <div className="flex items-center gap-3">
                            <FileText className="text-gray-400" size={20} />
                            <div>
                                <p className="text-sm font-medium text-gray-900">{doc.name}</p>
                                <p className="text-xs text-gray-500">
                                    {doc.size} • Uploaded {doc.uploadDate}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                                <Eye size={18} className="text-gray-600" />
                            </button>
                            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                                <Trash2 size={18} className="text-gray-600" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
