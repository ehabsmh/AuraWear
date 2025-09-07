"use client";

import { ISubcategory } from "@/app/interfaces/Subcategory";
import { fetchSubcategories } from "@/app/lib/subcategories";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";

interface SubcategoryProps {
  sex?: string;
  category?: string;
}

function Subcategories({ sex, category }: SubcategoryProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const [subcategories, setSubcategories] = React.useState<ISubcategory[]>([]);
  const [currentSubcategory, setCurrentSubcategory] = React.useState<
    string | null
  >(null);

  useEffect(() => {
    fetchSubcategories({ sex, category }).then(setSubcategories);
    return () => setCurrentSubcategory(null);
  }, [sex, category]);

  useEffect(() => {
    function addFilter(subcategoryId: string | null) {
      const params = new URLSearchParams(searchParams);

      if (subcategoryId) {
        params.set("subcategory", subcategoryId);
        if (params.get("page")) {
          params.delete("page");
        }
      } else {
        params.delete("subcategory");
      }

      router.replace(`${pathname}?${params.toString()}`);
    }

    addFilter(currentSubcategory);
  }, [currentSubcategory, searchParams, pathname, router]);

  if (!subcategories.length) {
    return null;
  }

  return (
    <div className="flex justify-center my-6 w-[80%] mx-auto lg:w-full">
      <Carousel className="w-full max-w-[30rem]">
        <CarouselContent className="ml-6">
          {subcategories.map((subcategory) => (
            <CarouselItem
              key={subcategory._id}
              onClick={() =>
                setCurrentSubcategory(
                  currentSubcategory === subcategory._id
                    ? null
                    : subcategory._id
                )
              }
              className="pl-1 basis-1/2 lg:basis-1/3"
            >
              <div
                className={`flex items-center justify-center w-[6rem] h-[6rem] md:w-28 md:h-28 rounded-full text-center font-medium cursor-pointer transition-all duration-300 ${
                  currentSubcategory === subcategory._id
                    ? "bg-secondary text-white shadow-lg scale-105"
                    : "bg-gray-200 hover:bg-gray-300"
                }`}
              >
                {subcategory.name}
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>

      {/* <Carousel className="w-full md:max-w-3xl" opts={{ loop: true }}>
        <CarouselContent className="flex gap-4 ml-9">
          {subcategories.map((subcategory) => (
            <CarouselItem
              key={subcategory._id}
              onClick={() =>
                setCurrentSubcategory(
                  currentSubcategory === subcategory._id
                    ? null
                    : subcategory._id
                )
              }
              className="basis-1/2 md:basis-1/3"
            >
              <div
                className={`flex items-center justify-center w-[6rem] h-[6rem] md:w-28 md:h-28 rounded-full text-center font-medium cursor-pointer transition-all duration-300 ${
                  currentSubcategory === subcategory._id
                    ? "bg-secondary text-white shadow-lg scale-105"
                    : "bg-gray-200 hover:bg-gray-300"
                }`}
              >
                {subcategory.name}
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel> */}
    </div>
  );
}

export default Subcategories;
