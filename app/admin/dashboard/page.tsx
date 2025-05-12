"use client";
import { useState } from "react";
import Link from "next/link";
import { FiMenu, FiX } from "react-icons/fi";
import AdminWrapper from "../layout";

export default function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    sessionStorage.clear();
    window.location.href = "/auth/login";
  };

  return (
    <div className="flex flex-col h-screen overflow-y-auto bg-[#eeedf3]">


      {/* Content Area */}
      <main className="flex-1 p-6">
        <h1 className="text-3xl font-bold text-[#16213e]">Welcome to Admin Dashboard</h1>
        <p className="mt-4 text-gray-700">Manage your products, users, sales, and more from the sidebar.</p>
      </main>
    </div>
  );
}
