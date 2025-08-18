import { AxiosError } from "axios";
import api from "../config/axios.config";
import { IOrder, IOrderPayload } from "../interfaces/Order";

export async function createOrder(payload: IOrderPayload) {
  // if (!data.paymentMethod) {
  //   data.paymentMethod = "cash"; // Default to cash if not specified
  // }
  console.log(payload);
  try {
    const { data } = await api.post("/orders", payload);
    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data.message);
    }

    throw new Error("Failed to create order. Please try again.");
  }
}

export async function removeOrderItem(orderId: string, itemId: string) {
  try {
    const { data }: { data: { message: string; order: IOrder } } =
      await api.delete(`/orders/${orderId}/items/${itemId}`);
    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data.message);
    }

    throw new Error("Failed to remove item. Please try again.");
  }
}
