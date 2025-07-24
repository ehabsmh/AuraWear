import Filters from "@/app/_components/customers/filters/Filters";
import Products from "@/app/_components/customers/products/Products";
import { fetchProducts } from "@/services/products";

interface PageProps {
  searchParams?: {
    color?: string;
    size?: string;
    price?: string;
  };
}

async function Page({ searchParams }: PageProps) {
  const params = await searchParams;
  // console.log(params.sex, params.category);

  // const color = params?.color ?? null;
  // const size = params?.size ?? null;
  // const price = params?.price ?? null;

  const { products, totalPages, totalItems, limit } = await fetchProducts(
    params
  );

  return (
    <section>
      <div className="container w-4/5 mx-auto">
        <div className="grid grid-cols-[400px_1fr] gap-4">
          <Filters />
          <Products
            products={products}
            totalPages={totalPages}
            totalItems={totalItems}
            limit={limit}
          />
        </div>
      </div>
    </section>
  );
}

export default Page;
