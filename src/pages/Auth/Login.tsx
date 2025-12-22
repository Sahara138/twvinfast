
import { useForm } from "react-hook-form";
import Logo from "../../components/shared/Logo";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLoginMutation } from "../../redux/featuresAPI/auth/auth.api";
import { useAppDispatch } from "../../redux/hooks";
import { setUser } from "../../redux/featuresAPI/auth/auth.slice";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { useState } from "react";

const loginSchema = z.object({
    email: z.string().email("Please enter a valid email address").nonempty("Email is required"),
    password: z.string().min(6, "Password must be at least 6 characters").nonempty("Password is required"),
});
 type LoginFormData = z.infer<typeof loginSchema>;

const Login: React.FC = () => {
    const navigate = useNavigate();
    const [userLogin] = useLoginMutation();
    const dispatch = useAppDispatch();
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading,setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
    });

    const onSubmit = async (data: LoginFormData) => {
        try {
            setIsLoading(true);
            const res = await userLogin(data).unwrap();
            console.log("Login successful:", res);
            if(res?.accessToken){
                dispatch(
                    setUser({
                        user: res?.user,
                        accessToken: res?.accessToken,
                    }));
                    toast.success(res?.message);
                    console.log("User Role:", res);
                    if (res?.user?.role === "SUPER_ADMIN") {
                    navigate("/super-admin");
                    } else if (res?.user?.role === "USER") {
                    navigate("/user");
                    } else if (res?.user?.role === "ADMIN") {
                    navigate("/admin");
                    }

            }
            if(res){
                console.log("Login Response:", res);
            }
        } catch (error: any) {
            console.error("Login failed:", error);
            toast.error(error?.status === 404 ? "User not found" : "Invalid credentials. Please try again.");
            console.log("Login Error:", error.status);
            return;
        }
        finally{
            setIsLoading(false)
        }
        // console.log("Login Data:", data);
        
    }

    return (
        <div className="min-h-screen bg-[#F9FAFB]">
            <header className="w-full  h-22 bg-white pl-12">

                <Logo />
            </header>
            <div className="  max-w-xl mx-auto  p-8 flex flex-col justify-center min-h-[calc(100vh-5.5rem)]">

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
                             {...register("email")}
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
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="input Password here...."
                                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${errors.password ? "border-red-500 focus:ring-red-400" : "border-gray-300 focus:ring-teal-400"
                                    }`}
                                {...register("password")}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 text-lg cursor-pointer"
                            >
                                {showPassword ? <IoEyeOutline /> : <IoEyeOffOutline />}
                            </button>

                        </div>
                                {errors.password && (
                                    <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
                                )}
                    </div>

                    <button
                        type="submit"
                        className="w-full py-2 bg-primary2 text-white font-medium text-xl rounded-md hover:bg-teal-600 transition-colors"
                    >
                        {isLoading? "Signing In..." : "Sign In" }
                    </button>
                </form>
                <p className="text-center text-sm text-gray-400 mt-6">
                    Don't have an account?{" "}
                    <Link
                    to="/signup"
                    className="text-primary2 hover:underline font-medium cursor-pointer"
                    >
                    Sign Up
                    </Link>
                </p>
            </div>
        </div>
    );
}
export default Login;

