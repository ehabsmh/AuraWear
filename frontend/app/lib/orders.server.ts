import { cookies } from "next/headers";
import api from "../config/axios.config";
import { AxiosError } from "axios";
import { IOrder } from "../interfaces/Order";

export async function fetchOrders() {
  try {
    const cookie = (await cookies()).get("Authorization")?.value;
    if (!cookie) return null;
    const { data }: { data: { message: string; orders: IOrder[] } } =
      await api.get("/orders", {
        headers: { Cookie: `Authorization=${cookie}` },
      });
    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data.message);
    }

    throw new Error("Failed to fetch orders. Please try again.");
  }
}
