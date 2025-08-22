import IDeal from "@/app/interfaces/Deal";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function Deal({ deal, className = "" }: { deal: IDeal; className?: string }) {
  return (
    <Link
      href={`/deals/${deal.slug}`}
      className={`cursor-pointer relative rounded-md overflow-hidden ${className} bg-gray-700`}
    >
      {/* Text Overlay */}
      <div className="absolute top-4 left-4 z-10 bg-white/80 px-4 py-2 rounded-md">
        <h2 className="text-lg md:text-2xl font-bold text-gray-800">
          {deal.title}
        </h2>
      </div>

      {/* Background Image */}
      <Image
        src={deal.bannerImage}
        alt={deal.title}
        fill
        className="object-cover hover:scale-105 transition-transform duration-500"
        quality={100}
      />
    </Link>
  );
}

export default Deal;
