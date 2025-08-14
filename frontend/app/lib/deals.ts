import { AxiosError } from "axios";
import api from "../config/axios.config";
import IDeal from "../interfaces/Deal";

export async function fetchDeals() {
  try {
    const { data }: { data: IDeal[] } = await api.get("/deals");
    return data;
  } catch (error) {
    if (error instanceof AxiosError)
      throw new Error(error.response?.data.message);

    throw new Error("An error occurred while fetching deals");
  }
}
