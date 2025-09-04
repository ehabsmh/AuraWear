import { IProduct } from "./Product";

export interface ICartItem {
  _id: string;
  cartId: string;
  productId: IProduct;
  variantIndex: number;
  sizeIndex: number;
  productVariantImage: string;
  quantity: number;
  price: number;
  pricePerQuantity: number;
  __v: number;
}

export interface ICart {
  _id: string;
  userId: string;
  numItems: number;
  totalPrice: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICartResponse {
  message: string;
  cart: ICart & {
    items: ICartItem[];
  };
}
