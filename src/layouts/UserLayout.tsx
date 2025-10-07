import { Outlet, Link, NavLink } from "react-router";
import Logo from "../components/shared/Logo";
import { InboxSVG } from "../../public/SVG/InboxSVG";
import { StarSVG } from "../../public/SVG/StarSVG";
// import { FollowUpSVG } from "../../public/SVG/FollowUpSVG";
// import { DraftSVG } from "../../public/SVG/DraftSVG";
import { ArchiveSVG } from "../../public/SVG/ArchiveSVG";
import { TrashSVG } from "../../public/SVG/TrashSVG";
// import { UrgentSVG } from "../../public/SVG/UrgentSVG";
// import { GeneralSVG } from "../../public/SVG/GeneralSVG";


export default function UserLayout() {
  const menuItems = [
    {
      label: "Inbox",
      path: "/user",
      renderIcon: (isActive: boolean) => (
        <InboxSVG strokeColor={isActive ? "#000000" : "#454F5B"} />
      ),
    },
    {
      label: "Starred",
      path: "/starred",
      renderIcon: (isActive: boolean) => (
        <StarSVG strokeColor={isActive ? "#000000" : "#454F5B"} />
      ),
    },
     {
        label: "Archive",
        path: "/archive",
        renderIcon: (isActive: boolean) => (
          <ArchiveSVG strokeColor={isActive ? "#000000" : "#454F5B"} />
        ),
      },
    {
      label: "Trash",
      path: "/trash",
      renderIcon: (isActive: boolean) => (
        <TrashSVG strokeColor={isActive ? "#000000" : "#454F5B"} />
      ),
    },
    // {
    //   label: "Follow up",
    //   path: "/follow-up",
    //   renderIcon: (isActive: boolean) => (
    //     <FollowUpSVG strokeColor={isActive ? "#000000" : "#454F5B"} />
    //   ),
    // },
    // {
    //   label: "Drafts",
    //   path: "/drafts",
    //   renderIcon: (isActive: boolean) => (
    //     <DraftSVG strokeColor={isActive ? "#000000" : "#454F5B"} />
    //   ),
    // },
     
    // {
    //   label: "Urgent",
    //   path: "/urgent",
    //   renderIcon: (isActive: boolean) => (
    //     <UrgentSVG strokeColor={isActive ? "#000000" : "#454F5B"} />
    //   ),
    // },
    // {
    //   label: "General",
    //   path: "/general",
    //   renderIcon: (isActive: boolean) => (
    //     <GeneralSVG strokeColor={isActive ? "#000000" : "#454F5B"} />
    //   ),
    // },
  ];

  return (
    <div className="min-h-screen flex bg-gray-100 text-gray-900">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md flex flex-col">
        <header className="text-xl font-bold border-b border-gray-200">
          <Logo/>
        </header>
        <nav className="flex-1 px-6 py-4 ">
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center px-4 py-2 gap-x-4 rounded transition text-lg  ${
                      isActive ? "  font-semibold  bg-[#F9DFB3] text-[#000000]" : " text-[#454F5B]  hover:bg-gray-100"
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
        {/* Top Navbar */}
        <header className="bg-white shadow-sm px-6 py-[22px] flex justify-between items-center">
          <h1 className="text-lg font-semibold">Welcome, User!</h1>
          <nav className="space-x-4">
            <Link to="#" className="hover:underline">
              Notifications
            </Link>
            <Link to="#" className="hover:underline">
              Profile
            </Link>
          </nav>
        </header>

        {/* Content injected by routes */}
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
