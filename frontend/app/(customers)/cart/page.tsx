import CartItems from "@/app/components/customers/cart/CartItems";
import Order from "@/app/components/customers/orders/Order";
import { getCart } from "@/app/lib/cart.server";

export default async function CartPage() {
  const data = await getCart();

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10">
        <CartItems cart={data?.cart} />
        {typeof data?.cart?.numItems === "number" && data.cart.numItems > 0 && (
          <Order />
        )}
      </div>
    </div>
  );
}
