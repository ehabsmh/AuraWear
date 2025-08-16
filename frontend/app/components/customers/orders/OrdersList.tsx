"use client";
import { motion } from "framer-motion";
import OrderCard from "./OrderCard";
import { IOrder } from "@/app/interfaces/Order";

export default function OrdersList({ orders }: { orders?: IOrder[] }) {
  if (!orders?.length) return <div>No orders found.</div>;

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {orders?.map((order) => (
        <motion.div
          key={order._id}
          initial={{ opacity: 0, scale: 0.95, animationDelay: 0 }}
          animate={{ opacity: 1, scale: 1, animationDelay: 0 }}
        >
          <OrderCard order={order} />
        </motion.div>
      ))}
    </div>
  );
}
