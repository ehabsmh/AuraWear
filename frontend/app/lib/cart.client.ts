/*@typescript-eslint/no-explicit-any*/

import { AxiosError } from "axios";
import { ICartItem } from "../interfaces/Cart";
import api from "../config/axios.config";

export async function addToCart(item: {
  productId: string;
  variantIndex: number;
  sizeIndex: number;
  quantity: number;
}): Promise<{ message: string; cartItem: ICartItem }> {
  try {
    const { data }: { data: { message: string; cartItem: ICartItem } } =
      await api.post("/cart", item);
    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data.message);
    }

    throw new Error("Failed to add item to cart.");
  }
}

export async function updateCartItem(
  itemId: ICartItem["_id"],
  payload: Partial<ICartItem>
) {
  try {
    const { data }: { data: { message: string; cartItem: ICartItem } } =
      await api.patch(`/cart/${itemId}`, payload);

    return data.cartItem;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(
        error.response?.data.message ||
          "Failed to update cart. Please try again."
      );
    }
  }
}

export async function removeCartItem(itemId: ICartItem["_id"]) {
  try {
    const { data }: { data: { message: string; cartItem: ICartItem } } =
      await api.delete(`/cart/${itemId}`);

    return data.message;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(
        error.response?.data.message ||
          "Failed to update cart. Please try again."
      );
    }

    throw new Error("Failed to remove cart item. Please try again.");
  }
}
