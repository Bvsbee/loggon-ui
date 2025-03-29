import axios from "axios";

const apiUrl = import.meta.env.VITE_API_BASE_URL;

export const getProducts = async () => {
  const response = await axios.get(`${apiUrl}product`);
  return response.data;
};
