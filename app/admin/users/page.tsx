"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [search, setSearch] = useState("");
  const [formData, setFormData] = useState({
    lastName: "",
    firstName: "",
    otherNames: "",
    email: "",
    mobile: "",
    birth_date: "",
    membership_type: "",
  });

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

  const handleInputChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setFormData({
      lastName: user.lastName || "",
      firstName: user.firstName || "",
      otherNames: user.otherNames || "",
      email: user.email || "",
      mobile: user.mobile || "",
      birth_date: user.birth_date || "",
      membership_type: user.membership_type || "",
    });
    setShowForm(true);
  };

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    try {
      if (editingUser) {
        // Filter out unchanged (empty) fields
        const updatedData = Object.fromEntries(
          Object.entries(formData).filter(([_, value]) => value !== "")
        );

        await axios.patch(
          `http://localhost:3000/api/users/${editingUser._id}`,
          updatedData,
          getAuthHeaders()
        );
      } else {
        // Ensure all fields are filled when adding a new user
        for (let key in formData) {
          if (!formData[key]) {
            alert(`Please fill in the ${key} field.`);
            return;
          }
        }
        await axios.post(
          "http://localhost:3000/api/users",
          formData,
          getAuthHeaders()
        );
      }

      setShowForm(false);
      setEditingUser(null);
      fetchUsers();
    } catch (error) {
      console.error(
        "Error submitting user:",
        error.response?.data || error.message
      );
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await axios.delete(
          `http://localhost:3000/api/users/${id}`,
          getAuthHeaders()
        );
        fetchUsers();
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Search users..."
          className="border p-2 w-1/2"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div>
          <Link href="/admin/dashboard">
            <button className="bg-gray-500 text-white px-4 py-2 rounded mr-2">
              Back to Dashboard
            </button>
          </Link>
          <button
            onClick={() => setShowForm(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Add User
          </button>
        </div>
      </div>

      {/* Users Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">Last Name</th>
              <th className="border p-2">First Name</th>
              <th className="border p-2">Other Names</th>
              <th className="border p-2">Email</th>
              <th className="border p-2">Mobile</th>
              <th className="border p-2">Birth Date</th>
              <th className="border p-2">Date Joined</th>
              <th className="border p-2">Membership</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users
              .filter((user) =>
                user.email.toLowerCase().includes(search.toLowerCase())
              )
              .map((user) => (
                <tr key={user._id} className="border">
                  <td className="border p-2">{user.lastName}</td>
                  <td className="border p-2">{user.firstName}</td>
                  <td className="border p-2">{user.otherNames}</td>
                  <td className="border p-2">{user.email}</td>
                  <td className="border p-2">{user.mobile}</td>
                  <td className="border p-2">{user.birth_date}</td>
                  <td className="border p-2">{user.date_joined}</td>
                  <td className="border p-2">{user.membership_type}</td>
                  <td className="border p-2">
                    <button
                      onClick={() => handleEdit(user)}
                      className="bg-yellow-500 text-white px-2 py-1 mr-2 rounded"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleDelete(user._id)}
                      className="bg-red-500 text-white px-2 py-1 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {/* User Form */}
      {showForm && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded w-1/3">
            <h2 className="text-xl font-bold mb-4">
              {editingUser ? "Update User" : "Add User"}
            </h2>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleInputChange}
                className="border p-2 w-full mb-2"
              />
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleInputChange}
                className="border p-2 w-full mb-2"
              />
              <input
                type="text"
                name="otherNames"
                placeholder="Other Names"
                value={formData.otherNames}
                onChange={handleInputChange}
                className="border p-2 w-full mb-2"
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
                className="border p-2 w-full mb-2"
              />
              <input
                type="text"
                name="mobile"
                placeholder="Mobile"
                value={formData.mobile}
                onChange={handleInputChange}
                className="border p-2 w-full mb-2"
              />
              <input
                type="date"
                name="birth_date"
                value={formData.birth_date}
                onChange={handleInputChange}
                className="border p-2 w-full mb-2"
              />
              <input
                type="text"
                name="membership_type"
                placeholder="Membership Type"
                value={formData.membership_type}
                onChange={handleInputChange}
                className="border p-2 w-full mb-2"
              />
              <div className="flex justify-between">
                <button
                  type="submit"
                  className="bg-green-500 text-white px-4 py-2 rounded"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setEditingUser(null);
                  }}
                  className="bg-gray-500 text-white px-4 py-2 rounded"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
