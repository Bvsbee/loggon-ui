import axios from "axios";
import Product from "../../utils/models/ProductModel";

const apiUrl = import.meta.env.VITE_API_BASE_URL;

export const addProduct = async (productData: Product) => {
  const response = await axios.post(`${apiUrl}product`, productData);
  console.log(response.data);
  return response.data;
};
