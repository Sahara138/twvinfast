import { Outlet, Link, NavLink } from "react-router";

function InboxSVG({ strokeColor = "#454F5B" }: { strokeColor?: string }) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="inline-block mr-2"
    >
      <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8" stroke={strokeColor} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
      <rect x="3" y="6" width="18" height="12" rx="2" stroke={strokeColor} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function UserLayout() {
  const menuItems = [
    {
      label: "Inbox",
      path: "/user",
      renderIcon: (isActive: boolean) => (
        <InboxSVG strokeColor={isActive ? "#ffffff" : "#6b7280"} />
      ),
    },
    {
      label: "Inbox",
      path: "/user2",
      renderIcon: (isActive: boolean) => (
        <InboxSVG strokeColor={isActive ? "#ffffff" : "#6b7280"} />
      ),
    },
 
    // add more items here
  ];

  return (
    <div className="min-h-screen flex bg-gray-100 text-gray-900">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md flex flex-col">
        <header className="px-6 py-4 text-xl font-bold border-b border-gray-200">
          Dashboard
        </header>
        <nav className="flex-1 px-6 py-4">
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center px-4 py-2 rounded transition ${
                      isActive ? "bg-gray-800 text-white font-semibold" : "text-[#454F5B] text-lg  hover:bg-gray-100"
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
        <header className="bg-white shadow-sm px-6 py-4 flex justify-between items-center">
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
