"use client";
import { motion } from "framer-motion";
import OrderCard from "./OrderCard";
import { IOrder } from "@/app/interfaces/Order";
import { useState } from "react";

export default function OrdersList({ orders }: { orders?: IOrder[] }) {
  const [ordersCpy, setOrders] = useState<IOrder[]>(orders || []);
  if (!orders?.length) return <div>No orders found.</div>;

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {ordersCpy?.map((order) => (
        <motion.div
          key={order._id}
          initial={{ opacity: 0, scale: 0.8, animationDelay: 0 }}
          animate={{ opacity: 1, scale: 1, animationDelay: 0 }}
        >
          <OrderCard order={order} setOrders={setOrders} />
        </motion.div>
      ))}
    </div>
  );
}
