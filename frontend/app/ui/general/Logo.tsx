import Image from "next/image";
import Link from "next/link";

export default function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className={className}>
      <Image
        src="/logo-no_bg.png"
        alt="AuraWear Logo"
        width={120}
        height={120}
        className="mx-auto"
      />
    </Link>
  );
}
