"use client";

import { motion } from "framer-motion";

export default function AnimatedArrivalSection({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <motion.section
      initial={{ scale: 0 }}
      whileInView={{ scale: 1 }}
      viewport={{ amount: 0.3, once: true }} // triggers when 30% visible
      transition={{ duration: 0.4, ease: "linear" }}
    >
      {children}
    </motion.section>
  );
}
