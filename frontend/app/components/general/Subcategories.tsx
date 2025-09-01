"use client";
import { ISubcategory } from "@/app/interfaces/Subcategory";
import { fetchSubcategories } from "@/app/lib/subcategories";
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

  useEffect(() => {
    fetchSubcategories({ sex, category }).then(setSubcategories);
    return () => setCurrentSubcategory(null);
  }, [sex, category]);

  useEffect(() => {
    addFilter(currentSubcategory);
  }, [currentSubcategory]);

  if (!subcategories.length) {
    return null;
  }

  return (
    <ul className="flex gap-4 text-sm text-gray-700 mt-7 justify-center">
      {/* <li
        onClick={() =>
          setCurrentSubcategory((currentSubcategory) =>
            currentSubcategory ? null : currentSubcategory
          )
        }
        className={`flex items-center justify-center text-center rounded-full bg-gray-200 px-3 py-1 w-36 h-36 hover:bg-gray-200 transition cursor-pointer ${
          currentSubcategory === null
            ? "bg-gray-200 border border-secondary"
            : "bg-gray-100"
        }`}
      >
        <p>All</p>
      </li> */}
      {subcategories.map((subcategory) => (
        <li
          key={subcategory._id}
          onClick={() => {
            if (currentSubcategory === subcategory._id) {
              setCurrentSubcategory(null);
            } else {
              setCurrentSubcategory(subcategory._id);
            }
          }}
          className={`flex items-center justify-center text-center rounded-full bg-gray-200 px-3 py-1 w-36 h-36 hover:bg-gray-200 transition cursor-pointer ${
            currentSubcategory === subcategory._id
              ? "bg-gray-200 border border-secondary"
              : "bg-gray-100"
          }`}
        >
          <p>{subcategory.name}</p>
        </li>
      ))}
    </ul>
  );
}

export default Subcategories;
