"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";

export default function ShopPage() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [search, setSearch] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cartOpen, setCartOpen] = useState(false); // Cart Sidebar Toggle

  useEffect(() => {
    fetchProducts();
    checkLoginStatus();
    loadCart();
  }, []);

  // Fetch products from API
  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/products");
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  // Check if user is logged in (Based on token in localStorage)
  const checkLoginStatus = () => {
    const token = sessionStorage.getItem("a_c");
    setIsLoggedIn(!!token);
  };

  // Load cart from localStorage
  const loadCart = () => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  };

  // Add to Cart Functionality
  const addToCart = (product) => {
    const updatedCart = [...cart, product];
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  // Remove from Cart
  const removeFromCart = (index) => {
    const updatedCart = cart.filter((_, i) => i !== index);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  // Handle Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  return (
    <div className="p-6 relative">
      {/* Navbar */}
      <div className="flex justify-between items-center mb-6 bg-gray-800 p-4 rounded-md shadow-lg">
        {isLoggedIn && (
          <button className="text-white bg-blue-500 px-4 py-2 rounded hover:bg-blue-700">
            <Link href="/dashboard">← Back to Dashboard</Link>
          </button>
        )}

        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search products..."
          className="p-2 w-1/3 rounded border"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* Profile & Cart Icons */}
        <div className="flex items-center gap-4">
          {/* Cart Button */}
          <button
            onClick={() => setCartOpen(!cartOpen)}
            className="text-white bg-gray-700 p-2 rounded-full relative"
          >
            🛒
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-2">
                {cart.length}
              </span>
            )}
          </button>

          {/* Profile Icon with Dropdown */}
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="text-white bg-gray-700 p-2 rounded-full"
            >
              👤
            </button>
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-md py-2">
                {isLoggedIn ? (
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-200"
                  >
                    Logout
                  </button>
                ) : (
                  <>
                    <Link
                      href="/auth/login"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-200"
                    >
                      Login
                    </Link>
                    <Link
                      href="/auth/register"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-200"
                    >
                      Register
                    </Link>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-3 gap-4">
        {products
          .filter((p) => p?.name?.toLowerCase().includes(search.toLowerCase()))
          .map((product) => (
            <div
              key={product._id}
              className="border p-4 bg-white shadow-lg rounded-lg"
            >
              <img
                src={product.product_photo?.url}
                alt={product.name}
                className="w-full h-40 object-cover rounded-md"
              />
              <h3 className="font-bold mt-2 text-lg">{product.name}</h3>
              <p className="text-gray-700">Price: ${product.price}</p>
              <p className="text-gray-500">Stock: {product.stock}</p>
              <button
                onClick={() => addToCart(product)}
                className="bg-blue-500 text-white px-4 py-2 mt-2 rounded hover:bg-blue-700"
              >
                Add to Cart
              </button>
            </div>
          ))}
      </div>

      {/* Sidebar Cart */}
      <div
        className={`fixed top-0 right-0 h-full bg-white shadow-lg w-80 transition-transform ${
          cartOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Cart Header */}
        <div className="flex justify-between items-center bg-gray-800 text-white p-4">
          <h2 className="text-lg font-bold">Shopping Cart</h2>
          <button onClick={() => setCartOpen(false)} className="text-white">
            ✖
          </button>
        </div>

        {/* Cart Items */}
        <div className="p-4 space-y-4 overflow-y-auto h-[calc(100vh-100px)]">
          {cart.length === 0 ? (
            <p className="text-gray-500 text-center">Your cart is empty.</p>
          ) : (
            cart.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-2 border rounded"
              >
                <div>
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-gray-600">${item.price}</p>
                </div>
                <button
                  onClick={() => removeFromCart(index)}
                  className="text-red-500 font-bold"
                >
                  ✖
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
