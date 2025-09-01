"use client";

import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="h-screen flex justify-center items-center flex-col gap-6">
      <h1 className="text-3xl font-semibold">Something went wrong!</h1>
      <p className="text-lg">{error.message}</p>

      <Button
        className="inline-block rounded-2xl bg-secondary px-6 py-3 text-white font-semibold shadow-lg transition hover:scale-105 hover:shadow-xl"
        onClick={reset}
      >
        Try again
      </Button>
    </main>
  );
}
