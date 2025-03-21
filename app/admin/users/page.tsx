"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import AdminLayout from "../../components/page_components/AdminLayout";

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [activeTab, setActiveTab] = useState("all");
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const getAuthHeaders = () => {
    const token = sessionStorage.getItem("a_c");
    return { headers: { Authorization: `Bearer ${token}` } };
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/users",
        getAuthHeaders()
      );
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const filteredUsers = users.filter(
    (user: any) =>
      (activeTab === "all" || user.membership_type === activeTab) &&
      user.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AdminLayout>
      <div className="p-6">
        {/* Navigation & Search */}
        <div className="flex justify-between items-center mb-6">
          <input
            type="text"
            placeholder="Search users..."
            className="border p-2 w-1/2 rounded-full"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Link href="/admin/dashboard">
            <button className="bg-gray-600 text-white px-4 py-2 rounded-full">
              Back to Dashboard
            </button>
          </Link>
        </div>

        {/* Tabs for filtering users */}
        <div className="flex space-x-4 mb-4">
          <button
            className={`px-4 py-2 rounded-full ${
              activeTab === "all"
                ? "bg-blue-900 text-white"
                : "bg-gray-200 text-gray-800"
            }`}
            onClick={() => setActiveTab("all")}
          >
            All Users
          </button>
          <button
            className={`px-4 py-2 rounded-full ${
              activeTab === "member"
                ? "bg-blue-900 text-white"
                : "bg-gray-200 text-gray-800"
            }`}
            onClick={() => setActiveTab("member")}
          >
            Members
          </button>
          <button
            className={`px-4 py-2 rounded-full ${
              activeTab === "affiliate"
                ? "bg-blue-900 text-white"
                : "bg-gray-200 text-gray-800"
            }`}
            onClick={() => setActiveTab("affiliate")}
          >
            Affiliates
          </button>
        </div>

        {/* Users Table */}
        <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-[#16213e] text-[#e9f4fe]">
                <th className="p-3">Name</th>
                <th className="p-3">Email</th>
                <th className="p-3">Mobile</th>
                <th className="p-3">Membership</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user: any) => (
                  <tr key={user._id} className="border-b hover:bg-gray-100">
                    <td className="p-3">{`${user.firstName} ${user.lastName}`}</td>
                    <td className="p-3">{user.email}</td>
                    <td className="p-3">{user.mobile}</td>
                    <td className="p-3 capitalize">{user.membership_type}</td>
                    <td className="p-3 flex space-x-2">
                      <button className="bg-yellow-500 text-white px-3 py-1 rounded-full">
                        Edit
                      </button>
                      <button className="bg-red-500 text-white px-3 py-1 rounded-full">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="p-4 text-center text-gray-500">
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}
