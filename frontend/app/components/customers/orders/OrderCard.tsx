import { IOrder, IOrderItem } from "@/app/interfaces/Order";
import { removeOrderItem } from "@/app/lib/orders.client";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Delete } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

function OrderCard({
  order,
  setOrders,
}: {
  order: IOrder;
  setOrders: React.Dispatch<React.SetStateAction<IOrder[]>>;
}) {
  const router = useRouter();
  async function handleDeleteItem(
    orderId: string,
    orderItemId: string,
    product: IOrderItem
  ) {
    try {
      toast.error("Are you sure you want to remove this item?", {
        id: "delete-confirm",
        cancel: {
          label: "No",
          onClick: () => {
            toast.dismiss("delete-confirm");
          },
        },
        action: {
          label: "Yes",
          onClick: async () => {
            const { message } = await removeOrderItem(orderId, orderItemId);
            if (order.products.length === 1) {
              setOrders((prevOrders) =>
                prevOrders.filter((o) => o._id !== orderId)
              );
            }

            setOrders((prevOrders) =>
              prevOrders.map((prevOrder) => {
                return prevOrder._id === orderId
                  ? {
                      ...prevOrder,
                      products: prevOrder.products.filter((p) => {
                        return p._id !== product._id;
                      }),
                      total: prevOrder.total - product.pricePerQuantity,
                    }
                  : prevOrder;
              })
            );

            toast.dismiss("delete-confirm");
            toast.success(message, { richColors: true });
          },
        },
        duration: Infinity,
      });
    } catch (error) {
      if (error instanceof Error) toast.error(error.message);
    }
  }

  return (
    <Card className="h-full flex flex-col rounded-2xl shadow-md hover:shadow-xl transition">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Order #{order._id}</CardTitle>
        <Badge
          variant="outline"
          className={
            order.orderStatus === "Delivered"
              ? "bg-green-100 text-green-700 border-green-300"
              : order.orderStatus === "Pending"
              ? "bg-yellow-100 text-yellow-700 border-yellow-300"
              : order.orderStatus === "Shipped"
              ? "bg-blue-100 text-blue-700 border-blue-300"
              : "bg-red-100 text-red-700 border-red-300"
          }
        >
          {order.orderStatus}
        </Badge>
      </CardHeader>

      <CardContent className="space-y-4 flex-1">
        {/* Order summary */}
        <div className="flex justify-between text-sm">
          <span>Date: {order.createdAt}</span>
          <span className="font-semibold">${order.total}</span>
        </div>
        <Separator />

        {/* Items */}
        <div>
          <h3 className="font-medium mb-2">Items</h3>
          <ul className="space-y-7 text-sm text-muted-foreground">
            {order.products.map((product, i) => (
              <li key={i} className="flex justify-between items-center">
                {order.orderStatus === "Pending" ||
                order.orderStatus === "Processing" ? (
                  <Delete
                    onClick={() =>
                      handleDeleteItem(order._id, product._id, product)
                    }
                    className="hover:text-red-500 duration-100 cursor-pointer"
                  />
                ) : null}
                <div className="w-full ml-2 flex items-center justify-between gap-2 dark:hover:bg-nav hover:bg-gray-100 duration-150 p-3 cursor-pointer rounded-md">
                  <div className="flex gap-2">
                    <Image
                      src={product.image ? product.image : "/men-fashion.jpg"}
                      alt={product.name}
                      width={35}
                      height={35}
                      quality={100}
                      className="w-[35px] h-[35px] rounded-md"
                    />
                    <span>
                      {product.name.length >= 25
                        ? `${product.name.slice(0, 25)}...`
                        : product.name}
                    </span>

                    <span className="text-muted-foreground">
                      ({product.color})
                    </span>

                    <span className="text-muted-foreground">
                      ({product.size})
                    </span>

                    <span>×{product.quantity}</span>
                  </div>
                  <span>${product.pricePerQuantity}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <Separator />

        {/* Shipping */}
        <div>
          <h3 className="font-medium mb-2">Shipping</h3>
          <p className="text-sm text-muted-foreground">
            {order.shippingInfo.address}, {order.shippingInfo.city} <br />
            {order.shippingInfo.phone}
          </p>
        </div>
        <Separator />

        {/* Payment */}
        <div>
          <h3 className="font-medium mb-2">Payment</h3>
          <p className="text-sm text-muted-foreground">
            {order.paymentMethod === "Cash" ? "💵 Cash" : "💳 Card"}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

export default OrderCard;
