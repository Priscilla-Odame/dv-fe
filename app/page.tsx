"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FiShoppingCart, FiUser, FiSearch, FiHeart } from "react-icons/fi";
import axios from "axios";
import { FaCartPlus } from "react-icons/fa";
import { contactInformation } from "@/helpers/data/contact";

export default function HomePage() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchFeaturedProducts = async () => {
    setLoading(true);
    try {
      await axios
        .get("https://dv-be.onrender.com/api/products")
        .then((response) => {
          if (response.status === 200) {
            let featured = response?.data?.slice(0, 3);
            setFeaturedProducts(featured);
            setLoading(false);
          } else {
            setFeaturedProducts([]);
            setLoading(false);
          }
        });
    } catch (error) {
      console.error("Error fetching products:", error);
      alert("Failed to load products. Please try again later.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFeaturedProducts();
  }, []);

  return (
    <div className="bg-white text-gray-900">
      {/* Navbar */}
      <nav className="p-4 shadow-md bg-white fixed w-full top-0 z-10">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">Product Store</h1>
          <div className="flex items-center gap-4">
            <input
              type="text"
              placeholder="Search..."
              className="px-3 py-1 border rounded-md"
            />
            <FiSearch className="text-gray-600 text-xl cursor-pointer" />
            <Link href="/auth/login">
              <FiUser className="text-gray-600 text-xl cursor-pointer" />
            </Link>
            <FiShoppingCart className="text-gray-600 text-xl cursor-pointer" />
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative bg-[var(--overlay)] bg-[url(/sample-products/products-group.png)] bg-contain bg-center bg-no-repeat bg-blend-overlay w-full h-[400px] flex items-center justify-center bg-[#e9f4fe] text-center mt-16">
        <div className="flex flex-col justify-center items-center gap-y-4">
          <h2 className="text-3xl font-bold text-white">Bring Nature Home</h2>
          <p className="text-lg text-white">
            Discover beautiful plants for your space
          </p>
          <Link
            href={"/products"}
            className="px-6 py-2 bg-[var(--secondary-yellow)] text-white rounded-md"
          >
            Shop Now
          </Link>
        </div>
      </section>

      {/* Product Grid */}
      <section className="w-full flex flex-col justify-start items-center gap-y-2 py-10 container mx-auto px-4">
        <h3 className="text-2xl font-bold text-center mb-6">
          Best Selling Products
        </h3>
        <div className="w-full flex flex-col justify-start items-center gap-y-2">
          {featuredProducts.length > 0 ? (
            <div className="w-full md:grid md:grid-cols-3 lg:grid-cols-4 flex flex-col justify-start items-start gap-4">
              {featuredProducts.map((product: any) => (
                <div
                  key={product?._id}
                  className="w-full gap-y-2 h-[20rem] gap-y-2 bg-white py-2 rounded-lg shadow-md relative hover:scale-105 transition-all duration-300 border border-black"
                >
                  <FiHeart
                    className="absolute top-2 right-2 text-gray-500 cursor-pointer"
                    // onClick={() => addToWishlist(product)}
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
                      // onClick={() => addToCart(product)}
                      className="font-bold flex flex-row justify-center items-center h-[2.5rem] px-4 py-2 bg-[var(--white)] text-black rounded border border-[var(--primary-blue)] w-full hover:text-white hover:bg-[var(--primary-blue)]"
                    >
                      Add to Cart &nbsp;
                      <FaCartPlus className="text-[--primary-blue] hover:text-white cursor-pointer" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : loading ? (
            <p className="text-center w-full animate-pulse text-black">
              Loading products...
            </p>
          ) : (
            <>
              <p className="text-center w-full">
                There are no products here at the moment, please check back here
                again later.
              </p>
              <p className="text-center w-full">
                You can also give us a call:{" "}
                <Link
                  className="italic text-[var(--primary-blue)]"
                  href={`tel:${contactInformation.primaryContact}`}
                >
                  {contactInformation.primaryContact}
                </Link>{" "}
                or
                <Link
                  className="italic text-[var(--primary-blue)]"
                  href={`tel:${contactInformation.secondaryContact}`}
                >
                  {contactInformation.secondaryContact}
                </Link>
              </p>
            </>
          )}
        </div>
        <Link
          href={"/products"}
          className="px-6 py-2 bg-[var(--secondary-yellow)] text-white rounded-md"
        >
          Explore more
        </Link>
      </section>

      {/* Footer */}
      <footer className="text-center p-4 bg-gray-800 text-white mt-10">
        <p>&copy; 2025 DV Unlimited. All rights reserved.</p>
      </footer>
    </div>
  );
}
