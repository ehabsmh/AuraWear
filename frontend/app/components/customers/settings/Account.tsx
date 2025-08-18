import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { IUser } from "@/app/interfaces/User";

function Account({ user }: { user: IUser | null }) {
  return (
    <TabsContent value="account">
      <Card className="rounded-2xl shadow-md">
        <CardHeader>
          <CardTitle>Account Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input id="name" placeholder="John Doe" />
          </div>
          <div>
            {user?.googleId ? (
              <p className="text-sm text-muted-foreground">
                Connected with Google
              </p>
            ) : (
              <>
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" placeholder="••••••••" />
              </>
            )}
          </div>
          <Button>Save Changes</Button>
        </CardContent>
      </Card>
    </TabsContent>
  );
}

export default Account;
