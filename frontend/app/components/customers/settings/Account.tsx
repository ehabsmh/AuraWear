import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { IUser } from "@/app/interfaces/User";
import ChangePassword from "./ChangePassword";
import { useForm } from "react-hook-form";
import { updateName } from "@/app/lib/users";
import { toast } from "sonner";

function Account({
  user,
  setUser,
}: {
  user: IUser | null;
  setUser: (user: IUser | null) => void;
}) {
  const { register, handleSubmit } = useForm<{
    firstName: string;
    lastName: string;
  }>();

  async function onSubmit(data: { firstName: string; lastName: string }) {
    try {
      const result = await updateName(data.firstName, data.lastName);
      if (result) {
        // Assuming the API returns the updated user object
        setUser(result.updatedUser);
        toast.success(result.message);
      }
    } catch (error) {
      if (error instanceof Error) toast.error(error.message);
    }
  }

  return (
    <TabsContent value="account" className="space-y-6">
      {/* Account Info */}
      <Card className="rounded-2xl shadow-md">
        <CardHeader>
          <CardTitle>Account Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="firstName">First Name</Label>
            <Input
              {...register("firstName")}
              id="firstName"
              defaultValue={user?.firstName}
            />
          </div>
          <div>
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              {...register("lastName")}
              id="lastName"
              defaultValue={user?.lastName}
            />
          </div>
          <Button className="mt-2" onClick={handleSubmit(onSubmit)}>
            Save Changes
          </Button>
        </CardContent>
      </Card>

      <ChangePassword user={user} setUser={setUser} />
    </TabsContent>
  );
}

export default Account;
