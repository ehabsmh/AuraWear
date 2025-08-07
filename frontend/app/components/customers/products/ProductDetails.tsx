"use client";

import { IProduct } from "@/interfaces/Product";
import Image from "next/image";
import Variants from "./Variants";
import { BiMinus, BiPlus } from "react-icons/bi";
import { HeartPlus } from "lucide-react";
import { useEffect, useState } from "react";
import { useAuth } from "@/app/context/AuthContext";

function ProductDetails({ product }: { product: IProduct }) {
  const { user } = useAuth();
  const [variantIndex, setVariantIndex] = useState(0);
  const [sizeIndex, setSizeIndex] = useState(0);
  const [selectedImage, setSelectedImage] = useState(
    product.variants[variantIndex].images[0]
  );

  function handleVariantChange(index: number) {
    setVariantIndex(index);
  }

  function handleSizeChange(index: number) {
    setSizeIndex(index);
  }

  useEffect(() => {
    setSelectedImage(product.variants[variantIndex].images[0]);
    setSizeIndex(0);
  }, [product.variants, variantIndex]);

  return (
    <>
      <div className="flex flex-col items-center">
        <div className="relative w-[600px] h-[600px]">
          <Image
            src={selectedImage}
            alt={product.name}
            fill
            className="object-contain rounded-lg"
          />
        </div>
        <div className="flex gap-0.5 mt-4">
          {product.variants[variantIndex].images.map((image, index) => (
            <Image
              onClick={() => setSelectedImage(image)}
              loading="lazy"
              key={index}
              src={image}
              alt={product.name}
              width={50}
              height={50}
              quality={100}
              className={`w-32 h-24 object-contain rounded-lg mt-4 cursor-pointer hover:scale-105 transition duration-150 ${
                selectedImage === image ? "border-2 border-secondary-light" : ""
              }`}
            />
          ))}
        </div>
      </div>

      <div>
        <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
        {product.discountPrice ? (
          <div className="flex gap-4">
            <p className="text-lg text-gray-500 line-through mb-2">
              ${product.price}
            </p>
            <p className="text-lg text-gray-700 mb-4">
              ${product.discountPrice}
            </p>
          </div>
        ) : (
          <p className="text-lg text-gray-700 mb-2">${product.price}</p>
        )}

        <p className="text-sm text-gray-500 mb-6">{product.shortDescription}</p>

        <Variants
          variants={product.variants}
          sizeIndex={sizeIndex}
          variantIndex={variantIndex}
          onVariantChange={handleVariantChange}
          onSizeChange={handleSizeChange}
        />

        <div className="w-full flex items-center gap-4 mt-5">
          <form className=" mt-5">
            <label
              htmlFor="quantity-input"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Choose quantity:
            </label>
            <div className="flex w-full gap-3">
              <div className="w-36 relative flex items-center">
                <button
                  type="button"
                  id="decrement-button"
                  className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-s-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
                >
                  <BiMinus className="text-gray-700" />
                </button>
                <input
                  type="text"
                  id="quantity-input"
                  className="bg-gray-50 border-x-0 border-gray-300 h-11 text-center text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="1"
                  required
                />
                <button
                  type="button"
                  id="increment-button"
                  className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-e-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
                >
                  <BiPlus className="text-gray-700" />
                </button>
              </div>
              <div className="flex gap-4">
                <button
                  onClick={() =>
                    user
                      ? alert("Added to cart")
                      : alert("Please login to add to cart")
                  }
                  className="bg-secondary-light text-white px-4 py-2 rounded hover:bg-secondary transition duration-150"
                >
                  Add to Cart
                </button>
                <div className="flex items-center bg-gray-300 text-black gap-2 px-4 py-2 rounded hover:bg-gray-500 transition duration-150">
                  <HeartPlus className="text-red-500" />
                  <button>Wishlist</button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default ProductDetails;
