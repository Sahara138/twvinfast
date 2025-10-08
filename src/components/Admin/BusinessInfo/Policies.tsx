import { Eye, Edit } from 'lucide-react';
import type { Policy } from '../../../types/Admin/BusinessInfo';

const policies: Policy[] = [
    { id: '1', title: 'Privacy Policy', lastUpdated: 'January 15, 2024' },
    { id: '2', title: 'Terms of Service', lastUpdated: 'January 15, 2024' },
    { id: '3', title: 'Data Protection', lastUpdated: 'January 15, 2024' },
    { id: '4', title: 'Cookie Policy', lastUpdated: 'January 15, 2024' },
];

export default function Policies() {
    return (
        <div className="p-6">
            <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-1">Policies & Compliance</h2>
                <p className="text-sm text-gray-600">Manage company policies and compliance documents</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {policies.map((policy) => (
                    <div
                        key={policy.id}
                        className="border border-gray-200 rounded-lg p-5 hover:border-gray-300 hover:shadow-sm transition-all"
                    >
                        <h3 className="text-base font-semibold text-gray-900 mb-2">{policy.title}</h3>
                        <p className="text-xs text-gray-500 mb-4">Last updated: {policy.lastUpdated}</p>
                        <div className="flex gap-3">
                            <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gray-700 bg-white border border-gray-300 rounded hover:bg-gray-50 transition-colors">
                                <Edit size={14} />
                                Edit
                            </button>
                            <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gray-700 bg-white border border-gray-300 rounded hover:bg-gray-50 transition-colors">
                                <Eye size={14} />
                                View
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
