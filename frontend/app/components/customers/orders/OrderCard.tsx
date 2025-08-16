import { IOrder } from "@/app/interfaces/Order";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";

function OrderCard({ order }: { order: IOrder }) {
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
          <ul className="space-y-1 text-sm text-muted-foreground">
            {order.products.map((product, i) => (
              <li key={i} className="flex justify-between">
                <Image
                  src={product.image}
                  alt={product.name}
                  width={35}
                  height={35}
                  quality={100}
                  className="w-[35px] h-[35px] rounded-md"
                />
                <div className="flex gap-2">
                  <span>{product.name}</span>

                  <span className="text-muted-foreground">
                    ({product.color})
                  </span>

                  <span className="text-muted-foreground">
                    ({product.size})
                  </span>

                  <span>×{product.quantity}</span>
                </div>
                <span>${product.pricePerQuantity}</span>
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
