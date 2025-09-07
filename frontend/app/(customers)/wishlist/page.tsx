import WishlistClient from "@/app/components/customers/wishlist/WishlistClient";
import WishlistSkeleton from "@/app/components/customers/wishlist/WishlistSkeleton";
import { Suspense } from "react";

export default function WishlistPage() {
  return (
    <div className="container mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-8 text-center">My Wishlist</h1>

      <Suspense fallback={<WishlistSkeleton />}>
        <WishlistClient />
      </Suspense>
    </div>
  );
}
