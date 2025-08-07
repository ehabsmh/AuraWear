import Filters from "@/app/components/customers/filters/Filters";
import { IProduct } from "@/app/interfaces/Product";
import { fetchProducts } from "@/app/lib/products";
import Products from "@/app/components/customers/products/Products";
import Subcategories from "@/app/components/general/Subcategories";

interface PageProps {
  searchParams?: {
    sex?: string;
    category?: string;
    color?: string;
    size?: string;
    minPrice?: string;
    maxPrice?: string;
  };
}

async function Page({ searchParams }: PageProps) {
  const params = await searchParams;
  const sex = params?.sex;
  const category = params?.category;
  // console.log(params.sex, params.category);

  // const color = params?.color ?? null;
  // const size = params?.size ?? null;
  // const price = params?.price ?? null;

  const { products, totalPages, totalItems, limit } = (await fetchProducts(
    params
  )) as {
    products: IProduct[];
    totalPages: number;
    totalItems: number;
    limit: number;
  };

  return (
    <section>
      <div className="container w-4/5 mx-auto">
        <div className="grid grid-cols-[400px_1fr] gap-4">
          <Filters />
          <section>
            <Subcategories sex={sex} category={category} />
            <Products
              products={products}
              totalPages={totalPages}
              totalItems={totalItems}
              limit={limit}
            />
          </section>
        </div>
      </div>
    </section>
  );
}

export default Page;
