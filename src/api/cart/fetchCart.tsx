import { UserModel } from "../../utils/models/UserModel";
import loggonAPI from "../api";

const fetchCart = async (userId: string | undefined) => {
  try {
    const response = await loggonAPI.get(`/cart?userId=${userId}`);

    return response.data.items;
  } catch (error: Error) {
    console.error(
      "Error fetching cart Items:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export default fetchCart;
