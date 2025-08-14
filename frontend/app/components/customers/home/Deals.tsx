import { fetchDeals } from "@/app/lib/deals";
import React from "react";
import Deal from "./Deal";

async function Deals() {
  const deals = await fetchDeals();

  return (
    <section className="mb-16">
      <h2 className="text-gray-800 font-semibold text-4xl mb-6 leading-none">
        Aura Deals
      </h2>

      <div
        className="
          grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[450px]
        "
      >
        {deals.map((deal, index) => (
          <Deal
            key={deal._id}
            deal={deal}
            // Pass custom layout props based on index
            className={
              (index + 1) % 2 === 0
                ? "md:col-span-2 md:row-span-3"
                : "md:col-span-2 md:row-span-1"
            }
          />
        ))}
      </div>
    </section>
  );
}

export default Deals;
