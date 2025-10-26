import { Outlet, NavLink } from "react-router";
import {  Search } from 'lucide-react';
import Logo from "../components/shared/Logo";
import { DashboardSVG } from "../../public/SVG/DashboardSVG";
import { UserManagementSVG } from "../../public/SVG/UserManagementSVG";
import { AILearningSVG } from "../../public/SVG/AILearningSVG";
import { BusinessSVG } from "../../public/SVG/BusinessSVG";
import { AnalyticsSVG } from "../../public/SVG/AnalyticsSVG";
import { BillingSVG } from "../../public/SVG/BillingSVG";
import { CustomerManagementSVG } from "../../public/SVG/CustomerManagementSVG";
import { PlatfromSettingSVG } from '../../public/SVG/PlatfromSettingSVG';
import { useEffect, useState } from "react";
import { FaBars } from "react-icons/fa";

export default function SuperAdminLayout() {
      const [sidebarOpen, setSidebarOpen] = useState(true);
    
      // Automatically adjust sidebar on resize
    useEffect(() => {
        const handleResize = () => {
        if (window.innerWidth < 768) { // md breakpoint
            setSidebarOpen(false);
        } else {
            setSidebarOpen(true);
        }
        };

        handleResize(); // initialize
        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const handleTogglebar = () => {
        setSidebarOpen(prev => !prev);
    };
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
            label: "AI Model Management",
            path: "ai-model-management",
            renderIcon: (isActive: boolean) => (
                < AILearningSVG strokeColor={isActive ? "#000000" : "#454F5B"} />
            ),
        },
        {
            label: "Business Control",
            path: "business-control",
            renderIcon: (isActive: boolean) => (
                < BusinessSVG strokeColor={isActive ? "#000000" : "#454F5B"} />
            ),
        },
        {
            label: "Billing & Subscription",
            path: "billing-subscription",
            renderIcon: (isActive: boolean) => (
                < BillingSVG strokeColor={isActive ? "#000000" : "#454F5B"} />
            ),
        },
        {
            label: "Platform Settings",
            path: "platfrom-settings",
            renderIcon: (isActive: boolean) => (
                < PlatfromSettingSVG strokeColor={isActive ? "#000000" : "#454F5B"} />
            ),
        },
        {
            label:"Analytics & Reports",
            path: "analytics-reports",
            renderIcon: (isActive: boolean) => (
                < AnalyticsSVG strokeColor={isActive ? "#000000" : "#454F5B"} />
            ),
        },
     

    ];

    return (
        <div className=" flex">
           {/* Sidebar */}
                <aside className={`h-screen bg-white shadow-md flex flex-col border-r border-gray-200 sticky top-0 left-0 transition-all ${sidebarOpen ? "w-81" : "w-[104px]"}`}>
                   <header className="flex items-center h-22 px-6 py-2 border-b border-gray-200">
                     <FaBars size={20} onClick={handleTogglebar} className="cursor-pointer" />
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
                                            {/* <span>{item.label}</span> */}
                                            {
                                                sidebarOpen ?
                                                (
                                                <>

                                                    <span>{item.label}</span>
                                            
                                                </>
                                                )
                                                :
                                            <span className="absolute left-full ml-2 whitespace-nowrap bg-gray-700 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition">
                                            <span>{item.label}</span>
                                            </span>
                                            }
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
                <header className="bg-white md:h-[89px] sticky top-0 z-10 px-6 py-5 border-b  border-[#C4CDD5]">
                    <div className="md:flex items-center justify-between">
                        <div className="flex items-center gap-3 mb-4 md:mb-0">
                            <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                                <img src="https://i.pravatar.cc/40?img=5" className="h-full w-full rounded-full" />
                            </div>
                            <div>
                                <h1 className="text-lg font-medium text-gray-900">Super Admin</h1>
                                <p className="text-sm text-[#6A6A6A]">Platform Owner</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 ">
                            <div className="relative">
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
                <main className="flex-1 main-container bg-white ">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
