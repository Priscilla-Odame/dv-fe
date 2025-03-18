"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

export default function Dashboard() {
  const [affiliate, setAffiliate] = useState({
    user: "",
    affiliate_link: "",
    link_expiry: "",
    total_commission: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    getAffiliate();
  }, []);

  const getAuthHeaders = () => {
    const token = sessionStorage.getItem("a_c");
    return { headers: { Authorization: `Bearer ${token}` } };
  };

  const getAffiliate = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:3000/api/affiliates/user`, getAuthHeaders());
      const data = response.data;

      if (data?.affiliate_link) {
        const expiryDate = new Date(data.link_expiry);
        const now = new Date();

        if (expiryDate < now) {
          setIsExpired(true);
          setAffiliate({ ...data, affiliate_link: "" }); // Clear the expired link
          setMessage("Your link has expired.");
        } else {
          setIsExpired(false);
          setAffiliate(data);
          setMessage("");
        }
      } else {
        setMessage("You currently do not have any affiliate links.");
        setIsExpired(true);
      }
    } catch (error) {
      console.error("Error fetching affiliate:", error);
      setMessage("Failed to fetch affiliate details.");
      setIsExpired(true);
    } finally {
      setLoading(false);
    }
  };

  const generateAffiliate = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:3000/api/affiliates/generate-link`, getAuthHeaders());
      setAffiliate(response.data);
      setIsExpired(false);
      setMessage("");
    } catch (error) {
      console.error("Error generating link:", error);
      setMessage("Failed to generate link.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("a_c"); // Remove access token
    sessionStorage.removeItem("u_role"); // Remove any stored user info (optional)
    sessionStorage.removeItem("u_id"); // Remove any stored user info (optional)
  
    window.location.href = "/auth/login"; // Redirect to login page
  };

  return (
    <div className="flex min-h-screen bg-[#1a1a2e]">
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-[#16213e] p-6 shadow-lg">
        <h2 className="text-2xl font-bold text-[#ffcc00] mb-6">Dashboard</h2>
        <nav className="space-y-4">
          <Link href="/profile-settings" className="block p-2 bg-[#ffcc00] text-[#16213e] font-bold rounded hover:bg-[#e6b800]">
            Profile Settings
          </Link>
          <Link href="/account-settings" className="block p-2 bg-[#ffcc00] text-[#16213e] font-bold rounded hover:bg-[#e6b800]">
            Account Settings
          </Link>
          <button
            onClick={isExpired ? generateAffiliate : undefined}
            disabled={!isExpired} // Disable if the link is still active
            className={`w-full text-left block p-2 font-bold rounded ${
              isExpired
                ? "bg-[#ffcc00] text-[#16213e] hover:bg-[#e6b800]" // Active (Clickable)
                : "bg-gray-400 text-gray-600 cursor-not-allowed" // Disabled (Not Clickable)
            }`}
          >
            Generate Link
          </button>
          {/* <Link href="/logout" className="block p-2 bg-[#ffcc00] text-[#16213e] font-bold rounded hover:bg-[#e6b800]"> */}
          <button
            onClick={handleLogout}
            className="block w-full p-2 bg-red-600 text-white font-bold rounded hover:bg-red-700"
          >
            Logout
          </button>
          {/* </Link> */}
          <Link href="/others" className="block p-2 bg-[#ffcc00] text-[#16213e] font-bold rounded hover:bg-[#e6b800]">
            Others
          </Link>
        </nav>
      </aside>

      {/* Content Area */}
      <main className="flex-1 p-6 bg-[#0f3460] text-white">
        <h1 className="text-3xl font-bold text-[#ffcc00]">Welcome to Your Dashboard</h1>
        <p className="mt-4 text-gray-300">Select an option from the navigation to get started.</p>

        {/* Affiliate Link Section */}
        <div className="mt-6 bg-[#1a1a2e] p-4 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-[#ffcc00]">Your Affiliate Link</h2>
          {loading ? (
            <p className="mt-2 text-gray-300">Loading...</p>
          ) : isExpired ? (
            <p className="mt-2 text-red-400">{message}</p>
          ) : (
            <>
              <p className="mt-2 text-gray-300">Share this link to earn rewards:</p>
              <div className="bg-gray-800 text-gray-300 p-2 rounded mt-2">
                <a href={affiliate.affiliate_link} className="text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">
                  {affiliate.affiliate_link}
                </a>
              </div>
              <p className="mt-2 text-gray-400">
                Expires on: <span className="font-semibold text-white">{new Date(affiliate.link_expiry).toDateString()}</span>
              </p>
            </>
          )}

          {isExpired && (
            <button onClick={generateAffiliate} className="mt-4 text-blue-400 underline hover:text-blue-600">
              Click here to generate another one
            </button>
          )}
        </div>

        {/* Products Page Link */}
        <div className="mt-6">
          <Link href="/products" className="inline-block bg-[#ffcc00] text-[#16213e] font-bold px-4 py-2 rounded hover:bg-[#e6b800]">
            View Products
          </Link>
        </div>
      </main>
    </div>
  );
}
