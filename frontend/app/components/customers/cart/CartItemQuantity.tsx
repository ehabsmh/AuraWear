"use client";

import { ICartItem } from "@/app/interfaces/Cart";
import { updateCartItem } from "@/app/lib/cart.client";
import { Minus, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function CartItemQuantity({
  itemId,
  quantity,
  setItems,
}: {
  itemId: string;
  quantity: number;
  setItems: React.Dispatch<React.SetStateAction<ICartItem[]>>;
}) {
  const [qty, setQty] = useState(quantity);
  const [loading, setLoading] = useState(false);

  function incrementQuantity() {
    setQty((qty) => qty + 1);
  }

  function decrementQuantity() {
    setQty((qty) => (qty > 1 ? qty - 1 : 1));
  }

  const updateQuantity = async (newQty: number) => {
    setLoading(true);
    try {
      const cartItem = await updateCartItem(itemId, { quantity: newQty });

      setItems((prevItems) =>
        prevItems.map((item) =>
          item._id === itemId && cartItem ? cartItem : item
        )
      );
    } catch (error) {
      console.error("Failed to update quantity", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    updateQuantity(qty);
  }, [qty]);

  return (
    <div className="flex items-center gap-2">
      <button
        disabled={loading || qty <= 1}
        onClick={decrementQuantity}
        className="cursor-pointer p-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
      >
        <Minus size={16} />
      </button>
      <span>{qty}</span>
      <button
        disabled={loading}
        onClick={incrementQuantity}
        className="cursor-pointer p-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
      >
        <Plus size={16} />
      </button>
    </div>
  );
}
