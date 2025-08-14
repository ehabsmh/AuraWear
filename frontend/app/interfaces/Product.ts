export interface ISize {
  size: string;
  stock: number;
  code: string;
}

export interface IVariant {
  color: string;
  colorCode: string;
  sizes: ISize[];
  images: string[];
  mainImage: string;
}

export interface IProduct {
  _id: string;
  name: string;
  slug: string;
  shortDescription?: string;
  longDescription?: string;
  sex: "male" | "female";
  price: number;
  discountPrice?: number;
  categoryId: string;
  subcategoryId: string;
  mainImage: string;
  variants: IVariant[];
  sold?: number;
}

export interface IProductResponse {
  products: IProduct[];
  totalItems: number;
  totalPages: number;
  page: number;
  limit: number;
}
