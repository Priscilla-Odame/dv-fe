"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { FiMenu, FiX } from "react-icons/fi";
import { BASE_URL } from "@/helpers/route";

type AffiliateData = {
  user: string;
  affiliate_link: string;
  link_expiry: string;
  total_commission: string;
};

export default function Dashboard() {
  const [affiliate, setAffiliate] = useState<AffiliateData>({
    user: "",
    affiliate_link: "",
    link_expiry: "",
    total_commission: "",
  });
  const [selectedPlatform, setSelectedPlatform] = useState<string>(""); // Platform dropdown state
  const [generatedLink, setGeneratedLink] = useState<string>(""); // Stores generated link with UTM parameters
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isExpired, setIsExpired] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

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
      const response = await axios.get(
        `${BASE_URL}affiliates/user`,
        getAuthHeaders()
      );
      const data: AffiliateData = response.data;

      if (data?.affiliate_link) {
        const expiryDate = new Date(data.link_expiry);
        const now = new Date();

        if (expiryDate < now) {
          setIsExpired(true);
          setAffiliate({ ...data, affiliate_link: "" });
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
      const response = await axios.get(
        `${BASE_URL}affiliates/generate-link`,
        getAuthHeaders()
      );
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

  const generateLinkWithUTM = () => {
    if (!selectedPlatform || !affiliate.affiliate_link) return;

    const baseURL = new URL(affiliate.affiliate_link);
    baseURL.searchParams.append("utm_source", selectedPlatform);
    baseURL.searchParams.append("utm_medium", "social");
    baseURL.searchParams.append("utm_campaign", "affiliate_campaign");
    setGeneratedLink(baseURL.toString());
  };

  const handleLogout = () => {
    sessionStorage.removeItem("a_c");
    sessionStorage.removeItem("u_role");
    sessionStorage.removeItem("u_id");
    window.location.href = "/auth/login";
  };

  return (
    <div className="flex min-h-screen bg-[#eeedf3]">
      <button
        className="p-4 bg-[#16213e] text-[#e9f4fe] fixed top-4 left-4 z-20 md:hidden rounded-lg"
        onClick={() => setSidebarOpen(true)}
      >
        <FiMenu size={24} />
      </button>

      <aside
        className={`fixed inset-y-0 left-0 bg-[#16213e] p-6 shadow-lg flex flex-col justify-between h-screen transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform md:translate-x-0 md:relative md:w-64 z-30`}
      >
        <div>
          <button
            className="absolute top-4 right-4 text-[#e9f4fe] md:hidden"
            onClick={() => setSidebarOpen(false)}
          >
            <FiX size={24} />
          </button>

          <h2 className="text-2xl font-bold text-[#e9f4fe] mb-6">Dashboard</h2>
          <nav className="space-y-4">
            <Link
              href="/profile-settings"
              className="block p-2 bg-[#e9f4fe] text-[#16213e] font-bold rounded-full hover:bg-[#d0e8fd]"
            >
              Profile Settings
            </Link>
            <Link
              href="/account-settings"
              className="block p-2 bg-[#e9f4fe] text-[#16213e] font-bold rounded-full hover:bg-[#d0e8fd]"
            >
              Account Settings
            </Link>
            <button
              onClick={isExpired ? generateAffiliate : undefined}
              disabled={!isExpired}
              className={`w-full text-left block p-2 font-bold rounded-full ${
                isExpired
                  ? "bg-[#e9f4fe] text-[#16213e] hover:bg-[#d0e8fd]"
                  : "bg-gray-400 text-gray-600 cursor-not-allowed"
              }`}
            >
              Generate Link
            </button>
          </nav>
        </div>

        <button
          onClick={handleLogout}
          className="w-full p-2 bg-red-600 text-white font-bold rounded-full hover:bg-red-700 mt-auto"
        >
          Logout
        </button>
      </aside>

      <main className="flex-1 p-6 bg-[#e9f4fe] text-[#16213e]">
        <h1 className="text-3xl font-bold">Welcome to Your Dashboard</h1>

        <div className="mt-6 bg-white p-4 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-[#16213e]">
            Your Affiliate Link
          </h2>
          {loading ? (
            <p className="mt-2 text-gray-600">Loading...</p>
          ) : isExpired ? (
            <p className="mt-2 text-red-500">{message}</p>
          ) : (
            <>
              <p className="mt-2 text-gray-700">
                Select a platform and generate your custom link:
              </p>

              <select
                className="mt-2 p-2 border rounded"
                value={selectedPlatform}
                onChange={(e) => setSelectedPlatform(e.target.value)}
              >
                <option value="">-- Select Platform --</option>
                <option value="whatsapp">WhatsApp</option>
                <option value="instagram">Instagram</option>
                <option value="tiktok">TikTok</option>
                <option value="facebook">Facebook</option>
              </select>

              <button
                className="mt-4 p-2 bg-blue-600 text-white font-bold rounded hover:bg-blue-700"
                onClick={generateLinkWithUTM}
              >
                Generate UTM Link
              </button>

              {generatedLink && (
                <div className="mt-4 bg-gray-200 text-gray-800 p-2 rounded">
                  <a
                    href={generatedLink}
                    className="text-blue-600 hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {generatedLink}
                  </a>
                </div>
              )}
              {/* Display base affiliate link if it exists and is valid */}
              {affiliate.affiliate_link && !isExpired && (
                <div className="mt-6 p-4 border rounded bg-[#f8f9fc]">
                  <h3 className="text-xl font-bold">Base Affiliate Link:</h3>
                  <p className="mt-2 text-gray-800">
                    <a
                      href={affiliate.affiliate_link}
                      className="text-blue-600 hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {affiliate.affiliate_link}
                    </a>
                  </p>

                </div>
              )}
                  {/* View Products Button */}
                  <Link
                    href="/products"
                    className="inline-block mt-4 bg-[#16213e] text-[#e9f4fe] font-bold px-4 py-2 rounded hover:bg-[#0f1a2e]"
                  >
                    View Products
                  </Link>
            </>
          )}
        </div>
      </main>
    </div>
  );
}
