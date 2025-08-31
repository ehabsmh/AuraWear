"use client";

import Image from "next/image";
import Variants from "./Variants";
import { useEffect, useReducer, useState } from "react";
import { IProduct } from "@/app/interfaces/Product";
import AddToCart from "../cart/AddToCart";
import { ICartItem, ICartResponse } from "@/app/interfaces/Cart";
import { HeartPlus } from "lucide-react";
import AddToWishlist from "../wishlist/AddToWishlist";

interface IInitialState {
  variantIndex: number;
  sizeIndex: number;
  selectedImage: string | null;
}

const initialState: IInitialState = {
  variantIndex: 0,
  sizeIndex: 0,
  selectedImage: null,
};

function reducer(
  state: IInitialState,
  action: { type: string; payload: any; product?: IProduct }
) {
  switch (action.type) {
    case "SET_VARIANT_INDEX":
      return {
        ...state,
        variantIndex: action.payload,
        selectedImage:
          action.product?.variants[action.payload].images[0] ?? null,
      };
    case "SET_SIZE_INDEX":
      return { ...state, sizeIndex: action.payload };
    case "SET_SELECTED_IMAGE":
      return { ...state, selectedImage: action.payload };
    default:
      return state;
  }
}

function ProductDetails({
  product,
  cart,
}: {
  product: IProduct;
  cart?: ICartResponse | null;
}) {
  const [{ variantIndex, sizeIndex, selectedImage }, dispatch] = useReducer(
    reducer,
    initialState
  );

  const [cartItems, setCartItems] = useState<ICartItem[]>(
    cart?.cart.items || []
  );

  const cartItemExists = cartItems?.find(
    (item) =>
      item.productId._id === product._id &&
      item.variantIndex === variantIndex &&
      item.sizeIndex === sizeIndex
  );

  function handleVariantChange(index: number) {
    dispatch({ type: "SET_VARIANT_INDEX", payload: index, product });
  }

  function handleSizeChange(index: number) {
    dispatch({ type: "SET_SIZE_INDEX", payload: index });
  }

  useEffect(() => {
    dispatch({
      type: "SET_SELECTED_IMAGE",
      payload: product.variants[variantIndex].images[0],
    });
  }, []);

  return (
    <>
      <div className="flex flex-col md:items-center">
        <div className="relative w-full aspect-square md:w-[350px] md:h-[350px] 2xl:w-[600px] 2xl:h-[600px]">
          <Image
            src={selectedImage}
            alt={product.name}
            fill
            className="object-cover rounded-lg"
          />
        </div>

        <div className="flex gap-0.5 mt-4">
          {product.variants[variantIndex].images.map((image, index) => (
            <Image
              onClick={() =>
                dispatch({ type: "SET_SELECTED_IMAGE", payload: image })
              }
              loading="lazy"
              key={index}
              src={image}
              alt={product.name}
              width={128}
              height={96}
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
            <p className="text-lg dark:text-red-400 text-gray-500 line-through mb-2">
              ${product.price}
            </p>
            <p className="text-lg dark:text-gray-300 text-gray-700 mb-4">
              ${product.discountPrice}
            </p>
          </div>
        ) : (
          <p className="text-lg dark:text-gray-300 text-gray-700 mb-2">
            ${product.price}
          </p>
        )}

        <p className="text-sm dark:text-gray-300 text-gray-500 mb-6">
          {product.shortDescription}
        </p>

        <Variants
          variants={product.variants}
          sizeIndex={sizeIndex}
          variantIndex={variantIndex}
          onVariantChange={handleVariantChange}
          onSizeChange={handleSizeChange}
        />

        <div className="flex gap-3 items-end">
          <AddToCart
            cartItemPayload={{
              productId: product._id,
              variantIndex,
              sizeIndex,
            }}
            isCartItem={cartItemExists}
            setCartItems={setCartItems}
          />

          <AddToWishlist productId={product._id} />
        </div>
      </div>
    </>
  );
}

export default ProductDetails;
