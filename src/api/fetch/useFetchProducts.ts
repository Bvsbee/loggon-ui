import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const apiUrl = import.meta.env.VITE_API_BASE_URL;

const getProducts = async () => {
  const response = await axios.get(`${apiUrl}product`);
  return response.data;
};

export const useFetchProducts = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
    staleTime: 60000,
  });
};
