import api from "@/config/axios.config";
import { IProductResponse } from "@/interfaces/Product";

export async function fetchProducts(queryParams = {}) {
  try {
    const { data }: { data: IProductResponse } = await api.get("/products", {
      params: queryParams,
    });

    console.log("Fetched products:", data.products);
    return data;
  } catch (error) {
    throw error;
  }
}
