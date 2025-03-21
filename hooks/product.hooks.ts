import { BASE_URL } from "@/helpers/route";
import { ProductFormData } from "@/types/product";
import axios from "axios";

export const getProductsFxn = async () => {
  let response = await axios
    .get(`${BASE_URL}/products/`)
    .then((resp) => {
      if (resp.status == 200) {
        // console.log("response>",response);
        console.log("resp>", resp);
      }
    })
    .then((err) => {
      console.log(err);
    });
};

export const addProductFxn = (body: ProductFormData) => {
  console.log("Body->>>", body);
  const getAuthHeaders = () => {
    const token = sessionStorage.getItem('a_c');
    return { headers: { Authorization: `Bearer ${token}` } };
  };
  Object.keys(body).forEach((key) => {
    if (body[key as keyof ProductFormData] === "") {
      delete body[key as keyof ProductFormData]; // Correctly delete the property
    }
  });

  let response = axios
    .post("http://localhost:3000/api/products/", body, getAuthHeaders())
    .then((resp) => {
      if (resp.status == 200) {
        // console.log(response);
        // window.location.href = "/auth/login";
      }
    })
    .then((err) => {
      console.log(err);
    });
};
