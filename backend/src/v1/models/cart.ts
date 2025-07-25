import mongoose, { Schema, Document, Types } from "mongoose";

export interface ICart extends Document {
  userId: mongoose.Types.ObjectId;
  numItems: number;
  totalPrice: number;
  createdAt: Date;
  updatedAt: Date;
}

const CartSchema = new Schema<ICart>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true, // Ensure one cart per user
    },
    numItems: { type: Number, default: 0 },
    totalPrice: { type: Number, default: 0 },
  },
  { timestamps: true }
);

CartSchema.virtual("items", {
  ref: "Cart_Item",
  localField: "_id",
  foreignField: "cartId",
});

CartSchema.set("toJSON", { virtuals: true });
CartSchema.set("toObject", { virtuals: true });

const Cart = mongoose.model<ICart>("Cart", CartSchema);
export default Cart;
