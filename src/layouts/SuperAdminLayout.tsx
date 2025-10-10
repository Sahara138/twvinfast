import { Outlet, NavLink } from "react-router";
import { ShieldUser, Search } from 'lucide-react';
import Logo from "../components/shared/Logo";
import { DashboardSVG } from "../../public/SVG/DashboardSVG";
import { UserManagementSVG } from "../../public/SVG/UserManagementSVG";
import { AILearningSVG } from "../../public/SVG/AILearningSVG";
import { CustomersSVG } from "../../public/SVG/CustomersSVG";
import { AnalyticsSVG } from "../../public/SVG/AnalyticsSVG";
import { IntegrationsSVG } from "../../public/SVG/IntegrationsSVG";
import { CustomerManagementSVG } from "../../public/SVG/CustomerManagementSVG";


export default function SuperAdminLayout() {
    const menuItems = [
        {
            label: "Dashboard",
            path: "/super-admin",
            renderIcon: (isActive: boolean) => (
                <DashboardSVG strokeColor={isActive ? "#000000" : "#454F5B"} />
            ),
        },
        {
            label: "Customer Management",
            path: "customer-management",
            renderIcon: (isActive: boolean) => (
                <CustomerManagementSVG strokeColor={isActive ? "#000000" : "#454F5B"} />
            ),
        },
        {
            label: "User Management",
            path: "user-management",
            renderIcon: (isActive: boolean) => (
                <UserManagementSVG strokeColor={isActive ? "#000000" : "#454F5B"} />
            ),
        },
        {
            label: "AI Learning",
            path: "ai-learning",
            renderIcon: (isActive: boolean) => (
                < AILearningSVG strokeColor={isActive ? "#000000" : "#454F5B"} />
            ),
        },
        {
            label: "Customers",
            path: "customers",
            renderIcon: (isActive: boolean) => (
                < CustomersSVG strokeColor={isActive ? "#000000" : "#454F5B"} />
            ),
        },
        {
            label: "Analytics",
            path: "analytics",
            renderIcon: (isActive: boolean) => (
                < AnalyticsSVG strokeColor={isActive ? "#000000" : "#454F5B"} />
            ),
        },
        {
            label: "Integrations",
            path: "integrations",
            renderIcon: (isActive: boolean) => (
                < IntegrationsSVG strokeColor={isActive ? "#000000" : "#454F5B"} />
            ),
        },

    ];

    return (
        <div className="min-h-screen flex bg-gray-100 text-gray-900">
            {/* Sidebar */}
            <aside className="w-78 bg-white shadow-md flex flex-col h-screen sticky top-0">
                <header className="flex items-center gap-3 px-6 py-2 border-b border-gray-200">
                    <div className="w-full">
                        <Logo />
                    </div>
                </header>
                <nav className="flex-1 px-6 py-4 ">
                    <ul className="space-y-2">
                        {menuItems.map((item) => (
                            <li key={item.path}>
                                <NavLink
                                    to={item.path}
                                    end={item.path === "/super-admin"}
                                    className={({ isActive }) =>
                                        `flex items-center px-4 py-2 gap-x-4 rounded transition text-lg  ${isActive ? "  font-semibold  bg-[#F9DFB3] text-[#000000]" : " text-[#454F5B]  hover:bg-gray-100"
                                        }`
                                    }
                                >
                                    {({ isActive }) => (
                                        <>
                                            {item.renderIcon(isActive)}
                                            <span>{item.label}</span>
                                        </>
                                    )}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </nav>
              
            </aside>

            {/* Main content area */}
            <div className="flex-1 flex flex-col">
                {/* Top navbar for admin pages */}
                <header className="bg-white h-[89px] sticky top-0 z-10 px-6 py-5 border-b border-l border-gray-200 ">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                                <ShieldUser className="w-6 h-6 text-gray-600" />
                            </div>
                            <div>
                                <h1 className="text-lg font-medium text-gray-900">Super Admin</h1>
                                <p className="text-sm text-[#6A6A6A]">Platform Owner</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="relative min-w-sm">
                                <input
                                    type="text"
                                    placeholder="Search..."
                                    className="w-full pl-4 pr-12 py-2 border border-[#6EC075]/70 rounded-full focus:outline-none focus:ring focus:ring-[#3BB515] text-gray-700"
                                />
                                <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6EC075]" />
                            </div>


                        </div>
                    </div>
                </header>

                {/* Content injected by routes */}
                <main className="flex-1">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
