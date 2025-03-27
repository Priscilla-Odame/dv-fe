import Image from "next/image";
import Link from "next/link";
import { BsBagHeart } from "react-icons/bs";
import { FiSearch, FiShoppingCart, FiUser } from "react-icons/fi";

export default function CustomerPageHeader({
  showSearch,
  searchQuery,
  setSearch,
  cart,
  setCartOpen,
  wishlist,
  cartOpen,
}: any) {
  return (
    <nav className="w-full p-4 shadow-md bg-white fixed w-full top-0 z-10">
      <div className="container mx-auto flex justify-between items-center">
        <Link href={"/"} className="w-max flex flex-row items-center gap-x-2">
          <Image
            width={1024}
            height={1024}
            src={"/trademarks/logo.png"}
            alt="logo"
            className="w-10 h-10"
          />
          <h4 className="lg:text-xl text-sm font-bold">DV Unlimited</h4>
        </Link>
        <div className="flex flex-row items-center gap-4">
          {showSearch && (
            <div className="bg-white border border-gray-100 rounded-md flex flex-row gap-x-2 px-3 py-1 ">
              <FiSearch className="text-gray-600 text-xl cursor-pointer" />
              <input
                type="text"
                placeholder="Search..."
                className="bg-transparent border-none outline-none"
                value={searchQuery}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          )}

          <div className="flex flex-col w-max h-max">
            <span className="opacity-90 z-20 relative top-0 right-[-1rem] mb-[-50%] text-xs bg-red-500 text-white rounded-full px-2 py-1 text-center">
              {cart?.items?.length ?? 0}
            </span>
            <FiShoppingCart
              className="text-gray-600 cursor-pointer m-0 top-[-0.25rem] relative"
              size={25}
              onClick={() => setCartOpen(!cartOpen)}
            />
          </div>

          <div className="flex flex-col w-max h-max">
            <span className="opacity-90 z-20 relative top-0 right-[-1rem] mb-[-50%] text-xs bg-red-500 text-white rounded-full px-2 py-1 text-center">
              {wishlist?.length ?? 0}
            </span>
            <BsBagHeart
              className="text-gray-600 cursor-pointer m-0 top-[-0.25rem] relative"
              size={25}
            />
          </div>

          <Link href="/auth/login">
            <FiUser className="text-gray-600 cursor-pointer" size={25} />
          </Link>
        </div>
      </div>
    </nav>
  );
}
