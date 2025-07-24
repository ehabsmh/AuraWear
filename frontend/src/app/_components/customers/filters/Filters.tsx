"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Categories from "./Categories";
import FilterColors from "./FilterColors";
import FilterPrice from "./FilterPrice";
import FilterSizes from "./FilterSizes";
import FilterStatus from "./FilterStatus";

function Filters() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  // Log all search params as an object
  const currentParams = Object.fromEntries(searchParams.entries());
  console.log(currentParams);

  function updateFilters(updates: Record<string, string | null>) {
    const params = new URLSearchParams(searchParams);

    for (const [key, value] of Object.entries(updates)) {
      if (value === null) {
        params.delete(key);
      } else {
        params.set(key, value);
      }
    }

    router.replace(`${pathname}?${params.toString()}`);
  }
  return (
    <div id="filters" className="bg-white/30 p-4 rounded shadow">
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
      <FilterSizes
        onUpdateFilters={updateFilters}
        currentParams={currentParams}
      />
      <FilterStatus
        onUpdateFilters={updateFilters}
        currentParams={currentParams}
      />
    </div>
  );
}

export default Filters;
