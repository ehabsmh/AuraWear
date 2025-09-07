import { IProduct } from "@/app/interfaces/Product";
import ProductCard from "./ProductCard";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Pagination from "./Pagination";
import { fetchProducts } from "@/app/lib/products";

async function Products({
  params,
}: {
  params: { [key: string]: string | undefined };
}) {
  const { products, totalPages, totalItems, limit } = (await fetchProducts(
    params
  )) as {
    products: IProduct[];
    totalPages: number;
    totalItems: number;
    limit: number;
  };

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
      <Pagination totalPages={totalPages} />
    </>
  );
}

export default Products;
