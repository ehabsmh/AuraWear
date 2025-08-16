export interface IOrderPayload {
  paymentMethod: "cash" | "card";
  shippingInfo?: {
    address: string;
    city: string;
    postalCode: string;
    phone: string;
  };
}

export interface IOrder {
  _id: string;
  userId: string;

  cartId: string;

  products: {
    productId: string;
    name: string;
    price: number;
    pricePerQuantity: number;
    quantity: number;
    size: string;
    color: string;
    image: string;
  }[];

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
