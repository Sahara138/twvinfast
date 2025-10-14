import { ShieldUser } from "lucide-react";

interface CustomerAccount {
  id: number;
  company: string;
  email: string;
  plan: "Enterprise" | "Pro" | "Basic";
  status: "Active" | "Trial" | "Suspended";
  users: number;
  cost: number;
  credits: number;
  usage: number;
  admin: string;
  lastActive: string;
}

interface CustomerManagmentTableProps {
  filteredCustomers: CustomerAccount[];
}

export default function CustomerManagmentTable({
  filteredCustomers,
}: CustomerManagmentTableProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-gray-900 text-white";
      case "Trial":
        return "bg-gray-100 text-gray-700 border border-gray-300";
      case "Suspended":
        return "bg-red-500 text-white";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getPlanColor = (plan: string) => {
    switch (plan) {
      case "Enterprise":
        return "bg-purple-100 text-purple-700";
      case "Pro":
        return "bg-blue-100 text-blue-700";
      case "Basic":
        return "bg-green-100 text-green-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="overflow-x-auto rounded-xl">
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-200 bg-gray-50">
            <th className="text-left px-6 py-4 font-semibold text-gray-700">
              Company
            </th>
            <th className="text-left px-6 py-4 font-semibold text-gray-700">
              Plan
            </th>
            <th className="text-left px-6 py-4 font-semibold text-gray-700">
              Status
            </th>
            <th className="text-left px-6 py-4 font-semibold text-gray-700">
              Users
            </th>
            <th className="text-left px-6 py-4 font-semibold text-gray-700">
              Cost
            </th>
            <th className="text-left px-6 py-4 font-semibold text-gray-700">
              Credits
            </th>
            <th className="text-left px-6 py-4 font-semibold text-gray-700">
              Usage
            </th>
            <th className="text-left px-6 py-4 font-semibold text-gray-700">
              Admin
            </th>
            <th className="text-left px-6 py-4 font-semibold text-gray-700">
              Last Active
            </th>
          </tr>
        </thead>

        <tbody>
          {filteredCustomers.map((customer) => (
            <tr
              key={customer.id}
              className="border-b border-gray-100 hover:bg-gray-50"
            >
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                    <ShieldUser size={22} className="text-gray-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">
                      {customer.company}
                    </p>
                    <p className="text-sm text-gray-500">{customer.email}</p>
                  </div>
                </div>
              </td>

              <td className="px-6 py-4">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${getPlanColor(
                    customer.plan
                  )}`}
                >
                  {customer.plan}
                </span>
              </td>

              <td className="px-6 py-4">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                    customer.status
                  )}`}
                >
                  {customer.status}
                </span>
              </td>

              <td className="px-6 py-4 text-gray-900 font-medium">
                {customer.users} users
              </td>
              <td className="px-6 py-4 text-gray-900 font-medium">
                ${customer.cost}
              </td>
              <td className="px-6 py-4 text-gray-900 font-medium">
                {customer.credits}
              </td>
              <td className="px-6 py-4 text-gray-900 font-medium">
                {customer.usage}
              </td>
              <td className="px-6 py-4 text-gray-900 font-medium">
                {customer.admin}
              </td>
              <td className="px-6 py-4 text-gray-900 font-medium">
                {customer.lastActive}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
