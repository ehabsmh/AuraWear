import api from "@/config/axios.config";
import { ISubcategory } from "@/interfaces/Subcategory";

export async function fetchSubcategories(query: {
  sex?: string;
  category?: string;
}) {
  try {
    if (!query) return [];
    const { data }: { data: ISubcategory[] } = await api.get("/subcategories", {
      params: query,
    });

    return data;
  } catch (error) {
    return [];
  }
}
