import { BASE_URL } from '@/helpers/route';
import { addToCartFxn, loadCartNoSet } from '@/helpers/storage/storage';
import axios from 'axios';
import { getAuthHeaders } from './auth.hooks';

export const saveToRemoteCart = async (product: any, setCart: any, userId: string) => {
//   Object.keys(body).forEach((key) => {
//     if (body[key as keyof SignUpFormData] === "") {
//       delete body[key as keyof SignUpFormData]; // Correctly delete the property
//     }
//   });
    let storageCart = await loadCartNoSet();
    await addToCartFxn(product, setCart);
    const structuredItems = [...storageCart, product].map((_product) => {
        return {
            product: _product?._id,
            quantity: _product?.purchase_quantity
        }
    });

    let body = {
        user: userId,
        items: structuredItems,
        totalAmount: 6.0
    };
    let response = axios
        .post(`${BASE_URL}carts`, body, getAuthHeaders())
        .then((resp) => {
        // if (resp.status == 200) {
        //     console.log(response);
        //     window.location.href = "/auth/login";
        // }
        })
        .then((err) => {
        console.log(err);
        });
}