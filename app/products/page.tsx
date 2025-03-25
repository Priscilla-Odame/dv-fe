"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import {
  FiShoppingCart,
  FiUser,
  FiSearch,
  FiHeart,
  FiTrash2,
} from "react-icons/fi";
import { FaCaretLeft, FaCaretRight, FaCartPlus } from "react-icons/fa";
import { addToCartFxn, addToWishlistFxn } from "@/helpers/storage/storage";
import { BASE_URL } from "@/helpers/route";

export default function ShopPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [cartOpen, setCartOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const fetchProducts = async () => {
    setLoading(true);

    try {
      await axios
        .get(`${BASE_URL}products`)
        .then((response) => {
          if (response.status === 200) {
            setProducts(response.data);
            setLoading(false);
          } else {
            setProducts([]);
            setLoading(false);
          }
        });
    } catch (error) {
      console.error("Error fetching products:", error);
      alert("Failed to load products. Please try again later.");
      setLoading(false);
    }
  };

  const loadCart = () => {
    if (typeof window !== undefined || typeof window !== "undefined") {
      const storedCart: any = localStorage.getItem("dv_cart");
      let parsedCart = storedCart ? JSON.parse(storedCart) : [];
      setCart(parsedCart);
    }
  };

  const loadWishlist = () => {
    if (typeof window !== undefined || typeof window !== "undefined") {
      const storedWishlist: any = localStorage.getItem("dv_wishlist");
      let parsedWishlist = storedWishlist ? JSON.parse(storedWishlist) : [];
      setWishlist(parsedWishlist);
    }
  };

  const removeFromCart = (index: any) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.filter((_, i) => i !== index);
      localStorage.setItem("dv_cart", JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  const addToWishlist = (product: any) => {
    setWishlist((prevWishlist: any) => {
      if (!prevWishlist.find((item: any) => item._id === product._id)) {
        const updatedWishlist = [...prevWishlist, product];
        localStorage.setItem("dv_wishlist", JSON.stringify(updatedWishlist));
        return updatedWishlist;
      }
      return prevWishlist;
    });
  };

  const removeFromWishlist = (index: any) => {
    setWishlist((prevWishlist) => {
      const updatedWishlist = prevWishlist.filter((_, i) => i !== index);
      localStorage.setItem("dv_wishlist", JSON.stringify(updatedWishlist));
      return updatedWishlist;
    });
  };

  const filteredProducts = products.filter(
    (p: any) =>
      p?.name?.toLowerCase().includes(search.toLowerCase()) &&
      (category === "all" || p.category === category)
  );

  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Pagination Functions
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const goToPage = (pageNumber: any) => {
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

  useEffect(() => {
    fetchProducts();
    loadCart();
    loadWishlist();
  }, []);
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
      <section className="relative bg-[var(--overlay)] bg-[url(/bg/shop-banner.jpg)] bg-cover bg-top-center bg-no-repeat bg-blend-overlay w-full h-[400px] flex items-center justify-center bg-[#e9f4fe] text-center mt-16">
        <div className="flex flex-col justify-center items-center gap-y-4">
          <h2 className="text-3xl font-bold text-white">
            Exclusive Deals for You!
          </h2>
          <p className="text-lg text-white">
            Find the best products curated just for you.
          </p>
          <Link
            href={"#shop-pane"}
            className="px-6 py-2 bg-[var(--secondary-yellow)] text-white rounded-md"
          >
            Explore Now
          </Link>
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
      <section className="py-10 container mx-auto px-4" id="shop-pane">
        <h3 className="text-2xl font-bold text-center mb-6">Our Collection</h3>
        <div className="md:grid md:grid-cols-3 lg:grid-cols-4 flex flex-col justify-start items-start gap-4">
          {paginatedProducts.length > 0 ? (
            <>
              {paginatedProducts.map((product: any) => (
                <div
                  key={product?._id}
                  className="w-full gap-y-2 h-[20rem] gap-y-2 bg-white py-2 rounded-lg shadow-md relative hover:scale-105 transition-all duration-300 border border-black"
                >
                  <FiHeart
                    className="absolute top-2 right-2 text-gray-500 cursor-pointer"
                    onClick={() => addToWishlistFxn(product, setWishlist)}
                  />
                  <img
                    src={
                      product?.product_photo?.url ||
                      "/static/bottles-placeholder-2-no-bg.png"
                    }
                    alt={product.name}
                    className="w-full h-[70%] border-b border-gray-200 object-contain"
                  />
                  <div className="flex flex-col justify-center items-start gap-y-2 h-[28%] px-4">
                    <div className="h-[15s%] w-full flex flex-row justify-between items-center ">
                      <h5 className="h-max max-w-[80%] font-semibold text-[#16213e] text-sm my-0 border border-gray-100 py-1 px-3 rounded-full">
                        {product?.name}
                      </h5>
                      <p className="h-max w-[15%] text-[var(--secondary-yellow)] text-right font-bold my-0">
                        ${product?.price}
                      </p>
                    </div>
                    <button
                      onClick={() => addToCartFxn(product, setCart)}
                      className="font-bold flex flex-row justify-center items-center h-[2.5rem] px-4 py-2 bg-[var(--white)] text-black rounded border border-[var(--primary-blue)] w-full hover:text-white hover:bg-[var(--primary-blue)]"
                    >
                      Add to Cart &nbsp;
                      <FaCartPlus className="text-[--primary-blue] hover:text-white cursor-pointer" />
                    </button>
                  </div>
                </div>
              ))}
            </>
          ) : loading ? (
            <p className="text-center w-full animate-pulse text-black">
              Loading products...
            </p>
          ) : (
            <p className="text-center w-full">No products found.</p>
          )}
        </div>
      </section>

      {/* Pagination Section */}
      <div className="flex justify-center mt-6">
        <button
          onClick={handlePrevious}
          className="flex flex-row justify-center items-center px-4 py-2 bg-[var(--primary-blue)] text-white rounded-full disabled:opacity-50"
          disabled={currentPage === 1}
        >
          <FaCaretLeft className="text-white hover:text-white cursor-pointer" />
          Previous
        </button>
        <span className="mx-4 text-lg">
          {currentPage} of {totalPages === 0 ? 1 : totalPages}
        </span>
        <button
          onClick={handleNext}
          className="flex flex-row justify-center items-center px-4 py-2 bg-[var(--primary-blue)] text-white rounded-full disabled:opacity-50"
          disabled={currentPage === totalPages || totalPages === 0}
        >
          Next{" "}
          <FaCaretRight className="text-white hover:text-white cursor-pointer" />
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
                cart.map((item: any, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center"
                  >
                    <p>{item.name}</p>
                    <button
                      onClick={() => removeFromCart(index)}
                      className="text-red-500"
                    >
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
              <Link href="/checkout">
                  Proceed to Checkout
                </Link>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
