import { IProduct } from "@/app/interfaces/Product";
import ProductCard from "./ProductCard";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ProductsProps {
  products: IProduct[];
  totalPages: number;
  totalItems: number;
  limit: number;
}

async function Products({
  products,
  totalPages,
  totalItems,
  limit,
}: ProductsProps) {
  return (
    <>
      {/* Top filter row */}
      <div className="flex md:flex-row flex-col flex-wrap md:items-center justify-between mb-6 text-sm">
        <p className="text-center md:text-start">
          Showing 1–{limit} of {totalItems} results
        </p>
        <div className="flex md:flex-row flex-col gap-4 mt-5">
          <span>Show:</span>
          <Select>
            <SelectTrigger className="border px-2 py-1 rounded text-sm text-foreground">
              <SelectValue placeholder="Select items per page" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="10">10 Items</SelectItem>
              <SelectItem value="20">20 Items</SelectItem>
            </SelectContent>
          </Select>
          <span>Sort by:</span>
          <Select>
            <SelectTrigger className="border px-2 py-1 rounded text-sm text-foreground">
              <SelectValue placeholder="Select sorting" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="latest">Latest</SelectItem>
              <SelectItem value="lowToHigh">Price: Low to High</SelectItem>
              <SelectItem value="highToLow">Price: High to Low</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Grid */}
      <div className="grid max-sm:grid-cols-1 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 sm:gap-6 gap-3">
        {products.slice(0, 16).map((product, index) => (
          <ProductCard key={index} product={product} />
        ))}
      </div>

      {/* Pagination */}
      <div className="mt-10 flex justify-center">
        <nav className="flex space-x-2">
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              className="px-4 py-2 rounded border hover:bg-black hover:text-white transition"
            >
              {index + 1}
            </button>
          ))}
        </nav>
      </div>
    </>
  );
}

export default Products;
