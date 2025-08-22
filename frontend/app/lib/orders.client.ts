import { AxiosError } from "axios";
import api from "../config/axios.config";
import { IOrder, IOrderPayload } from "../interfaces/Order";

export async function createOrder(payload: IOrderPayload) {
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

export async function createPaymobIntention(payload: IOrderPayload) {
  try {
    const { data } = await api.post("/orders/paymob-intention", payload);
    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data.message);
    }

    throw new Error("Failed to create Paymob intention. Please try again.");
  }
}
