// import { getCurrentUser } from "@/app/_lib/currentUser";

import CartItems from "@/app/components/customers/cart/CartItems";
import { getCart } from "@/app/lib/cart";

export default async function CartPage() {
  // const user = await getCurrentUser();

  const cart = await getCart();

  return <CartItems cart={cart} />;
}
