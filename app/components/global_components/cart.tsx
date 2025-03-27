import Link from "next/link";
import { FaTrash } from "react-icons/fa";
import { MdClose } from "react-icons/md";

export default function CartModal({ cart, removeFromCart, setCartOpen }: any) {
  return (
    <div className="fixed flex flex-col justify-center items-center top-0 left-0 w-full h-full bg-gray-700 bg-opacity-50 z-20">
      <div className="flex flex-col justify-start items-center w-3/4 md:w-1/2 bg-white max-h-[80vh] overflow-y-auto p-6 rounded-lg shadow-lg">
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
        <Link
          className="bg-[var(--secondary-blue)] text-white py-2 px-4 rounded-md self-center"
          href="/checkout"
          aria-disabled={cart?.items?.length === 0 || !cart}
        >
          Proceed to Checkout
        </Link>
      </div>
    </div>
  );
}
