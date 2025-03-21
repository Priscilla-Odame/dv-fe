import { BASE_URL } from "@/helpers/route";
import axios from "axios";

export const getUserFxn = async () => {
    const getAuthHeaders = () => {
      const token = sessionStorage.getItem('a_c');
      return { headers: { Authorization: `Bearer ${token}` } };
    };
    let response = await axios
      .get(`${BASE_URL}users/profile/details`, getAuthHeaders())

      return response.data;
  };