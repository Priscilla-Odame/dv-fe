"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

export default function Dashboard() {
  const handleLogout = () => {
    sessionStorage.removeItem("a_c");
    sessionStorage.removeItem("u_role");
    sessionStorage.removeItem("u_id");
    window.location.href = "/auth/login";
  };

  return (
    <div className="flex min-h-screen bg-white text-black">
      {/* Sidebar */}
      <aside className="w-60 p-4 border-r border-gray-300 flex flex-col justify-between bg-[#16213e] text-sm">
        <div>
          <h2 className="text-xl font-bold text-[#e9f4fe] mb-4">Dashboard</h2>

          <div className="mb-3">
            <p className="text-[#e9f4fe] font-semibold mb-1">Account</p>
            <nav className="space-y-1">
              <Link href="/profile-settings" className="block px-2 py-1 bg-[#e9f4fe] text-[#16213e] rounded hover:bg-[#d0e8fd]">
                Profile Settings
              </Link>
              <Link href="/account-settings" className="block px-2 py-1 bg-[#e9f4fe] text-[#16213e] rounded hover:bg-[#d0e8fd]">
                Account Settings
              </Link>
            </nav>
          </div>

          <div className="mb-3">
            <p className="text-[#e9f4fe] font-semibold mb-1">Sales</p>
            <nav className="space-y-1">
              <Link href="/orders" className="block px-2 py-1 bg-[#e9f4fe] text-[#16213e] rounded hover:bg-[#d0e8fd]">
                Orders
              </Link>
              <Link href="/referrals" className="block px-2 py-1 bg-[#e9f4fe] text-[#16213e] rounded hover:bg-[#d0e8fd]">
                Referrals
              </Link>
              <Link href="/commissions" className="block px-2 py-1 bg-[#e9f4fe] text-[#16213e] rounded hover:bg-[#d0e8fd]">
                Commissions
              </Link>
            </nav>
          </div>

          <div className="mb-3">
            <p className="text-[#e9f4fe] font-semibold mb-1">Clients</p>
            <nav className="space-y-1">
              <Link href="/clients" className="block px-2 py-1 bg-[#e9f4fe] text-[#16213e] rounded hover:bg-[#d0e8fd]">
                My Clients
              </Link>
            </nav>
          </div>

          <div className="mb-3">
            <p className="text-[#e9f4fe] font-semibold mb-1">Products</p>
            <nav className="space-y-1">
              <Link href="/products" className="block px-2 py-1 bg-[#e9f4fe] text-[#16213e] rounded hover:bg-[#d0e8fd]">
                Products
              </Link>
              <Link href="/reports" className="block px-2 py-1 bg-[#e9f4fe] text-[#16213e] rounded hover:bg-[#d0e8fd]">
                Reports
              </Link>
            </nav>
          </div>

          <div>
            <p className="text-[#e9f4fe] font-semibold mb-1">Help</p>
            <nav>
              <Link href="/support" className="block px-2 py-1 bg-[#e9f4fe] text-[#16213e] rounded hover:bg-[#d0e8fd]">
                Support
              </Link>
            </nav>
          </div>
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="mt-6 w-full py-2 bg-red-600 text-white font-bold rounded-full hover:bg-red-700"
        >
          Logout
        </button>
      </aside>


      {/* Main Content */}
      <main className="flex-1 p-6">
        <h1 className="text-3xl font-bold">Welcome to the DV FAMILY PROGRAM</h1>
        <p className="mt-4">
          As a valued member, you enjoy exclusive benefits designed just for you.
        </p>

        {/* Benefits Section */}
        <div className="mt-6 p-6 border rounded-lg shadow-md bg-gray-50">
          <h2 className="text-2xl font-bold mb-4">Member Benefits</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>10% discount on your first purchase above GHC100.</li>
            <li>5% discount on all subsequent purchases.</li>
            <li>Free delivery on purchases above GHC200.</li>
            <li>5% commission when you introduce a new client who makes a first purchase.</li>
            <li>7% commission when you introduce a new wholesale client.</li>
            <li>10% commission when you introduce a new distributor client.</li>
            <li>Chance to win the "DV Unlimited Outstanding Family Member of the Month" award.</li>
          </ul>
        </div>

        {/* CTA Section */}
        <div className="mt-6">
          <h2 className="text-xl font-bold">Start Earning Today</h2>
          <p className="mt-2">
            Shop now, refer friends, and enjoy all the amazing benefits.
          </p>
          <Link href="/products" className="text-blue-600 hover:underline mt-4 inline-block">
            View Products
          </Link>
        </div>
      </main>
    </div>
  );
}
