"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from 'next/link';
import { FiShoppingCart, FiUser, FiSearch } from "react-icons/fi";

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const placeholderImage = "/ls.jpg";

  useEffect(() => {
    fetch("http://localhost:3000/api/products") // Replace with actual API URL
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Error fetching products:", err));
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
      <section className="relative w-full h-[400px] flex items-center justify-center bg-[#e9f4fe] text-center mt-16">
        <div>
          <h2 className="text-3xl font-bold">Bring Nature Home</h2>
          <p className="mt-2 text-lg">Discover beautiful plants for your space</p>
          <button className="mt-4 px-6 py-2 bg-[#e9f4fe] text-gray-900 rounded-md border border-gray-900">Shop Now</button>
        </div>
      </section>
      
      {/* Product Grid */}
      <section className="py-10 container mx-auto px-4">
        <h3 className="text-2xl font-bold text-center mb-6">Best Selling Products</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {products.length > 0 ? (
            products.map((product) => (
              <div key={product?._id} className="bg-[#eeedf3] p-4 rounded-lg shadow-md">
                <Image src={product?.product_photo?.url || placeholderImage } width={150} height={150} alt={product.name} className="w-full h-auto rounded-md" />
                
                 {/* <img src={product.product_photo?.url || placeholderImage} alt={product.name} className="w-full h-auto rounded-md" /> */}
                <h4 className="mt-2 font-semibold">{product?.name}</h4>
                <p className="text-green-600 font-bold">${product?.price}</p>
                <button className="mt-2 px-4 py-2 bg-[#e9f4fe] text-gray-900 rounded-md border border-gray-900 w-full">Add to Cart</button>
              </div>
            ))
          ) : (
            <p className="text-center w-full">Loading products...</p>
          )}
        </div>
      </section>
      
      {/* Footer */}
      <footer className="text-center p-4 bg-gray-800 text-white mt-10">
        <p>&copy; 2025 DV Unlimited. All rights reserved.</p>
      </footer>
    </div>
  );
}
