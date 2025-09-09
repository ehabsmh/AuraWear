import { useAuth } from "@/app/context/AuthContext";
import {
  addWishlistItem,
  checkItemExistence,
  deleteWishlistItem,
} from "@/app/lib/wishlist.client";
import { HeartMinus, HeartPlus } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

function AddToWishlist({ productId }: { productId: string }) {
  const [itemExists, setItemExists] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { user } = useAuth();

  async function handleDelete() {
    try {
      if (itemExists) {
        const { message } = await deleteWishlistItem(itemExists);
        setItemExists(null);
        toast.success(message);
      }
    } catch (error) {
      if (error instanceof Error) toast.error(error.message);
    }
  }

  async function handleAdd() {
    try {
      const { message, item } = await addWishlistItem(productId);
      setItemExists(item._id);
      toast.success(message);
    } catch (error) {
      if (error instanceof Error) toast.error(error.message);
    }
  }

  useEffect(() => {
    async function checkExistence() {
      setIsLoading(true);
      try {
        const item = await checkItemExistence(productId);
        return item;
      } catch {
        return null;
      } finally {
        setIsLoading(false);
      }
    }

    const checkItem = async () => {
      const exists = await checkExistence();
      setItemExists(exists?._id || null);
    };

    if (user) {
      checkItem();
    }
  }, [user, productId]);

  return (
    <>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="inline-block">
          {itemExists ? (
            <div
              onClick={handleDelete}
              className=" flex items-center bg-gray-300 text-black gap-2 px-4 py-2 rounded hover:bg-gray-500 transition duration-150"
            >
              <HeartMinus className="text-red-500" />
              <button>Remove from Wishlist</button>
            </div>
          ) : (
            <div
              onClick={handleAdd}
              className="flex items-center bg-gray-300 text-black gap-2 px-4 py-2 rounded hover:bg-gray-500 transition duration-150"
            >
              <HeartPlus className="text-red-500" />
              <button>Add to Wishlist</button>
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default AddToWishlist;
