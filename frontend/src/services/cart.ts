import api from "@/config/axios.config";
import { ICartResponse } from "@/interfaces/Cart";
import { AxiosError } from "axios";

export async function getCart() {
  try {
    const { data }: { data: ICartResponse } = await api.get("/cart");
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
    if (error instanceof AxiosError) {
      console.log(error);
      throw new Error(
        error.response?.data.message ||
          "Failed to fetch cart. Please try again."
      );
    }
  }
}
