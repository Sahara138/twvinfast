import { useState } from "react";
import type{ Account, AuditLog, Dataset } from "../../../types/SuperAdmin/BusinessControl";
import BusinessTab from "../../../components/SuperAdmin/BusinessControl/BusinessTab";
import StatsCards from "../../../components/SuperAdmin/BusinessControl/BusinessManangementStatsCards";
import AllDatasetTab from "../../../components/SuperAdmin/BusinessControl/DatasetsTab";
import AllAuditLogsTab from "../../../components/SuperAdmin/BusinessControl/AuditLogsTab";


// const mockBusiness: BusinessAccount[] = [
//   {
//     id: 1,
//     name: 'GPT-4',
//     provider: 'OpenAI',
//     usage: 45,
//     uptime: 98.9,
//     enabled: true,
//     requestCount: 11362,
//     avgResponse: 2.1,
//   },
//   {
//     id: 2,
//     name: 'Claude-3 Sonnet',
//     provider: 'Anthropic',
//     usage: 32,
//     uptime: 97.5,
//     enabled: true,
//     requestCount: 10052,
//     avgResponse: 2.5,
//   },
//   {
//     id: 3,
//     name: 'Mistral Large',
//     provider: 'Mistral AI',
//     usage: 65,
//     uptime: 98.3,
//     enabled: false,
//     requestCount: 8352,
//     avgResponse: 1.8,
//   },
//   {
//     id: 4,
//     name: 'Gemini Pro',
//     provider: 'Google',
//     usage: 52,
//     uptime: 98.8,
//     enabled: true,
//     requestCount: 10352,
//     avgResponse: 2.2,
//   },
// ];
// const mockDatasets: DataSets[] = [
//   {
//     id: 1,
//     name: 'Customer Service Assistant',
//     description: 'Default prompt for customer service interactions',
//     content: 'You are a helpful customer service assistant. Always be polite, professional, and provide accurate information....',
//     applicableModels: ['gpt-4'],
//     enabled: true,
//   },
//   {
//     id: 2,
//     name: 'Technical Support',
//     description: 'Specialized prompt for technical support queries',
//     content: 'You are a technical support specialist with expertise in troubleshooting and problem solving....',
//     applicableModels: ['gpt-4', 'claude-3'],
//     enabled: true,
//   },
//   {
//     id: 3,
//     name: 'Sales Assistant',
//     description: 'Prompt for sales and lead qualification',
//     content: 'You are a sales assistant focused on understanding customer needs and providing relevant solutions....',
//     applicableModels: ['mistral-large'],
//     enabled: true,
//   },
// ];
// const mockAuditLogs: AuditLogs[] = [
//   { id: 1, word: 'inappropriate_term_1' },
//   { id: 2, word: 'spam_keyword' },
//   { id: 3, word: 'prohibited_content' },
//   { id: 4, word: 'harmful_language' },
//   { id: 5, word: 'offensive_word' },
// ];
export default function BusinessControl() {
  const [activeTab, setActiveTab] = useState<'Business Account' | 'Datasets' | 'Audit Logs'>('Business Account');
  const [searchQuery, setSearchQuery] = useState("");

  // const [business, setBusiness] = useState(mockBusiness);
  //   const [datasets, setDatasets] = useState(mockDatasets);
  //   const [audit, setAudit] = useState(mockAuditLogs);

  const [accounts] = useState<Account[]>([
  {
    "id": 1,
    "name": "Alpha Analytics",
    "email": "contact@alphaanalytics.com",
    "company": "Alpha Analytics Ltd.",
    "admin": "Sarah Johnson",
    "users": 12,
    "datasets": 34,
    "inputs": 560,
    "datasize": 2048
  },
  {
    "id": 2,
    "name": "Beta Insights",
    "email": "info@betainsights.io",
    "company": "Beta Insights Inc.",
    "admin": "David Miller",
    "users": 8,
    "datasets": 27,
    "inputs": 430,
    "datasize": 1560
  },
  {
    "id": 3,
    "name": "Gamma DataWorks",
    "email": "support@gammadw.com",
    "company": "Gamma DataWorks",
    "admin": "Emma Williams",
    "users": 15,
    "datasets": 42,
    "inputs": 720,
    "datasize": 3050
  },
  {
    "id": 4,
    "name": "Delta Metrics",
    "email": "hello@deltametrics.ai",
    "company": "Delta Metrics AI",
    "admin": "Michael Brown",
    "users": 10,
    "datasets": 31,
    "inputs": 612,
    "datasize": 2590
  },
  {
    "id": 5,
    "name": "Epsilon Labs",
    "email": "admin@epsilonlabs.tech",
    "company": "Epsilon Labs",
    "admin": "Olivia Davis",
    "users": 18,
    "datasets": 55,
    "inputs": 890,
    "datasize": 3890
  },
  {
    "id": 6,
    "name": "Zeta Systems",
    "email": "team@zetasystems.com",
    "company": "Zeta Systems Co.",
    "admin": "Liam Anderson",
    "users": 7,
    "datasets": 22,
    "inputs": 410,
    "datasize": 1420
  },
  {
    "id": 7,
    "name": "Omega Research",
    "email": "contact@omegaresearch.net",
    "company": "Omega Research Network",
    "admin": "Sophia Martinez",
    "users": 20,
    "datasets": 60,
    "inputs": 990,
    "datasize": 4025
  },
  {
    "id": 8,
    "name": "Nova DataCloud",
    "email": "info@novadata.cloud",
    "company": "Nova DataCloud Services",
    "admin": "James Wilson",
    "users": 9,
    "datasets": 29,
    "inputs": 502,
    "datasize": 2310
  },
  {
    "id": 9,
    "name": "Atlas Tech",
    "email": "support@atlastech.io",
    "company": "Atlas Tech Solutions",
    "admin": "Isabella Lee",
    "users": 11,
    "datasets": 36,
    "inputs": 650,
    "datasize": 2800
  },
  {
    "id": 10,
    "name": "Vertex Analytics",
    "email": "vertex@analytics.com",
    "company": "Vertex Analytics Pvt. Ltd.",
    "admin": "Ethan Robinson",
    "users": 14,
    "datasets": 48,
    "inputs": 810,
    "datasize": 3500
  }
]
);
  const [datasets] = useState<Dataset[]>([
  {
    "id": 1,
    "dataset": "Customer Demographics 2025",
    "business": "Alpha Analytics",
    "type": "Conversations",
    "size": 1.2,
    "records": 15000,
    "status": "Active"
  },
  {
    "id": 2,
    "dataset": "E-commerce Transactions Q3",
    "business": "Beta Insights",
    "type": "FAQs",
    "size": 9.8,
    "records": 8900,
    "status": "Active"
  },
  {
    "id": 3,
    "dataset": "Social Media Engagement Data",
    "business": "Gamma DataWorks",
    "type": "Conversations",
    "size": 5.4,
    "records": 5200,
    "status": "Active"
  },
  {
    "id": 4,
    "dataset": "Website Traffic Logs",
    "business": "Delta Metrics",
    "type": "FAQs",
    "size": 2150,
    "records": 28500,
    "status": "Active"
  },
  {
    "id": 5,
    "dataset": "Retail Product Inventory",
    "business": "Epsilon Labs",
    "type": "Conversations",
    "size": 7.5,
    "records": 9400,
    "status": "Active"
  },
  {
    "id": 6,
    "dataset": "Sensor IoT Readings",
    "business": "Zeta Systems",
    "type": "JSON",
    "size": 1860,
    "records": 32000,
    "status": "Active"
  },
  {
    "id": 7,
    "dataset": "Marketing Campaign Responses",
    "business": "Omega Research",
    "type": "Conversations",
    "size": 6.5,
    "records": 7800,
    "status": "Active"
  },
  {
    "id": 8,
    "dataset": "Financial Transactions FY24",
    "business": "Nova DataCloud",
    "type": "Documents",
    "size": 0.5,
    "records": 41000,
    "status": "Active"
  },
  {
    "id": 9,
    "dataset": "Customer Support Tickets",
    "business": "Atlas Tech",
    "type": "Documents",
    "size": 0.1,
    "records": 10500,
    "status": "Active"
  },
  {
    "id": 10,
    "dataset": "User Behavior Analytics",
    "business": "Vertex Analytics",
    "type": "Parquet",
    "size": 1.6,
    "records": 28800,
    "status": "Active"
  }
]

);
const [auditLogs] = useState<AuditLog[]>([
  {
    id: 1,
    company: "Alpha Analytics",
    email: "sarah@alphaanalytics.com",
    action: "Dataset Uploaded",
    admin: "Sarah Johnson",
    dataType: "Customer Demographics",
    details: "Uploaded new dataset 'Customer_Demographics_2025.csv' (15,000 records)",
    timestamp: "2025-10-18T10:25:00Z",
    status: "Approved"
  },
  {
    id: 2,
    company: "Beta Insights",
    email: "david@betainsights.io",
    action: "User Added",
    admin: "David Miller",
    dataType: "User Management",
    details: "Added new user 'john.doe@betainsights.io' with analyst role",
    timestamp: "2025-10-18T09:12:00Z",
    status: "Approved"
  },
  {
    id: 3,
    company: "Gamma DataWorks",
    email: "emma@gammadw.com",
    action: "Dataset Deleted",
    admin: "Emma Williams",
    dataType: "Sales Records",
    details: "Deleted dataset 'Sales_Q2_2024.xlsx' (5,200 records)",
    timestamp: "2025-10-17T16:45:00Z",
    status: "Rejected"
  },
  {
    id: 4,
    company: "Delta Metrics",
    email: "michael@deltametrics.ai",
    action: "Permissions Updated",
    admin: "Michael Brown",
    dataType: "User Access Control",
    details: "Updated access permissions for 'marketing-team@deltametrics.ai'",
    timestamp: "2025-10-17T14:22:00Z",
    status: "Approved"
  },
  {
    id: 5,
    company: "Epsilon Labs",
    email: "olivia@epsilonlabs.tech",
    action: "Dataset Renamed",
    admin: "Olivia Davis",
    dataType: "Retail Inventory",
    details: "Renamed dataset 'inventory_june.csv' → 'inventory_q2_2025.csv'",
    timestamp: "2025-10-16T11:15:00Z",
    status: "Approved"
  },
  {
    id: 6,
    company: "Zeta Systems",
    email: "liam@zetasystems.com",
    action: "Data Size Updated",
    admin: "Liam Anderson",
    dataType: "IoT Readings",
    details: "Recalculated dataset 'sensor_data_stream.json' (32,000 → 33,500 records)",
    timestamp: "2025-10-16T09:38:00Z",
    status: "Under Review"
  },
  {
    id: 7,
    company: "Omega Research",
    email: "sophia@omegaresearch.net",
    action: "Account Suspended",
    admin: "Sophia Martinez",
    dataType: "User Account",
    details: "Suspended account 'demo_user@omegaresearch.net' due to inactivity",
    timestamp: "2025-10-15T18:20:00Z",
    status: "Approved"
  },
  {
    id: 8,
    company: "Nova DataCloud",
    email: "james@novadata.cloud",
    action: "Dataset Shared",
    admin: "James Wilson",
    dataType: "Financial Transactions",
    details: "Shared dataset 'FY24_Transactions.csv' with 'finance@novadata.cloud'",
    timestamp: "2025-10-15T12:10:00Z",
    status: "Approved"
  },
  {
    id: 9,
    company: "Atlas Tech",
    email: "isabella@atlastech.io",
    action: "Data Exported",
    admin: "Isabella Lee",
    dataType: "Customer Support",
    details: "Exported dataset 'Support_Tickets_Q1.json' (10,500 records)",
    timestamp: "2025-10-14T17:05:00Z",
    status: "Under Review"
  },
  {
    id: 10,
    company: "Vertex Analytics",
    email: "ethan@vertexanalytics.com",
    action: "User Role Changed",
    admin: "Ethan Robinson",
    dataType: "Admin Panel",
    details: "Changed role of 'amy.smith@vertexanalytics.com' from 'viewer' to 'editor'",
    timestamp: "2025-10-14T09:55:00Z",
    status: "Approved"
  }
]);

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Business Control Management</h1>
        <p className="text-gray-600">Manage your platform with complete administrative control</p>
      </div>
      {activeTab === "Datasets" &&
        <StatsCards />
      }
      {/* Tabs */}
        <div className="flex flex-wrap gap-3 mb-6">
          {["Business Account", "Datasets", "Audit Logs"].map((tab) => (
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

      {/* AI Models Tab */}
      {activeTab === 'Business Account' && (
        <BusinessTab accounts={accounts} searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}  />
      )}

      {/* System Prompts Tab */}
      {activeTab === 'Datasets' && (
        <AllDatasetTab datasets={datasets} />

      )}

      {/* Content Filtering Tab */}
      {activeTab === 'Audit Logs' && (

        <AllAuditLogsTab auditLogs={auditLogs} />
      )}
    </div>
  )
}
