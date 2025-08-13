import api from "../config/axios.config";
import { IProduct, IProductResponse } from "../interfaces/Product";

export async function fetchProducts(queryParams = {}) {
  try {
    const { data }: { data: IProductResponse | IProduct } = await api.get(
      "/products",
      {
        params: queryParams,
      }
    );

    return data;
  } catch (error) {
    throw error;
  }
}

export async function fetchNewArrivals() {
  try {
    const { data }: { data: IProduct[] } = await api.get("/products/latest");

    return data;
  } catch (error) {
    throw error;
  }
}
