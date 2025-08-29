import Link from "next/link";
import Logo from "./ui/general/Logo";
import NotFoundAnimation from "./ui/general/NotFoundAnimation";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-nav px-6 text-center">
      {/* Logo */}
      <Logo className="mb-8" />

      {/* Animated 404 */}
      <NotFoundAnimation />

      {/* Subtitle */}
      <p className="mt-4 max-w-lg text-lg text-gray-700 dark:text-gray-300">
        Oops! The page you’re looking for doesn’t exist. Maybe it was removed or
        you mistyped the link.
      </p>

      {/* Back to Home */}
      <Link
        href="/"
        className="mt-8 inline-block rounded-2xl bg-secondary px-6 py-3 text-white font-semibold shadow-lg transition hover:scale-105 hover:shadow-xl"
      >
        Back to Home
      </Link>
    </div>
  );
}
