export const addToCartFxn = (product: any, setCart: any) => {
  if (typeof window !== undefined || typeof window !== "undefined") {
    const storedCart: any = localStorage.getItem("dv_cart");
    let parsedCart = storedCart ? JSON.parse(storedCart) : [];
    // let trimmedProducts = parsedCart.filter(
    //   (_product: any) => product !== product
    // );
    let updatedCart: any = [...parsedCart, product];
    localStorage.setItem("dv_cart", JSON.stringify(updatedCart));
    setCart(updatedCart);
  }
};

export const addToWishlistFxn = (product: any, setWishlist: any) => {
  if (typeof window !== undefined || typeof window !== "undefined") {
    const storedWishlist: any = localStorage.getItem("dv_wishlist");
    let parsedWishlist = storedWishlist ? JSON.parse(storedWishlist) : [];

    let updatedWishlist: any = [...parsedWishlist, product];
    localStorage.setItem("dv_wishlist", JSON.stringify(updatedWishlist));
    setWishlist(updatedWishlist);
  }
};

export const loadCart = (setCart: any) => {
  if (typeof window !== undefined || typeof window !== "undefined") {
    const storedCart: any = localStorage.getItem("dv_cart");
    let parsedCart = storedCart ? JSON.parse(storedCart) : [];
    setCart(parsedCart);
  }
};

export const loadCartNoSet = () => {
  if (typeof window !== undefined || typeof window !== "undefined") {
    const storedCart: any = localStorage.getItem("dv_cart");
    let parsedCart = storedCart ? JSON.parse(storedCart) : [];
    return parsedCart;
  }
};