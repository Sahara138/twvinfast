import { useState } from "react";
import { Search } from "lucide-react";
import Heading from "../../../components/Admin/Heading";
import StatsCards from "../../../components/SuperAdmin/CustomerManagement/CustomerManagementStatsCards";
import Heading2 from "../../../components/shared/Heading2";
import CreateAccountModal from "./CreateAccountModal";
import CustomerManagmentTable from "./CustomerManagmentTable";

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

export default function CustomerManagement() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const mockCustomers: CustomerAccount[] = [
    {
      id: 1,
      company: "TechCorp Inc.",
      email: "admin@techcorp.com",
      plan: "Enterprise",
      status: "Active",
      users: 120,
      cost: 12540,
      credits: 25000,
      usage: 14260,
      admin: "jamy watson",
      lastActive: "2 hours",
    },
    {
      id: 2,
      company: "StartupXYZ",
      email: "team@startupxyz.com",
      plan: "Pro",
      status: "Active",
      users: 115,
      cost: 11435,
      credits: 23500,
      usage: 12460,
      admin: "jamy watson",
      lastActive: "2 hours",
    },
    {
      id: 3,
      company: "GlobalTech",
      email: "support@globaltech.com",
      plan: "Basic",
      status: "Trial",
      users: 90,
      cost: 9652,
      credits: 22000,
      usage: 14260,
      admin: "jamy watson",
      lastActive: "2 hours",
    },
    {
      id: 4,
      company: "InnovateNow",
      email: "hello@innovatenow.com",
      plan: "Pro",
      status: "Suspended",
      users: 80,
      cost: 8652,
      credits: 21500,
      usage: 11260,
      admin: "jamy watson",
      lastActive: "2 hours",
    },
    {
      id: 5,
      company: "TechCorp Inc.",
      email: "admin@techcorp.com",
      plan: "Enterprise",
      status: "Active",
      users: 75,
      cost: 7650,
      credits: 20500,
      usage: 10760,
      admin: "jamy watson",
      lastActive: "2 hours",
    },
  ];
  const filteredCustomers = mockCustomers.filter((customer) => {
    const matchesSearch =
      customer.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === "All Status" || customer.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="w-[28%] sm:w-[47%] md:w-[70%] lg:w-[90%] xl:w-[100%]">
      <div className=" mx-auto">
        {/* Header */}
        <div className="md:flex justify-between items-start">
          <Heading
            heading1="Customer Management"
            heading2="Manage your platform with complete administrative control"
          />
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-6 py-2 bg-primary mb-6 md:mb-0 hover:bg-orange-400 text-white rounded-lg font-medium transition-colors"
          >
            Create Account
          </button>
        </div>

        {/* Stats Section */}
        <StatsCards />

        {/* Customer Accounts Section */}
        <div className="">
          <div className="p-6">
            <Heading2
              heading1="Customer Accounts"
              heading2="Manage all business accounts and their administrators"
            />

            <div className="md:flex gap-4">
              <div className="flex-1 relative bg-[#F4F6F8] ">
                <Search
                  size={18}
                  className="absolute left-3 top-3 text-gray-400"
                />
                <input
                  type="text"
                  placeholder="Search Customer..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-primary"
                />
              </div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2 my-3 md:my-0 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-primary bg-white"
              >
                <option>All Status</option>
                <option>Active</option>
                <option>Trial</option>
                <option>Suspended</option>
              </select>
            </div>
          </div>

          {/* Table */}
          <CustomerManagmentTable filteredCustomers={filteredCustomers} />
        </div>
      </div>

      {/* Modal */}

      <CreateAccountModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
    </div>
  );
}
