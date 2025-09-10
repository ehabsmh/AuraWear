import { getColors } from "@/app/lib/products";
import { useEffect, useState } from "react";
import { FilterProps } from "./Categories";
import { toast } from "sonner";

function FilterColors({ onUpdateFilters, currentParams }: FilterProps) {
  const [colors, setColors] = useState<
    { color: string; colorCode: string; count: number }[]
  >([]);

  useEffect(() => {
    getColors(currentParams)
      .then((data) => setColors(data))
      .catch((error) => {
        if (error instanceof Error) toast.error(error.message);
      });
  }, [currentParams]);
  return (
    <div className="mb-4 mt-6">
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-semibold mb-3">Filter by Color</h3>
        <button
          onClick={() => onUpdateFilters({ color: null })}
          className="text-sm bg-secondary-light text-white py-1 px-2 rounded cursor-pointer hover:bg-secondary duration-150"
        >
          Reset
        </button>
      </div>
      <ul className="space-y-2">
        {colors.map((c) => (
          <li
            key={c.color}
            onClick={() => {
              onUpdateFilters({
                color: c.color === currentParams.color ? null : c.color,
              });
            }}
            className={`flex items-center justify-between text-sm text-gray-800 ${
              c.color === currentParams.color
                ? "bg-gray-200 dark:bg-gray-700"
                : ""
            } p-2 rounded cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-500 duration-150`}
          >
            <div className="flex items-center gap-2">
              <span
                className="w-4 h-4 rounded-full border border-gray-500 dark:border-gray-300"
                style={{ backgroundColor: c.colorCode }}
              />
              <span className="dark:text-gray-300">{c.color}</span>
            </div>
            <span className="dark:text-gray-400">({c.count})</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FilterColors;
