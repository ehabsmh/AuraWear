"use client";

import { ICartItem } from "@/app/interfaces/Cart";
import Image from "next/image";
import CartItemQuantity from "./CartItemQuantity";
import { Delete } from "lucide-react";
import { handleDeleteCartItem } from "@/app/lib/utils";

function CartItem({
  item,
  setItems,
}: {
  item: ICartItem;
  setItems: React.Dispatch<React.SetStateAction<ICartItem[]>>;
}) {
  const variant = item.productId.variants.at(item.variantIndex);
  const size = variant?.sizes.at(item.sizeIndex);

  return (
    <div className="relative flex items-center gap-4 bg-white p-4 rounded-xl shadow cursor-pointer hover:bg-secondary-light/5 duration-150">
      {size && (
        <p className="text-gray-500 absolute right-0 top-0 p-2 text-sm rounded-full bg-gray-200 flex items-center justify-center">
          <span className="text-black font-semibold">{size.stock}</span>
          <span className="mx-1">at stock</span>
        </p>
      )}
      <Delete
        onClick={() => handleDeleteCartItem(item, setItems)}
        className="text-red-500 hover:text-red-700 duration-150"
      />
      <Image
        width={96}
        height={96}
        src={item.productVariantImage}
        alt={`${item.productName}`}
        className="w-24 h-24 object-cover rounded-lg"
      />
      <div className="flex-1">
        <h3 className="font-semibold text-lg">{item.productId.name}</h3>
        <div className="flex gap-3">
          <p className="text-gray-500">({variant?.color})</p>
          <p className="text-gray-500">({size?.size})</p>
        </div>
        <p className="text-gray-700">${item.price}</p>
        <CartItemQuantity
          itemId={item._id}
          quantity={item.quantity}
          setItems={setItems}
        />
      </div>
      <div className="text-lg font-semibold">${item.pricePerQuantity}</div>
    </div>
  );
}

export default CartItem;
