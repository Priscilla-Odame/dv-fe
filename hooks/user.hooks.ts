import axios from "axios";

export const getUserFxn = async () => {
    const getAuthHeaders = () => {
      const token = sessionStorage.getItem('a_c');
      return { headers: { Authorization: `Bearer ${token}` } };
    };
    let response = await axios
      .get("http://localhost:3000/api/users/profile/details", getAuthHeaders())

      return response.data;
  };