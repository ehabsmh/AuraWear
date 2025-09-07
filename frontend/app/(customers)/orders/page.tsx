export const dynamic = "force-dynamic";

import Orders from "@/app/components/customers/orders/Orders";
import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";

export default async function OrdersPage() {
  return (
    <div className="w-11/12 mx-auto">
      <Suspense
        fallback={
          <div className="grid gap-6 md:grid-cols-2">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="h-[434px] w-[740px] dark:bg-background bg-white p-5"
              >
                <Skeleton className="h-[11px] w-[350px] mb-3" />
                <Skeleton className="h-[19px] w-[200px] mb-3" />
                <Skeleton className="h-[50px] w-[500px] mb-3" />
                <Skeleton className="h-[66px] w-[300px] mb-3" />
              </div>
            ))}
          </div>
        }
      >
        <Orders />
      </Suspense>
    </div>
  );
}
