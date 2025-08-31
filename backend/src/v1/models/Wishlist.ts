import { model, Schema } from "mongoose";

const WishlistItemSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    item: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
  },
  { timestamps: true }
);

WishlistItemSchema.index({ userId: 1, item: 1 }, { unique: true });

const WishlistItem = model("Wishlist_Item", WishlistItemSchema);

export default WishlistItem;
