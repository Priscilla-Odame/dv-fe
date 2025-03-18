import Link from 'next/link';

export default function AdminDashboard() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-blue-900 text-white p-6 shadow-lg">
        <h2 className="text-2xl font-bold text-yellow-400 mb-6">Admin Dashboard</h2>
        <nav className="space-y-4">
          <Link href="/admin/products" className="block p-2 bg-blue-700 rounded hover:bg-blue-600">
            Products
          </Link>
          <Link href="/admin/users" className="block p-2 bg-blue-700 rounded hover:bg-blue-600">
            Users
          </Link>
          <Link href="/sales" className="block p-2 bg-blue-700 rounded hover:bg-blue-600">
            Sales
          </Link>
          <Link href="/reports" className="block p-2 bg-blue-700 rounded hover:bg-blue-600">
            Reports
          </Link>
          <Link href="/settings" className="block p-2 bg-blue-700 rounded hover:bg-blue-600">
            Settings
          </Link>
          <Link href="/profile" className="block p-2 bg-blue-700 rounded hover:bg-blue-600">
            Profile
          </Link>
        </nav>
      </aside>
      
      {/* Content Area */}
      <main className="flex-1 p-6">
        <h1 className="text-3xl font-bold text-blue-900">Welcome to Admin Dashboard</h1>
        <p className="mt-4 text-gray-700">Manage your products, users, sales, and more from the sidebar.</p>
      </main>
    </div>
  );
}
