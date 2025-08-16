// app/(shop)/auth/register/page.tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import { Camera } from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { signup } from "@/app/lib/users";
import { Button } from "@/components/ui/button";

export default function RegisterPage() {
  const [avatar, setAvatar] = useState<string | null>(null);
  const { register, handleSubmit } = useForm<{
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    avatar?: FileList | null;
  }>();

  const router = useRouter();

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setAvatar(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  async function onSubmit(data: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    avatar?: FileList | null;
  }) {
    try {
      const result = await signup(data);
      if (result) {
        toast.success(result.message);
        // Redirect or perform additional actions here
        router.replace(`/verify?email=${data.email}`);
      }
    } catch (error) {
      if (error instanceof Error)
        toast.error(error.message, { style: { width: "700px" } });
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center p-4 bg-gray-100">
      <div className="w-full max-w-lg bg-white shadow-xl rounded-2xl p-8 space-y-6">
        <h2 className="text-3xl font-bold text-center text-gray-800">
          Create an Account
        </h2>
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <input
              {...register("firstName")}
              type="text"
              placeholder="First Name"
              className="input h-8 p-2"
              name="firstName"
            />
            <input
              {...register("lastName")}
              type="text"
              placeholder="Last Name"
              className="input h-8 p-2"
              name="lastName"
            />
            <input
              {...register("email")}
              type="email"
              placeholder="Email"
              className="input h-8 p-2"
              name="email"
            />
            <input
              {...register("password")}
              type="password"
              placeholder="Password"
              className="input h-8 p-2"
              name="password"
            />
          </div>

          <div className="flex flex-col items-center mt-6 gap-2 w-full">
            <label className="text-sm font-medium text-gray-700">
              Upload Avatar
            </label>

            <div className="flex items-center gap-4">
              <div>
                <label
                  htmlFor="avatar"
                  className="group w-16 h-16 rounded-full overflow-hidden border border-gray-300 bg-gray-100 flex items-center justify-center hover:bg-secondary-light cursor-pointer duration-150"
                >
                  {avatar ? (
                    <div className="relative w-16 h-16 rounded-full overflow-hidden border border-gray-300 bg-gray-100">
                      <Image
                        src={avatar}
                        alt="Avatar"
                        width={90}
                        height={90}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <Camera className="text-gray-400 w-6 h-6 group-hover:text-white" />
                  )}
                  <input
                    type="file"
                    id="avatar"
                    name="avatar"
                    accept="image/*"
                    className="hidden"
                    onChange={handleAvatarChange}
                  />
                </label>
              </div>
            </div>
          </div>

          <Button type="submit" className="w-full">
            Sign Up
          </Button>
        </form>

        <p className="text-center text-sm text-gray-500">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-600">
            Login
          </Link>
        </p>
      </div>
    </main>
  );
}
