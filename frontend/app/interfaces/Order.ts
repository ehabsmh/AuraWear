export interface IOrderPayload {
  paymentMethod: "cash" | "card";
  shippingInfo?: {
    address: string;
    city: string;
    postalCode: string;
    phone: string;
  };
}

export interface IOrderItem {
  _id: string;
  productId: string;
  name: string;
  price: number;
  pricePerQuantity: number;
  quantity: number;
  size: string;
  color: string;
  image: string;
}

export interface IOrder {
  _id: string;
  userId: string;

  cartId: string;

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
}
