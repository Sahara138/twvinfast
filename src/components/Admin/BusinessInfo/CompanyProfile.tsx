import { useState } from 'react';
import { Upload } from 'lucide-react';

export default function CompanyProfile() {
    const [formData, setFormData] = useState({
        companyName: 'TechFlow Solution',
        website: 'http://techflow.com',
        phoneNumber: '+01 123 456323 354',
        contactEmail: 'support@techflow.com',
        description: 'TechFlow Solutions provides cutting-edge AI-powered business automation tools that help companies streamline...',
        primaryColor: '#ED9308',
        secondaryColor: '#000000',
        accentColor: '#C4CDD5',
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <div className="p-6">
            <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-1">Company Profile</h2>
                <p className="text-sm text-gray-600">Update your company information and branding</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Company Name
                        </label>
                        <input
                            type="text"
                            name="companyName"
                            value={formData.companyName}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Website
                        </label>
                        <input
                            type="text"
                            name="website"
                            value={formData.website}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Phone Number
                        </label>
                        <input
                            type="text"
                            name="phoneNumber"
                            value={formData.phoneNumber}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Contact Email
                        </label>
                        <select
                            name="contactEmail"
                            value={formData.contactEmail}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all bg-white"
                        >
                            <option value="support@techflow.com">support@techflow.com</option>
                            <option value="info@techflow.com">info@techflow.com</option>
                            <option value="contact@techflow.com">contact@techflow.com</option>
                        </select>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Platform Logo
                    </label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:border-orange-400 transition-colors cursor-pointer">
                        <Upload className="mx-auto mb-3 text-gray-400" size={48} />
                        <p className="text-sm font-medium text-gray-700 mb-1">Upload Your File</p>
                    </div>
                </div>
            </div>

            <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    Company Description
                </label>
                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all resize-none"
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Primary Colour
                    </label>
                    <div className="flex gap-2">
                        <input
                            type="text"
                            name="primaryColor"
                            value={formData.primaryColor}
                            onChange={handleInputChange}
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
                        />
                        <div
                            className="w-10 h-10 rounded border border-gray-300 cursor-pointer"
                            style={{ backgroundColor: formData.primaryColor }}
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Secondary Colour
                    </label>
                    <div className="flex gap-2">
                        <input
                            type="text"
                            name="secondaryColor"
                            value={formData.secondaryColor}
                            onChange={handleInputChange}
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
                        />
                        <div
                            className="w-10 h-10 rounded border border-gray-300 cursor-pointer"
                            style={{ backgroundColor: formData.secondaryColor }}
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Accent Colour
                    </label>
                    <div className="flex gap-2">
                        <input
                            type="text"
                            name="accentColor"
                            value={formData.accentColor}
                            onChange={handleInputChange}
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
                        />
                        <div
                            className="w-10 h-10 rounded border border-gray-300 cursor-pointer"
                            style={{ backgroundColor: formData.accentColor }}
                        />
                    </div>
                </div>
            </div>

            <div className="flex gap-3 mt-8">
                <button className="px-6 py-2.5 bg-[#ED990B] text-white rounded-lg font-medium hover:bg-orange-400 transition-colors">
                    Save Changes
                </button>
                <button className="px-6 py-2.5 bg-[#F9DFB3]  rounded-lg font-medium hover:bg-orange-200 transition-colors">
                    Reset to Default
                </button>
            </div>
        </div>
    );
}
