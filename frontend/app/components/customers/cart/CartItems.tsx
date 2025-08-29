"use client";

import { ICartItem, ICartResponse } from "@/app/interfaces/Cart";
import CartItem from "./CartItem";
import { useState } from "react";
import Order from "../orders/Order";

export default function CartItems({ cart }: { cart?: ICartResponse["cart"] }) {
  const [items, setItems] = useState<ICartItem[]>(cart?.items || []);

  const totalItems = items.length || 0;
  const totalPrice = items.reduce(
    (acc, item) => acc + item.pricePerQuantity,
    0
  );

  return (
    <>
      <div className="md:col-span-2 space-y-6 h-[80vh] overflow-y-auto p-3">
        <h2 className="text-3xl font-bold">Shopping Cart</h2>
        <p className="dark:text-gray-300 text-gray-600">
          Total Items: {totalItems}
        </p>

        {items.map((item, index) => (
          <CartItem key={index} item={item} setItems={setItems} />
        ))}
      </div>
      {typeof cart?.numItems === "number" && cart.numItems > 0 && (
        <Order totalPrice={totalPrice} />
      )}
    </>
  );
}
