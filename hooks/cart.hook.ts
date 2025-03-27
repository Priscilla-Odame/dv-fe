import { BASE_URL } from "@/helpers/route";
import { addToCartFxn, removeFromCartFxn } from "@/helpers/storage/storage";
import axios from "axios";
import { nonAuthHeaders } from "./auth.hooks";

//add to cart
export const saveToRemoteCart = async (
  product: any,
  setCart: any,
  userId: string
) => {
  addToCartFxn(product, setCart);

  let body = {
    user: userId,
    item: {
      product: product?._id,
      quantity: product?.purchase_quantity,
    },
  };
  try {
    axios
      .post(`${BASE_URL}carts`, body, { headers: nonAuthHeaders })
      .then((resp) => {
        if (resp.status == 200) {
          console.log("remote cart updated");
        }
      })
      .then((err) => {
        console.log(err);
      });
  } catch {
    (error: Error) => {
      console.log("error", error);
    };
  }
};

//remove from cart
export const removeFromRemoteCart = async (product: any, setCart: any) => {
  removeFromCartFxn(product, setCart);
  alert("Product removed from cart successfully");
  let body = {
    product: product?._id,
  };
  try {
    axios
      .post(`${BASE_URL}carts`, body, { headers: nonAuthHeaders })
      .then((resp) => {
        if (resp.status == 200) {
          console.log(resp);
        }
      })
      .then((err) => {
        console.log(err);
      });
  } catch {
    (error: Error) => {
      console.log(error);
    };
  }
};
