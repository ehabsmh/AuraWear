"use client";
import { useAuth } from "@/app/context/AuthContext";
import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { verify } from "@/services/users";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

function VerifyPage() {
  const { setUser } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());
  const email = params.get("email");
  const [otp, setOtp] = useState<string>("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      console.log(email);

      const result = await verify(email!, otp);
      if (result) {
        setUser(result.user);
        router.push("/");
      }
    } catch (error) {
      if (error instanceof Error) toast.error(error.message);
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center p-4 bg-gray-100">
      <div className="w-full max-w-lg bg-white shadow-xl rounded-2xl p-8 space-y-6">
        <h2 className="text-3xl font-bold text-center text-gray-800">
          Verify your account
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4 w-full">
          <div className="flex justify-center gap-4 text-sm">
            <InputOTP
              value={otp}
              onChange={setOtp}
              maxLength={6}
              pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
            >
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
          </div>

          <Button type="submit" className="w-full">
            Verify
          </Button>
          {/* Counter */}
          <div className="flex items-center text-lg gap-10 text-gray-500">
            <Button>Resend Code</Button>
            {/* counter down here */}
            <p>00:30</p>
          </div>
        </form>
      </div>
    </main>
  );
}

export default VerifyPage;
