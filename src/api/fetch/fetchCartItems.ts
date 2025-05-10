import axios from "axios";
import loggonAPI from "../api";
import { UserModel } from "../../utils/models/UserModel";

export const getCart = async (user: UserModel) => {
  const response = await axios.get(`${loggonAPI}/cart`, {
    headers: {
        
    }

  
  });
  return response.data;
};
