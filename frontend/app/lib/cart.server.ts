import { AxiosError } from "axios";
import { cookies } from "next/headers";
import api from "../config/axios.config";
import { ICartResponse } from "../interfaces/Cart";

export async function getCart() {
  try {
    const cookie = (await cookies()).get("Authorization")?.value;
    if (!cookie) return null;

    const { data }: { data: ICartResponse } = await api.get("/cart", {
      headers: { Cookie: `Authorization=${cookie}` },
    });

    return data;
  } catch (error) {
    if (error instanceof AxiosError)
      throw new Error(error.response?.data.message);

    throw new Error("Failed to fetch cart. Please try again.");
  }
}
