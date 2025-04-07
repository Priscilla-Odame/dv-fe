import { defaultCurrency } from "@/helpers/data/appConstants";
import { updateRemoteCartItem } from "@/hooks/cart.hook";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaMinus, FaPlus, FaTrash } from "react-icons/fa";
import { MdClose } from "react-icons/md";

export default function CartModal({
  cart,
  setCart,
  removeFromCart,
  setCartOpen,
}: any) {
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

  return (
    <div className="fixed flex flex-col justify-center items-center top-0 left-0 w-full h-full bg-gray-700 bg-opacity-50 z-20">
      <div className="flex flex-col gap-y-2 justify-start items-center w-3/4 md:w-1/2 bg-white max-h-[80vh] overflow-y-auto p-6 rounded-lg shadow-lg">
        <div className="w-full flex justify-between items-center mt-4">
          <h2 className="text-2xl font-semibold mb-4">Your Cart</h2>
          <button
            onClick={() => setCartOpen(false)}
            className="bg-white shadow rounded-full text-black py-2 px-2 border border-gray-200"
          >
            <MdClose size={20} color="text-black" />
          </button>
        </div>
        <div className="space-y-4 w-full">
          {cart?.items?.length === 0 ? (
            <p>Your cart is empty</p>
          ) : (
            cart?.items?.map((item: any, index: number) => (
              <div
                key={index}
                className="w-full flex lg:flex-row flex-col gap-2 lg:justify-between justify-start items-center"
              >
                <div className="w-2/4 flex flex-col justify-start items-start gap-4">
                  <div className="flex flex-row justify-start items-center gap-x-2 lg:w-3/4 w-full">
                    <img
                      src={
                        item?.product_photo?.url ||
                        "/static/bottles-placeholder-2-no-bg.png"
                      }
                      alt={item.name}
                      className="w-[3rem] h-[3rem] border border-gray-200 object-contain rounded-md"
                    />
                    <p>{item.name}</p>
                  </div>
                  <div className="w-max gap-2 flex flex-row justify-start items-center">
                    <button
                      disabled={
                        item?.stock === 1 || item?.purchase_quantity === 1
                      }
                      onClick={() =>
                        updateRemoteCartItem(
                          {
                            ...item,
                            purchase_quantity: item?.purchase_quantity - 1,
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
                            purchase_quantity: item?.purchase_quantity + 1,
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
                <span className="font-bold w-1/4">
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
        <div className="w-full flex lg:flex-row flex-col justify-between items-center">
          <span className="w-max py-2 px-4 rounded-md border border-[var(--secondary-blue)]">
            {defaultCurrency} {parseFloat(cart?.totalAmount).toFixed(2)}
          </span>
          <Link
            className="bg-[var(--secondary-blue)] text-white py-2 px-4 rounded-md"
            href="/checkout"
            aria-disabled={cart?.items?.length === 0 || !cart}
          >
            Proceed to Checkout
          </Link>
        </div>
      </div>
    </div>
  );
}
