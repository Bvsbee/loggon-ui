import loggonAPI from "../api";

const cartCheckout = async (userId: string) => {
  try {
    const res = await loggonAPI.post(`/cart/orderComplete?userId=${userId}`);

    return res.data;
  } catch (error: any) {
    console.error(
      "Error fetching cart Items:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export default cartCheckout;
