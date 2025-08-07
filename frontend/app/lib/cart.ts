import { AxiosError } from "axios";
import { cookies } from "next/headers";
import api from "../config/axios.config";
import { ICartResponse } from "../interfaces/Cart";

export async function getCart() {
  try {
    const cookie = (await cookies()).get("Authorization")?.value;
    const { data }: { data: ICartResponse } = await api.get("/cart", {
      headers: { Cookie: `Authorization=${cookie}` },
    });

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
