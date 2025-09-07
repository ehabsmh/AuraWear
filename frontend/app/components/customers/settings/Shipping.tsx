import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/app/context/AuthContext";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { updateShippingInfo } from "@/app/lib/users";
import { toast } from "sonner";
import { IShippingInfo } from "@/app/interfaces/User";

function Shipping() {
  const { user, setUser } = useAuth();
  const { register, handleSubmit, setValue } = useForm<IShippingInfo>();

  async function onSubmit(data: IShippingInfo) {
    try {
      const result = await updateShippingInfo(data);
      if (result) {
        setUser(result.updatedUser);
        toast.success(result.message);
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  }

  useEffect(() => {
    setValue("address", user?.address);

    setValue("city", user?.city);

    setValue("postalCode", user?.postalCode);

    setValue("phone", user?.phone);
  }, [user, setValue]);

  return (
    <TabsContent value="shipping">
      <Card className="rounded-2xl shadow-md">
        <CardHeader>
          <CardTitle>Shipping Address</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="address">Address</Label>
            <Input
              id="address"
              placeholder="123 Main St"
              {...register("address")}
            />
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="city">City</Label>
              <Input id="city" placeholder="Alexandria" {...register("city")} />
            </div>
            <div>
              <Label htmlFor="postal">Postal Code</Label>
              <Input
                id="postal"
                placeholder="12345"
                {...register("postalCode")}
              />
            </div>
          </div>
          <div>
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              placeholder="+20 111 222 3333"
              {...register("phone")}
            />
          </div>
          <Button onClick={handleSubmit(onSubmit)}>Save Address</Button>
        </CardContent>
      </Card>
    </TabsContent>
  );
}

export default Shipping;
