import { UserModel } from "../../utils/models/UserModel";
import loggonAPI from "../api";

const addToCart = async ({
  user,
  id,
  quantity,
}: {
  user: UserModel | null;
  id: string;
  quantity: number;
}) => {
  try {
    console.log("ProductID: ", id);
    console.log("User id", user?.id);

    if (!user?.id) {
      return "Need a user";
    }

    const userId: string = user?.id;
    const response = await loggonAPI.post("/cart", {
      userId: userId,
      productId: id,
      quantity: quantity,
    });

    return response.data;
  } catch (error: Error) {
    console.error(
      "Error adding to cart:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export default addToCart;
