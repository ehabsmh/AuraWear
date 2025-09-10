import Image from "next/image";
import Link from "next/link";
import { fetchDeal } from "@/app/lib/deals";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils"; // if you have a cn util, else remove
import { IProduct } from "@/app/interfaces/Product";
import Countdown from "./Countdown";

function computePrices(product: IProduct, dealDiscount: number) {
  // If product has discountPrice, use it. Otherwise apply deal discount (if any).
  const appliedDeal = !product.discountPrice && dealDiscount > 0;
  const finalPrice = product.discountPrice
    ? product.discountPrice
    : appliedDeal
    ? Math.round(product.price * (1 - dealDiscount))
    : product.price;

  const showOriginal =
    product.discountPrice || (appliedDeal && finalPrice !== product.price);

  const percentOff =
    showOriginal && product.price > 0
      ? Math.round(((product.price - finalPrice) / product.price) * 100)
      : 0;

  return { finalPrice, showOriginal, originalPrice: product.price, percentOff };
}

export default async function Page({
  params,
}: {
  params: { dealsSlug: string };
}) {
  const { dealsSlug } = await params;
  const deal = await fetchDeal(dealsSlug);

  const discountPct = (deal.discountPercentage || 0) * 100;

  return (
    <section>
      {/* Hero Banner */}
      <div className="w-full">
        <div className="relative h-[46vh] md:h-[58vh] lg:h-[64vh]">
          <Image
            src={deal.bannerImage}
            alt={deal.title}
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/10" />
          <div className="absolute inset-0 flex items-end">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-8">
              <div className="max-w-3xl text-white">
                <div className="flex flex-wrap items-center gap-3 mb-3">
                  {discountPct > 0 && (
                    <Badge className="bg-white text-black hover:bg-white">
                      Up to {Math.round(discountPct)}% off
                    </Badge>
                  )}
                  {deal.sex && (
                    <Badge
                      variant="outline"
                      className="border-white text-white"
                    >
                      {deal.sex}
                    </Badge>
                  )}
                  {deal.isFeatured && (
                    <Badge
                      variant="outline"
                      className="border-white text-white"
                    >
                      Featured
                    </Badge>
                  )}
                </div>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
                  {deal.title}
                </h1>
                <p className="mt-3 text-sm sm:text-base text-white/85">
                  {deal.description}
                </p>

                {/* Meta row */}
                <div className="mt-5 flex flex-wrap items-center gap-3">
                  <Badge variant="secondary" className="bg-white/90">
                    {deal.products?.length || 0} products
                  </Badge>
                  {deal.endDate && (
                    <div className="rounded-full bg-white/90 px-3 py-1 text-xs sm:text-sm text-gray-900">
                      Deal ends in:{" "}
                      <Countdown endDate={deal.endDate.toString()} />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {deal.products.map((p) => {
            const { finalPrice, showOriginal, originalPrice, percentOff } =
              computePrices(p, deal.discountPercentage || 0);

            // Collect color dots from variants
            const colors =
              p.variants
                ?.map((v) => v.colorCode || v.color)
                .filter(Boolean)
                .slice(0, 4) || [];

            return (
              <Card
                key={p._id}
                className="group overflow-hidden rounded-2xl border-0 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col"
              >
                <div className="relative aspect-[4/5] w-full overflow-hidden">
                  <Image
                    src={p.mainImage}
                    alt={p.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {percentOff > 0 && (
                    <div className="absolute left-3 top-3">
                      <Badge className="bg-black/80 text-white">
                        -{percentOff}%
                      </Badge>
                    </div>
                  )}
                </div>

                {/* Content */}
                <CardContent className="flex flex-col flex-1 p-4">
                  <Link
                    href={`/shop/${p.slug}`}
                    className="line-clamp-2 font-semibold text-[0.95rem] hover:underline"
                  >
                    {p.name}
                  </Link>

                  {/* Price */}
                  <div className="mt-2">
                    <div className="flex items-baseline gap-2">
                      <span className="text-lg font-bold">
                        EGP {finalPrice}
                      </span>
                      {showOriginal && (
                        <span className="text-sm line-through text-muted-foreground">
                          EGP {originalPrice}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Colors */}
                  {colors.length > 0 && (
                    <div className="mt-3 flex items-center gap-2">
                      {colors.map((c, idx) => (
                        <span
                          key={idx}
                          className={cn(
                            "h-5 w-5 rounded-full border",
                            typeof c === "string" && c.startsWith("#")
                              ? ""
                              : "bg-gray-200"
                          )}
                          style={
                            typeof c === "string" && c.startsWith("#")
                              ? { backgroundColor: c }
                              : undefined
                          }
                          title={String(c)}
                        />
                      ))}
                      {p.variants.length > colors.length && (
                        <span className="text-xs text-muted-foreground">
                          +{p.variants.length - colors.length} more
                        </span>
                      )}
                    </div>
                  )}

                  {/* Actions */}
                  <div className="mt-4 flex gap-2">
                    <Link href={`/shop/${p.slug}`} className="flex-1">
                      <Button variant="default" className="w-full rounded-xl">
                        View
                      </Button>
                    </Link>
                    <Button variant="outline" className="rounded-xl" asChild>
                      <Link href={`/products/${p.slug}`}>Choose Size</Link>
                    </Button>
                  </div>

                  {/* Footer meta */}
                  <div className="mt-3 text-xs text-muted-foreground">
                    {p.sold && p.sold > 0
                      ? `${p.sold} sold`
                      : "Be the first to buy"}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="mt-10 flex flex-col items-center gap-3 text-center">
          <h3 className="text-lg font-semibold">
            Don’t miss out on the Summer Essentials
          </h3>
          <p className="max-w-2xl text-sm text-muted-foreground">
            Limited-time savings on selected styles. Freshen up your wardrobe
            before it ends.
          </p>
          <div className="mt-2">
            {deal.sex === "female" ? (
              <Link href="/shop?sex=female">
                <Button size="lg" className="rounded-xl">
                  Explore Women’s Collection
                </Button>
              </Link>
            ) : deal.sex === "male" ? (
              <Link href="/shop?sex=male">
                <Button size="lg" className="rounded-xl">
                  Explore Men’s Collection
                </Button>
              </Link>
            ) : (
              <Link href="/shop">
                <Button size="lg" className="rounded-xl">
                  Explore All Collections
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
