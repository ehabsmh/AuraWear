"use client";

import * as Slider from "@radix-ui/react-slider";
import { useEffect, useState } from "react";
import { FilterProps } from "./Categories";

function FilterPrice({ onUpdateFilters, currentParams }: FilterProps) {
  const [priceRange, setPriceRange] = useState([0, 1000]);

  function onPriceChange() {
    const [min, max] = priceRange;
    onUpdateFilters({
      priceMin: String(min),
      priceMax: String(max),
    });
  }

  useEffect(() => {
    setPriceRange([
      currentParams.priceMin ? parseInt(currentParams.priceMin) : 0,
      currentParams.priceMax ? parseInt(currentParams.priceMax) : 1000,
    ]);
  }, [currentParams.priceMin, currentParams.priceMax]);

  return (
    <div className="mb-4 mt-4">
      <h2 className="font-semibold mt-3">Filter by price</h2>

      <div className="flex items-center justify-between">
        <p className="text-sm">
          Price: {priceRange[0]} - {priceRange[1]} EGP
        </p>
        <button
          onClick={onPriceChange}
          className="text-sm bg-secondary-light text-white py-1 px-4 rounded cursor-pointer hover:bg-secondary duration-150"
        >
          Filter
        </button>
      </div>

      <Slider.Root
        className="relative flex items-center select-none touch-none w-full h-3 mt-4"
        min={0}
        max={1000}
        step={10}
        value={priceRange}
        onValueChange={setPriceRange}
      >
        <Slider.Track className="bg-gray-200 relative grow rounded-full h-[3px]">
          <Slider.Range className="absolute bg-secondary rounded-full h-full" />
        </Slider.Track>
        <Slider.Thumb className="block w-4 h-4 bg-white border-2 border-secondary rounded-full shadow hover:bg-secondary-light focus:outline-none focus:ring-1 focus:ring-secondary" />
        <Slider.Thumb className="block w-4 h-4 bg-white border-2 border-secondary rounded-full shadow hover:bg-secondary-light focus:outline-none focus:ring-1 focus:ring-secondary" />
      </Slider.Root>
    </div>
  );
}

export default FilterPrice;
