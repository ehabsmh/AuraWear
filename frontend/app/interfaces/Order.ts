export interface IOrderPayload {
  paymentMethod: "cash" | "card";
  shippingInfo?: {
    address: string;
    city: string;
    postalCode: string;
    phone: string;
  };
}
