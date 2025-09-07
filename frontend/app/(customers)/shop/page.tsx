import Filters from "@/app/components/customers/filters/Filters";
import Products from "@/app/components/customers/products/Products";
import Subcategories from "@/app/components/general/Subcategories";
import { Suspense } from "react";

interface PageProps {
  searchParams?: {
    sex?: string;
    category?: string;
    color?: string;
    size?: string;
    minPrice?: string;
    maxPrice?: string;
    page?: string;
    limit?: string;
  };
}

async function Page({ searchParams }: PageProps) {
  const params = await searchParams;
  const sex = params?.sex;
  const category = params?.category;

  return (
    <section className="mt-3 md:mt-0">
      <div className="container w-11/12 md:w-4/5 mx-auto">
        <div className="flex flex-col items-center md:items-start md:grid md:grid-cols-[250px_1fr] 2xl:grid-cols-[400px_1fr] gap-4 mt-10">
          <Filters />
          <section className="md:px-6 w-full">
            <Subcategories sex={sex} category={category} />
            <Suspense
              key={JSON.stringify(params)}
              fallback={<ProductsFallback />}
            >
              <Products params={params ?? {}} />
            </Suspense>
          </section>
        </div>
      </div>
    </section>
  );
}

function ProductsFallback() {
  return (
    <>
      <div className="flex md:flex-row flex-col flex-wrap md:items-center justify-between mb-6 text-sm">
        <div className="h-4 w-40 bg-gray-200 animate-pulse rounded"></div>
      </div>

      <div className="grid max-sm:grid-cols-1 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 sm:gap-6 gap-3">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="rounded-lg border bg-white shadow-sm p-3 flex flex-col gap-3 animate-pulse"
          >
            <div className="h-40 w-full bg-gray-200 rounded-md" />
            {/* product name */}
            <div className="h-4 w-3/4 bg-gray-200 rounded" />
            {/* product price */}
            <div className="h-4 w-1/2 bg-gray-200 rounded" />
          </div>
        ))}
      </div>
    </>
  );
}

export default Page;
