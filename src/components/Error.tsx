import { useNavigate } from "react-router";
import { AlertTriangle } from "lucide-react";

export default function Error() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-orange-50 to-orange-100 text-center px-6">
      <div className="bg-orange-200 shadow-xl rounded-2xl p-10 max-w-md w-full">
        <div className="flex justify-center mb-6">
          <div className="bg-orange-100 p-4 rounded-full">
            <AlertTriangle className="w-10 h-10 text-[]" />
          </div>
        </div>
        <h1 className="text-4xl font-bold text-gray-800 mb-3">Oops!</h1>
        <p className="text-gray-600 mb-6">
          Something went wrong. The page you’re looking for might have been moved or doesn’t exist.
        </p>
        <button
          onClick={() => navigate("/")}
          className="px-6 py-3 bg-gradient-to-r from-[#ED990B] to-[#f5ae32] text-white rounded-lg shadow hover:shadow-lg transition-all font-medium"
        >
          Go Back Home
        </button>
      </div>

      <p className="mt-8 text-sm text-gray-400">
        © {new Date().getFullYear()} Replii. All rights reserved.
      </p>
    </div>
  );
}
