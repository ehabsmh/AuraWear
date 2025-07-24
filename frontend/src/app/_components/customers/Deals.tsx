import Image from "next/image";
import React from "react";

function Deals() {
  return (
    <section>
      <h2 className="text-gray-800 font-semibold text-4xl mb-6 leading-none">
        Aura Deals
      </h2>
      <div className="w-full flex gap-4">
        <div className="w-full space-y-4">
          <div className="relative h-[400px]">
            <div className="bg-white/70 absolute top-4 z-10">
              <h2 className="text-3xl md:text-5xl font-bold p-3">
                Women&apos;s Latest Collection
              </h2>
            </div>
            <Image
              src="/4.jpg"
              alt="x"
              fill
              className="rounded-md object-cover"
              quality={100}
            />
          </div>

          <div className="relative h-[400px]">
            <div className="bg-white/70 absolute top-4 z-10">
              <h2 className="text-5xl text-gray-700 font-bold p-3">
                The Latest Women&apos;s trends this season
              </h2>
            </div>
            <Image
              src="/8.jpg"
              alt="x"
              fill
              className="rounded-md object-cover"
              quality={100}
            />
          </div>
        </div>
        <div className="w-full">
          <div className="relative h-[700px]">
            <div className="bg-white/70 absolute top-4 z-10">
              <h2 className="text-5xl text-gray-700 font-bold p-3">
                The Latest men&apos;s trends this season
              </h2>
            </div>
            <Image
              src="/6.jpg"
              alt="x"
              fill
              className="rounded-md object-cover"
              quality={100}
            />
          </div>
        </div>
        <div className="space-y-4 w-full">
          <div className="relative h-[400px]">
            <div className="bg-white/70 absolute top-4 z-10">
              <h2 className="text-5xl text-gray-700 font-bold p-3">
                Aura trends this season
              </h2>
            </div>
            <Image
              src="/7.jpg"
              alt="x"
              fill
              className="rounded-md object-cover"
              quality={100}
            />
          </div>
          <div className="relative h-[600px]">
            <div className="bg-white/70 absolute top-4 z-10">
              <h2 className="text-5xl font-bold p-3">
                Man&apos;s Latest Collection
              </h2>
            </div>
            <Image
              src="/5.jpg"
              alt="x"
              fill
              className="rounded-md object-cover"
              quality={100}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Deals;
