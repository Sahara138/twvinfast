import { Package, Edit, Trash2 } from 'lucide-react';
import type { Product } from '../../../types/Admin/BusinessInfo';


const products: Product[] = [
    { id: '1', name: 'Pro Analytics Suite', category: 'Software', price: '$299/month', status: 'Active' },
    { id: '2', name: 'Basic Dashboard', category: 'Software', price: '$99/month', status: 'Active' },
    { id: '3', name: 'Enterprise Support', category: 'Service', price: '$999/month', status: 'Active' },
    { id: '4', name: 'Custom Integration', category: 'Service', price: 'Custom', status: 'Inactive' },
];

export default function Products() {
    return (
        <div className="p-3 md:p-6">
            <div className="md:flex items-start justify-between mb-6">
                <div className=''>
                    <h2 className="text-base md:text-lg font-semibold text-gray-900 mb-1">Products & Services Catalogue</h2>
                    <p className="text-xs md:text-sm text-gray-600">Manage your product and service offerings</p>
                </div>
                <div className="flex flex-col gap-2 mt-5">
                    <button className="p-2 md:px-4 md:py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                        Import Catalogue
                    </button>
                    <button className="px-4 py-2 text-sm font-medium text-white bg-[#ED990B] rounded-lg hover:bg-orange-400 transition-colors">
                        Add Product
                    </button>
                </div>
            </div>

            <div className="space-y-3">
                {products.map((product) => (
                    <div
                        key={product.id}
                        className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-gray-300 hover:shadow-sm transition-all"
                    >
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                                <Package className="text-gray-600" size={20} />
                            </div>
                            <div>
                                <h3 className="text-sm font-semibold text-gray-900">{product.name}</h3>
                                <p className="text-xs text-gray-500">
                                    {product.category} • {product.price}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <span
                                className={`px-3 py-1 text-xs font-medium rounded-full ${product.status === 'Active'
                                        ? 'bg-gray-900 text-white'
                                        : 'bg-red-100 text-red-700'
                                    }`}
                            >
                                {product.status}
                            </span>
                            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                                <Edit size={18} className="text-gray-600" />
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
