"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { ShoppingBag, User, Menu } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/app/context/AuthContext";
import { usePathname, useRouter } from "next/navigation";
import { logout } from "@/app/lib/users";
import ToggleMode from "../general/ToggleMode";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { toast } from "sonner";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
  { href: "/contact", label: "Contact" },
  { href: "/about", label: "About" },
];

export default function Navbar() {
  const { user, setUser } = useAuth();
  const { scrollY } = useScroll();
  const [isSticky, setIsSticky] = useState(false);

  const pathname = usePathname();

  const router = useRouter();

  const isLoggedIn = user !== null;

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 400) {
      setIsSticky(true);
    } else {
      setIsSticky(false);
    }
  });

  return (
    <motion.header
      initial={false}
      animate={isSticky ? "sticky" : "top"}
      variants={{
        top: {
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          boxShadow: "none",
          y: 0,
          transition: { duration: 0.3 },
        },
        sticky: {
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
          y: 0,
        },
      }}
      className="z-50 w-full bg-nav"
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        {/* Left: Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            className="w-24"
            src="/logo-no_bg.png"
            alt="AuraWear Logo"
            width={80}
            height={80}
          />
        </Link>

        {/* Center: Nav Links (desktop) */}
        <nav className="hidden md:flex items-center gap-8 font-medium text-foreground">
          {navLinks.map((link) => {
            const isActive = pathname === link.href; // 👈 check active
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`transition-colors ${
                  isActive
                    ? "text-secondary"
                    : "hover:text-black dark:hover:text-gray-300"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Right: Account + Cart + toggle dark mode */}
        <div className="flex items-center gap-4">
          {/* Account Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="p-2">
                <User className="h-9 w-9" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-40">
              {isLoggedIn ? (
                <>
                  <DropdownMenuItem asChild>
                    <span className="font-semibold">
                      {user.firstName} {user.lastName}
                    </span>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/orders">Orders</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/wishlist">Wishlist</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/settings">Settings</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={async () => {
                      await logout();
                      setUser(null);
                      router.replace("/");
                      toast.info("Logged out successfully");
                    }}
                    className="text-red-500 cursor-pointer"
                  >
                    Logout
                  </DropdownMenuItem>
                </>
              ) : (
                <>
                  <DropdownMenuItem asChild>
                    <Link href="/login">Login</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/register">Register</Link>
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Cart */}
          <Link href="/cart" className="relative">
            <ShoppingBag className="h-6 w-6" />
          </Link>

          <ToggleMode />

          <Sheet>
            {/* Trigger (hamburger icon) */}
            <SheetTrigger className="md:hidden">
              <Menu className="h-6 w-6" />
            </SheetTrigger>

            {/* Sliding menu */}
            <SheetContent
              side="top"
              className="top-[96px] bg-white dark:bg-dark"
            >
              <nav className="flex flex-col space-y-4 mt-6">
                {navLinks.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`transition-colors text-lg ${
                        isActive
                          ? "text-secondary font-semibold"
                          : "dark:text-gray-300 text-gray-700 dark:hover:text-white hover:text-black"
                      }`}
                    >
                      {link.label}
                    </Link>
                  );
                })}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.header>
  );
}
