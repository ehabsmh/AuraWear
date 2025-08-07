export interface ICartItem {
  _id: string;
  cartId: string;
  productId: string;
  variantIndex: number;
  sizeIndex: number;
  quantity: number;
  price: number;
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
