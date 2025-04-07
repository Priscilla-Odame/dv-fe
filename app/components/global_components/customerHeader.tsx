import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { BsBagHeart } from "react-icons/bs";
import { CiMenuFries } from "react-icons/ci";
import { FiSearch, FiShoppingCart, FiUser } from "react-icons/fi";
import { MdCancel } from "react-icons/md";

export default function CustomerPageHeader({
  showSearch,
  searchQuery,
  setSearch,
  cart,
  setCart,
  siteMap,
  setCartOpen,
  wishlist,
  cartOpen,
}: any) {
  //component states
  const [showMenu, setShowMenu] = useState<boolean>(false);
  return (
    <>
      <nav className="w-full p-4 shadow-md bg-white fixed w-full top-0 z-10">
        <div className="mx-auto w-full flex flex-row justify-between items-center">
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

          <div className="w-max flex flex-row items-center gap-4 md:flex hidden">
            <div className="w-max gap-x-4">
              {siteMap.map((_linkItem: any, _idx: number) => (
                <Link
                  key={_idx}
                  href={_linkItem.link}
                  className="text-black text-base font-bold mr-4"
                >
                  {_linkItem.title}
                </Link>
              ))}
            </div>
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
          <button
            type="button"
            className="place-self-end py-1 px-1 border border-gray-200 rounded-full md:hidden block"
            onClick={() => setShowMenu(!showMenu)}
          >
            {showMenu ? (
              <MdCancel size={20} color="black" />
            ) : (
              <CiMenuFries size={20} color="black" />
            )}
          </button>
        </div>
      </nav>
      {showMenu && (
        <div className="z-50 w-[80%] fixed h-max bg-white opacity-98 top-16 right-0 flex flex-col justify-start items-end gap-y-4 py-4 pl-10 pr-4 rounded shadow-lg">
          {siteMap.map((_linkItem: any, _idx: number) => (
            <Link
              key={_idx}
              href={_linkItem.link}
              className="text-black text-sm font-bold mr-4"
            >
              {_linkItem.title}
            </Link>
          ))}

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
          <div className="w-full flex flex-row justify-between items-center gap-x-2">
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
      )}
    </>
  );
}
