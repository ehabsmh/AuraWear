import { IProduct } from "./Product";

export interface ICartItem {
  _id: string;
  cartId: string;
  productId: IProduct;
  productSlug: string;
  productName: string;
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

// export interface ICartDetails {
//   _id: string;
//   userId: string;
//   numItems: number;
//   totalPrice: number;
//   createdAt: Date;
//   updatedAt: Date;
//   __v: number;
//   items: any[];
//   id: string;
// }
