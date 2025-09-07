export const dynamic = "force-dynamic";

import CartItems from "@/app/components/customers/cart/CartItems";
import { getCart } from "@/app/lib/cart.server";

export default async function CartPage() {
  const data = await getCart();

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10">
        <CartItems cart={data?.cart} />
      </div>
    </div>
  );
}
