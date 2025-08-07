import ProductCard from "./ProductCard";
import { IProduct } from "@/interfaces/Product";

// const products = Array.from({ length: 72 }).map((_, i) => ({
//   name: `Product ${i + 1}`,
//   price: 89 + i,
//   oldPrice: i % 3 === 0 ? 99 + i : undefined,
//   discount: i % 3 === 0 ? 10 + (i % 5) : undefined,
//   reviews: Math.floor(Math.random() * 5) + 1,
//   image: "/men-fashion.jpg",
//   label: i === 1 ? "TRENDING" : undefined,
// }));

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
    <section className="px-6 py-10">
      {/* Top filter row */}
      <div className="flex flex-wrap items-center justify-between mb-6 text-sm text-gray-700">
        <p>
          Showing 1–{limit} of {totalItems} results
        </p>
        <div className="flex items-center gap-4">
          <span>Show:</span>
          <select className="border px-2 py-1 rounded text-sm">
            <option>10 Items</option>
            <option>20 Items</option>
          </select>
          <span>Sort by:</span>
          <select className="border px-2 py-1 rounded text-sm">
            <option>Latest</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
          </select>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
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
    </section>
  );
}

export default Products;
