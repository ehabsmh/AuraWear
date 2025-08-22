import { Schema } from "mongoose";

export interface IOrderItem {
  _id: Schema.Types.ObjectId;
  productId: Schema.Types.ObjectId;
  name: string;
  price: number;
  pricePerQuantity: number;
  quantity: number;
  size: string;
  color: string;
  image: string;
}

export interface IOrder {
  _id: Schema.Types.ObjectId;
  userId: Schema.Types.ObjectId;
  cartId: Schema.Types.ObjectId;

  products: IOrderItem[];

  shippingInfo: {
    address: string;
    city: string;
    postalCode: string;
    phone: string;
  };

  paymentMethod: string;
  paymentStatus: string;

  orderStatus: string;

  total: number;

  shippedAt: Date;
  deliveredAt: Date;
  createdAt: string;
  paymobOrderId: number;
}
