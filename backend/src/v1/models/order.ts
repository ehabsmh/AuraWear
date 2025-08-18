import { Schema, model, Types } from "mongoose";

// ----------- Subdocument: Ordered Product Snapshot -----------
const OrderedProductSchema = new Schema({
  productId: { type: Types.ObjectId, ref: "Product" },
  name: String,
  price: Number,
  pricePerQuantity: Number,
  quantity: Number,
  size: String,
  color: String,
  image: String,
});

// ----------- Subdocument: Shipping Address Info -----------
const shippingAddressInfoSchema = new Schema(
  {
    address: String,
    postalCode: String,
    city: String,
    phone: String,
  },
  { _id: false }
);

// ----------- Main Order Schema -----------
const OrderSchema = new Schema(
  {
    userId: { type: Types.ObjectId, ref: "User", required: true },

    cartId: { type: Types.ObjectId, ref: "Cart", required: true },

    products: [OrderedProductSchema],

    shippingInfo: shippingAddressInfoSchema,

    paymentMethod: {
      type: String,
      enum: ["Cash", "Card"],
      default: "Cash",
    },
    paymentStatus: {
      type: String,
      enum: ["Pending", "Paid", "Failed"],
      default: "Pending",
    },

    orderStatus: {
      type: String,
      enum: ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"],
      default: "Pending",
    },

    total: Number,

    shippedAt: Date,
    deliveredAt: Date,
  },
  { timestamps: true }
);

const Order = model("Order", OrderSchema);
export default Order;
