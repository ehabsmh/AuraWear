"use client";
import { useAuth } from "@/app/context/AuthContext";
import { IUser } from "@/app/interfaces/User";
import { fetchUser, verify } from "@/app/lib/users";
import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

function calculateDiff(expirationDate: number) {
  if (expirationDate) {
    const now = Date.now();
    const diff = expirationDate - now;

    const diffInSeconds = Math.max(0, Math.ceil(diff / 1000));
    const mins = Math.floor(diffInSeconds / 60);
    const secs = diffInSeconds % 60;
    return { mins, secs };
  }
  return { mins: 0, secs: 0 };
}

function VerifyPage() {
  const { setUser } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams.toString());
  const email = params.get("email");

  const [otp, setOtp] = useState<string>("");
  const [currentUser, setCurrentUser] = useState<IUser | null>(null);
  const expirationDate = currentUser?.verificationCodeExpires;

  const [minsLeft, setMinsLeft] = useState(0);
  const [secsLeft, setSecsLeft] = useState(0);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const result = await verify(email!, otp);
      if (result) {
        setUser(result.user);
        router.replace("/");
      }
    } catch (error) {
      if (error instanceof Error) toast.error(error.message);
    }
  }

  // fetch user by email
  useEffect(() => {
    const fetchUserData = async () => {
      if (email) {
        try {
          const user = await fetchUser(email);
          setCurrentUser(user);
        } catch (error) {
          if (error instanceof Error) toast.error(error.message);
        }
      }
    };
    fetchUserData();
  }, [email]);

  // calculate diff once expirationDate is ready
  useEffect(() => {
    if (!expirationDate) return;

    const diff = calculateDiff(expirationDate);

    setMinsLeft(diff.mins);
    setSecsLeft(diff.secs);
  }, [expirationDate, currentUser]);

  // countdown effect
  useEffect(() => {
    if (!expirationDate) return;

    const interval = setInterval(() => {
      setSecsLeft((prevSecs) => {
        if (prevSecs > 0) return prevSecs - 1;

        setMinsLeft((prevMins) => (prevMins > 0 ? prevMins - 1 : 0));
        return 59;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [expirationDate]);

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
            <Button
              disabled={minsLeft !== 0 && secsLeft !== 0}
              className="cursor-pointer"
            >
              Resend Code
            </Button>
            <p>
              {String(minsLeft).padStart(2, "0")}:
              {String(secsLeft).padStart(2, "0")}
            </p>
          </div>
        </form>
      </div>
    </main>
  );
}

export default VerifyPage;
