"use client";

import { ICartItem } from "@/app/interfaces/Cart";
import Image from "next/image";
import CartItemQuantity from "./CartItemQuantity";
import { Delete } from "lucide-react";
import { handleDeleteCartItem } from "@/app/lib/utils";
import Link from "next/link";

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
    <Link
      href={`/shop/${item.productId.slug}`}
      className="relative flex items-center gap-4 dark:bg-nav bg-white p-4 rounded-xl shadow cursor-pointer hover:bg-secondary-light/5 duration-150"
    >
      {size && (
        <>
          {size.stock > 0 ? (
            <p className="text-gray-500 absolute right-0 top-0 p-2 text-sm rounded-full dark:bg-gray-500 bg-gray-200 flex items-center justify-center">
              <span className="font-semibold text-black">{size.stock}</span>
              <span className="mx-1 dark:text-gray-300">at stock</span>
            </p>
          ) : (
            <p className="text-red-500 font-semibold absolute right-0 top-0 p-2 text-sm rounded-full bg-gray-200 flex items-center justify-center">
              Out of stock
            </p>
          )}
        </>
      )}
      <Delete
        onClick={() => handleDeleteCartItem(item, setItems)}
        className="text-red-500 hover:text-red-700 duration-150"
      />
      <Image
        width={96}
        height={96}
        src={item.productVariantImage}
        alt={`${item.productId.name} - ${variant?.color} - ${size?.size}`}
        className="w-24 h-24 object-cover rounded-lg"
      />
      <div className="flex-1">
        <h3 className="font-semibold text-lg">{item.productId.name}</h3>
        <div className="flex gap-3">
          <p className="dark:text-gray-400 text-gray-500">({variant?.color})</p>
          <p className="dark:text-gray-400 text-gray-500">({size?.size})</p>
        </div>
        <p className="dark:text-gray-300 text-gray-700">{item.price} EGP</p>
        <CartItemQuantity
          itemId={item._id}
          quantity={item.quantity}
          setItems={setItems}
        />
      </div>
      <div className="text-lg font-semibold">{item.pricePerQuantity} EGP</div>
    </Link>
  );
}

export default CartItem;
