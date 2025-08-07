import Image from "next/image";
// import { Star } from "lucide-react";
import { IProduct } from "@/interfaces/Product";
import Link from "next/link";

type ProductCardProps = {
  product: IProduct;
};

function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="relative group">
      {product.discountPrice && (
        <div className="absolute top-2 left-2 bg-green-100 text-green-600 text-sm font-semibold px-2 py-1 rounded">
          {((product.discountPrice / product.price) * 100).toFixed(0)}%
        </div>
      )}

      {/* {product.label && (
        <div className="absolute top-2 right-2 bg-black text-white text-xs px-2 py-1 rounded">
          {product.label}
        </div>
      )} */}

      <div className="w-full aspect-[3/4] overflow-hidden rounded-md bg-gray-100 cursor-pointer">
        <Link href={`/shop/${product.slug}`}>
          <Image
            src={product.mainImage || "/men-fashion.jpg"}
            alt={product.name}
            width={300}
            height={400}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </Link>
      </div>

      <div className="mt-2 space-y-1">
        {/* <div className="flex items-center gap-1 text-sm text-yellow-500">
          <Star className="w-4 h-4 fill-yellow-500" />
          <span>
            {product.reviews} review{product.reviews !== 1 && "s"}
          </span>
        </div> */}

        <h3 className="text-sm font-semibold text-gray-900 line-clamp-2">
          {product.name}
        </h3>

        <div className="text-sm">
          <span
            className={`  ${product.discountPrice ? "line-through" : ""} ${
              product.discountPrice ? "text-red-500" : "text-gray-400"
            } mr-2`}
          >
            ${product.price.toFixed(2)}
          </span>
          {product.discountPrice && (
            <span className="text-gray-400 font-semibold">
              ${product.discountPrice?.toFixed(2)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
