"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Trash2 } from "lucide-react";
import { IWishListItemResponse } from "@/app/interfaces/Wishlist";
import { deleteWishlistItem, fetchWishlist } from "@/app/lib/wishlist.client";
import { toast } from "sonner";

export default function WishlistClient() {
  const [items, setItems] = useState<IWishListItemResponse[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWishlist().then((data) => {
      setItems(data);
      setLoading(false);
    });
  }, []);

  async function handleRemove(id: string) {
    try {
      await deleteWishlistItem(id);
      setItems((prev) => prev.filter((item) => item._id !== id));
      toast.success("Item removed from wishlist");
    } catch (error) {
      toast.error("Failed to remove item from wishlist");
    }
  }

  if (loading) return null;

  if (items.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500 dark:text-gray-400">
        <p className="text-lg">Your wishlist is empty ✨</p>
        <Link
          href="/shop"
          className="mt-4 inline-block px-6 py-3 bg-secondary text-white rounded-2xl hover:opacity-90 transition"
        >
          Go Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {items.map(({ _id, item }) => (
        <motion.div
          key={_id}
          whileHover={{ scale: 1.02 }}
          className="bg-card rounded-2xl shadow-md overflow-hidden relative group"
        >
          <Link href={`/shop/${item.slug}`}>
            <div className="relative w-full min-h-[450px]">
              <Image
                src={item.mainImage}
                alt={item.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-4">
              <h2 className="font-semibold text-lg truncate">{item.name}</h2>
              <p className="text-secondary font-bold mt-2">{item.price} EGP</p>
            </div>
          </Link>

          {/* Remove button */}
          <button
            onClick={() => handleRemove(_id)}
            className="cursor-pointer absolute top-3 right-3 bg-white dark:bg-dark rounded-full p-2 shadow-md opacity-0 group-hover:opacity-100 transition"
          >
            <Trash2 className="h-5 w-5 text-red-500" />
          </button>
        </motion.div>
      ))}
    </div>
  );
}
