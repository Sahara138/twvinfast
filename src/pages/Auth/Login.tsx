
import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import type { LoginFormInputs } from "../../types/Types";
import Logo from "../../components/shared/Logo";


export default function Login() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormInputs>();

    const onSubmit: SubmitHandler<LoginFormInputs> = (data) => {
        console.log("Form Data:", data);

    };

    return (
        <div className="min-h-screen bg-[#F9FAFB]">
            <header className="w-full  h-22 bg-white ml-12">

                <Logo />
            </header>
            <div className=" max-w-xl mx-auto  p-8 flex flex-col justify-center min-h-[calc(100vh-5.5rem)]">

                <h2 className="text-left text-3xl font-semibold mb-6 ">
                    Get Started with Replii.AI
                </h2>

                {/* Form */}
                <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                    {/* Email / Phone */}
                    <div>
                        <label className="block  font-medium mb-1.5">
                            Email / Phone Number
                        </label>
                        <input
                            type="text"
                            placeholder="input email / phone number here...."
                            className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${errors.email ? "border-red-500 focus:ring-red-400" : "border-gray-300 focus:ring-teal-400"
                                }`}
                            {...register("email", {
                                required: "Email or phone number is required",
                                minLength: { value: 3, message: "Too short" },
                            })}
                        />
                        {errors.email && (
                            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                        )}
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block  font-medium mb-1.5">
                            Password
                        </label>
                        <input
                            type="password"
                            placeholder="input Password here...."
                            className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${errors.password ? "border-red-500 focus:ring-red-400" : "border-gray-300 focus:ring-teal-400"
                                }`}
                            {...register("password", {
                                required: "Password is required",
                                minLength: { value: 6, message: "Password must be at least 6 characters" },
                            })}
                        />
                        {errors.password && (
                            <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
                        )}
                    </div>

                    <button
                        type="submit"
                        className="w-full py-2 bg-[#ED990B] text-white font-medium text-xl rounded-md hover:bg-green-600 transition-colors"
                    >
                        Sign In
                    </button>
                </form>
            </div>
        </div>
    );
}
