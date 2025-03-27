import { BASE_URL } from "@/helpers/route";
import axios from "axios";

export const getUserFxn = async () => {
  const getAuthHeaders = () => {
    const token = sessionStorage.getItem("a_c");
    return { headers: { Authorization: `Bearer ${token}` } };
  };
  let response = await axios.get(
    `${BASE_URL}users/profile/details`,
    getAuthHeaders()
  );

  return response.data;
};

export const getUserData = async () => {
  if (typeof window !== undefined || typeof window !== "undefined") {
    let user: any = sessionStorage.getItem("u_d");
    let parsedUser = JSON.parse(user);

    return parsedUser;
  }
};
