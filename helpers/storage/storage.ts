import { defaultCart, ICart } from "@/types/istorage";

//cart related methods
export const addToCartFxn = (product: any, setCart: any) => {
  if (typeof window !== undefined || typeof window !== "undefined") {
    const storedCart: any = localStorage.getItem("dv_cart");
    let parsedCart: ICart = storedCart ? JSON.parse(storedCart) : defaultCart;

    //cart items
    let cartItems: Array<any> = parsedCart.items;
    let newCartItems = [...cartItems, product];

    // cart amount
    let cartAmount: any = parseFloat(parsedCart.totalAmount + product.price);

    let newCart = {
      items: newCartItems,
      totalAmount: cartAmount,
    };
    localStorage.setItem("dv_cart", JSON.stringify(newCart));
    setCart(newCart);
  }
};

export const removeFromCartFxn = (product: any, setCart: any) => {
  if (typeof window !== undefined || typeof window !== "undefined") {
    const storedCart: any = localStorage.getItem("dv_cart");
    let parsedCart: ICart = storedCart ? JSON.parse(storedCart) : defaultCart;
    let cartItems: Array<any> = parsedCart.items;
    let cartAmount: any = parsedCart.totalAmount;

    //selected item
    let selectedItem = cartItems.find((_prod) => _prod._id === product._id);
    console.log("selectedItem", selectedItem);

    //new cart items
    let newCartItems = cartItems.filter(
      (_product: any) => _product._id !== selectedItem._id
    );

    // cart amount
    let newCartAmount: any =
      cartAmount - selectedItem.purchase_quantity * selectedItem.price;

    let newCart = {
      items: newCartItems,
      totalAmount: newCartAmount,
    };

    localStorage.setItem("dv_cart", JSON.stringify(newCart));
    setCart(newCart);
  }
};

export const updateCartItemQuantityFxn = (
  product: any,
  setCart: any,
  action: string
) => {
  if (typeof window !== undefined || typeof window !== "undefined") {
    const storedCart: any = localStorage.getItem("dv_cart");
    let parsedCart: ICart = storedCart ? JSON.parse(storedCart) : defaultCart;
    let cartItems: Array<any> = parsedCart.items;
    let cartAmount: number = parsedCart.totalAmount;

    //selected item
    let selectedItem = cartItems.find((_prod) => _prod._id === product._id);
    console.log("selectedItem", selectedItem);

    //new cart items
    let newCartItems = cartItems.filter(
      (_product: any) => _product._id !== selectedItem._id
    );

    let updatedCartItems = [product, ...newCartItems];

    // cart amount
    cartAmount =
      action == "inc"
        ? parseFloat(parsedCart.totalAmount + product.price)
        : Number(parsedCart.totalAmount - product.price);

    let newCart = {
      items: updatedCartItems,
      totalAmount: cartAmount,
    };

    localStorage.setItem("dv_cart", JSON.stringify(newCart));
    setCart(newCart);
  }
};

export const loadCart = (setCart: any) => {
  if (typeof window !== undefined || typeof window !== "undefined") {
    const storedCart: any = localStorage.getItem("dv_cart");
    let parsedCart: ICart = storedCart ? JSON.parse(storedCart) : [];

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

//wishlist related methods
export const addToWishlistFxn = (product: any, setWishlist: any) => {
  if (typeof window !== undefined || typeof window !== "undefined") {
    const storedWishlist: any = localStorage.getItem("dv_wishlist");
    let parsedWishlist = storedWishlist ? JSON.parse(storedWishlist) : [];

    let updatedWishlist: any = [...parsedWishlist, product];
    localStorage.setItem("dv_wishlist", JSON.stringify(updatedWishlist));
    setWishlist(updatedWishlist);
  }
};

export const removeFromWishlistFxn = (product: any, setWishlist: any) => {
  if (typeof window !== undefined || typeof window !== "undefined") {
    const storedCart: any = localStorage.getItem("dv_wishlist");
    let parsedWishlist: Array<any> = storedCart ? JSON.parse(storedCart) : [];
    let trimmedWishlist = parsedWishlist.filter(
      (_product) => _product._id !== product._id
    );
    localStorage.setItem("dv_wishlist", JSON.stringify(trimmedWishlist));
    setWishlist(trimmedWishlist);
  }
};

export const loadWishListFxn = (setWishlist: any) => {
  if (typeof window !== undefined || typeof window !== "undefined") {
    const storedWishlist: any = localStorage.getItem("dv_wishlist");
    let parsedWishlist = storedWishlist ? JSON.parse(storedWishlist) : [];
    setWishlist(parsedWishlist);
  }
};
