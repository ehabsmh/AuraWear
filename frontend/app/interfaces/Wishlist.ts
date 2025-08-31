import { IProduct } from "./Product";

export interface IWishlistItem {
  _id: string;
  userId: string;
  item: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IWishListItemResponse {
  _id: string;
  userId: string;
  item: IProduct;
  createdAt: Date;
  updatedAt: Date;
}
