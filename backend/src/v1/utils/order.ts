import axios from "axios";
import { IOrder } from "../interfaces/Order";

export async function createPaymobIntention(
  order: IOrder,
  userInfo: { firstName?: string; lastName?: string; email?: string }
) {
  try {
    const response = await axios.post(
      "https://accept.paymob.com/v1/intention/",
      {
        amount: order.total * 100, // بالقرش
        currency: "EGP",
        items: order.products.map((p) => ({
          name: p.name || "Unknown",
          amount: p.pricePerQuantity * 100,
          quantity: p.quantity,
        })),
        billing_data: {
          first_name: userInfo.firstName,
          last_name: userInfo.lastName,
          email: userInfo.email,
          phone_number: order.shippingInfo.phone,
          city: order.shippingInfo.city,
          street: order.shippingInfo.address,
          postal_code: order.shippingInfo.postalCode,
          country: "EG",
        },
        payment_methods: [Number(process.env.PAYMOB_INTEGRATION_ID)],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYMOB_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (err: any) {
    if (err.response?.data) {
      console.error("Paymob Intention Error:", err.response.data);
    } else {
      console.error("Paymob Intention Error:", err.message);
    }
    throw new Error("Failed to create Paymob intention");
  }
}
