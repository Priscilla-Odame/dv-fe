"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import { FiHeart } from "react-icons/fi";
import { FaCaretLeft, FaCaretRight, FaCartPlus } from "react-icons/fa";
import {
  addToWishlistFxn,
  loadCart,
  loadWishListFxn,
  removeFromCartFxn,
  removeFromWishlistFxn,
} from "@/helpers/storage/storage";
import { BASE_URL } from "@/helpers/route";
import { removeFromRemoteCart, saveToRemoteCart } from "@/hooks/cart.hook";
import { MdRemoveShoppingCart } from "react-icons/md";
import { LuHeartOff } from "react-icons/lu";
import CustomerPageWrapper from "../components/global_components/customerWrapper";
import { useSearchParams } from "next/navigation";
import { Suspense } from 'react'


export default function ShopPage() {
  // Using Suspense to handle the async call for search parameters.
  return (
    <Suspense fallback={<p className="text-center my-10">Loading Shop...</p>}>
      <ShopPageContent />
    </Suspense>
  );
}

function ShopPageContent() {
  const searchParams = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const [cart, setCart] = useState<{
    items: Array<any>;
    totalAmount: number | string;
  }>({ items: [], totalAmount: 0 });
  const [userId, setUserId] = useState("");
  const [wishlist, setWishlist] = useState([]);
  const [searchQuery, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [cartOpen, setCartOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const fetchProducts = async () => {
    setLoading(true);

    const affiliateUser = searchParams.get("user");
    const affiliateNumber = searchParams.get("num");
    const utmSource = searchParams.get("utm_source");
    const utmMedium = searchParams.get("utm_medium");
    const utmCampaign = searchParams.get("utm_campaign");

    try {
      await axios
        .get(
          affiliateUser && affiliateNumber && utmSource && utmMedium && utmCampaign ?
          `${BASE_URL}products?user=${affiliateUser}&num=${affiliateNumber}&utm_source=${utmSource}&utm_medium=${utmMedium}&utm_campaign=${utmCampaign}` : `${BASE_URL}products`
        )
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

  const filteredProducts =
    products.length > 0
      ? products.filter(
          (p: any) =>
            p?.name?.toLowerCase().includes(searchQuery.toLowerCase()) &&
            (category === "all" || p.category === category)
        )
      : [];

  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Pagination Functions
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

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
        <section
          className="max-w-[1440px] self-center py-10 container mx-auto px-4"
          id="shop-pane"
        >
          <h3 className="text-2xl font-bold text-center mb-6">
            Our Collection
          </h3>
          <div className="md:grid md:grid-cols-3 lg:grid-cols-4 flex flex-col justify-start items-start gap-4">
            {paginatedProducts.length > 0 ? (
              <>
                {paginatedProducts.map((product: any) => (
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
      </div>
    </CustomerPageWrapper>
  );
}
