"use client";

import { IOrderPayload } from "@/app/interfaces/Order";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UseFormSetValue } from "react-hook-form";
import { useEffect, useState } from "react";
import { Banknote, CreditCard } from "lucide-react";

type PaymentMethodProps = {
  setValue: UseFormSetValue<IOrderPayload>;
};

export function PaymentMethod({ setValue }: PaymentMethodProps) {
  const [tab, setTab] = useState<"Cash" | "Card">("Cash");
  console.log(tab);

  useEffect(() => {
    setValue("paymentMethod", tab);
  }, [setValue, tab]);

  return (
    <div className="flex w-full max-w-md flex-col gap-6">
      <Tabs
        value={tab}
        onValueChange={(val) => {
          setTab(val as "Cash" | "Card");
          setValue("paymentMethod", val as IOrderPayload["paymentMethod"]);
        }}
      >
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="Cash">
            <Banknote className="text-green-700" /> Cash
          </TabsTrigger>
          <TabsTrigger value="Card">
            <CreditCard className="text-yellow-500" /> Card
          </TabsTrigger>
        </TabsList>

        <TabsContent value="Cash">
          <p className="text-muted-foreground text-sm mt-4">
            You will pay with cash upon delivery.
          </p>
        </TabsContent>

        <TabsContent value="Card">
          <Card>
            <CardHeader>
              <CardTitle>Card Payment</CardTitle>
              <CardDescription>
                Enter your card details with{" "}
                <span className="font-bold">Paymob</span>.
              </CardDescription>
            </CardHeader>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
