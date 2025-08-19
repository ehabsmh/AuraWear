import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { IUser } from "@/app/interfaces/User";
import { useForm } from "react-hook-form";
import { changePassword } from "@/app/lib/users";
import { toast } from "sonner";

function ChangePassword({
  user,
  setUser,
}: {
  user: IUser | null;
  setUser: (user: IUser | null) => void;
}) {
  const { register, handleSubmit } = useForm<{
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
  }>();

  async function onSubmit(data: {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
  }) {
    try {
      const result = await changePassword(
        data.currentPassword,
        data.newPassword,
        data.confirmPassword
      );
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
    <>
      {!user?.googleId && (
        <Card className="rounded-2xl shadow-md">
          <CardHeader>
            <CardTitle>Change Password</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="currentPassword">Current Password</Label>
              <Input
                {...register("currentPassword")}
                id="currentPassword"
                type="password"
                placeholder="••••••••"
              />
            </div>
            <div>
              <Label htmlFor="newPassword">New Password</Label>
              <Input
                {...register("newPassword")}
                id="newPassword"
                type="password"
                placeholder="••••••••"
              />
            </div>
            <div>
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                {...register("confirmPassword")}
                id="confirmPassword"
                type="password"
                placeholder="••••••••"
              />
            </div>
            <Button className="mt-2" onClick={handleSubmit(onSubmit)}>
              Update Password
            </Button>
          </CardContent>
        </Card>
      )}
    </>
  );
}

export default ChangePassword;
