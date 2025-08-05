import CartItems from "@/app/_components/customers/cart/CartItems";
// import { getCurrentUser } from "@/app/_lib/currentUser";
import { getCart } from "@/services/cart";

export default async function CartPage() {
  // const user = await getCurrentUser();

  const cart = await getCart();

  return <CartItems cart={cart} />;
}
