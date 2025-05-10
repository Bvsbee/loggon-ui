import axios from "axios";

const apiUrl = import.meta.env.VITE_API_BASE_URL;

export const getCategories = async () => {
  const response = await axios.get(`${apiUrl}category`);
  return response.data;
};
