import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Logo from "../../components/shared/Logo";
import { toast } from "react-toastify";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useRegisterMutation } from "../../redux/featuresAPI/auth/auth.api";

/* ---------------- ZOD SCHEMA ---------------- */
const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  companyName: z.string().min(3, "Company name must be at least 3 characters"),
});

type RegisterFormData = z.infer<typeof registerSchema>;

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [registerUser] = useRegisterMutation();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading,setIsLoading] = useState(false);


  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
        // console.log("Registration Data:", data);
        setIsLoading(true)
      const res = await registerUser(data).unwrap();

      toast.success(res?.message);
      navigate("/");
    } catch (error: any) {
      // console.error("Register failed:", error);
      toast.error(
        error?.status === 409
          ? "User already exists"
          : "Registration failed. Please try again."
      );
    }finally{
      setIsLoading(false)
    }
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      <header className="w-full h-22 bg-white pl-12">
        <Logo />
      </header>

      <div className="max-w-xl mx-auto p-8 flex flex-col justify-center min-h-[calc(100vh-5.5rem)]">
        <h2 className="text-left text-3xl font-semibold mb-6">
          Create your Replii.AI account
        </h2>

        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          {/* Name */}
          <div>
            <label className="block font-medium mb-1.5">Name</label>
            <input
              type="text"
              placeholder="Enter your full name"
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                errors.name
                  ? "border-red-500 focus:ring-red-400"
                  : "border-gray-300 focus:ring-teal-400"
              }`}
              {...register("name")}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">
                {errors.name.message}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block font-medium mb-1.5">Email</label>
            <input
              type="email"
              placeholder="Enter your email address"
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                errors.email
                  ? "border-red-500 focus:ring-red-400"
                  : "border-gray-300 focus:ring-teal-400"
              }`}
              {...register("email")}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block font-medium mb-1.5">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
                className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                  errors.password
                    ? "border-red-500 focus:ring-red-400"
                    : "border-gray-300 focus:ring-teal-400"
                }`}
                {...register("password")}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 text-lg"
              >
                {showPassword ? <IoEyeOutline /> : <IoEyeOffOutline />}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Company Name */}
          <div>
            <label className="block font-medium mb-1.5">Company Name</label>
            <input
              type="text"
              placeholder="Enter company name"
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                errors.companyName
                  ? "border-red-500 focus:ring-red-400"
                  : "border-gray-300 focus:ring-teal-400"
              }`}
              {...register("companyName")}
            />
            {errors.companyName && (
              <p className="text-red-500 text-sm mt-1">
                {errors.companyName.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-primary2 text-white font-medium text-xl rounded-md hover:bg-teal-600 transition-colors"
          >
            {isLoading? "Signing Up..." : "Sign Up" }
          </button>
        </form>
        <p className="text-center text-sm text-gray-400 mt-6">
                    Already have an account?{" "}
                    <Link
                    to="/"
                    className="text-primary2 hover:underline font-medium cursor-pointer"
                    >
                    Sign In Here
                    </Link>
                </p>
      </div>
    </div>
  );
};

export default Register;

// import { useForm } from "react-hook-form";
// import type { SubmitHandler } from "react-hook-form";

// import Logo from "../../components/shared/Logo";


// export default function Login() {
//     const {
//         register,
//         handleSubmit,
//         formState: { errors },
//     } = useForm<LoginFormInputs>();

//     const onSubmit: SubmitHandler<LoginFormInputs> = (data) => {
//         console.log("Form Data:", data);

//     };

//     return (
//         <div className="min-h-screen bg-[#F9FAFB]">
//             <header className="w-full  h-22 bg-white pl-12">

//                 <Logo />
//             </header>
//             <div className="  max-w-xl mx-auto  p-8 flex flex-col justify-center min-h-[calc(100vh-5.5rem)]">

//                 <h2 className="text-left text-3xl font-semibold mb-6 ">
//                     Get Started with Replii.AI
//                 </h2>

//                 {/* Form */}
//                 <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
//                     {/* Name */}
//                     <div>
//                         <label className="block  font-medium mb-1.5">
//                             Name
//                         </label>
//                         <input
//                             type="text"
//                             placeholder="input email / phone number here...."
//                             className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${errors.email ? "border-red-500 focus:ring-red-400" : "border-gray-300 focus:ring-teal-400"
//                                 }`}
//                             {...register("email", {
//                                 required: "Name is required",
//                             })}
//                         />
//                         {errors.email && (
//                             <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
//                         )}
//                     </div>
//                     {/* Email / Phone */}
//                     <div>
//                         <label className="block  font-medium mb-1.5">
//                             Email Address
//                         </label>
//                         <input
//                             type="text"
//                             placeholder="Enter your email address here...."
//                             className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${errors.email ? "border-red-500 focus:ring-red-400" : "border-gray-300 focus:ring-teal-400"
//                                 }`}
//                             {...register("email", {
//                                 required: "Email or phone number is required",
//                                 minLength: { value: 3, message: "Too short" },
//                             })}
//                         />
//                         {errors.email && (
//                             <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
//                         )}
//                     </div>

//                     {/* Password */}
//                     <div>
//                         <label className="block  font-medium mb-1.5">
//                             Password
//                         </label>
//                         <input
//                             type="password"
//                             placeholder="input Password here...."
//                             className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${errors.password ? "border-red-500 focus:ring-red-400" : "border-gray-300 focus:ring-teal-400"
//                                 }`}
//                             {...register("password", {
//                                 required: "Password is required",
//                                 minLength: { value: 6, message: "Password must be at least 6 characters" },
//                             })}
//                         />
//                         {errors.password && (
//                             <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
//                         )}
//                     </div>

//                     {/* Password */}
//                     <div>
//                         <label className="block  font-medium mb-1.5">
//                             Company Name
//                         </label>
//                         <input
//                             type="companyName"
//                             placeholder="Enter your company name here...."
//                             className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${errors.companyName ? "border-red-500 focus:ring-red-400" : "border-gray-300 focus:ring-teal-400"
//                                 }`}
//                             {...register("companyName", {
//                                 required: "Company name is required",
//                                 minLength: { value: 3, message: "Company name must be at least 3 characters" },
//                             })}
//                         />
//                         {errors.companyName && (
//                             <p className="text-red-500 text-sm mt-1">{errors.companyName.message}</p>
//                         )}
//                     </div>

//                     <button
//                         type="submit"
//                         className="w-full py-2 bg-primary2 text-white font-medium text-xl rounded-md hover:bg-teal-600 transition-colors"
//                     >
//                         Sign In
//                     </button>
//                 </form>
//             </div>
//         </div>
//     );
// }
