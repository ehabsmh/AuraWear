import { fetchNewArrivals } from "@/app/lib/products";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import Link from "next/link";
import React from "react";

async function Arrivals() {
  const newArrivals = await fetchNewArrivals();

  return (
    <section className="bg-white mb-20">
      <Carousel
        className="w-full p-8 md:p-20"
        opts={{ align: "start", loop: true }}
      >
        <h2 className="text-gray-800 font-semibold text-4xl mb-3 leading-none">
          Latest Arrival
        </h2>
        <p className="text-gray-500 text-lg mb-5">
          Showing our latest arrival on this summer
        </p>
        <CarouselContent className="gap-3">
          {newArrivals.map((product, index) => (
            <CarouselItem
              className="md:basis-1/3 basis-1/2 lg:basis-1/4 cursor-pointer"
              key={index}
            >
              <Link
                href={`/shop/${product.slug}`}
                className="p-1 flex flex-col items-center justify-center"
              >
                <Image
                  src={product.mainImage}
                  alt={product.name}
                  width={300}
                  height={300}
                  className="w-[300px] h-[300px] object-contain rounded-md mb-2"
                  quality={100}
                />
                <div className="self-start">
                  <h3>{product.name}</h3>
                  <p>${product.price}</p>
                </div>
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute left-0 w-16 h-16 text-secondary" />
        <CarouselNext className="absolute right-0 w-16 h-16 text-secondary" />
      </Carousel>
    </section>
  );
}

export default Arrivals;
