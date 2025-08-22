"use client";

import { Button } from "@/components/ui/button";
import { PaymentMethod } from "./PaymentMethod";
import { useForm } from "react-hook-form";
import { useAuth } from "@/app/context/AuthContext";
import { IOrderPayload } from "@/app/interfaces/Order";
import { createOrder, createPaymobIntention } from "@/app/lib/orders.client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

function Order() {
  const { user, setUser } = useAuth();
  const router = useRouter();

  const { register, setValue, getValues, handleSubmit } =
    useForm<IOrderPayload>();

  const userHasAddress = [
    user?.address,
    user?.postalCode,
    user?.phone,
    user?.city,
  ].every((shippingInfo) => Boolean(shippingInfo)); // check if all fields are filled

  async function onSubmit(data: IOrderPayload) {
    try {
      console.log(data);

      if (getValues().paymentMethod === "Card") {
        const paymentResult = await createPaymobIntention(data);
        if (paymentResult) {
          window.location.href = paymentResult.checkoutUrl;
        }
      } else {
        const result = await createOrder(data);
        if (result.updatedUser) {
          setUser(result.updatedUser);
          toast.success(result.message);
        }
      }
    } catch (error) {
      if (error instanceof Error) toast.error(error.message);
    }
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-4">Order Info</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mb-5">
        {!userHasAddress && (
          <>
            <input
              type="text"
              placeholder="Address"
              className="input w-full"
              {...register("shippingInfo.address", { required: true })}
            />
            <input
              type="text"
              placeholder="Postal Code"
              className="input w-full"
              {...register("shippingInfo.postalCode", { required: true })}
            />
            <input
              type="text"
              placeholder="Phone"
              className="input w-full"
              {...register("shippingInfo.phone", { required: true })}
            />
            <input
              type="text"
              placeholder="City"
              className="input w-full"
              {...register("shippingInfo.city", { required: true })}
            />
          </>
        )}
        <PaymentMethod setValue={setValue} />

        <Button className="w-full">Order Now</Button>
      </form>
    </div>
  );
}

export default Order;
