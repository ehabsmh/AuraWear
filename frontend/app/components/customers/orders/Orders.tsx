import { fetchOrders } from "@/app/lib/orders.server";
import OrdersList from "./OrdersList";

async function Orders() {
  const data = await fetchOrders();
  const orders = data?.orders;
  return <OrdersList orders={orders} />;
}

export default Orders;
