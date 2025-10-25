import { useState } from "react";
import { Outlet, NavLink } from "react-router";
import { Plus } from "lucide-react"; //
import Logo from "../components/shared/Logo";
import { InboxSVG } from "../../public/SVG/InboxSVG";
import { StarSVG } from "../../public/SVG/StarSVG";
import { ArchiveSVG } from "../../public/SVG/ArchiveSVG";
import { TrashSVG } from "../../public/SVG/TrashSVG";
import { SettingSVG } from "../../public/SVG/SettingSVG";
import { GeneralSVG } from "../../public/SVG/GeneralSVG";
import { FollowUpSVG } from "../../public/SVG/FollowUpSVG";
import { DraftSVG } from "../../public/SVG/DraftSVG";
import { UrgentSVG } from "../../public/SVG/UrgentSVG";
import ManageModal from "../components/ManageModal";
import { FaBars } from "react-icons/fa";

export default function UserLayout() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleTogglebar = () =>{
        setSidebarOpen(prev => !prev);

  }

  const menuItems = [
    {
      label: "Inbox",
      path: "/user",
      renderIcon: (isActive: boolean) => (
        <InboxSVG strokeColor={isActive ? "#58D5D3" : "#454F5B"} />
      ),
    },
    {
      label: "Starred",
      path: "starred",
      renderIcon: (isActive: boolean) => (
        <StarSVG strokeColor={isActive ? "#58D5D3" : "#454F5B"} />
      ),
    },
    {
      label: "Archive",
      path: "archive",
      renderIcon: (isActive: boolean) => (
        <ArchiveSVG strokeColor={isActive ? "#58D5D3" : "#454F5B"} />
      ),
    },
    {
      label: "Trash",
      path: "trash",
      renderIcon: (isActive: boolean) => (
        <TrashSVG strokeColor={isActive ? "#58D5D3" : "#454F5B"} />
      ),
    },
  ];

  const triageItems = [
    {
      label: "Follow up",
      path: "follow-up",
      renderIcon: (isActive: boolean) => (
        <FollowUpSVG strokeColor={isActive ? "#000000" : "#454F5B"} />
      ),
    },
    {
      label: "Drafts",
      path: "drafts",
      renderIcon: (isActive: boolean) => (
        <DraftSVG strokeColor={isActive ? "#000000" : "#454F5B"} />
      ),
    },
    {
      label: "Urgent",
      path: "urgent",
      renderIcon: (isActive: boolean) => (
        <UrgentSVG strokeColor={isActive ? "#000000" : "#454F5B"} />
      ),
    },
    {
      label: "General",
      path: "general",
      renderIcon: (isActive: boolean) => (
        <GeneralSVG strokeColor={isActive ? "#000000" : "#454F5B"} />
      ),
    },
  ];

  return (
    <div className="min-h-screen flex bg-gray-100 text-gray-900 overflow-hidden">
      {/* Sidebar */}
      <aside className={`bg-white shadow-md flex flex-col border-r border-gray-200 sticky top-0 left-0 transition-all ${sidebarOpen ? "w-81" : "w-[104px]"}`}>
        <header className="flex items-center h-22 px-6 py-2 border-b border-gray-200">
          <FaBars size={20} onClick={handleTogglebar} className="cursor-pointer" />
          <div className="w-full">
            <Logo />
          </div>
        </header>

        <nav className="flex-1 px-6 py-4">
          {/* Menu Items */}
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  end={item.path === "/user"}
                  className={({ isActive }) =>
                    `relative flex items-center px-4 py-2 gap-x-4 rounded transition text-lg ${
                      isActive
                        ? "font-medium text-lg bg-white shadow text-[#000000]"
                        : "text-[#454F5B] hover:bg-gray-100"
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {isActive && (
                        <span className="absolute left-0 top-0 h-full w-1 bg-[#58D5D3] shadow-[4px_0_6px_#58D5D3] rounded-r"></span>
                      )}
                      <span>{item.renderIcon(isActive)}</span>
                      {
                        sidebarOpen ?
                        (
                          <>

                            <span>{item.label}</span>
                      <span
                        className={`mr-2 text-sm ${
                          isActive
                            ? "ml-auto p-1 px-1.5 text-[#58D5D3] text-xs rounded-full bg-[#58D5D31A]"
                            : "ml-auto p-1 px-1.5 text-[#6A7282] text-xs rounded-full bg-[#F3F4F6]"
                        }`}
                      >
                        12
                      </span>
                        </>
                        )
                        :
                      <span className="absolute left-full ml-2 whitespace-nowrap bg-gray-700 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition">
                       <span>{item.label}</span>
                      <span
                        className={`mr-2 text-sm ${
                          isActive
                            ? "ml-auto p-1 px-1.5 text-[#58D5D3] text-xs rounded-full bg-[#58D5D31A]"
                            : "ml-auto p-1 px-1.5 text-[#6A7282] text-xs rounded-full bg-[#F3F4F6]"
                        }`}
                      >
                        12
                      </span>
                      </span>
                      }

                    </>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* Triage */}
          <div className="border-t border-gray-200 my-4 mt-4"></div>
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
            Triage
          </h3>
          <ul className="space-y-2">
            {triageItems.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  end={item.path === "/user"}
                  className={({ isActive }) =>
                    `relative flex items-center px-4 py-2 gap-x-4 rounded transition text-lg ${
                      isActive
                        ? "font-medium text-lg bg-white shadow text-[#000000]"
                        : "text-[#454F5B] hover:bg-gray-100"
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {isActive && (
                        <span className="absolute left-0 top-0 h-full w-1 bg-[#58D5D3] shadow-[4px_0_6px_#58D5D3] rounded-r"></span>
                      )}
                      <span>{item.renderIcon(isActive)}</span>
                      {
                        sidebarOpen ?
                        (
                          <>

                            <span>{item.label}</span>
                      <span
                        className={`mr-2 text-sm ${
                          isActive
                            ? "ml-auto p-1 px-1.5 text-[#58D5D3] text-xs rounded-full bg-[#58D5D31A]"
                            : "ml-auto p-1 px-1.5 text-[#6A7282] text-xs rounded-full bg-[#F3F4F6]"
                        }`}
                      >
                        12
                      </span>
                        </>
                        )
                        :
                      <span className="absolute left-full ml-2 whitespace-nowrap bg-gray-700 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition">
                       <span>{item.label}</span>
                      <span
                        className={`mr-2 text-sm ${
                          isActive
                            ? "ml-auto p-1 px-1.5 text-[#58D5D3] text-xs rounded-full bg-[#58D5D31A]"
                            : "ml-auto p-1 px-1.5 text-[#6A7282] text-xs rounded-full bg-[#F3F4F6]"
                        }`}
                      >
                        12
                      </span>
                      </span>
                      }

                    </>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* Manage Labels */}
          <div className="border-t border-gray-200 my-4"></div>
          <ul className="space-y-2">
            <button
              onClick={() => setIsModalOpen(true)}
              className={`relative flex items-center px-4 py-2 gap-x-4 rounded transition text-lg w-full ${
                isModalOpen
                  ? "font-medium text-lg bg-white shadow text-[#000000]"
                  : "text-[#454F5B] hover:bg-gray-100"
              }`}
            >
              {isModalOpen && (
                <span className="absolute left-0 top-0 h-full w-1 bg-[#58D5D3] shadow-[4px_0_6px_#58D5D3] rounded-r"></span>
              )}
              <span className="text-sm text-gray-400">
                <Plus />
              </span>
              {
                        sidebarOpen ?
                        (
                          <>

                            <span>Manage Labels</span>
                      
                        </>
                        )
                        :
                      <span className="absolute left-full ml-2 whitespace-nowrap bg-gray-700 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition">
                       <span>Manage Labels</span>
                      </span>
                      }
              {/* <span>Manage Labels</span> */}
            </button>
          </ul>
        </nav>

        {/* Settings */}
        <div className="mt-auto border-t border-gray-200 px-6 py-3">
          <NavLink
            to="/user/settings"
            end
            className={({ isActive }) =>
              `relative flex items-center px-4 py-2 gap-x-4 rounded transition text-lg ${
                isActive
                  ? "font-medium text-lg bg-white shadow text-[#000000]"
                  : "text-[#454F5B] hover:bg-gray-100"
              }`
            }
          >
            {({ isActive }) => (
              <>
                {isActive && (
                  <span className="absolute left-0 top-0 h-full w-1 bg-[#58D5D3] shadow-[4px_0_6px_#58D5D3] rounded-r"></span>
                )}
                <SettingSVG strokeColor={isActive ? "#3BCBC8" : "#454F5B"} />
                {
                        sidebarOpen ?
                        (
                          <>

                            <span>Settings</span>
                      
                        </>
                        )
                        :
                      <span className="absolute left-full ml-2 whitespace-nowrap bg-gray-700 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition">
                       <span>Settings</span>
                      </span>
                      }

                
              </>
            )}
          </NavLink>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-x-auto">
        <main className="flex-1">
          <Outlet />
        </main>
      </div>

      {/* Modal */}

      <ManageModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
    </div>

  );
}
