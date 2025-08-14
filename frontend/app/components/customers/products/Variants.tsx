"use client";

import { IProduct } from "@/app/interfaces/Product";

function Variants({
  variants,
  sizeIndex,
  variantIndex,
  onVariantChange,
  onSizeChange,
}: {
  variants: IProduct["variants"];
  sizeIndex: number;
  variantIndex: number;
  onVariantChange: (index: number) => void;
  onSizeChange: (index: number) => void;
}) {
  return (
    <div id="variants">
      <p className="text-sm mb-2">Colors:</p>
      <div className="flex gap-3 mb-4">
        {variants.map((variant, index) => (
          <div
            key={variant.color}
            id={`color-${variant.color}`}
            className={`w-9 h-9 cursor-pointer mb-5 ${
              variantIndex === index
                ? "border-2 border-secondary-light"
                : "border-2 border-black/25"
            } flex items-center justify-center rounded-full`}
            onClick={() => onVariantChange(index)}
          >
            <p
              className="w-6 h-6 rounded-full cursor-pointer"
              style={{ backgroundColor: variant.colorCode }}
            ></p>
          </div>
        ))}
      </div>
      <p className="text-sm">Sizes:</p>
      <div className="flex gap-3 mb-4">
        <div className="flex gap-2">
          {variants[variantIndex].sizes.map((size, index) => (
            <div
              key={size.size}
              onClick={() => onSizeChange(index)}
              className={`w-8 h-8 border rounded-full flex items-center justify-center cursor-pointer  transition duration-150 ${
                sizeIndex === index
                  ? "bg-secondary-light text-white"
                  : "bg-transparent hover:bg-gray-200"
              }`}
            >
              {size.size}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Variants;
