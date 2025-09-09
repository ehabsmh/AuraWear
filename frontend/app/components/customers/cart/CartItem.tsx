"use client";

import { ICartItem } from "@/app/interfaces/Cart";
import Image from "next/image";
import CartItemQuantity from "./CartItemQuantity";
import { Delete } from "lucide-react";
import { handleDeleteCartItem } from "@/app/lib/utils";
import { useRouter } from "next/navigation";

function CartItem({
  item,
  setItems,
}: {
  item: ICartItem;
  setItems: React.Dispatch<React.SetStateAction<ICartItem[]>>;
}) {
  const variant = item.productId.variants.at(item.variantIndex);
  const size = variant?.sizes.at(item.sizeIndex);
  const router = useRouter();

  return (
    <div className="relative flex items-center gap-4 dark:bg-nav bg-white p-4 rounded-xl shadow">
      {size && (
        <>
          {size.stock > 0 ? (
            <p className="text-gray-500 absolute right-0 top-0 p-2 text-[0.65rem] md:text-sm rounded-full dark:bg-gray-500 bg-gray-200 flex items-center justify-center">
              <span className="font-semibold text-black">{size.stock}</span>
              <span className="mx-1 dark:text-gray-200">at stock</span>
            </p>
          ) : (
            <p className="text-gray-200 font-semibold absolute right-0 top-0 p-2 text-sm rounded-full bg-red-400 flex items-center justify-center">
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
        onClick={() => router.push(`/shop/${item.productId.slug}`)}
        className="md:w-24 md:h-24 w-16 h-16 object-cover rounded-lg cursor-pointer"
      />
      <div className="flex-1 text-sm md:text-base">
        <h3 className="font-semibold md:text-lg">{item.productId.name}</h3>
        <div className="flex gap-3">
          <p className="dark:text-gray-400  text-gray-500">
            ({variant?.color})
          </p>
          <p className="dark:text-gray-400 text-gray-500">({size?.size})</p>
        </div>
        <p className="dark:text-gray-300 text-gray-700">{item.price} EGP</p>
        <CartItemQuantity
          itemId={item._id}
          quantity={item.quantity}
          setItems={setItems}
        />
      </div>
      <div className="font-semibold text-sm md:text-lg">
        {item.pricePerQuantity} EGP
      </div>
    </div>
  );
}

export default CartItem;
