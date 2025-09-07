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

export async function getColors(filter: {
  sex?: string;
  categoryId?: string;
  subcategoryId?: string;
}) {
  try {
    const {
      data,
    }: { data: { color: string; colorCode: string; count: number }[] } =
      await api.get("/products/colors", {
        params: filter,
      });
    return data;
  } catch (error) {
    throw error;
  }
}
