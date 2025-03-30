"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FiShoppingCart, FiUser, FiSearch, FiHeart } from "react-icons/fi";
import axios from "axios";
import { FaCartPlus } from "react-icons/fa";
import { contactInformation } from "@/helpers/data/contact";
import CustomerPageWrapper from "./components/global_components/customerWrapper";
import {
  addToWishlistFxn,
  loadCart,
  loadWishListFxn,
  removeFromCartFxn,
  removeFromWishlistFxn,
} from "@/helpers/storage/storage";
import { LuHeartOff } from "react-icons/lu";
import { removeFromRemoteCart, saveToRemoteCart } from "@/hooks/cart.hook";
import { MdRemoveShoppingCart } from "react-icons/md";
import { BASE_URL } from "@/helpers/route";

export default function HomePage() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [cart, setCart] = useState<{
    items: Array<any>;
    totalAmount: number | string;
  }>({ items: [], totalAmount: 0 });
  const [userId, setUserId] = useState("");
  const [wishlist, setWishlist] = useState([]);
  const [searchQuery, setSearch] = useState("");
  const [cartOpen, setCartOpen] = useState(false);

  const fetchFeaturedProducts = async () => {
    setLoading(true);
    try {
      await axios
        .get(`${BASE_URL}products`)
        .then((response) => {
          if (response.status === 200) {
            let featured = response?.data?.slice(0, 4);
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

  //event handlers
  const retrieveCart = async () => {
    await loadCart(setCart);
  };

  const getUserId = () => {
    if (typeof window !== undefined || typeof window !== "undefined") {
      const userId: any = sessionStorage.getItem("u_id");
      setUserId(userId);
    }
  };

  //load cart and wishlist
  const loadWishlist = () => {
    loadWishListFxn(setWishlist);
  };

  const removeFromCart = (item: any) => {
    removeFromCartFxn(item, setCart);
  };

  useEffect(() => {
    fetchFeaturedProducts();
    retrieveCart();
    loadWishlist();
    getUserId();
  }, []);

  return (
    <CustomerPageWrapper
      showSearch={true}
      searchQuery={searchQuery}
      setSearch={setSearch}
      wishlist={wishlist}
      cart={cart}
      setCartOpen={setCartOpen}
      cartOpen={cartOpen}
      removeFromCart={removeFromCart}
    >
      <div className="w-full bg-white text-gray-900 min-h-[90vh]">
        {/* Hero Section */}
        <section className="relative bg-[var(--overlay)] bg-[url(/sample-products/products-group.png)] bg-contain bg-center bg-no-repeat bg-blend-overlay w-full h-[400px] flex items-center justify-center bg-[#e9f4fe] text-center mt-16">
          <div className="flex flex-col justify-center items-center gap-y-4">
            <h2 className="text-3xl font-bold text-white">Bring Nature Home</h2>
            <p className="text-lg text-white">
              Discover products that make living health.
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
        <section
          className="max-w-[1440px] w-full self-center py-10 container mx-auto px-4"
          id="featured-pane"
        >
          <h3 className="text-2xl font-bold text-center mb-6">
            Best Selling Products
          </h3>
          <div className="w-full md:grid md:grid-cols-3 lg:grid-cols-4 flex flex-col justify-start items-start  gap-4 place-items-center">
            {featuredProducts.length > 0 ? (
              <>
                {featuredProducts.map((product: any) => (
                  <div
                    key={product?._id}
                    className="w-full gap-y-2 h-[20rem] gap-y-2 bg-white py-2 rounded-lg shadow-md relative hover:scale-105 transition-all duration-300 border border-black"
                  >
                    {wishlist?.some(
                      (productexists: any) =>
                        productexists?._id === product?._id
                    ) ? (
                      <LuHeartOff
                        className="absolute top-2 right-2 text-gray-500 cursor-pointer"
                        onClick={() =>
                          removeFromWishlistFxn(product, setWishlist)
                        }
                      />
                    ) : (
                      <FiHeart
                        className="absolute top-2 right-2 text-red-500 cursor-pointer"
                        onClick={() => addToWishlistFxn(product, setWishlist)}
                      />
                    )}
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
                        GH₵{product?.price}
                        </p>
                      </div>
                      {cart.items?.some(
                        (productexists) => productexists?._id === product?._id
                      ) ? (
                        <button
                          onClick={() => removeFromRemoteCart(product, setCart)}
                          className="font-bold flex flex-row justify-center items-center h-[2.5rem] px-4 py-2 bg-[var(--white)] text-black rounded border border-[var(--primary-blue)] w-full hover:text-white hover:bg-[var(--primary-blue)]"
                        >
                          Remove from cart &nbsp;
                          <MdRemoveShoppingCart className="text-[--primary-blue] hover:text-white cursor-pointer" />
                        </button>
                      ) : (
                        <button
                          onClick={() =>
                            saveToRemoteCart(
                              { ...product, purchase_quantity: 1 },
                              setCart,
                              userId
                            )
                          }
                          className="font-bold flex flex-row justify-center items-center h-[2.5rem] px-4 py-2 bg-[var(--white)] text-black rounded border border-[var(--primary-blue)] w-full hover:text-white hover:bg-[var(--primary-blue)]"
                        >
                          Add to Cart &nbsp;
                          <FaCartPlus className="text-[--primary-blue] hover:text-white cursor-pointer" />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </>
            ) : loading ? (
              <p className="w-full text-center w-full animate-pulse text-black">
                Loading products...
              </p>
            ) : (
              <p className="text-center w-full">No products found.</p>
            )}
          </div>
        </section>
      </div>
    </CustomerPageWrapper>
  );
}
