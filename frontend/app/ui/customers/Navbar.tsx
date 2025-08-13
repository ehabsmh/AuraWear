// components/Navbar.tsx
"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { BiUser } from "react-icons/bi";
import Image from "next/image";
import { CgShoppingCart } from "react-icons/cg";
import { useAuth } from "@/app/context/AuthContext";
import { logout } from "@/app/lib/users";

const Navbar = () => {
  const { user, setUser, loading } = useAuth();

  const pathname = usePathname();
  const isLoggedIn = Boolean(user); // Replace with real auth check

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const router = useRouter();

  return (
    <nav className="bg-white px-6 flex items-center justify-between h-28">
      {/* Left side: Logo + Links */}
      <div className="flex items-center gap-6">
        <Link href="/" className="text-xl font-bold text-black mr-10">
          <Image
            priority
            src="/logo-no_bg.png"
            alt="AuraWear Logo"
            width={100}
            height={100}
            className="hover:scale-125  duration-500"
          />
        </Link>
        <Link
          href="/"
          className={`hover:text-secondary duration-200 ${
            pathname === "/" ? "text-secondary font-semibold" : ""
          }`}
        >
          Home
        </Link>
        <Link
          href="/about"
          className={`hover:text-secondary duration-200 ${
            pathname === "/about" ? "text-secondary font-semibold" : ""
          }`}
        >
          About
        </Link>
        <Link
          href="/contact"
          className={`hover:text-secondary duration-200 ${
            pathname === "/contact" ? "text-secondary font-semibold" : ""
          }`}
        >
          Contact
        </Link>
        <Link
          href="/shop"
          className={`hover:text-secondary duration-200 ${
            pathname === "/shop" ? "text-secondary font-semibold" : ""
          }`}
        >
          Shop
        </Link>
      </div>

      {/* Right side: User + Cart */}
      <div className="flex items-center gap-6 relative">
        {/* User Icon */}
        <div className="relative">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <button
              onClick={() => setDropdownOpen((prev) => !prev)}
              className="hover:text-secondary duration-200"
            >
              <BiUser className="text-2xl" />
            </button>
          )}

          {/* Dropdown */}
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 bg-white border rounded-md shadow-md w-40 z-50">
              {!isLoggedIn ? (
                <>
                  <Link
                    href="/login"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Login
                  </Link>
                  <Link
                    href="/register"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Register
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    href="/settings"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Settings
                  </Link>
                  <Link
                    href="/orders"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Orders
                  </Link>
                  <button
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                    onClick={async () => {
                      await logout();
                      setUser(null);
                      setDropdownOpen(false);
                      router.replace("/");
                    }}
                  >
                    Logout
                  </button>
                </>
              )}
            </div>
          )}
        </div>

        {/* Cart */}
        <Link
          href="/cart"
          className="hover:text-secondary duration-200 relative"
        >
          <CgShoppingCart className="text-2xl" />
          <span className="absolute -top-2 -right-2 text-xs bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center">
            3
          </span>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
