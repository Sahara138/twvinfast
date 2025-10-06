import { Outlet, Link, NavLink } from "react-router";

export default function UserLayout() {
  return (
    <div className="min-h-screen flex bg-gray-100 text-gray-900">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md flex flex-col">
        <header className="px-6 py-4 text-xl font-bold border-b border-gray-200">
          Dashboard
        </header>
        <nav className="flex-1 px-6 py-4">
          <ul className="space-y-2">
            <li>
              <NavLink
                to="/user"
                className={({ isActive }) =>
                  `block px-4 py-2 rounded transition ${
                    isActive ? "bg-gray-300 font-semibold" : "hover:bg-gray-200"
                  }`
                }
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/profile"
                className={({ isActive }) =>
                  `block px-4 py-2 rounded transition ${
                    isActive ? "bg-gray-300 font-semibold" : "hover:bg-gray-200"
                  }`
                }
              >
                Profile
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/settings"
                className={({ isActive }) =>
                  `block px-4 py-2 rounded transition ${
                    isActive ? "bg-gray-300 font-semibold" : "hover:bg-gray-200"
                  }`
                }
              >
                Settings
              </NavLink>
            </li>
            <li>
              <Link
                to="/logout"
                className="block px-4 py-2 rounded hover:bg-gray-200 transition"
              >
                Logout
              </Link>
            </li>
          </ul>
        </nav>
        <footer className="px-6 py-4 border-t border-gray-200 text-sm text-gray-500">
          &copy; 2025 YourCompany
        </footer>
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
