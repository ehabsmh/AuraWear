import { Document, model, Schema, Types } from "mongoose";
import Product from "./product";
import AppError, { ErrorName } from "../service/error";
import { recalculateCartTotal } from "../utils/cart";

export interface ICartItem extends Document {
  cartId: Types.ObjectId;
  productId: Types.ObjectId;
  variantIndex: number;
  sizeIndex: number;
  quantity: number;
  price: number;
}

export const CartItemSchema = new Schema<ICartItem>({
  cartId: {
    type: Schema.Types.ObjectId,
    ref: "Cart",
  },
  productId: {
    type: Schema.Types.ObjectId,
    ref: "Product",
  },
  variantIndex: { type: Number },
  sizeIndex: { type: Number },
  quantity: { type: Number },
  price: { type: Number, default: 0 },
});

// Prevent duplicate product-variant-size in the same cart
CartItemSchema.index(
  { cartId: 1, productId: 1, variantIndex: 1, sizeIndex: 1 },
  { unique: true }
);

// Pre-save: validate product data and calculate price
CartItemSchema.pre("save", async function (next) {
  const item = this;

  const product = await Product.findById(item.productId);
  if (!product)
    throw new AppError("Product not found", ErrorName.NotFoundError);

  const variant = product.variants[item.variantIndex];
  if (!variant)
    throw new AppError("Invalid variant index", ErrorName.ValidationError);

  const size = variant.sizes[item.sizeIndex];
  if (!size)
    throw new AppError("Invalid size index", ErrorName.ValidationError);

  if (item.quantity <= 0)
    throw new AppError("Quantity must be positive", ErrorName.ValidationError);

  if (item.quantity > size.stock)
    throw new AppError("Not enough stock", ErrorName.ValidationError);

  item.price = product.discountPrice
    ? product.discountPrice * item.quantity
    : product.price * item.quantity;

  next();
});

// After adding a cart item
CartItemSchema.post("save", async function (doc) {
  await recalculateCartTotal(doc.cartId.toString());
});

// After deleting a cart item
CartItemSchema.post("findOneAndDelete", async function (doc) {
  if (doc) {
    await recalculateCartTotal(doc.cartId.toString());
  }
});

const CartItem = model<ICartItem>("Cart_Item", CartItemSchema);

export default CartItem;
