import Product from "./ProductModel";
import { UserModel } from "./UserModel";

export default interface Cart {
  id: string;

  user: UserModel;

  items: CartItem[];

  createdAt: Date;

  updatedAt: Date;
}

export interface CartItem {
  id: string;

  cart: Cart;

  product: Product;

  quantity: number;
}
