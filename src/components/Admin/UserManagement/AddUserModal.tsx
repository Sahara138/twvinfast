import { useState } from 'react';
import z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCreateUserMutation } from '../../../redux/dashboardApi/admin/user/userApi';


const userSchema = z.object({
    full_name: z.string().min(2, "Full name must be at least 2 characters"),
    email: z.string().email("Please enter a valid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
});

type UserFormData = z.infer<typeof userSchema>;

interface AddUserModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (userData: UserFormData) => Promise<void>;
}

export default function AddUserModal({ isOpen, onClose}: AddUserModalProps) {
   const [createUser] = useCreateUserMutation();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
  });

  if (!isOpen) return null;

    const handleCreateUser = async (data: UserFormData) => {
    setIsSubmitting(true);
    try {
        const payload = {
        name: data.full_name,
        email: data.email,
        password: data.password,
    };
      await createUser(payload).unwrap();
      onClose();
    } catch (error) {
      console.error("Error creating user:", error);
    } finally {
      setIsSubmitting(false);
    }
  };


    // const handleSubmit = async (e: React.FormEvent) => {
    //     e.preventDefault();
    //     setIsSubmitting(true);
    //     try {
    //         await onSubmit(formData);

    //         setFormData({
    //             full_name: '',
    //             email: '',
    //             phone_number: '',
    //             role: '',
    //         });
    //         console.log('Form submitted:', formData);
    //         onClose();
    //     } catch (error) {
    //         console.error('Error submitting form:', error);
    //     } finally {
    //         setIsSubmitting(false);
    //     }
    // };

    // const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    //     setFormData({
    //         ...formData,
    //         [e.target.name]: e.target.value,
    //     });
    // };

    return (
<div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30 backdrop-blur-sm">
            <div className="bg-white bg-opacity-80 rounded-lg max-w-xl w-full max-h-[90vh] overflow-y-auto">
                <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
                    <h2 className="text-xl font-medium text-gray-900">Add New User</h2>

                </div>

                <form onSubmit={handleSubmit(handleCreateUser)} className="p-6">
                    <p className="text-sm text-gray-600 mb-6">
                        Invite a new team member to join your workspace
                    </p>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                Full Name
                            </label>
                            <input
                                type="text"
                                placeholder="Enter name..."
                               {...register('full_name')}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
                            />
                            <p className="text-red-500 text-xs mt-1">{errors.full_name?.message}</p>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                Email Address
                            </label>
                            <input
                                type="email"
                                placeholder="Enter email address"
                                {...register('email')}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
                            />
                            <p className="text-red-500 text-xs mt-1">{errors.email?.message}</p>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                Password
                            </label>
                            <input
                                type="text"
                                {...register('password')}
                                placeholder="Enter password"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
                            />
                            <p className="text-red-500 text-xs mt-1">{errors.password?.message}</p>
                        </div>
                    </div>

                    <div className="flex justify-end gap-3 mt-6 pt-6 border-t border-gray-200">
                        <button
                            type="button"
                            onClick={onClose}
                            className="w-fit px-4 py-2.5 text-sm font-medium text-gray-700 bg-[#F9DFB3]  rounded-lg hover:bg-gray-50 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-fit px-4 py-2.5 text-sm font-medium text-white bg-[#ED990B] rounded-lg hover:bg-orange-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isSubmitting ? 'Sending...' : 'Send Invitation'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
