"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import { FiShoppingCart, FiUser, FiSearch, FiHeart, FiTrash2 } from "react-icons/fi";

export default function ShopPage() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [cartOpen, setCartOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  useEffect(() => {
    fetchProducts();
    loadCart();
    loadWishlist();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/products");
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
      alert("Failed to load products. Please try again later.");
    }
  };

  const loadCart = () => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  };

  const loadWishlist = () => {
    const storedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    setWishlist(storedWishlist);
  };

  const addToCart = (product) => {
    setCart((prevCart) => {
      const updatedCart = [...prevCart, product];
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  const removeFromCart = (index) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.filter((_, i) => i !== index);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  const addToWishlist = (product) => {
    setWishlist((prevWishlist) => {
      if (!prevWishlist.find((item) => item._id === product._id)) {
        const updatedWishlist = [...prevWishlist, product];
        localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
        return updatedWishlist;
      }
      return prevWishlist;
    });
  };

  const removeFromWishlist = (index) => {
    setWishlist((prevWishlist) => {
      const updatedWishlist = prevWishlist.filter((_, i) => i !== index);
      localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
      return updatedWishlist;
    });
  };

  const filteredProducts = products.filter(
    (p) =>
      p?.name?.toLowerCase().includes(search.toLowerCase()) &&
      (category === "all" || p.category === category)
  );

  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Pagination Functions
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const goToPage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="bg-white text-gray-900 min-h-screen">
      {/* Navbar */}
      <nav className="p-4 shadow-md bg-white fixed w-full top-0 z-10">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">Product Store</h1>
          <div className="flex items-center gap-4">
            <input
              type="text"
              placeholder="Search..."
              className="px-3 py-1 border rounded-md"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <FiSearch className="text-gray-600 text-xl cursor-pointer" />
            <Link href="/auth/login">
              <FiUser className="text-gray-600 text-xl cursor-pointer" />
            </Link>
            <div className="relative">
              <FiShoppingCart
                className="text-gray-600 text-xl cursor-pointer"
                onClick={() => setCartOpen(!cartOpen)}
              />
              <span className="absolute top-0 right-0 text-xs bg-red-500 text-white rounded-full px-2">
                {cart.length}
              </span>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative w-full h-[400px] flex items-center justify-center bg-[#e9f4fe] text-center mt-16">
        <div>
          <h2 className="text-3xl font-bold">Exclusive Deals for You!</h2>
          <p className="mt-2 text-lg">Find the best products curated just for you.</p>
          <button className="mt-4 px-6 py-2 bg-[#e9f4fe] text-gray-900 rounded-md border border-gray-900">
            Explore Now
          </button>
        </div>
      </section>

      {/* Category Filter */}
      <div className="text-center mt-6">
        <select
          className="border p-2 rounded-md"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="all">All Categories</option>
          <option value="electronics">Electronics</option>
          <option value="fashion">Fashion</option>
          <option value="home">Home & Living</option>
        </select>
      </div>

      {/* Product Grid */}
      <section className="py-10 container mx-auto px-4">
        <h3 className="text-2xl font-bold text-center mb-6">Our Collection</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {paginatedProducts.length > 0 ? (
            paginatedProducts.map((product) => (
              <div
                key={product?._id}
                className="bg-[#eeedf3] p-4 rounded-lg shadow-md relative hover:scale-105 transition-all duration-300"
              >
                <img
                  src={product?.product_photo?.url || "/ls.jpg"}
                  alt={product.name}
                  className="w-full h-auto rounded-md"
                />
                <h4 className="mt-2 font-semibold text-[#16213e]">{product?.name}</h4>
                <p className="text-green-600 font-bold">${product?.price}</p>
                <button
                  onClick={() => addToCart(product)}
                  className="mt-2 px-4 py-2 bg-[#e9f4fe] text-gray-900 rounded-md border border-gray-900 w-full"
                >
                  Add to Cart
                </button>
                <FiHeart
                  className="absolute top-2 right-2 text-gray-500 cursor-pointer"
                  onClick={() => addToWishlist(product)}
                />
              </div>
            ))
          ) : (
            <p className="text-center w-full">No products found.</p>
          )}
        </div>
      </section>

      {/* Pagination Section */}
      <div className="flex justify-center mt-6">
        <button
          onClick={handlePrevious}
          className="px-4 py-2 bg-[#e9f4fe] text-gray-900 rounded-md border border-gray-900 disabled:opacity-50"
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className="mx-4 text-lg">
          {currentPage} of {totalPages}
        </span>
        <button
          onClick={handleNext}
          className="px-4 py-2 bg-[#e9f4fe] text-gray-900 rounded-md border border-gray-900 disabled:opacity-50"
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>

      {/* Cart Modal */}
      {cartOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-700 bg-opacity-50 z-20">
          <div className="absolute top-1/4 left-1/4 w-3/4 md:w-1/2 bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">Your Cart</h2>
            <div className="space-y-4">
              {cart.length === 0 ? (
                <p>Your cart is empty</p>
              ) : (
                cart.map((item, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <p>{item.name}</p>
                    <button onClick={() => removeFromCart(index)} className="text-red-500">
                      Remove
                    </button>
                  </div>
                ))
              )}
            </div>
            <div className="flex justify-between items-center mt-4">
              <button
                onClick={() => setCartOpen(false)}
                className="bg-[#16213e] text-white py-2 px-4 rounded-md"
              >
                Close
              </button>
              <button className="bg-[#e9f4fe] text-[#16213e] py-2 px-4 rounded-md">
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
