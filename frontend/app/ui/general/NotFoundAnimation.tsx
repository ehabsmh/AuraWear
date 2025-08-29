"use client";

import { motion } from "framer-motion";

export default function NotFoundAnimation() {
  return (
    <motion.h1
      initial={{ scale: 0.5, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="text-[120px] font-extrabold leading-none tracking-tight text-secondary sm:text-[150px]"
    >
      404
    </motion.h1>
  );
}
