import ProductDetails from "@/app/_components/customers/products/ProductDetails";
import { IProduct } from "@/interfaces/Product";
import { fetchProducts } from "@/services/products";

async function Page({
  params,
}: {
  params: { productSlug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const { productSlug } = await params;
  const product = (await fetchProducts({ slug: productSlug })) as IProduct;
  console.log(product);

  return (
    <section className="mt-7">
      <div className="container w-3/4 mx-auto">
        <div className="grid grid-cols-2 gap-24 items-center">
          <ProductDetails product={product} />
        </div>
      </div>
    </section>
  );
}

export default Page;
