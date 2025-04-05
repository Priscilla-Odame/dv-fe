import Image from "next/image";
import CustomerPageFooter from "./customerFooter";
import { FiSearch, FiShoppingCart, FiUser } from "react-icons/fi";
import Link from "next/link";
import CustomerPageHeader from "./customerHeader";
import CartModal from "./cart";

export default function CustomerPageWrapper({
  children,
  showSearch,
  searchQuery,
  setSearch,
  wishlist,
  cart,
  setCart,
  setCartOpen,
  cartOpen,
  removeFromCart,
}: any) {
  const siteMap = [
    { title: "Home", link: "/" },
    { title: "Shop", link: "/products" },
  ];
  return (
    <>
      {cartOpen && (
        <CartModal
          cart={cart}
          setCart={setCart}
          removeFromCart={removeFromCart}
          setCartOpen={setCartOpen}
        />
      )}
      <div className="min-h-screen w-[100vw] flex flex-col justify-start items-start overflow-y-auto">
        <CustomerPageHeader
          siteMap={siteMap}
          showSearch={showSearch}
          searchQuery={searchQuery}
          setSearch={setSearch}
          wishlist={wishlist}
          cart={cart}
          setCart={setCart}
          setCartOpen={setCartOpen}
          cartOpen={cartOpen}
        />
        <div className="flex flex-col justify-start items-center min-h-[90vh] gap-y-4 w-full bg-white">
          {children}
        </div>
        <CustomerPageFooter siteMap={siteMap} />
      </div>
    </>
  );
}
