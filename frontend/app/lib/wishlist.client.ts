import { AxiosError } from "axios";
import api from "../config/axios.config";
import { IWishlistItem, IWishListItemResponse } from "../interfaces/Wishlist";

export async function checkItemExistence(productId: string) {
  try {
    const { data }: { data: null | { _id: string } } = await api.get(
      "/wishlist/item",
      {
        params: { productId },
      }
    );
    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(
        error.response?.data.message ||
          "Failed to fetch cart. Please try again."
      );
    }

    throw new Error("Failed to fetch wishlist.");
  }
}

export async function deleteWishlistItem(itemId: string) {
  try {
    const { data }: { data: { message: string } } = await api.delete(
      `/wishlist/${itemId}`
    );
    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data.message);
    }

    throw new Error("Failed to delete wishlist item. Please try again.");
  }
}

export async function addWishlistItem(productId: string) {
  try {
    const { data }: { data: { message: string; item: IWishlistItem } } =
      await api.post("/wishlist", { productId });
    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data.message);
    }

    throw new Error("Failed to add wishlist item. Please try again.");
  }
}

export async function fetchWishlist() {
  try {
    const { data }: { data: IWishListItemResponse[] } = await api.get(
      "/wishlist/items"
    );
    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data.message);
    }

    throw new Error("Failed to add wishlist item. Please try again.");
  }
}
