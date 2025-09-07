"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Categories from "./Categories";
import FilterPrice from "./FilterPrice";
import FilterColors from "./FilterColors";

function Filters() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  // Log all search params as an object
  const currentParams = Object.fromEntries(searchParams.entries());

  function updateFilters(updates: Record<string, string | null>) {
    const params = new URLSearchParams(searchParams);

    for (const [key, value] of Object.entries(updates)) {
      if (value === null) {
        params.delete(key);
      } else {
        if (key === "category") {
          params.delete("subcategory"); // Clear subcategory if category is updated
        }
        params.set(key, value);
      }
    }

    // Reset page to 1 on any filter change
    params.set("page", "1");

    router.replace(`${pathname}?${params.toString()}`);
  }

  return (
    <div id="filters" className="bg-nav p-4 rounded shadow-md w-full">
      <Categories
        onUpdateFilters={updateFilters}
        currentParams={currentParams}
      />
      <FilterPrice
        onUpdateFilters={updateFilters}
        currentParams={currentParams}
      />
      <FilterColors
        onUpdateFilters={updateFilters}
        currentParams={currentParams}
      />
      {/* <FilterSizes
        onUpdateFilters={updateFilters}
        currentParams={currentParams}
      />
      <FilterStatus
        onUpdateFilters={updateFilters}
        currentParams={currentParams}
      /> */}
    </div>
  );
}

export default Filters;
