"use client";
import { FormEvent, useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL, CLIENT_BASE_URL } from "@/helpers/route";
import CustomerPageWrapper from "../components/global_components/customerWrapper";
import {
  loadCart,
  loadWishListFxn,
  removeFromCartFxn,
} from "@/helpers/storage/storage";
import { FaMinus, FaPlus, FaTrash } from "react-icons/fa";
import { defaultCurrency } from "@/helpers/data/appConstants";
import { updateRemoteCartItem } from "@/hooks/cart.hook";

export default function PaymentForm() {
  const [email, setEmail] = useState("");
  const [amount, setAmount] = useState<number | "">("");
  const [loading, setLoading] = useState(false);
  const [cart, setCart] = useState<{
    items: Array<any>;
    totalAmount: number | string;
  }>({ items: [], totalAmount: 0 });
  const [wishlist, setWishlist] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);

  //component states
  const [userId, setUserId] = useState("");

  //get user
  const getUserId = () => {
    if (typeof window !== undefined || typeof window !== "undefined") {
      const userId: any = sessionStorage.getItem("u_id");
      setUserId(userId);
    }
  };
  useEffect(() => {
    getUserId();
  }, []);

  const retrieveCart = async () => {
    await loadCart(setCart);
  };
  //load cart and wishlist
  const loadWishlist = () => {
    loadWishListFxn(setWishlist);
  };

  const removeFromCart = (item: any) => {
    removeFromCartFxn(item, setCart);
  };

  //make payment handler
  const handlePayment = async (e: FormEvent) => {
    e.preventDefault();
    let reqBody = {
      email: email,
      amount: cart.totalAmount,
      callback_url: `${CLIENT_BASE_URL}orders`,
    };
    console.log("amount", reqBody);
    if (!reqBody.email || !reqBody.amount) {
      alert("Please enter both email and amount.");
      return;
    }

    setLoading(true);

    try {
      // Call the backend to initialize the transaction
      const response = await axios.post(
        `${BASE_URL}payment/transaction`,
        reqBody
      );
      const { authorization_url } = response.data;
      window.location.href = authorization_url; // Redirect to Paystack's payment page
    } catch (error) {
      console.error("Error initializing payment:", error);
      alert("Failed to initialize payment.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    retrieveCart();
    loadWishlist();
  }, []);

  return (
    <CustomerPageWrapper
      showSearch={false}
      wishlist={wishlist}
      cart={cart}
      setCart={setCart}
      setCartOpen={setCartOpen}
      cartOpen={cartOpen}
      removeFromCart={removeFromCart}
    >
      <div className="w-full bg-white text-gray-900 min-h-[90vh] py-[6rem]">
        <section className="relative bg-[var(--overlay)] bg-[url(/bg/payment-banner.jpg)] bg-contain bg-center bg-no-repeat bg-blend-overlay w-full h-[200px] flex items-center justify-center bg-[#e9f4fe] text-center mt-16">
          <div className="flex flex-col justify-center items-center gap-y-4">
            <h2 className="text-3xl font-bold text-white">Checkout</h2>
          </div>
        </section>
        <section
          className="max-w-[1024px] w-full self-center py-10 container mx-auto px-4 flex flex-col justify-start items-center"
          id="shop-pane"
        >
          <div className="w-full flex lg:flex-row flex-col justify-start items-start  gap-4">
            <div className="lg:w-2/3 w-full flex flex-col justify-start items-start gap-y-2">
              <h4 className="text-xl font-bold text-black">Checkout items</h4>

              <div className="space-y-4 w-full">
                {cart?.items?.length === 0 ? (
                  <p>Your cart is empty</p>
                ) : (
                  cart?.items?.map((item: any, index: number) => (
                    <div
                      key={index}
                      className="w-full flex md:flex-row flex-col gap-2 lg:justify-between justify-start items-center"
                    >
                      <div className="md:w-2/4 w-full flex flex-col justify-start items-start gap-4">
                        <div className="flex md:flex-row md:justify-start flex-col justify-center items-center gap-x-2 md:w-3/4 w-full">
                          <img
                            src={
                              item?.product_photo?.url ||
                              "/static/bottles-placeholder-2-no-bg.png"
                            }
                            alt={item.name}
                            className="lg:w-[3rem] w-[10rem] lg:h-[3rem] h-[10rem] border border-gray-200 object-contain rounded-md"
                          />
                          <p>{item.name}</p>
                        </div>
                        <div className="w-max gap-2 flex flex-row md:justify-start items-center justify-center md:place-self-start place-self-center">
                          <button
                            disabled={
                              item?.stock === 1 || item?.purchase_quantity === 1
                            }
                            onClick={() =>
                              updateRemoteCartItem(
                                {
                                  ...item,
                                  purchase_quantity:
                                    item?.purchase_quantity - 1,
                                },
                                setCart,
                                userId,
                                "dec"
                              )
                            }
                            className={`disabled:cursor-not-allowed disabled:opacity-50 text-sm text-red-500 gap-x-2 rounded-full border border-gray-100 flex flex-row justify-center items-center py-2 px-2 shadow-md`}
                          >
                            <FaMinus size={15} color="text-red-600" />
                          </button>
                          <button
                            disabled={item?.purchase_quantity === item?.stock}
                            onClick={() =>
                              updateRemoteCartItem(
                                {
                                  ...item,
                                  purchase_quantity:
                                    item?.purchase_quantity + 1,
                                },
                                setCart,
                                userId,
                                "inc"
                              )
                            }
                            className="disabled:cursor-not-allowed disabled:opacity-50 text-sm text-blue-500 gap-x-2 rounded-full border border-gray-100 flex flex-row justify-center items-center py-2 px-2 shadow-md"
                          >
                            <FaPlus size={15} color="text-blue-600" />
                          </button>
                        </div>
                      </div>
                      <span className="font-bold md:w-1/4 w-full md:text-left text-center">
                        {`${item?.purchase_quantity} (qty) * ${defaultCurrency} ${item?.price}`}{" "}
                        = {defaultCurrency}{" "}
                        {(item?.purchase_quantity * item?.price).toFixed(2)}
                      </span>
                      <button
                        onClick={() => removeFromCart(item)}
                        className="text-sm text-red-500 gap-x-2 rounded-full border border-gray-100 flex flex-row justify-center items-center py-2 px-4 shadow-md"
                      >
                        Remove
                        <FaTrash size={15} color="text-red-600" />
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
            <form
              onSubmit={(e) => handlePayment(e)}
              className="lg:w-1/3 w-full flex flex-col gap-x-4 gap-y-2"
            >
              <h4 className="text-base font-bold text-black">
                Enter your details to continue.
              </h4>

              <input
                required
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border p-2 rounded-md"
              />

              <button
                type="submit"
                className={`lg:w-full w-max bg-[var(--secondary-blue)] text-white py-2 px-4 rounded-md self-center ${
                  loading && "bg-gray-500"
                }`}
                disabled={loading || !email}
              >
                {loading ? "Processing..." : "Pay Now"}
              </button>
            </form>
          </div>
        </section>
      </div>
    </CustomerPageWrapper>
  );
}
