import { IProductResponse } from "@/app/interfaces/Product";
import ProductCard from "./ProductCard";
import { fetchProducts } from "@/app/lib/products";

interface SimilarProductsProps {
  categoryId: string;
  currentProductId: string;
}

async function SimilarProducts({
  categoryId,
  currentProductId,
}: SimilarProductsProps) {
  // Fetch products from the same category
  const data: IProductResponse = await fetchProducts({ category: categoryId });
  if (!data || !data.products.length) return null;
  const { products } = data;

  // Filter out the current product
  const similar = products
    .filter((p) => p._id !== currentProductId)
    .slice(0, 8);

  if (!similar.length) return null;

  return (
    <section className=" mb-5">
      <h2 className="text-lg md:text-xl font-semibold mb-6">
        Similar Products
      </h2>
      <div className="md:grid gap-4 sm:grid-cols-2 lg:grid-cols-4 hidden">
        {similar.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>

      {/* Mobile scrollable list */}
      <div className="flex gap-4 overflow-x-auto sm:hidden pb-4">
        {similar.map((product) => (
          <div key={product._id} className="min-w-[250px] flex-shrink-0">
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </section>
  );
}

export default SimilarProducts;
