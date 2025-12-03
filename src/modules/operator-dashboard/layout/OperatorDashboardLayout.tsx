import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import {
  Menu,
  X,
  Home,
  ShieldCheck,
  Users,
  DollarSign,
  Sun,
  Moon,
} from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import UserBadge from "@/components/UserBadge";

const navItems = [
  { label: "Dashboard", path: ".", icon: Home },
  { label: "Sales", path: "sales", icon: DollarSign },
  { label: "Risk", path: "risk", icon: ShieldCheck },
  { label: "Collections", path: "collections", icon: Users },
];

export default function OperatorDashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const linkClasses =
    "flex items-center gap-3 px-3 py-2 rounded-lg transition font-medium";

  return (
    <div className="flex">
      {/* Mobile top bar */}
      <div className="md:hidden fixed top-0 left-0 w-full bg-white dark:bg-gray-800 shadow-sm z-30 p-4 flex items-center justify-between">
        <h2 className="text-xl font-bold text-blue-600 dark:text-blue-400">
          Vive Credit
        </h2>
        <div className="flex items-center gap-3">
          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 transition"
          >
            {theme === "light" ? (
              <Sun size={20} className="text-blue-500" />
            ) : (
              <Moon size={20} className="text-blue-300" />
            )}
          </button>
          {/* Menu toggle */}
          <button onClick={() => setSidebarOpen(true)}>
            <Menu size={28} className="text-blue-600 dark:text-blue-400" />
          </button>
        </div>
      </div>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed md:relative top-0 left-0 h-screen w-64 
          bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 
          p-6 flex flex-col justify-between shadow-sm transition-transform duration-300
          ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
          }
          z-50
        `}
      >
        <div>
          {/* Close button (mobile) */}
          <button
            onClick={() => setSidebarOpen(false)}
            className="md:hidden mb-6 flex items-center gap-2"
          >
            <X size={26} className="text-gray-700 dark:text-gray-300" />
            <span className="text-gray-700 dark:text-gray-300">Close</span>
          </button>

          {/* Header */}
          <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-6 hidden md:block">
            Vive Credit
          </h2>

          {/* Navigation */}
          <nav className="space-y-2">
            {navItems.map(({ label, path, icon: Icon }) => (
              <NavLink
                key={path}
                to={path}
                end
                className={({ isActive }) =>
                  `${linkClasses} ${
                    isActive
                      ? "text-blue-600 bg-blue-50 dark:bg-blue-900/40 dark:text-blue-300"
                      : "text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                  }`
                }
                onClick={() => setSidebarOpen(false)}
              >
                <Icon size={20} /> {label}
              </NavLink>
            ))}
          </nav>
        </div>

        {/* User badge fixed bottom */}
        <div className="mt-6 md:mt-0">
          <UserBadge />
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 ml-0  h-screen overflow-auto px-4 pt-20 md:px-8 md:pt-8 dark:bg-gray-900 dark:text-gray-100">
        <Outlet />
      </main>
    </div>
  );
}
