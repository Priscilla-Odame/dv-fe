"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const sidebarItems = [
  {
    group: "Overview",
    items: [
      { title: "Dashboard", href: "/affiliate/dashboard", icon: "📊" },
    ],
  },
  {
    group: "Account",
    items: [
      { title: "Profile Settings", href: "/affiliate/profile", icon: "👤" },
      { title: "Account Settings", href: "/affiliate/account", icon: "⚙️" },
      { title: "Bank Details", href: "/affiliate/bank", icon: "🏦" },
    ],
  },
  {
    group: "Earnings",
    items: [
      { title: "Payout History", href: "/affiliate/payouts", icon: "💵" },
    ],
  },
  {
    group: "Resources",
    items: [
      { title: "Marketing Resources", href: "/affiliate/resources", icon: "📣" },
      { title: "Referral Guide", href: "/affiliate/guide", icon: "📘" },
    ],
  },
  {
    group: "Support",
    items: [
      { title: "Support", href: "/affiliate/support", icon: "🛟" },
      { title: "Logout", href: "/logout", icon: "🚪" },
    ],
  },
];

export default function AffiliateSidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const toggleSidebar = () => setIsOpen(!isOpen);
  const closeSidebar = () => setIsOpen(false);

  return (
    <>
      {/* Mobile Topbar */}
      <div className="md:hidden flex items-center justify-between p-4 bg-white border-b shadow-sm">
        <button
          onClick={toggleSidebar}
          className="text-2xl focus:outline-none"
          aria-label="Toggle sidebar"
        >
          ☰
        </button>
        <span className="font-semibold text-lg">Affiliate</span>
      </div>

      {/* Mobile Sidebar Drawer */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 z-40" onClick={closeSidebar}>
          <div
            className="fixed left-0 top-0 bottom-0 w-64 bg-white shadow-lg z-50 p-4 overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <SidebarContent pathname={pathname} onLinkClick={closeSidebar} />
          </div>
        </div>
      )}

      {/* Desktop Sidebar */}
      <div className="hidden md:block fixed top-0 left-0 bottom-0 w-64 bg-white border-r p-4 overflow-y-auto">
        <SidebarContent pathname={pathname} />
      </div>
    </>
  );
}

function SidebarContent({
  pathname,
  onLinkClick,
}: {
  pathname: string;
  onLinkClick?: () => void;
}) {
  return (
    <div>
      {sidebarItems.map((section) => (
        <div key={section.group} className="mb-6">
          <p className="text-xs font-semibold text-gray-500 uppercase mb-2">
            {section.group}
          </p>
          <ul className="space-y-1">
            {section.items.map((item) => {
              const isActive = pathname === item.href;
              return (
                <li key={item.title}>
                  <Link
                    href={item.href}
                    onClick={onLinkClick}
                    className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-gray-100 text-gray-900"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                    }`}
                  >
                    <span>{item.icon}</span>
                    {item.title}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </div>
  );
}
