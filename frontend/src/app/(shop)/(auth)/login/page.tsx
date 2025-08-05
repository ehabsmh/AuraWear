"use client";

import { FcGoogle } from "react-icons/fc";
import Link from "next/link";
import LoginWithCred from "@/app/_components/customers/LoginWithCred";

function LoginPage() {
  return (
    <main className="min-h-screen flex items-center justify-center p-4 bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8 space-y-6">
        <h2 className="text-3xl font-bold text-center text-gray-800">
          Login to your account
        </h2>

        <Link
          className="w-full flex items-center gap-2 justify-center cursor-pointer"
          href="http://localhost:8080/api/v1/auth/google"
        >
          <FcGoogle className="text-xl" /> Login with Google
        </Link>

        <LoginWithCred />

        <p className="text-center text-sm text-gray-500">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="text-blue-600">
            Sign up
          </Link>
        </p>
      </div>
    </main>
  );
}
export default LoginPage;
