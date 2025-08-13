import { twMerge } from "tailwind-merge";
import { ClassValue, clsx } from "clsx";
import { toast } from "sonner";
import { removeCartItem } from "./cart.client";
import { ICartItem } from "../interfaces/Cart";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function handleDeleteCartItem(
  item: ICartItem,
  setter: React.Dispatch<React.SetStateAction<ICartItem[]>>
) {
  try {
    toast.error("Are you sure you want to remove this item?", {
      id: "delete-confirm",
      cancel: {
        label: "No",
        onClick: () => {
          toast.dismiss("delete-confirm");
        },
      },
      action: {
        label: "Yes",
        onClick: async () => {
          const message = await removeCartItem(item._id);
          setter((prevItems) =>
            prevItems.filter((items) => items._id !== item._id)
          );
          toast.dismiss("delete-confirm"); // نشيل القديم
          toast.success(message, { richColors: true }); // نضيف الأخضر
        },
      },
      duration: Infinity,
      richColors: true,
    });
  } catch (error) {
    if (error instanceof Error) toast.error(error.message);
  }
}
