"use client";

import { useAuth } from "@/app/context/AuthContext";
import { ICartItem } from "@/app/interfaces/Cart";
import { addToCart } from "@/app/lib/cart.client";
import { handleDeleteCartItem } from "@/app/lib/utils";
import { HeartPlus, Minus, Plus } from "lucide-react";
import React, { useState } from "react";
import { toast } from "sonner";

function AddToCart({
  cartItemPayload,
  isCartItem,
  setCartItems,
}: {
  cartItemPayload: {
    productId: string;
    variantIndex: number;
    sizeIndex: number;
  };
  isCartItem: ICartItem | undefined;
  setCartItems: React.Dispatch<React.SetStateAction<ICartItem[]>>;
}) {
  const { user } = useAuth();
  const [quantity, setQuantity] = useState(1);

  const handleIncrement = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleDecrement = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  const handleAddToCart = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (user) {
      try {
        const { cartItem } = await addToCart({ ...cartItemPayload, quantity });
        setCartItems((prev) => [...prev, cartItem]);
        toast.success("Item added to cart successfully!");
      } catch (error) {
        if (error instanceof Error) toast.error(error.message);
      }
    }
  };

  return (
    <div className="w-full flex items-center gap-4 mt-5">
      <form onSubmit={handleAddToCart} className="mt-5">
        <label
          htmlFor="quantity-input"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Choose quantity:
        </label>
        <div className="flex w-full gap-3">
          <div className="w-36 relative flex items-center">
            <button
              type="button"
              id="decrement-button"
              onClick={handleDecrement}
              disabled={quantity <= 1}
              className="cursor-pointer bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-s-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
            >
              <Minus className="text-gray-700" />
            </button>
            <input
              type="text"
              id="quantity-input"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="bg-gray-50 border-x-0 border-gray-300 h-11 text-center text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="1"
              required
            />
            <button
              type="button"
              id="increment-button"
              onClick={handleIncrement}
              className="cursor-pointer bg-gray-100 dark:bg-gray-700 dark:hover:bg-secondary dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-e-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
            >
              <Plus className="text-gray-700" />
            </button>
          </div>
          <div className="flex gap-4">
            {isCartItem ? (
              <button
                type="button"
                className="cursor-pointer bg-red-500 text-white px-4 py-2 rounded"
                onClick={() => handleDeleteCartItem(isCartItem, setCartItems)}
              >
                Remove from cart
              </button>
            ) : (
              <button
                type="submit"
                className="cursor-pointer bg-secondary-light text-white px-4 py-2 rounded hover:bg-secondary transition duration-150"
              >
                Add to Cart
              </button>
            )}

            <div className="flex items-center bg-gray-300 text-black gap-2 px-4 py-2 rounded hover:bg-gray-500 transition duration-150">
              <HeartPlus className="text-red-500" />
              <button>Wishlist</button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default AddToCart;
