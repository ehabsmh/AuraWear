import api from "../config/axios.config";
import { ICategory } from "../interfaces/Category";

type ParamsType = {
  sex: "male" | "female";
};
export async function fetchCategories(params: ParamsType | object = {}) {
  try {
    const { data }: { data: ICategory[] } = await api.get("/categories", {
      params,
    });

    return data;
  } catch (error) {
    throw error;
  }
}
