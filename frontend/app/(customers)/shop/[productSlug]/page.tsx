import ProductDetails from "@/app/components/customers/products/ProductDetails";
import { IProduct } from "@/app/interfaces/Product";
import { getCart } from "@/app/lib/cart.server";
import { fetchProducts } from "@/app/lib/products";

async function Page({
  params,
}: {
  params: { productSlug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const { productSlug } = await params;
  const product = (await fetchProducts({ slug: productSlug })) as IProduct;
  const cart = await getCart();

  return (
    <section className="mt-7">
      <div className="container w-11/12 md:w-3/4 mx-auto">
        <div className="md:grid md:grid-cols-2 md:gap-24 md:items-center">
          <ProductDetails product={product} cart={cart} />
        </div>
      </div>
    </section>
  );
}

export default Page;
