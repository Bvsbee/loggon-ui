import { useMutation, useQueryClient } from "@tanstack/react-query";
import Product from "../../classses/Product";
import loggonAPI from "../api";

// Define the update function for the mutation
const updateProduct = async (updatedProduct: Product) => {
  const response = await loggonAPI.patch(
    `product/${updatedProduct.id}`,
    updatedProduct
  );
  return response.data; // Assuming you want to return the updated product data
};

// Use Mutation hook
const useUpdateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateProduct,
    onSuccess: () => {
      // Refetch the products list after successful update
      queryClient.invalidateQueries(["products"]);
    },
    onError: (error) => {
      console.error("Error updating product:", error);
    },
  });
};

export default useUpdateProduct;
