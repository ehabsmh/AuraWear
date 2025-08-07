import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/app/ui/general/carousel";
import Image from "next/image";
import React from "react";

const imgs = ["/1.webp", "/2.webp", "/3.webp", "/1.webp", "/2.webp", "/3.webp"];

function Arrivals() {
  return (
    <section className="bg-white mb-20">
      <Carousel className="w-full p-20" opts={{ align: "start", loop: true }}>
        <h2 className="text-gray-800 font-semibold text-4xl mb-3 leading-none">
          Latest Arrival
        </h2>
        <p className="text-gray-500 text-lg mb-5">
          Showing our latest arrival on this summer
        </p>
        <CarouselContent className="gap-3">
          {imgs.map((img, index) => (
            <CarouselItem
              className="md:basis-1/3 basis-1/2 lg:basis-1/4 cursor-pointer"
              key={index}
            >
              <div className="p-1 flex flex-col items-center justify-center">
                <Image
                  src={img}
                  alt="x"
                  width={300}
                  height={300}
                  className="w-full object-cover mb-2 rounded-md"
                  quality={100}
                />
                <div className="self-start">
                  <h3>Black Clean T-Shirt</h3>
                  <p>$14</p>
                </div>
              </div>
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
