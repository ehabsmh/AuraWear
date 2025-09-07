"use client";

import { motion } from "framer-motion";
import { BiCreditCard } from "react-icons/bi";
import { TbCreditCardRefund, TbHours24, TbTruckDelivery } from "react-icons/tb";

function Support() {
  return (
    <motion.section
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ amount: 0, once: true }}
    >
      <motion.div
        variants={{
          offscreen: { opacity: 0, y: 100 },
          onscreen: {
            opacity: 1,
            y: 20,
            transition: {
              type: "tween",
              bounce: 0.4,
              duration: 0.8,
            },
          },
        }}
        className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-32"
      >
        <div className="relative pl-10 md:pl-20 flex items-start">
          <TbTruckDelivery className="text-[2rem] md:text-[4.5rem] dark:text-secondary text-secondary-light absolute -top-3 md:-top-7 left-0" />
          <div>
            <p className="font-semibold text-2xl mb-3 leading-none">
              Free Shipping
            </p>
            <p className="text-lg text-gray-500">
              Ut enim ad minim veniam liquip ami tomader
            </p>
          </div>
        </div>
        <div className="relative pl-10 md:pl-20 flex items-start">
          <BiCreditCard className="text-[2rem] md:text-[4.5rem] dark:text-secondary text-secondary-light absolute -top-3 md:-top-7 left-0" />
          <div>
            <p className="font-semibold text-2xl mb-3 leading-none">
              Secure Payments
            </p>
            <p className="text-lg text-gray-500">
              Eonim ad minim veniam liquip tomader
            </p>
          </div>
        </div>
        <div className="relative pl-10 md:pl-20 flex items-start">
          <TbCreditCardRefund className="text-[2rem] md:text-[4.5rem] dark:text-secondary text-secondary-light absolute -top-3 md:-top-7 left-0" />
          <div>
            <p className="font-semibold text-2xl mb-3 leading-none">
              Easy Returns
            </p>
            <p className="text-lg text-gray-500">
              Be enim ad minim veniam liquipa ami tomader
            </p>
          </div>
        </div>
        <div className="relative pl-10 md:pl-20 flex items-start">
          <TbHours24 className="text-[2rem] md:text-[4.5rem] dark:text-secondary text-secondary-light absolute -top-3 md:-top-7 left-0" />
          <div>
            <p className="font-semibold text-2xl mb-3 leading-none">
              24/7 Support
            </p>
            <p className="text-lg text-gray-500">
              Ut enim ad minim veniam liquip ami tomader
            </p>
          </div>
        </div>
      </motion.div>
    </motion.section>
  );
}

export default Support;
