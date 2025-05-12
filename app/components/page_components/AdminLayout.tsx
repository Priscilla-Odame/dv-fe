"use client";
import { useState } from "react";
import Link from "next/link";
import { FiMenu, FiX } from "react-icons/fi";

export default function AdminDashboard({ children }: any) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    sessionStorage.clear();
    window.location.href = "/auth/login";
  };

  return (
    <div className="flex min-h-screen bg-[#eeedf3]">
      {/* Sidebar Toggle Button (Mobile) */}
      <button
        className="p-4 bg-[#16213e] text-[#e9f4fe] fixed top-4 left-4 z-20 md:hidden rounded-full"
        onClick={() => setSidebarOpen(true)}
      >
        <FiMenu size={24} />
      </button>

      {/* Sidebar Navigation */}
      <aside
        className={`fixed inset-y-0 left-0 bg-[#16213e] text-[#e9f4fe] p-6 shadow-lg flex flex-col justify-between h-screen transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform md:translate-x-0 md:relative md:w-1/4 z-30`}
      >
        <div>
          {/* Close Button (Mobile) */}
          <button
            className="absolute top-4 right-4 text-[#e9f4fe] md:hidden"
            onClick={() => setSidebarOpen(false)}
          >
            <FiX size={24} />
          </button>

          <h2 className="text-2xl font-bold text-yellow-400 mb-6">Admin Dashboard</h2>
          <nav className="space-y-4">
            <Link href="/admin/products" className="block p-3 bg-[#e9f4fe] text-[#16213e] font-bold rounded-full hover:bg-[#d0e8fd]">
              Products
            </Link>
            <Link href="/admin/users" className="block p-3 bg-[#e9f4fe] text-[#16213e] font-bold rounded-full hover:bg-[#d0e8fd]">
              Users
            </Link>
            <Link href="/sales" className="block p-3 bg-[#e9f4fe] text-[#16213e] font-bold rounded-full hover:bg-[#d0e8fd]">
              Sales
            </Link>
            <Link href="/reports" className="block p-3 bg-[#e9f4fe] text-[#16213e] font-bold rounded-full hover:bg-[#d0e8fd]">
              Reports
            </Link>
            <Link href="/settings" className="block p-3 bg-[#e9f4fe] text-[#16213e] font-bold rounded-full hover:bg-[#d0e8fd]">
              Settings
            </Link>
            <Link href="/profile" className="block p-3 bg-[#e9f4fe] text-[#16213e] font-bold rounded-full hover:bg-[#d0e8fd]">
              Profile
            </Link>
          </nav>
        </div>

        {/* Logout Button - Always at the Bottom */}
        <button
          onClick={handleLogout}
          className="w-full p-3 bg-red-600 text-white font-bold rounded-full hover:bg-red-700 mt-auto"
        >
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-col h-screen overflow-y-auto p-6 md:w-3/4">
        {children}
      </main>
    </div>
  );
}