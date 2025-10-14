import { useState } from "react";
import type{ LogDetails, LoginRecord, User } from "../../../types/SuperAdmin/SuperUserManagement";
import AllUsersTab from "../../../components/SuperAdmin/SuperUserManagement/AllUsersTab";
import LoginHistoryTab from "../../../components/SuperAdmin/SuperUserManagement/LoginHistoryTab";
import SecurityTab from "../../../components/SuperAdmin/SuperUserManagement/SecurityTab";
import LogDetailModal from "../../../components/SuperAdmin/SuperUserManagement/LogDetailModal";
import Heading from "../../../components/Admin/Heading";
import StatsCards from "../../../components/SuperAdmin/SuperUserManagement/UserManagementStatsCards";

export default function SuperUserManagement() {

  // 🔸 Sample Users
  // ------------------------
  const [users] = useState<User[]>([
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      company: "TechNova",
      role: "Admin",
      status: "Active",
      twoFa: true,
      lastLogin: "2025-10-12 10:30 AM",
      location: "New York, USA",
    },
    {
      id: 2,
      name: "Sarah Khan",
      email: "sarah@example.com",
      company: "BrightEdge",
      role: "User",
      status: "Suspended",
      twoFa: false,
      lastLogin: "2025-10-10 6:45 PM",
      location: "Dhaka, Bangladesh",
    },
    {
      id: 3,
      name: "John Doe",
      email: "john@example.com",
      company: "TechNova",
      role: "Admin",
      status: "Active",
      twoFa: true,
      lastLogin: "2025-10-12 10:30 AM",
      location: "New York, USA",
    },
    {
      id: 4,
      name: "Sarah Khan",
      email: "sarah@example.com",
      company: "BrightEdge",
      role: "User",
      status: "Suspended",
      twoFa: false,
      lastLogin: "2025-10-10 6:45 PM",
      location: "Dhaka, Bangladesh",
    },
  ]);

  const [loginHistory] = useState<LoginRecord[]>([
    {
      id: 1,
      user: "John Doe",
      email: "john@example.com",
      timestamp: "2025-10-12 10:30 AM",
      location: "New York, USA",
      ipAddress: "192.168.0.1",
      status: "Success",
    },
    {
      id: 2,
      user: "Sarah Khan",
      email: "sarah@example.com",
      timestamp: "2025-10-10 6:45 PM",
      location: "Dhaka, Bangladesh",
      ipAddress: "192.168.0.5",
      status: "Failed",
    },
    {
      id: 3,
      user: "John Doe",
      email: "john@example.com",
      timestamp: "2025-10-12 10:30 AM",
      location: "New York, USA",
      ipAddress: "192.168.0.1",
      status: "Success",
    },
    {
      id: 4,
      user: "Sarah Khan",
      email: "sarah@example.com",
      timestamp: "2025-10-10 6:45 PM",
      location: "Dhaka, Bangladesh",
      ipAddress: "192.168.0.5",
      status: "Failed",
    },
  ]);

  const [activeTab, setActiveTab] = useState<"All Users" | "Login History" | "Security">(
    "All Users"
  );
  const [logDetail, setLogDetail] = useState<LogDetails | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [roleFilter, setRoleFilter] = useState("All Roles");
  const [twoFaEnabled, setTwoFaEnabled] = useState(true);
  const [failedLoginAlert, setFailedLoginAlert] = useState(true);
  const [ipWhitelist, setIpWhitelist] = useState(false);
  const [sessionTimeout, setSessionTimeout] = useState("2 hours");
  const handleSelectRecord = (record: LoginRecord) => {
    const details: LogDetails = {
      timestamp: record.timestamp,
      user: record.user,
      email: record.email,
      status: record.status,
      ipAddress: record.ipAddress,
      location: record.location,
      details:
        record.status === "Success"
          ? "Login verified successfully via 2FA. Device recognized."
          : "Failed login due to incorrect password. Attempt flagged for monitoring.",
    };
    setLogDetail(details);
  };

  return (
    <div className="">
      <div className="">
        {/* Header */}
        <Heading heading1="User Management" heading2="Manage your platform with complete administrative control"/>
       {/* stats */}
       <StatsCards/>
        {/* Tabs */}
        <div className="flex flex-wrap gap-3 mb-6">
          {["All Users", "Login History", "Security"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`px-5 py-2 rounded-lg font-medium transition-colors ${
                activeTab === tab
                  ? "bg-primary text-white"
                  : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === "All Users" && (
          <AllUsersTab
            users={users}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
            roleFilter={roleFilter}
            setRoleFilter={setRoleFilter}
          />
        )}

        {activeTab === "Login History" && (
          <LoginHistoryTab records={loginHistory} onSelect={handleSelectRecord} />
        )}

        {activeTab === "Security" && (
          <SecurityTab
            twoFaEnabled={twoFaEnabled}
            setTwoFaEnabled={setTwoFaEnabled}
            failedLoginAlert={failedLoginAlert}
            setFailedLoginAlert={setFailedLoginAlert}
            ipWhitelist={ipWhitelist}
            setIpWhitelist={setIpWhitelist}
            sessionTimeout={sessionTimeout}
            setSessionTimeout={setSessionTimeout}
          />
        )}

        {/* Modal */}
        {logDetail && (
          <LogDetailModal detail={logDetail} onClose={() => setLogDetail(null)} />
        )}
      </div>
    </div>
  );
}
