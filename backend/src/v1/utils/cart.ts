import Cart from "../models/cart";
import CartItem from "../models/cartItem";

export async function recalculateCartTotal(cartId: string) {
  const items = await CartItem.find({ cartId });

  const total = items.reduce((sum, item) => sum + item.pricePerQuantity, 0);

  await Cart.findByIdAndUpdate(cartId, {
    totalPrice: total,
    numItems: items.length,
  });
}
