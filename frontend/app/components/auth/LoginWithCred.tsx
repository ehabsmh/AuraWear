"use client";

import { useAuth } from "@/app/context/AuthContext";
import { login } from "@/app/lib/users";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

function LoginWithCred() {
  const { setUser } = useAuth();
  const { register, handleSubmit } = useForm<{
    email: string;
    password: string;
  }>();
  const router = useRouter();

  async function onSubmit(data: { email: string; password: string }) {
    const result = await login(data);
    if (result?.user) {
      console.log("Login successful:", result.user);

      setUser(result.user);
      router.replace("/");
      router.refresh();
    }
  }
  return (
    <>
      <div className="relative text-center text-gray-500">
        <hr className="border-gray-200" />
        <span className="absolute left-1/2 top-[-0.6rem] bg-white px-2 text-sm transform -translate-x-1/2">
          or login with credentials
        </span>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input
          {...register("email")}
          type="email"
          placeholder="Email"
          className="input"
          name="email"
        />
        <input
          {...register("password")}
          type="password"
          placeholder="Password"
          className="input"
          name="password"
        />

        <Button className="w-full">Login</Button>
      </form>
    </>
  );
}

export default LoginWithCred;
