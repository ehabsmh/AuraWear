import { Schema, Types } from "mongoose";

export interface ISize {
  size: string;
  stock: number;
  code: string;
}

export interface IVariant {
  color: string;
  sizes: ISize[];
  images: string[];
  mainImage: string;
}

export interface IProduct {
  name: string;
  slug: string;
  shortDescription?: string;
  longDescription?: string;
  sex: "male" | "female";
  price: number;
  discountPrice?: number;
  categoryId: Schema.Types.ObjectId;
  subcategoryId: Schema.Types.ObjectId;
  mainImage?: string;
  variants: IVariant[];
  sold?: number;
}
