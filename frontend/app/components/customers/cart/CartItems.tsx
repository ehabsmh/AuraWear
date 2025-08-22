"use client";

import { ICartItem, ICartResponse } from "@/app/interfaces/Cart";
import CartItem from "./CartItem";
import { useState } from "react";

export default function CartItems({ cart }: { cart?: ICartResponse["cart"] }) {
  const [items, setItems] = useState<ICartItem[]>(cart?.items || []);

  const totalItems = items.length || 0;
  const totalPrice = items.reduce(
    (acc, item) => acc + item.pricePerQuantity,
    0
  );

  return (
    <div className="md:col-span-2 space-y-6 h-[80vh] overflow-y-auto">
      <h2 className="text-3xl font-bold">Shopping Cart</h2>
      <p className="text-gray-600">Total Items: {totalItems}</p>

      {items.map((item, index) => (
        <CartItem key={index} item={item} setItems={setItems} />
      ))}

      <div className="text-right font-bold text-2xl">
        Total: ${totalPrice?.toFixed(2)}
      </div>
    </div>
  );
}
