"use client";

import { IOrderPayload } from "@/app/interfaces/Order";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UseFormRegister, UseFormSetValue } from "react-hook-form";
import { useEffect, useState } from "react";

type PaymentMethodProps = {
  setValue: UseFormSetValue<IOrderPayload>;
};

export function PaymentMethod({ setValue }: PaymentMethodProps) {
  const [tab, setTab] = useState("cash");

  useEffect(() => {
    setValue("paymentMethod", "cash");
  }, [setValue]);

  return (
    <div className="flex w-full max-w-md flex-col gap-6">
      <Tabs
        value={tab}
        onValueChange={(val) => {
          setTab(val);
          setValue("paymentMethod", val as IOrderPayload["paymentMethod"]);
        }}
      >
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="cash">💵 Cash</TabsTrigger>
          <TabsTrigger value="card">💳 Card</TabsTrigger>
        </TabsList>

        {/* Cash */}
        <TabsContent value="cash">
          <p className="text-muted-foreground text-sm mt-4">
            You will pay with cash upon delivery.
          </p>
        </TabsContent>

        {/* Card */}
        <TabsContent value="card">
          <Card>
            <CardHeader>
              <CardTitle>Card Payment</CardTitle>
              <CardDescription>
                Enter your card details securely below.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
              {/* Cardholder Name */}
              <div className="grid gap-2">
                <Label htmlFor="card-name">Cardholder Name</Label>
                <Input id="card-name" placeholder="John Doe" />
              </div>

              {/* Card Number */}
              <div className="grid gap-2">
                <Label htmlFor="card-number">Card Number</Label>
                <Input
                  id="card-number"
                  placeholder="1234 5678 9012 3456"
                  maxLength={19}
                />
              </div>

              {/* Expiry & CVV */}
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="card-expiry">Expiry Date</Label>
                  <Input id="card-expiry" placeholder="MM/YY" maxLength={5} />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="card-cvv">CVV</Label>
                  <Input id="card-cvv" placeholder="123" maxLength={4} />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
